Regardless of the framework you use, it can be very useful to have some obvious global place where you can define model methods.  In django's case, it's easy enough to write your own base model class and use that:

`lib.model`

```python
from django.db import models


class BaseModel(models.Model):
    class Meta:
        abstract = True

    def __unicode__(self):
        return '<{} (id={})>'.format(self.__class__.__name__, self.id)

    def get_dictionary(self):
        """A JSON-serializable representation of the model."""
        d = {}
        if field in self._meta.fields:
            value = field.value_from_object(self)

            if isinstance(value, (datetime, date, time)):
                value = value.isoformat()
            elif isinstance(value, FieldFile):
                value = value.url
            # Any crazy field serialization can happen here.

            d[field.name] = value

        return d
```

This gives us a thin wrapper around django's normal json serialization, but, more importantly, gives us an obvious place to override that serialization.  For example, we could easily pop password from a user model's `get_dictionary()` like so:

```python
...

class User(BaseModel):
    password = models.CharField()

    def get_dictionary(self):
        d = super(User, self).get_dictionary()
        d.pop('password')
        return d
```
