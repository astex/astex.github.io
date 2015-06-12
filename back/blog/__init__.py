from flask import Flask
from flask.ext.cors import CORS


def create_app(config):
    app = Flask(__name__)
    app.config.from_pyfile(config)

    CORS(
        app,
        origins=[
            'http://127.0.0.1:5994',
            'http://living-with-django.astex.io'
        ],
        supports_credentials=True
    )

    from blog.lib.database import db
    db.init_app(app)

    from blog import views
    views.register(app)

    with app.app_context():
        db.create_all()

    return app
