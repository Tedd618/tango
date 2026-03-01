import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User, Match, Message, Swipe, Photo, UserPrompt, Like

db = SessionLocal()

print("Deleting all user data...")

# Because of cascade deletes configured on the User model,
# deleting all users will also automatically delete all associated:
# - Photos
# - Swipes
# - Matches
# - Messages
# - UserPrompts
users = db.query(User).all()
num = len(users)
for user in users:
    db.delete(user)
    
db.commit()

print(f"Successfully deleted {num} users and all associated data.")
