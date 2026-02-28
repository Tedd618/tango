# Database Schema

PostgreSQL via Docker. ORM: SQLAlchemy. Migrations: Alembic.

---

## Tables

### `users`
Core table for both recruiters and applicants.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `email` | string | Unique, used for Auth0 |
| `name` | string | |
| `role` | enum | `recruiter` or `applicant` |
| `gender` | string | Optional |
| `location` | string | Optional |
| `nationality` | string | Optional |
| `industry` | string | Area of industry |
| `salary_min` | int | Optional |
| `salary_max` | int | Optional |
| `previous_occupation` | string | Optional |
| `education` | string | Optional |
| `is_premium` | bool | Premium account flag |
| `resume_url` | string | Link to uploaded PDF |
| `created_at` | datetime | |

---

### `prompt_templates`
Preset prompts written by devs. Users answer these on their profile.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `type` | enum | `poll` or `question` |
| `text` | string | The prompt text |
| `options` | text | JSON array of choices (polls only) |

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
A user's profile photos.

| Column | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `user_id` | int | FK → users |
| `url` | string | Hosted image URL |
| `caption` | string | Optional |
| `order` | int | Display order |
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
