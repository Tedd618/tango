import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User, UserRole, Swipe, SwipeAction

def auto_like_everyone():
    db = SessionLocal()
    
    recruiters = db.query(User).filter(User.role == UserRole.RECRUITER).all()
    applicants = db.query(User).filter(User.role == UserRole.APPLICANT).all()
    
    if not recruiters or not applicants:
        print("Need both recruiters and applicants in the DB.")
        return

    swipes_added = 0
    
    for recruiter in recruiters:
        for applicant in applicants:
            existing_swipe = db.query(Swipe).filter(
                Swipe.swiper_id == applicant.id,
                Swipe.target_id == recruiter.id
            ).first()

            if not existing_swipe:
                db.add(Swipe(
                    swiper_id=applicant.id,
                    target_id=recruiter.id,
                    action=SwipeAction.LIKE
                ))
                swipes_added += 1

    db.commit()
    print(f"Success! {swipes_added} new LIKE swipes added from Applicants to Recruiters.")

if __name__ == "__main__":
    auto_like_everyone()
