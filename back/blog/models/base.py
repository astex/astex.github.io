from sqlalchemy.ext.declarative import declared_attr
from blog.lib.database import db


class ModelMixin(object):
    """A base mixin for all models."""

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    def __str__(self):
        return '<{} (id={})>'.format(self.__class__.__name__, self.id_)

    def __repr__(self):
        return str(self)

    id_ = db.Column('id', db.Integer, primary_key=True)

    def get_dictionary(self):
        d = {}
        for column in self.__table__.columns:
            key = 'id_' if column.key == 'id' else column.key
            d[key] = getattr(self, key)
        return d

    def update(self, d):
        for column in self.__table__.columns:
            if column.key == 'id_':
                continue
            setattr(
                self, column.key, d.get(
                    column.key, getattr(self, column.key)
                )
            )
