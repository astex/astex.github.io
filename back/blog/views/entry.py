from blog.models.entry import Entry
from blog.views.base import RestView


class EntryView(RestView):
    Model = Entry
