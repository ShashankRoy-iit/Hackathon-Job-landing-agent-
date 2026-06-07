from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Hackathon Job Landing Agent"
    environment: str = "development"
    database_url: str = "sqlite:///./app.db"
    redis_url: str = "redis://localhost:6379/0"


settings = Settings()
