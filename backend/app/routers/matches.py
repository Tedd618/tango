from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Match, Swipe, SwipeAction, User, UserRole
from app.schemas import MatchResponse, SwipeCreate, SwipeResponse

router = APIRouter(prefix="/matches", tags=["matches"])


@router.post("/{user_id}/swipe", response_model=SwipeResponse)
def swipe(user_id: int, swipe_data: SwipeCreate, db: Session = Depends(get_db)):
    if swipe_data.action not in [a.value for a in SwipeAction]:
        raise HTTPException(status_code=400, detail="Invalid action, must be 'like' or 'pass'")

    swiper = db.query(User).filter(User.id == user_id).first()
    if not swiper:
        raise HTTPException(status_code=404, detail="User not found")

    target = db.query(User).filter(User.id == swipe_data.target_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Target user not found")

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

    is_match = False
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
            applicant_id = (
                user_id if swiper.role == UserRole.APPLICANT else swipe_data.target_id
            )
            recruiter_id = (
                user_id if swiper.role == UserRole.RECRUITER else swipe_data.target_id
            )
            match = Match(applicant_id=applicant_id, recruiter_id=recruiter_id)
            db.add(match)
            db.commit()
            is_match = True

    return SwipeResponse(
        id=db_swipe.id,
        swiper_id=db_swipe.swiper_id,
        target_id=db_swipe.target_id,
        action=db_swipe.action.value if hasattr(db_swipe.action, "value") else db_swipe.action,
        created_at=db_swipe.created_at,
        is_match=is_match,
    )


@router.get("/{user_id}/matches", response_model=list[MatchResponse])
def get_matches(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    matches = (
        db.query(Match)
        .filter((Match.applicant_id == user_id) | (Match.recruiter_id == user_id))
        .all()
    )
    return matches


@router.get("/{user_id}/candidates", response_model=list)
def get_candidates(user_id: int, db: Session = Depends(get_db)):
    """Get users that the current user hasn't swiped on yet."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    swiped_ids = (
        db.query(Swipe.target_id).filter(Swipe.swiper_id == user_id).subquery()
    )

    # Applicants see recruiters, recruiters see applicants
    target_role = UserRole.RECRUITER if user.role == UserRole.APPLICANT else UserRole.APPLICANT

    candidates = (
        db.query(User)
        .filter(User.role == target_role, User.id != user_id, User.id.notin_(swiped_ids))
        .limit(20)
        .all()
    )
    return [
        {
            "id": c.id,
            "email": c.email,
            "full_name": c.full_name,
            "role": c.role.value if hasattr(c.role, "value") else c.role,
        }
        for c in candidates
    ]
