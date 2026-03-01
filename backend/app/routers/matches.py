from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Match, Message, Swipe, SwipeAction, User, UserRole
from app.schemas import MatchResponse, MessageCreate, MessageResponse, SwipeCreate, SwipeResponse, UserWithDetails

router = APIRouter(prefix="/matches", tags=["matches"])


@router.post("/{user_id}/swipe", response_model=SwipeResponse)
def swipe(user_id: int, swipe_data: SwipeCreate, db: Session = Depends(get_db)):
    if swipe_data.action not in [a.value for a in SwipeAction]:
        raise HTTPException(status_code=400, detail="Invalid action. Must be 'like' or 'pass'")

    swiper = db.query(User).filter(User.id == user_id).first()
    if not swiper:
        raise HTTPException(status_code=404, detail="User not found")

    target = db.query(User).filter(User.id == swipe_data.target_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Target user not found")

    # Enforce cross-role swiping only
    if swiper.role == target.role:
        raise HTTPException(
            status_code=400,
            detail="Recruiters can only swipe on applicants and vice versa",
        )

    existing = (
        db.query(Swipe)
        .filter(Swipe.swiper_id == user_id, Swipe.target_id == swipe_data.target_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Already swiped on this user")

    db_swipe = Swipe(
        swiper_id=user_id,
        target_id=swipe_data.target_id,
        action=swipe_data.action,
    )
    db.add(db_swipe)
    db.commit()
    db.refresh(db_swipe)

    # Check for a mutual like → create a match
    is_match = False
    match_id = None
    if swipe_data.action == SwipeAction.LIKE.value:
        reverse = (
            db.query(Swipe)
            .filter(
                Swipe.swiper_id == swipe_data.target_id,
                Swipe.target_id == user_id,
                Swipe.action == SwipeAction.LIKE,
            )
            .first()
        )
        if reverse:
            applicant_id = user_id if swiper.role == UserRole.APPLICANT else swipe_data.target_id
            recruiter_id = user_id if swiper.role == UserRole.RECRUITER else swipe_data.target_id
            match = Match(applicant_id=applicant_id, recruiter_id=recruiter_id)
            db.add(match)
            db.commit()
            db.refresh(match)
            is_match = True
            match_id = match.id

    return SwipeResponse(
        id=db_swipe.id,
        swiper_id=db_swipe.swiper_id,
        target_id=db_swipe.target_id,
        action=db_swipe.action.value if hasattr(db_swipe.action, "value") else db_swipe.action,
        created_at=db_swipe.created_at,
        is_match=is_match,
        match_id=match_id,
    )


@router.get("/{user_id}/matches", response_model=list[MatchResponse])
def get_matches(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    matches = db.query(Match).filter((Match.applicant_id == user_id) | (Match.recruiter_id == user_id)).all()
    
    # Add unread count for each match
    for m in matches:
        unread = db.query(Message).filter(
            Message.match_id == m.id,
            Message.sender_id != user_id,
            Message.is_read == False
        ).count()
        m.unread_count = unread
        
    return matches


@router.get("/{user_id}/unread-total", response_model=dict)
def get_unread_total(user_id: int, db: Session = Depends(get_db)):
    count = db.query(Message).join(Match).filter(
        ((Match.applicant_id == user_id) | (Match.recruiter_id == user_id)),
        Message.sender_id != user_id,
        Message.is_read == False
    ).count()
    return {"count": count}


@router.patch("/match/{match_id}/read", status_code=204)
def mark_as_read(match_id: int, user_id: int, db: Session = Depends(get_db)):
    db.query(Message).filter(
        Message.match_id == match_id,
        Message.sender_id != user_id,
        Message.is_read == False
    ).update({Message.is_read: True}, synchronize_session=False)
    db.commit()


@router.get("/{user_id}/candidates", response_model=list[UserWithDetails])
def get_candidates(
    user_id: int,
    gender: str | None = None,
    location: str | None = None,
    nationality: str | None = None,
    industry: str | None = None,
    salary_min: int | None = None,
    salary_max: int | None = None,
    db: Session = Depends(get_db)
):
    """Return users of the opposite role that this user hasn't swiped on yet."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    swiped_ids = (
        db.query(Swipe.target_id).filter(Swipe.swiper_id == user_id).subquery()
    )
    target_role = UserRole.RECRUITER if user.role == UserRole.APPLICANT else UserRole.APPLICANT

    query = db.query(User).filter(User.role == target_role, User.id != user_id, User.id.notin_(swiped_ids))

    if gender:
        query = query.filter(User.gender.ilike(f"%{gender}%"))
    if location:
        query = query.filter(User.location.ilike(f"%{location}%"))
    if nationality:
        query = query.filter(User.nationality.ilike(f"%{nationality}%"))
    if industry:
        query = query.filter(User.industry.ilike(f"%{industry}%"))
    if salary_min is not None:
        query = query.filter(User.salary_min >= salary_min)
    if salary_max is not None:
        query = query.filter(User.salary_max <= salary_max)

    return query.limit(20).all()


@router.get("/{user_id}/inbox", response_model=list[UserWithDetails])
def get_inbox(user_id: int, db: Session = Depends(get_db)):
    """For recruiters: return applicants who liked this recruiter, that this recruiter hasn't reviewed yet."""
    recruiter = db.query(User).filter(User.id == user_id).first()
    if not recruiter:
        raise HTTPException(status_code=404, detail="User not found")
    if recruiter.role != UserRole.RECRUITER:
        raise HTTPException(status_code=400, detail="Only recruiters have an inbox")

    # Applicants who liked this recruiter
    liked_me_ids = (
        db.query(Swipe.swiper_id)
        .filter(Swipe.target_id == user_id, Swipe.action == SwipeAction.LIKE)
        .subquery()
    )

    # Applicants this recruiter already reviewed
    already_swiped_ids = (
        db.query(Swipe.target_id).filter(Swipe.swiper_id == user_id).subquery()
    )

    return (
        db.query(User)
        .filter(
            User.id.in_(liked_me_ids),
            User.id.notin_(already_swiped_ids),
        )
        .limit(50)
        .all()
    )


@router.delete("/{user_id}/history", status_code=204)
def clear_swipe_history(user_id: int, db: Session = Depends(get_db)):
    """Delete all swipes initiated by this user so they can rediscover profiles."""
    if not db.query(User).filter(User.id == user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    db.query(Swipe).filter(Swipe.swiper_id == user_id).delete()
    db.commit()


@router.get("/match/{match_id}", response_model=MatchResponse)
def get_match(match_id: int, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match


@router.delete("/match/{match_id}", status_code=204)
def delete_match(match_id: int, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    db.delete(match)
    db.commit()


# ---------------------------------------------------------------------------
# Messages
# ---------------------------------------------------------------------------

@router.get("/match/{match_id}/messages", response_model=list[MessageResponse])
def list_messages(match_id: int, db: Session = Depends(get_db)):
    if not db.query(Match).filter(Match.id == match_id).first():
        raise HTTPException(status_code=404, detail="Match not found")
    return (
        db.query(Message)
        .filter(Message.match_id == match_id)
        .order_by(Message.created_at)
        .all()
    )


@router.post("/match/{match_id}/messages", response_model=MessageResponse, status_code=201)
def send_message(match_id: int, body: MessageCreate, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    if body.sender_id not in (match.recruiter_id, match.applicant_id):
        raise HTTPException(status_code=403, detail="Not a participant in this match")
    db_msg = Message(match_id=match_id, sender_id=body.sender_id, content=body.content)
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg
