from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/tango"
    APP_NAME: str = "Tango"
    DEBUG: bool = True

    model_config = {"env_file": ".env"}


settings = Settings()
