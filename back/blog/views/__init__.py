from blog.views import entry, user


def register(app):
    entry.EntryView.register(app)
    user.UserView.register(app)
