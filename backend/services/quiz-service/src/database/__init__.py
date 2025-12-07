# backend/services/quiz-service/src/database/__init__.py
from .db import connect_db, get_db, close_db

__all__ = ['connect_db', 'get_db', 'close_db']
