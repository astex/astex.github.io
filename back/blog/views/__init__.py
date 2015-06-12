from blog.views import entry


def register(app):
    entry.EntryView.register(app)
