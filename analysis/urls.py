from django.conf.urls import patterns, url

urlpatterns = patterns('analysis.views',
    # url(r'^$', 'school.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'index/', 'index', name='analytics'),
    url(r'^sms/$', 'sms'),
)
