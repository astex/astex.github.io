A key aspect of RESTful APIs is always returning the requested data type.  This includes when things go wrong.  Django only provides HTML exceptions, which are pretty useless for APIs, so I've implemented my own.  Note that these depend on my python class utility [library](https://github.com/astex/python-classutils).

`lib.exception`

```python
import json
from django.core.serializers.json import DjangoJSONEncoder
from lib.classutils import instantiableclassproperty, instantiableclassmethod


class JSONError(Exception):
    default = "Something went wrong."
    code = 500

    def __init__(self, arg=None):
        """A JSONic exception class to be raised in API endpoints.

            Args:
                arg: A description of the error which is json-serializable.
        """
        if isinstance(arg, (str, unicode)):
            self._msg = arg
        elif arg is not None:
            self._dict = arg

    @instantiableclassproperty
    def as_dictionary(self):
        return getattr(self, '_dict', {})

    @instantiableclassproperty
    def message(self):
        return getattr(self, '_msg', self.default)

    @instantiableclassmethod
    def render(self, _):
        return {
            "errors": self.as_dictionary,
            "message": self.message
        }

    @instantiableclassmethod
    def get_response(self, request):
        return HttpResponse(
            json.dumps(self.render(request), cls=DjangoJSONEncoder, ensure_ascii=False),
            content_type='application/json',
            request=request,
            status=self.code
        )
```

This gives us a basic exception class that we can raise returning a JSON response.  Like most exceptions, it can either be raised directly `raise JSONError` or instantiated and raised `raise JsonError()`.  It can be instantiated with either a string or any JSON-serializable object.  But we'll need a few subclasses for this to be useful:

`lib.exception`

```python
...

class InputError(JSONError):
    default = 'Your request is wonky.'
    code = 400


class NotAuthorizedError(JSONError):
    default = 'Access denied.'
    code = 401


class NotFoundError(JSONError):
    default = 'This is not the page you are looking for.'
    code = 404


class NoMethodError(JSONError):
    default = 'That method is not defined on this endpoint.'
    code = 405


class ConflictError(JSONError):
    default = 'There is already a model like that.'
    code = 409


class ServerError(JSONError):
    pass
```

These are just a few examples, but any [status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) will work.
