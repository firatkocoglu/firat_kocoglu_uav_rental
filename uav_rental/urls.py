from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt

import posixpath
from pathlib import Path

from django.utils._os import safe_join
from django.views.static import serve as static_serve


@csrf_exempt
def serve_react(request, path, document_root=None):
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)
    
urlpatterns =( [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('api/', include('rental.urls')),
    re_path(
            r"^(?P<path>.*)$",
            serve_react,
            {"document_root": settings.REACT_APP_BUILD_PATH},
        ),
]  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
)
