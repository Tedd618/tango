# Tango

A swipe-based matching app connecting job applicants with recruiters — think Hinge meets LinkedIn.

## Tech Stack

- **Frontend**: Next.js (TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic

## Project Structure

```
tango/
├── frontend/          # Next.js TypeScript app
│   └── src/app/       # App Router pages
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── main.py        # FastAPI entrypoint
│   │   ├── models.py      # SQLAlchemy models
│   │   ├── schemas.py     # Pydantic schemas
│   │   ├── database.py    # DB session setup
│   │   ├── config.py      # App settings
│   │   └── routers/       # API route handlers
│   └── alembic/           # Database migrations
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- Docker (for PostgreSQL)

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

Use the same `<user>` and `<password>` from the Docker command above.

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

#### 5. Start the API server

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

```bash
cd frontend
npm install
npm run dev
```

App available at http://localhost:3000

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/users/` | Create a user |
| GET | `/api/users/` | List users |
| GET | `/api/users/{id}` | Get user with profile |
| PUT | `/api/users/{id}/profile` | Create/update profile |
| POST | `/api/matches/{id}/swipe` | Swipe on a user |
| GET | `/api/matches/{id}/matches` | Get user's matches |
| GET | `/api/matches/{id}/candidates` | Get swipe candidates |
