"""
Seed prompt templates into the database.
Run from the backend/ directory:
    PYTHONPATH=. python seed_prompts.py
"""
from app.database import SessionLocal
from app.models import PromptTemplate, PromptType

APPLICANT_TEMPLATES = [
    # --- Questions ---
    {"type": PromptType.QUESTION, "text": "I'm best at...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "My dream project is...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "The work environment I thrive in...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "Something I'm proud of building...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "I'm looking for a role where...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "Outside of work you'll find me...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "My superpower is...", "target_role": "applicant"},
    {"type": PromptType.QUESTION, "text": "I learn best by...", "target_role": "applicant"},
]

RECRUITER_TEMPLATES = [
    {"type": PromptType.QUESTION, "text": "The ideal candidate for this role has...", "target_role": "recruiter"},
    {"type": PromptType.QUESTION, "text": "A typical day in our engineering team involves...", "target_role": "recruiter"},
    {"type": PromptType.QUESTION, "text": "One project you'll be working on right away is...", "target_role": "recruiter"},
    {"type": PromptType.QUESTION, "text": "The most important quality we are looking for is...", "target_role": "recruiter"},
    {"type": PromptType.QUESTION, "text": "Our team culture can best be described as...", "target_role": "recruiter"},
    {"type": PromptType.QUESTION, "text": "My best piece of advice for the interview process is...", "target_role": "recruiter"},
]


def seed():
    db = SessionLocal()
    try:
        for template in APPLICANT_TEMPLATES + RECRUITER_TEMPLATES:
            exists = db.query(PromptTemplate).filter_by(
                text=template["text"],
                target_role=template["target_role"]
            ).first()
            if not exists:
                db.add(PromptTemplate(
                    type=template["type"],
                    text=template["text"],
                    target_role=template["target_role"],
                ))

        db.commit()
        print(f"Seed complete. Added up to {len(APPLICANT_TEMPLATES)} applicant + {len(RECRUITER_TEMPLATES)} recruiter prompts.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
