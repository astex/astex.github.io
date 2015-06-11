Like many of Django's models, the `ImageFileField` is built around using a very thin layer between the rendered html and the `Form` object.  In this case, the image file maps directly to an HTML file input (and thus `multipart/form-data`).  This breaks with our general theme of a JSONic API and can be difficult to use from non-web interfaces.  It's possible to just use a `CharField` and handle the upload manually, but there's a more elegant solution.

First, let's create our own memory file class so we don't have to depend on the file actually having a destination at the time it's read into memory:

`lib.file`

```python
from django.core.files.uploadedfile import UploadedFile

class MemoryFile(UploadedFile):
    def open(self, *args, **kargs):
        self.file.seek(0)

    def chunks(self, *args, **kargs):
        self.file.seek(0)
        yield self.read()

    def multiple_chunks(self, *args, **kargs):
        return False
```

Now we can write a field that wraps our upload:

`lib.field`

```python
import cStringIO, mimetypes, os, uuid, base64
from django import forms
from lib.file import MemoryFile


class ImageInput(forms.FileInput):
    def value_from_datadict(self, data, files, name):
        return data.get(name, None)


class ImageFormField(forms.ImageField):
    widget = ImageInput

    def to_python(self, data):
        s = data.split(';base64,')
        mimetype = s[0][5:]
        try:
            stream = cStringIO.StringIO(base64.b64decode(s[1]))
            stream.seek(0, os.SEEK_END)
            size = stream.tell()
            stream.seek(0)
        except IndexError:
            raise ValidationError('Base64 decoding failed.')

        # Validation errors relating to size or file type should go here.

        extension = mimetypes.guess_extension(mimetype, False)
        f = MemoryFile(
            stream,
            str(uuid.uuid4()) + extension,
            mimetype,
            size
        )
        return super(ImageFormField, self).to_python(f)

    def save_form_data(self, instance, data):
        if data is not None:
            previous = getattr(instance, self.name)

            if not data:
                return setattr(instance, self.name, '')

            file_path = self.upload_to + data.file.name
            with open(file_path, 'wb+') as destination:
                for chunk in data.file.chunks():
                    destination.write(chunk)

            try:
                delete(previous)
                os.unlink(previous.path) # Fallback should delete() fail.
            except:
                pass

            setattr(instance, self.name, file_path)


class ImageField(models.ImageField):
    """An image field that is set from a base64 string."""
    def formfield(self, **kargs):
        d = {'form_class': ImageFormField}
        d.update(kargs)
        return super(ImageField, self).formfield(**d)
```

Now the the model form relating to images will correctly validate a base64 string.  Our admin widget is just a text input with the url.
