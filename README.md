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
- Python 3.11+
- PostgreSQL 14+

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create the database
createdb tango

# Run migrations
alembic upgrade head

# Start the API server
uvicorn app.main:app --reload --port 8000
```

API docs available at http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App available at http://localhost:3000

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