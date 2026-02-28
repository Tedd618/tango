from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Like, Photo, User, UserPrompt, UserRole
from app.schemas import LikeCreate, LikeResponse, PhotoCreate, PhotoResponse, UserCreate, UserPromptCreate, UserPromptResponse, UserResponse, UserUpdate, UserWithDetails

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    if user.role not in [r.value for r in UserRole]:
        raise HTTPException(status_code=400, detail="Invalid role. Must be 'recruiter' or 'applicant'")
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/", response_model=list[UserResponse])
def list_users(skip: int = 0, limit: int = 20, email: str | None = None, db: Session = Depends(get_db)):
    q = db.query(User)
    if email:
        q = q.filter(User.email == email)
    return q.offset(skip).limit(limit).all()


@router.get("/{user_id}", response_model=UserWithDetails)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in updates.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()


# ---------------------------------------------------------------------------
# Photos
# ---------------------------------------------------------------------------

@router.post("/{user_id}/photos", response_model=PhotoResponse, status_code=201)
def add_photo(user_id: int, photo: PhotoCreate, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    db_photo = Photo(user_id=user_id, **photo.model_dump())
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo


@router.delete("/{user_id}/photos/{photo_id}", status_code=204)
def delete_photo(user_id: int, photo_id: int, db: Session = Depends(get_db)):
    photo = db.query(Photo).filter(Photo.id == photo_id, Photo.user_id == user_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    db.delete(photo)
    db.commit()


# ---------------------------------------------------------------------------
# Prompts
# ---------------------------------------------------------------------------

@router.post("/{user_id}/prompts", response_model=UserPromptResponse, status_code=201)
def add_prompt(user_id: int, prompt: UserPromptCreate, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    db_prompt = UserPrompt(user_id=user_id, **prompt.model_dump())
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return db_prompt


@router.delete("/{user_id}/prompts/{prompt_id}", status_code=204)
def delete_prompt(user_id: int, prompt_id: int, db: Session = Depends(get_db)):
    prompt = db.query(UserPrompt).filter(UserPrompt.id == prompt_id, UserPrompt.user_id == user_id).first()
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    db.delete(prompt)
    db.commit()


# ---------------------------------------------------------------------------
# Likes (on a photo or prompt)
# ---------------------------------------------------------------------------

@router.post("/{user_id}/likes", response_model=LikeResponse, status_code=201)
def add_like(user_id: int, like: LikeCreate, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first():
        raise HTTPException(status_code=404, detail="User not found")
    if like.prompt_id is None and like.photo_id is None:
        raise HTTPException(status_code=400, detail="Must specify prompt_id or photo_id")
    db_like = Like(user_id=user_id, **like.model_dump())
    db.add(db_like)
    db.commit()
    db.refresh(db_like)
    return db_like


@router.delete("/{user_id}/likes/{like_id}", status_code=204)
def remove_like(user_id: int, like_id: int, db: Session = Depends(get_db)):
    like = db.query(Like).filter(Like.id == like_id, Like.user_id == user_id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(like)
    db.commit()
