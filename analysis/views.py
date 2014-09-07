from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.core.exceptions import ObjectDoesNotExist
import requests
from requests.auth import HTTPBasicAuth
import simplejson as json
from django_twilio.decorators import twilio_view
from twilio.twiml import Response

from live_traffic.settings import TWILIO_ACCOUNT_SID as _id
from live_traffic.settings import TWILIO_AUTH_TOKEN as _token

from analysis.models import *

def index(request):
    """
    Fetch response from api - will return the first page with the latest 10 items,
    which is what we want, and which is why api's are awsome - No need to slice querysets!!
    """
    captures = requests.get(url='http://www.riftinc.com/captures/', auth=HTTPBasicAuth('john.wamburu', 'john'))
    r = json.loads(captures.text)
    print r.get('results')
    batch = {'response':r.get('results')}
    return render_to_response('analysis/index.html', batch, context_instance=RequestContext(request))

@twilio_view
def sms(request):
    """
    Returns SMS of latest statistics collected, and saves them for future reference.
    """
    body = request.POST.get('Body', '')
    from_who = request.POST.get('From', '')
    try:
        Received(from_who=from_who, msg=body).save()
    except Exception as e:
        print e
    msg = 'Your request has been received and will be processed shortly.'
    r = Response()
    r.message(msg)
    try:
        Sent(to=from_who, msg=msg).save()
    except Exception as e:
        print e
    return r
