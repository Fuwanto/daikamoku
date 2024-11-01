from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        if request.path == "/login/" and request.method == "POST":
            return None
        return super().authenticate(request)
