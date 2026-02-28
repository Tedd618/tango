# Database Schema

PostgreSQL via Docker. ORM: SQLAlchemy. Migrations: Alembic.

---

## Tables

### `users`
Core table for both recruiters and applicants. Columns are role-specific — not all will be populated for every user.

| Column | Type | Role | Notes |
|---|---|---|---|
| `id` | int | Both | Primary key |
| `email` | string | Both | Unique, used for Auth0 login |
| `name` | string | Both | Display name |
| `role` | enum | Both | `recruiter` or `applicant` — set on onboarding |
| `industry` | string | Both | Area of work |
| `is_premium` | bool | Both | Premium account flag |
| `created_at` | datetime | Both | |
| `gender` | string | Applicant | Optional |
| `location` | string | Applicant | Optional |
| `nationality` | string | Applicant | Optional |
| `salary_min` | int | Applicant | Salary expectation lower bound |
| `salary_max` | int | Applicant | Salary expectation upper bound |
| `previous_occupation` | string | Applicant | Optional |
| `education` | string | Applicant | Optional |
| `resume_url` | string | Applicant | Link to resume/portfolio URL |
| `company_name` | string | Recruiter | Company the recruiter represents |
| `job_title` | string | Recruiter | Recruiter's job title |
| `job_description` | text | Recruiter | Freeform description of the role being hired for |

---

### `prompt_templates`
Preset prompts written by devs. Users answer these on their profile. Prompts are role-targeted.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `type` | enum | `poll` or `question` |
| `text` | string | The prompt text shown to the user |
| `target_role` | string | `applicant`, `recruiter`, or `both` |
| `options` | text | JSON array of choices (polls only) |

> Run `seed_prompts.py` to populate default applicant and recruiter questions.

---

### `user_prompts`
A user's answer to a prompt template.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `user_id` | int | FK → users |
| `template_id` | int | FK → prompt_templates |
| `answer` | text | Selected option (poll) or free text (question) |
| `created_at` | datetime | |

---

### `photos`
A user's profile photos. Currently max 1 photo per user (old ones are deleted on upload).

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `user_id` | int | FK → users |
| `url` | string | Absolute URL to static file (e.g. `http://localhost:8000/static/uploads/...`) |
| `caption` | string | Optional |
| `order` | int | Display order (`0` = main photo) |
| `created_at` | datetime | |

---

### `likes`
A like on a specific prompt or photo (not the whole profile).

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `user_id` | int | FK → users (who liked) |
| `prompt_id` | int | FK → user_prompts (nullable) |
| `photo_id` | int | FK → photos (nullable) |
| `created_at` | datetime | |

> One of `prompt_id` or `photo_id` must be set.

---

### `swipes`
A like or pass on an entire profile.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `swiper_id` | int | FK → users |
| `target_id` | int | FK → users |
| `action` | enum | `like` or `pass` |
| `created_at` | datetime | |

**Rules enforced in the API:**
- Recruiters can only swipe on applicants
- Applicants can only swipe on recruiters

---

### `matches`
Created when a recruiter and applicant have both liked each other.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `recruiter_id` | int | FK → users |
| `applicant_id` | int | FK → users |
| `created_at` | datetime | |

---

### `messages`
Chat messages between two matched users.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `match_id` | int | FK → matches |
| `sender_id` | int | FK → users |
| `content` | text | Message body |
| `created_at` | datetime | |

> Only users who are part of a match can send messages to each other.

---

## Relationships

```
users ──< photos
users ──< user_prompts >── prompt_templates
users ──< likes
users ──< swipes (as swiper or target)
users ──< matches (as recruiter or applicant)
matches ──< messages
```

---

## Running Migrations

```bash
# After changing models.py
PYTHONPATH=. .venv/bin/alembic revision --autogenerate -m "describe change"
PYTHONPATH=. .venv/bin/alembic upgrade head
```

## Seeding Prompt Templates

```bash
# Populates default applicant and recruiter questions
PYTHONPATH=. .venv/bin/python seed_prompts.py
```
