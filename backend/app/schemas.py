from datetime import datetime

from pydantic import BaseModel, EmailStr


# ---------------------------------------------------------------------------
# Prompt templates (preset by devs)
# ---------------------------------------------------------------------------

class PromptTemplateCreate(BaseModel):
    type: str  # "poll" or "question"
    text: str
    options: str | None = None  # JSON string for polls, null for questions


class PromptTemplateResponse(BaseModel):
    id: int
    type: str
    text: str
    options: str | None  # JSON string for polls, null for questions

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# User prompts (answers)
# ---------------------------------------------------------------------------

class UserPromptCreate(BaseModel):
    template_id: int
    answer: str


class UserPromptResponse(BaseModel):
    id: int
    user_id: int
    template_id: int
    answer: str
    template: PromptTemplateResponse
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Photos
# ---------------------------------------------------------------------------

class PhotoCreate(BaseModel):
    url: str
    caption: str | None = None
    order: int = 0


class PhotoResponse(BaseModel):
    id: int
    user_id: int
    url: str
    caption: str | None
    order: int
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str
    gender: str | None = None
    location: str | None = None
    nationality: str | None = None
    industry: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    previous_occupation: str | None = None
    education: str | None = None
    company_name: str | None = None
    job_title: str | None = None
    job_description: str | None = None


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: str | None = None
    gender: str | None = None
    location: str | None = None
    nationality: str | None = None
    industry: str | None = None
    salary_min: int | None = None
    salary_max: int | None = None
    previous_occupation: str | None = None
    education: str | None = None
    resume_url: str | None = None
    company_name: str | None = None
    job_title: str | None = None
    job_description: str | None = None


class UserResponse(UserBase):
    id: int
    is_premium: bool
    resume_url: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class UserWithDetails(UserResponse):
    photos: list[PhotoResponse] = []
    prompts: list[UserPromptResponse] = []


# ---------------------------------------------------------------------------
# Likes (on a specific prompt or photo)
# ---------------------------------------------------------------------------

class LikeCreate(BaseModel):
    prompt_id: int | None = None
    photo_id: int | None = None


class LikeResponse(BaseModel):
    id: int
    user_id: int
    prompt_id: int | None
    photo_id: int | None
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Swipes (like / pass on a whole profile)
# ---------------------------------------------------------------------------

class SwipeCreate(BaseModel):
    target_id: int
    action: str  # "like" or "pass"


class SwipeResponse(BaseModel):
    id: int
    swiper_id: int
    target_id: int
    action: str
    is_match: bool = False
    match_id: int | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Matches
# ---------------------------------------------------------------------------

class MatchResponse(BaseModel):
    id: int
    recruiter_id: int
    applicant_id: int
    unread_count: int = 0
    created_at: datetime

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Messages
# ---------------------------------------------------------------------------

class MessageCreate(BaseModel):
    sender_id: int
    content: str


class MessageResponse(BaseModel):
    id: int
    match_id: int
    sender_id: int
    content: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}
