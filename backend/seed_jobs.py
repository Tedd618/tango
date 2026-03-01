import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User, UserRole

db = SessionLocal()

jobs = [
    {
        "name": "Alex Recruiter",
        "email": "alex.hr@techcorp.com",
        "company_name": "TechCorp",
        "job_title": "Senior Frontend Engineer",
        "job_description": "We are looking for an expert React developer to lead our frontend team. Must have 5+ years of experience with Next.js and Tailwind.",
        "industry": "Software",
        "location": "San Francisco",
        "nationality": "US",
        "salary_min": 120000,
        "salary_max": 180000,
        "gender": "Any"
    },
    {
        "name": "Sarah Talent",
        "email": "sarah@fintech.io",
        "company_name": "Fintech.io",
        "job_title": "Backend Python Developer",
        "job_description": "Building the next generation of financial APIs using FastAPI and PostgreSQL. Great benefits and remote work.",
        "industry": "Finance",
        "location": "Remote",
        "nationality": "Any",
        "salary_min": 100000,
        "salary_max": 150000,
        "gender": "Any"
    },
    {
        "name": "Mike Hiring",
        "email": "mike.hr@biohealth.org",
        "company_name": "BioHealth",
        "job_title": "Data Scientist",
        "job_description": "Join our AI research team to process and analyze massive healthcare datasets.",
        "industry": "Healthcare",
        "location": "Boston",
        "nationality": "US",
        "salary_min": 110000,
        "salary_max": 160000,
        "gender": "Any"
    },
    {
        "name": "Emily Staffing",
        "email": "emily.hr@globalecom.net",
        "company_name": "GlobalEcom",
        "job_title": "Product Designer (UX/UI)",
        "job_description": "Seeking a creative designer to revamp our global e-commerce checkout experience.",
        "industry": "E-commerce",
        "location": "London",
        "nationality": "UK",
        "salary_min": 80000,
        "salary_max": 110000,
        "gender": "Any"
    },
    {
        "name": "David ATS",
        "email": "david@cloudnet.co",
        "company_name": "CloudNet",
        "job_title": "DevOps Engineer",
        "job_description": "Maintain and scale our AWS infrastructure. Kubernetes and Terraform experience required.",
        "industry": "Software",
        "location": "Seattle",
        "nationality": "US",
        "salary_min": 130000,
        "salary_max": 190000,
        "gender": "Any"
    },
    {
        "name": "Chloe Talent",
        "email": "chloe@edutech.kr",
        "company_name": "EduTech Korea",
        "job_title": "iOS Developer",
        "job_description": "Develop our flagship educational apps reaching millions of students globally.",
        "industry": "Education",
        "location": "Seoul",
        "nationality": "South Korea",
        "salary_min": 70000,
        "salary_max": 100000,
        "gender": "Any"
    },
    {
        "name": "Sam HR",
        "email": "sam.hr@startuphub.co",
        "company_name": "StartupHub",
        "job_title": "Full Stack Engineer",
        "job_description": "Early stage startup looking for a hacker who can do it all. Equity available.",
        "industry": "Software",
        "location": "New York",
        "nationality": "US",
        "salary_min": 90000,
        "salary_max": 140000,
        "gender": "Any"
    },
    {
        "name": "Lisa Corp",
        "email": "lisa@megabank.com",
        "company_name": "MegaBank",
        "job_title": "Cybersecurity Analyst",
        "job_description": "Protecting millions of transactions daily across global networks.",
        "industry": "Finance",
        "location": "New York",
        "nationality": "US",
        "salary_min": 105000,
        "salary_max": 165000,
        "gender": "Any"
    },
    {
        "name": "Kevin Robot",
        "email": "kevin@autorobotics.jp",
        "company_name": "AutoRobotics",
        "job_title": "Robotics Engineer",
        "job_description": "Writing control algorithms for our autonomous delivery drones.",
        "industry": "Manufacturing",
        "location": "Tokyo",
        "nationality": "Japan",
        "salary_min": 85000,
        "salary_max": 130000,
        "gender": "Any"
    },
    {
        "name": "Anna Green",
        "email": "anna@greenenergy.earth",
        "company_name": "GreenEnergy",
        "job_title": "Data Engineer",
        "job_description": "Building pipelines for smart grid analytics.",
        "industry": "Energy",
        "location": "Berlin",
        "nationality": "Germany",
        "salary_min": 90000,
        "salary_max": 120000,
        "gender": "Any"
    },
    {
        "name": "James Screen",
        "email": "james@hollywoodfx.com",
        "company_name": "HollywoodFX",
        "job_title": "C++ Graphics Programmer",
        "job_description": "Create stunning visual effects tools used in blockbuster movies.",
        "industry": "Entertainment",
        "location": "Los Angeles",
        "nationality": "US",
        "salary_min": 140000,
        "salary_max": 200000,
        "gender": "Any"
    }
]

created = 0
for job in jobs:
    # Check if exists
    existing = db.query(User).filter(User.email == job["email"]).first()
    if existing:
        print(f"Skipping {job['company_name']} - already exists")
        continue

    user = User(
        name=job["name"],
        email=job["email"],
        role=UserRole.RECRUITER,
        company_name=job["company_name"],
        job_title=job["job_title"],
        job_description=job["job_description"],
        industry=job["industry"],
        location=job["location"],
        nationality=job["nationality"],
        salary_min=job["salary_min"],
        salary_max=job["salary_max"],
        gender=job["gender"]
    )
    db.add(user)
    created += 1

db.commit()
print(f"Successfully created {created} recruiter seed profiles.")
