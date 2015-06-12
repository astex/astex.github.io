from blog.models.user import User
from blog.views.base import RestView


class UserView(RestView):
    Model = User
