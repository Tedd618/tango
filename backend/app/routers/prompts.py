from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import PromptTemplate
from app.schemas import PromptTemplateCreate, PromptTemplateResponse

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.get("/templates", response_model=list[PromptTemplateResponse])
def list_templates(db: Session = Depends(get_db)):
    return db.query(PromptTemplate).all()


@router.post("/templates", response_model=PromptTemplateResponse, status_code=201)
def create_template(template: PromptTemplateCreate, db: Session = Depends(get_db)):
    db_template = PromptTemplate(**template.model_dump())
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template


@router.delete("/templates/{template_id}", status_code=204)
def delete_template(template_id: int, db: Session = Depends(get_db)):
    template = db.query(PromptTemplate).filter(PromptTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    db.delete(template)
    db.commit()
