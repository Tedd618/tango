import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User, Match, Message, Swipe, Photo, UserPrompt, Like

db = SessionLocal()

print("Deleting all user data...")

db.query(Message).delete()
db.query(Match).delete()
db.query(Swipe).delete()
db.commit()

users = db.query(User).all()
num = len(users)
for user in users:
    db.delete(user)
    
db.commit()

print(f"Successfully deleted {num} users and all associated data.")
