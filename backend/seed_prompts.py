"""
Seed prompt templates into the database.
Run from the backend/ directory:
    PYTHONPATH=. python seed_prompts.py
"""
from app.database import SessionLocal
from app.models import PromptTemplate, PromptType

TEMPLATES = [
    # --- Questions ---
    {"type": PromptType.QUESTION, "text": "I'm best at...", "options": None},
    {"type": PromptType.QUESTION, "text": "My dream project is...", "options": None},
    {"type": PromptType.QUESTION, "text": "The work environment I thrive in...", "options": None},
    {"type": PromptType.QUESTION, "text": "Something I'm proud of building...", "options": None},
    {"type": PromptType.QUESTION, "text": "I'm looking for a role where...", "options": None},
    {"type": PromptType.QUESTION, "text": "Outside of work you'll find me...", "options": None},
    {"type": PromptType.QUESTION, "text": "My superpower is...", "options": None},
    {"type": PromptType.QUESTION, "text": "I learn best by...", "options": None},

    # --- Polls ---
    {"type": PromptType.POLL, "text": "What matters most in a team?", "options": None},
    {"type": PromptType.POLL, "text": "My ideal work setup is...", "options": None},
    {"type": PromptType.POLL, "text": "I work best...", "options": None},
    {"type": PromptType.POLL, "text": "When starting a new project I...", "options": None},
]


def seed():
    db = SessionLocal()
    try:
        existing = db.query(PromptTemplate).count()
        if existing:
            print(f"Already have {existing} templates — skipping seed.")
            return

        for t in TEMPLATES:
            db.add(PromptTemplate(**t))
        db.commit()
        print(f"Seeded {len(TEMPLATES)} prompt templates.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
