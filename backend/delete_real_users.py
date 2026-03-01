import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User, Match, Message, Swipe

# These are the emails of the seeded mock users — they will NOT be deleted
SEED_EMAILS = {
    # Recruiters
    "alex.mercer@techcorp.com",
    "s.jenkins@fintechio.net",
    "mchen@biohealth.org",
    "ewatson@globalecom.co",
    "dpark@cloudnet.io",
    "ckim@edutech.kr",
    "samuel.torres@startuphub.co",
    "lvance@megabank.com",
    "ksato@autorobotics.jp",
    "anna.mueller@greenenergy.earth",
    "j.oconnor@hollywoodfx.com",
    "mgarcia@b2bconsult.com",
    "lsmith@canadalogistics.ca",
    "wlin@asiatech.sg",
    "obrown@aeratech.com",
    # Applicants
    "jane.doe@gmail.com",
    "john.smith99@yahoo.com",
    "elena.r@hotmail.com",
    "marcus.j.data@gmail.com",
    "sophia.design@icloud.com",
    "m.ali.devops@protonmail.com",
    "jihoon.ios@naver.com",
    "priya.frontend@gmail.com",
    "aclarke.cyber@securenet.org",
    "ytanaka.robotics@gmail.com",
    "lukas.w.data@outlook.de",
    "tom.wright.gfx@gmail.com",
    "isabella.consulting@gmail.com",
    "dkim.logistics@yahoo.ca",
    "emma.aero@gmail.com",
}

db = SessionLocal()

real_users = db.query(User).filter(User.email.notin_(SEED_EMAILS)).all()

if not real_users:
    print("No real (non-seed) users found. Nothing to delete.")
    db.close()
    sys.exit(0)

print(f"Found {len(real_users)} real user(s) to delete:")
for u in real_users:
    print(f"  - {u.name} ({u.email}) [{u.role}]")

# Delete their swipes and matches first to avoid FK violations
real_ids = [u.id for u in real_users]
db.query(Message).filter(
    Message.sender_id.in_(real_ids)
).delete(synchronize_session=False)
db.query(Match).filter(
    (Match.recruiter_id.in_(real_ids)) | (Match.applicant_id.in_(real_ids))
).delete(synchronize_session=False)
db.query(Swipe).filter(
    (Swipe.swiper_id.in_(real_ids)) | (Swipe.target_id.in_(real_ids))
).delete(synchronize_session=False)
db.commit()

for user in real_users:
    db.delete(user)
db.commit()

print(f"\nDone! Deleted {len(real_users)} real user(s). Seed users are untouched.")
db.close()
