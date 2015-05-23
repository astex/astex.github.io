The request in Django is used everywhere.  You need it to render templates.  You need it to tell who's logged in.  You need it to retrieve request parameters and post data.  It can quickly become confusing to pass the object back and forth to anything that needs it.  It's simpler to provide a global dictionary of requests and access the relevant request via a global function.  You can do this with a service handler:

```python
from threading import current_thread


_requests = {}


def get_request():
    return _requests[current_thread()]


class GlobalRequestMiddleware(object):
    def process_request(self, request):
        _requests[current_thread()] = request
```

Easy.  Now we can just import `get_request` and call it wherever we need the request.
