from blog.lib.database import db
from blog.models.base import ModelMixin


class Entry(ModelMixin, db.Model):
    slug = db.Column(
        db.Unicode(length=255), nullable=False, unique=True, index=True
    )
    title = db.Column(db.Unicode(length=255), nullable=False)
    created = db.Column(db.DateTime, default=db.func.now())
    parser = db.Column(db.Unicode(length=255), nullable=False)
    src = db.Column(db.UnicodeText, nullable=False)
