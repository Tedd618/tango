import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class UserRole(str, enum.Enum):
    APPLICANT = "applicant"
    RECRUITER = "recruiter"


class SwipeAction(str, enum.Enum):
    LIKE = "like"
    PASS = "pass"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    profile: Mapped["Profile"] = relationship(back_populates="user", uselist=False)
    swipes_given: Mapped[list["Swipe"]] = relationship(
        back_populates="swiper", foreign_keys="Swipe.swiper_id"
    )
    swipes_received: Mapped[list["Swipe"]] = relationship(
        back_populates="target", foreign_keys="Swipe.target_id"
    )


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    headline: Mapped[str | None] = mapped_column(String(255))
    bio: Mapped[str | None] = mapped_column(Text)
    skills: Mapped[str | None] = mapped_column(Text)  # comma-separated for now
    location: Mapped[str | None] = mapped_column(String(255))
    experience_years: Mapped[int | None] = mapped_column()
    company: Mapped[str | None] = mapped_column(String(255))  # for recruiters
    avatar_url: Mapped[str | None] = mapped_column(String(500))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    user: Mapped["User"] = relationship(back_populates="profile")


class Swipe(Base):
    __tablename__ = "swipes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    swiper_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    target_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    action: Mapped[SwipeAction] = mapped_column(Enum(SwipeAction), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    swiper: Mapped["User"] = relationship(back_populates="swipes_given", foreign_keys=[swiper_id])
    target: Mapped["User"] = relationship(
        back_populates="swipes_received", foreign_keys=[target_id]
    )


class Match(Base):
    __tablename__ = "matches"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    applicant_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    recruiter_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
