# Tango

A swipe-based matching app connecting job applicants with recruiters — think Hinge meets LinkedIn.

## Tech Stack

- **Frontend**: Next.js 16 (TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic
- **Authentication**: Auth0 (via `@auth0/nextjs-auth0`)

## Features

- **Role-based onboarding**: New users select their role (Applicant or Recruiter) on first sign-in
- **Role-specific profiles**: Applicants and recruiters see and edit different fields
- **Profile photos**: Upload and display profile photos stored via FastAPI static files
- **Written prompts**: Hinge-style Q&A cards, filtered by role (applicants/recruiters get different questions)
- **Job descriptions**: Recruiters can add a freeform job description to their profile
- **Swipe & match**: Like/pass on profiles; mutual likes create a match
- **Messaging**: Chat between matched users

## Project Structure

```
tango/
├── frontend/               # Next.js TypeScript app
│   └── src/
│       ├── app/            # App Router pages
│       │   ├── discover/   # Swipe / discover page
│       │   ├── matches/    # Matches & messaging
│       │   ├── profile/    # Profile view & edit
│       │   └── onboarding/ # Role selection on first sign-in
│       ├── components/     # Shared UI components
│       └── lib/            # API helpers, auth0 client
├── backend/                # FastAPI application
│   ├── app/
│   │   ├── main.py         # FastAPI entrypoint
│   │   ├── models.py       # SQLAlchemy models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── database.py     # DB session setup
│   │   ├── config.py       # App settings
│   │   └── routers/        # API route handlers
│   ├── alembic/            # Database migrations
│   ├── static/uploads/     # Uploaded profile photos
│   └── seed_prompts.py     # Script to seed prompt templates
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- Docker (for PostgreSQL)
- An Auth0 account

---

### Backend Setup

#### 1. Start PostgreSQL with Docker

```bash
docker run --name tango-db \
  -e POSTGRES_USER=<user> \
  -e POSTGRES_PASSWORD=<password> \
  -e POSTGRES_DB=tango \
  -p 5432:5432 \
  -d postgres
```

Replace `<user>` and `<password>` with your own values.

#### 2. Configure environment

Create `backend/.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/tango
APP_NAME=Tango
DEBUG=True
```

#### 3. Create a virtual environment and install dependencies

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

#### 4. Run migrations

```bash
PYTHONPATH=. .venv/bin/alembic upgrade head
```

#### 5. Seed prompt templates

```bash
PYTHONPATH=. .venv/bin/python seed_prompts.py
```

This populates the database with default applicant and recruiter prompt questions.

#### 6. Start the API server

```bash
PYTHONPATH=. .venv/bin/uvicorn app.main:app --reload --port 8000
```

API available at http://localhost:8000  
Interactive docs at http://localhost:8000/docs

---

#### Returning to the project

The Docker container persists — just start it and run the server:

```bash
docker start tango-db
cd backend
PYTHONPATH=. .venv/bin/uvicorn app.main:app --reload --port 8000
```

#### Useful Docker commands

```bash
docker ps                  # check if tango-db is running
docker stop tango-db       # stop the container
docker start tango-db      # start it again
docker logs tango-db       # view postgres logs
```

---

### Frontend Setup

#### 1. Configure environment

Create `frontend/.env.local`:

```env
AUTH0_SECRET=<a long random string>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://<your-auth0-domain>
AUTH0_CLIENT_ID=<your-auth0-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-client-secret>
```

You can generate `AUTH0_SECRET` with:
```bash
openssl rand -hex 32
```

#### 2. Install and run

```bash
cd frontend
npm install
npm run dev
```

App available at http://localhost:3000

---

## API Endpoints

### Users

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/users/` | Create a user with a role |
| GET | `/api/users/` | List all users |
| GET | `/api/users/by-email?email=` | Get user by email |
| GET | `/api/users/{id}` | Get user with full profile |
| PUT | `/api/users/{id}/profile` | Update user profile |
| POST | `/api/users/{id}/upload-photo` | Upload a profile photo |

### Matching

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/matches/{id}/swipe` | Swipe on a user (like/pass) |
| GET | `/api/matches/{id}/matches` | Get user's matches |
| GET | `/api/matches/{id}/candidates` | Get swipe candidates |

### Prompts

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/prompts/templates?role=applicant` | Get prompt templates (filter by role) |
| POST | `/api/prompts/templates` | Create a prompt template |
| POST | `/api/prompts/{user_id}` | Add a prompt answer to a user |
| DELETE | `/api/prompts/{user_id}/{prompt_id}` | Remove a prompt answer |

### Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
