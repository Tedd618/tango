from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class ProfileBase(BaseModel):
    headline: str | None = None
    bio: str | None = None
    skills: str | None = None
    location: str | None = None
    experience_years: int | None = None
    company: str | None = None
    avatar_url: str | None = None


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int
    user_id: int
    updated_at: datetime

    model_config = {"from_attributes": True}


class UserWithProfile(UserResponse):
    profile: ProfileResponse | None = None


class SwipeCreate(BaseModel):
    target_id: int
    action: str


class SwipeResponse(BaseModel):
    id: int
    swiper_id: int
    target_id: int
    action: str
    created_at: datetime
    is_match: bool = False

    model_config = {"from_attributes": True}


class MatchResponse(BaseModel):
    id: int
    applicant_id: int
    recruiter_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
