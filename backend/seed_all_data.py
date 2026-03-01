import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import User, UserRole, Photo

db = SessionLocal()

print("Seeding 15 Recruiters and 15 Applicants...")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    with open(os.path.join(SCRIPT_DIR, "seed_images", "applicant_photo.jpg"), "rb") as f:
        applicant_photo_bytes = f.read()
    with open(os.path.join(SCRIPT_DIR, "seed_images", "recruiter_photo.png"), "rb") as f:
        recruiter_photo_bytes = f.read()
except FileNotFoundError:
    print("Warning: Could not find seed_images/. Photos will not be attached.")
    applicant_photo_bytes = None
    recruiter_photo_bytes = None

recruiters = [
    {
        "name": "Alex Mercer",
        "email": "alex.mercer@techcorp.com",
        "company_name": "TechCorp Solutions",
        "job_title": "Senior Frontend Engineer",
        "job_description": "We are looking for an expert React developer to lead our core product's frontend team. You must have 5+ years of experience with Next.js, Tailwind, and a strong eye for UI/UX design.",
        "industry": "Software",
        "location": "San Francisco, CA",
        "nationality": "USA",
        "salary_min": 130000,
        "salary_max": 180000,
        "gender": "Any"
    },
    {
        "name": "Sarah Jenkins",
        "email": "s.jenkins@fintechio.net",
        "company_name": "Fintech.io",
        "job_title": "Backend Python Developer",
        "job_description": "Building the next generation of financial APIs using FastAPI, Redis, and PostgreSQL. We offer great benefits, remote work flexibility, and a fast-paced environment.",
        "industry": "Finance",
        "location": "Remote",
        "nationality": "Any",
        "salary_min": 110000,
        "salary_max": 160000,
        "gender": "Any"
    },
    {
        "name": "Michael Chen",
        "email": "mchen@biohealth.org",
        "company_name": "BioHealth Innovators",
        "job_title": "Lead Data Scientist",
        "job_description": "Join our world-class AI research team to process and analyze massive healthcare datasets. Experience with PyTorch, TensorFlow, and genomic data is highly preferred.",
        "industry": "Healthcare",
        "location": "Boston, MA",
        "nationality": "USA",
        "salary_min": 140000,
        "salary_max": 200000,
        "gender": "Any"
    },
    {
        "name": "Emily Watson",
        "email": "ewatson@globalecom.co",
        "company_name": "GlobalEcom",
        "job_title": "Product Designer (UX/UI)",
        "job_description": "Seeking a creative and data-driven product designer to revamp our global e-commerce checkout experience. Must have a strong Figma portfolio and experience with A/B testing.",
        "industry": "E-commerce",
        "location": "London, UK",
        "nationality": "UK",
        "salary_min": 85000,
        "salary_max": 120000,
        "gender": "Any"
    },
    {
        "name": "David Park",
        "email": "dpark@cloudnet.io",
        "company_name": "CloudNet Systems",
        "job_title": "DevOps / Infrastructure Engineer",
        "job_description": "Maintain and scale our AWS cloud infrastructure. Kubernetes, Terraform, and CI/CD pipeline experience is strictly required for this role.",
        "industry": "Software",
        "location": "Seattle, WA",
        "nationality": "USA",
        "salary_min": 135000,
        "salary_max": 190000,
        "gender": "Any"
    },
    {
        "name": "Chloe Kim",
        "email": "ckim@edutech.kr",
        "company_name": "EduTech Korea",
        "job_title": "Senior iOS Developer",
        "job_description": "Develop our flagship educational apps reaching millions of students globally. Swift, SwiftUI, and App Store deployment experience required.",
        "industry": "Education",
        "location": "Seoul, South Korea",
        "nationality": "South Korea",
        "salary_min": 75000,
        "salary_max": 110000,
        "gender": "Any"
    },
    {
        "name": "Samuel Torres",
        "email": "samuel.torres@startuphub.co",
        "company_name": "StartupHub",
        "job_title": "Full Stack Engineer (Founding Team)",
        "job_description": "Early-stage startup looking for a hacker who can do it all. Node.js backend, React frontend. High equity available for the right candidate.",
        "industry": "Software",
        "location": "New York, NY",
        "nationality": "USA",
        "salary_min": 90000,
        "salary_max": 140000,
        "gender": "Any"
    },
    {
        "name": "Lisa Vance",
        "email": "lvance@megabank.com",
        "company_name": "MegaBank Corp",
        "job_title": "Cybersecurity Analyst",
        "job_description": "Protecting millions of transactions daily across global networks. Experience with penetration testing, threat modeling, and SOC compliance needed.",
        "industry": "Finance",
        "location": "New York, NY",
        "nationality": "USA",
        "salary_min": 110000,
        "salary_max": 170000,
        "gender": "Any"
    },
    {
        "name": "Kenji Sato",
        "email": "ksato@autorobotics.jp",
        "company_name": "AutoRobotics Japan",
        "job_title": "Robotics Control Engineer",
        "job_description": "Writing C++ control algorithms for our new line of autonomous delivery drones. Experience with ROS and computer vision is a huge plus.",
        "industry": "Manufacturing",
        "location": "Tokyo, Japan",
        "nationality": "Japan",
        "salary_min": 90000,
        "salary_max": 140000,
        "gender": "Any"
    },
    {
        "name": "Anna Mueller",
        "email": "anna.mueller@greenenergy.earth",
        "company_name": "GreenEnergy Europe",
        "job_title": "Data Engineer",
        "job_description": "Building massive data pipelines for smart grid analytics using Apache Spark, Kafka, and Snowflake.",
        "industry": "Energy",
        "location": "Berlin, Germany",
        "nationality": "Germany",
        "salary_min": 95000,
        "salary_max": 130000,
        "gender": "Any"
    },
    {
        "name": "James O'Connor",
        "email": "j.oconnor@hollywoodfx.com",
        "company_name": "HollywoodFX Studios",
        "job_title": "C++ Graphics Programmer",
        "job_description": "Create stunning visual effects tools used in blockbuster movies. OpenGL, Vulkan, or DirectX experience is mandatory.",
        "industry": "Entertainment",
        "location": "Los Angeles, CA",
        "nationality": "USA",
        "salary_min": 140000,
        "salary_max": 200000,
        "gender": "Any"
    },
    {
        "name": "Maria Garcia",
        "email": "mgarcia@b2bconsult.com",
        "company_name": "Elevate Consulting",
        "job_title": "Management Consultant",
        "job_description": "Advise Fortune 500 companies on digital transformation strategies. Requires severe travel and an MBA.",
        "industry": "Consulting",
        "location": "Chicago, IL",
        "nationality": "USA",
        "salary_min": 120000,
        "salary_max": 160000,
        "gender": "Any"
    },
    {
        "name": "Liam Smith",
        "email": "lsmith@canadalogistics.ca",
        "company_name": "NorthStar Logistics",
        "job_title": "Supply Chain Analyst",
        "job_description": "Optimize freight routes across North America. SQL and Tableau mastery required.",
        "industry": "Logistics",
        "location": "Toronto, Canada",
        "nationality": "Canada",
        "salary_min": 75000,
        "salary_max": 105000,
        "gender": "Any"
    },
    {
        "name": "Wei Lin",
        "email": "wlin@asiatech.sg",
        "company_name": "AsiaTech Network",
        "job_title": "Mobile Tech Lead",
        "job_description": "Leading a team of 15 Android and iOS developers to build a super-app. 8+ years experience required.",
        "industry": "Software",
        "location": "Singapore",
        "nationality": "Singapore",
        "salary_min": 150000,
        "salary_max": 220000,
        "gender": "Any"
    },
    {
        "name": "Olivia Brown",
        "email": "obrown@aeratech.com",
        "company_name": "Aera Aerospace",
        "job_title": "Aerospace Systems Engineer",
        "job_description": "Design and test propulsion control sub-systems for low-earth orbit satellites.",
        "industry": "Aerospace",
        "location": "Austin, TX",
        "nationality": "USA",
        "salary_min": 115000,
        "salary_max": 165000,
        "gender": "Any"
    }
]

applicants = [
    {
        "name": "Jane Doe",
        "email": "jane.doe@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Software",
        "location": "San Francisco, CA",
        "nationality": "USA",
        "salary_min": 120000,
        "salary_max": 160000,
        "previous_occupation": "Frontend Web Developer at Webify",
        "education": "B.S. Computer Science, UC Berkeley",
        "gender": "Female",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "John Smith",
        "email": "john.smith99@yahoo.com",
        "role": UserRole.APPLICANT,
        "industry": "Finance",
        "location": "New York, NY",
        "nationality": "USA",
        "salary_min": 110000,
        "salary_max": 150000,
        "previous_occupation": "Financial Analyst at WallSt Inc",
        "education": "M.S. Finance, NYU Stern",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Elena Rodriguez",
        "email": "elena.r@hotmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Software",
        "location": "Remote",
        "nationality": "Spain",
        "salary_min": 100000,
        "salary_max": 140000,
        "previous_occupation": "Backend Engineer at SaaS Co",
        "education": "B.S. Software Engineering, Polytechnic University of Madrid",
        "gender": "Female",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Marcus Johnson",
        "email": "marcus.j.data@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Healthcare",
        "location": "Boston, MA",
        "nationality": "USA",
        "salary_min": 130000,
        "salary_max": 180000,
        "previous_occupation": "Data Analyst at HealthPlus",
        "education": "M.S. Data Science, MIT",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Sophia Lee",
        "email": "sophia.design@icloud.com",
        "role": UserRole.APPLICANT,
        "industry": "E-commerce",
        "location": "London, UK",
        "nationality": "UK",
        "salary_min": 80000,
        "salary_max": 110000,
        "previous_occupation": "UI Designer at ShopStart",
        "education": "B.A. Graphic Design, Central Saint Martins",
        "gender": "Female",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Mohammed Ali",
        "email": "m.ali.devops@protonmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Software",
        "location": "Seattle, WA",
        "nationality": "Canada",
        "salary_min": 140000,
        "salary_max": 190000,
        "previous_occupation": "Cloud Systems Engineer at DataWiz",
        "education": "B.S. Computer Engineering, University of Waterloo",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Ji-Hoon Park",
        "email": "jihoon.ios@naver.com",
        "role": UserRole.APPLICANT,
        "industry": "Education",
        "location": "Seoul, South Korea",
        "nationality": "South Korea",
        "salary_min": 70000,
        "salary_max": 100000,
        "previous_occupation": "Mobile Developer at AppCrafters",
        "education": "B.S. Computer Science, Seoul National University",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Priya Patel",
        "email": "priya.frontend@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Software",
        "location": "New York, NY",
        "nationality": "USA",
        "salary_min": 95000,
        "salary_max": 130000,
        "previous_occupation": "Jr. React Developer at StartupX",
        "education": "Bootcamp Graduate, General Assembly",
        "gender": "Female",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Aiden Clarke",
        "email": "aclarke.cyber@securenet.org",
        "role": UserRole.APPLICANT,
        "industry": "Finance",
        "location": "Chicago, IL",
        "nationality": "USA",
        "salary_min": 100000,
        "salary_max": 145000,
        "previous_occupation": "IT Security Specialist",
        "education": "B.S. Information Security, DePaul University",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Yuki Tanaka",
        "email": "ytanaka.robotics@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Manufacturing",
        "location": "Tokyo, Japan",
        "nationality": "Japan",
        "salary_min": 80000,
        "salary_max": 120000,
        "previous_occupation": "Embedded Systems Engineer at RoboMakers",
        "education": "M.S. Robotics, University of Tokyo",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Lukas Wagner",
        "email": "lukas.w.data@outlook.de",
        "role": UserRole.APPLICANT,
        "industry": "Energy",
        "location": "Berlin, Germany",
        "nationality": "Germany",
        "salary_min": 90000,
        "salary_max": 125000,
        "previous_occupation": "Data Engineer at GridAnalytics",
        "education": "B.S. Informatics, Technical University of Munich",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Thomas Wright",
        "email": "tom.wright.gfx@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Entertainment",
        "location": "Los Angeles, CA",
        "nationality": "USA",
        "salary_min": 135000,
        "salary_max": 185000,
        "previous_occupation": "Engine Programmer at GameStudio",
        "education": "B.S. Computer Science, USC",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Isabella Rossi",
        "email": "isabella.consulting@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Consulting",
        "location": "Remote",
        "nationality": "Italy",
        "salary_min": 110000,
        "salary_max": 150000,
        "previous_occupation": "Strategy Analyst at Big4",
        "education": "MBA, INSEAD",
        "gender": "Female",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "David Kim",
        "email": "dkim.logistics@yahoo.ca",
        "role": UserRole.APPLICANT,
        "industry": "Logistics",
        "location": "Toronto, Canada",
        "nationality": "Canada",
        "salary_min": 70000,
        "salary_max": 95000,
        "previous_occupation": "Supply Chain Coordinator",
        "education": "B.B.A. Supply Chain Management, York University",
        "gender": "Male",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    },
    {
        "name": "Emma Wilson",
        "email": "emma.aero@gmail.com",
        "role": UserRole.APPLICANT,
        "industry": "Aerospace",
        "location": "Austin, TX",
        "nationality": "USA",
        "salary_min": 105000,
        "salary_max": 150000,
        "previous_occupation": "Mechanical Engineer at AeroDynamics",
        "education": "M.S. Aerospace Engineering, UT Austin",
        "gender": "Female",
        "resume_url": "https://ryanchui2.github.io/portfolio/assets/2026_Resume.pdf"
    }
]

created_recruiters = 0
for job in recruiters:
    existing = db.query(User).filter(User.email == job["email"]).first()
    if existing:
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
    db.commit()
    db.refresh(user)
    
    if recruiter_photo_bytes:
        photo = Photo(
            user_id=user.id,
            url="",
            order=0,
            image_data=recruiter_photo_bytes,
            content_type="image/png"
        )
        db.add(photo)
        db.commit()
        db.refresh(photo)
        photo.url = f"http://localhost:8000/api/users/photos/{photo.id}/image"
        db.commit()
        
    created_recruiters += 1

created_applicants = 0
for app in applicants:
    existing = db.query(User).filter(User.email == app["email"]).first()
    if existing:
        continue
    user = User(
        name=app["name"],
        email=app["email"],
        role=app["role"],
        industry=app["industry"],
        location=app["location"],
        nationality=app["nationality"],
        salary_min=app["salary_min"],
        salary_max=app["salary_max"],
        previous_occupation=app["previous_occupation"],
        education=app["education"],
        gender=app["gender"],
        resume_url=app["resume_url"]
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    if applicant_photo_bytes:
        photo = Photo(
            user_id=user.id,
            url="",
            order=0,
            image_data=applicant_photo_bytes,
            content_type="image/jpeg"
        )
        db.add(photo)
        db.commit()
        db.refresh(photo)
        photo.url = f"http://localhost:8000/api/users/photos/{photo.id}/image"
        db.commit()

    created_applicants += 1

print(f"Successfully created {created_recruiters} recruiter profiles.")
print(f"Successfully created {created_applicants} applicant profiles.")
