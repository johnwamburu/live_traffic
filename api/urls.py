from django.conf.urls import patterns, url

urlpatterns = patterns(
    'api.views',
    url(r'captures/', 'capture_list', name='all_captures'),
    url(r'captures/(?P<pk>[0-9]+)$', 'capture_detail', name='capture_detail'),
)
