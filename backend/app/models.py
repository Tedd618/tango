import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class UserRole(str, enum.Enum):
    RECRUITER = "recruiter"
    APPLICANT = "applicant"


class PromptType(str, enum.Enum):
    POLL = "poll"
    QUESTION = "question"


class SwipeAction(str, enum.Enum):
    LIKE = "like"
    PASS = "pass"


# ---------------------------------------------------------------------------
# User
# ---------------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False)

    gender: Mapped[str | None] = mapped_column(String(50))
    location: Mapped[str | None] = mapped_column(String(255))
    nationality: Mapped[str | None] = mapped_column(String(255))
    industry: Mapped[str | None] = mapped_column(String(255))
    salary_min: Mapped[int | None] = mapped_column(Integer)
    salary_max: Mapped[int | None] = mapped_column(Integer)
    previous_occupation: Mapped[str | None] = mapped_column(String(255))
    education: Mapped[str | None] = mapped_column(String(255))
    company_name: Mapped[str | None] = mapped_column(String(255))
    job_title: Mapped[str | None] = mapped_column(String(255))
    job_description: Mapped[str | None] = mapped_column(Text)

    is_premium: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    resume_url: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    # Relationships
    photos: Mapped[list["Photo"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    prompts: Mapped[list["UserPrompt"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    swipes_given: Mapped[list["Swipe"]] = relationship(back_populates="swiper", foreign_keys="Swipe.swiper_id")
    swipes_received: Mapped[list["Swipe"]] = relationship(back_populates="target", foreign_keys="Swipe.target_id")
    matches_as_recruiter: Mapped[list["Match"]] = relationship(back_populates="recruiter", foreign_keys="Match.recruiter_id")
    matches_as_applicant: Mapped[list["Match"]] = relationship(back_populates="applicant", foreign_keys="Match.applicant_id")
    messages_sent: Mapped[list["Message"]] = relationship(back_populates="sender")
    likes_given: Mapped[list["Like"]] = relationship(back_populates="user")


# ---------------------------------------------------------------------------
# Prompt templates (preset by devs)
# ---------------------------------------------------------------------------

class PromptTemplate(Base):
    __tablename__ = "prompt_templates"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    type: Mapped[PromptType] = mapped_column(Enum(PromptType), nullable=False)
    text: Mapped[str] = mapped_column(String(500), nullable=False)
    target_role: Mapped[str] = mapped_column(String(50), default="both", nullable=False)
    # For polls: JSON array of option strings e.g. '["Option A", "Option B"]'
    # For questions: null
    options: Mapped[str | None] = mapped_column(Text)

    user_prompts: Mapped[list["UserPrompt"]] = relationship(back_populates="template")


# ---------------------------------------------------------------------------
# User's answered prompts
# ---------------------------------------------------------------------------

class UserPrompt(Base):
    __tablename__ = "user_prompts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    template_id: Mapped[int] = mapped_column(ForeignKey("prompt_templates.id"), nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    user: Mapped["User"] = relationship(back_populates="prompts")
    template: Mapped["PromptTemplate"] = relationship(back_populates="user_prompts")
    likes: Mapped[list["Like"]] = relationship(back_populates="prompt", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# Photos
# ---------------------------------------------------------------------------

class Photo(Base):
    __tablename__ = "photos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    caption: Mapped[str | None] = mapped_column(String(500))
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    user: Mapped["User"] = relationship(back_populates="photos")
    likes: Mapped[list["Like"]] = relationship(back_populates="photo", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# Likes (on a specific prompt or photo)
# ---------------------------------------------------------------------------

class Like(Base):
    __tablename__ = "likes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    prompt_id: Mapped[int | None] = mapped_column(ForeignKey("user_prompts.id"))
    photo_id: Mapped[int | None] = mapped_column(ForeignKey("photos.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    user: Mapped["User"] = relationship(back_populates="likes_given", foreign_keys=[user_id])
    prompt: Mapped["UserPrompt | None"] = relationship(back_populates="likes", foreign_keys=[prompt_id])
    photo: Mapped["Photo | None"] = relationship(back_populates="likes", foreign_keys=[photo_id])


# ---------------------------------------------------------------------------
# Swipes (like / pass on a whole profile)
# ---------------------------------------------------------------------------

class Swipe(Base):
    __tablename__ = "swipes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    swiper_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    target_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    action: Mapped[SwipeAction] = mapped_column(Enum(SwipeAction), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    swiper: Mapped["User"] = relationship(back_populates="swipes_given", foreign_keys=[swiper_id])
    target: Mapped["User"] = relationship(back_populates="swipes_received", foreign_keys=[target_id])


# ---------------------------------------------------------------------------
# Matches (mutual like between recruiter + applicant)
# ---------------------------------------------------------------------------

class Match(Base):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    recruiter_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    applicant_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    recruiter: Mapped["User"] = relationship(back_populates="matches_as_recruiter", foreign_keys=[recruiter_id])
    applicant: Mapped["User"] = relationship(back_populates="matches_as_applicant", foreign_keys=[applicant_id])
    messages: Mapped[list["Message"]] = relationship(back_populates="match", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# Messages (only between matched users)
# ---------------------------------------------------------------------------

class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    match_id: Mapped[int] = mapped_column(ForeignKey("matches.id"), nullable=False)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    match: Mapped["Match"] = relationship(back_populates="messages")
    sender: Mapped["User"] = relationship(back_populates="messages_sent")
