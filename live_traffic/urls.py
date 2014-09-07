from django.conf.urls import url, include
from rest_framework import routers
from api import views
from api import urls as api_urls
from analysis import urls as analytics

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'captures', views.CaptureViewSet)

# Let's first wire up our API using automatic URL routing.
# Then add our specific urls from app api
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api', include(api_urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^analytics/', include(analytics)),
]
