from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import PromptTemplate
from app.database import SessionLocal

def seed():
    db = SessionLocal()
    # Set all existing templates to 'applicant'
    existing = db.query(PromptTemplate).filter(PromptTemplate.target_role == 'both').all()
    for p in existing:
        p.target_role = 'applicant'
    db.commit()

    recruiter_prompts = [
        "The ideal candidate for this role has...",
        "A typical day in our engineering team involves...",
        "One project you'll be working on right away is...",
        "The most important quality we are looking for is...",
        "Our team culture can best be described as...",
        "My best piece of advice for the interview process is..."
    ]

    for text in recruiter_prompts:
        if not db.query(PromptTemplate).filter_by(text=text, target_role="recruiter").first():
            db.add(PromptTemplate(type="question", text=text, target_role="recruiter"))

    db.commit()
    print("Seed complete")
    db.close()

if __name__ == "__main__":
    seed()
