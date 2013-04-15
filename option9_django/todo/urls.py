from django.conf.urls import patterns, include, url
from .views import TodoView


urlpatterns = patterns('',
    url(r'^$', TodoView.as_view()),
    url(r'^/(?P<todo_id>[0-9]+)/?$', TodoView.as_view()),
) 
