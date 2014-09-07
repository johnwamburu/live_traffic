"""
Trial One - sl4a on android for taking pictures
Take pictures every 2 seconds - should be enough to make valid conclusions
Use huge counter so we never run out of count - well, unless power runs out
In separate thread; read image, post to api, then delete - save space on device - THIS IS KEY
"""

import android
import time
import datetime

import requests
from requests.auth import HTTPBasicAuth

from threading import Thread
import os
import glob

droid = android.Android()
droid.wakeLockAcquireFull()
droid.wifiLockAcquireFull() 

'''def take_pictures():
    """counter = 0
    extention = ".jpg"
    while counter < 1000000:
        path = '/sdcard/traffic_images/_image%d' % counter
        path += extention
        droid.cameraCapturePicture(path, True)
        counter += 1
        #time.sleep(2)"""
    print 'john'

def upload_them():
    """counter0 = 0
    while counter0 < 1000000:
        print counter0
        counter0 += 1"""
    print 'mbari'

def delete_image(image):
    path = os.path.abspath(image)
    os.remove(path)

thread1 = Thread(target=take_pictures)
thread2 = Thread(target=upload_them)

for i in range(10):
    thread1.start()
    thread2.start()
    time.sleep(2)'''

from multiprocessing import Process

def take_pictures():
    """
    Continously take pictures. Ideally, you should sleep, but we have another thread that may buy us that time.
    """
    counter = 0
    extention = ".jpg"
    while counter < 1000000:
        path = '/sdcard/traffic_images/image_%05d' % counter
        path += extention
        droid.cameraCapturePicture(path, True)
        counter += 1
        #time.sleep(3) - do not sleep - this time will taken up in uploading, or??

def upload():
    """
    Continously upload them as they are taken.
    """
    mtime = datetime.datetime.now()
    counter = 0
    while counter < 1000000:
        try:
            #m_image = open('/sdcard/traffic_images/image_%05d' % counter, 'rb')
            # Get latest file in Dir
            path = '/sdcard/traffic_images/'
            m_image = max(glob.iglob(os.path.join(path, '*jpg')),key=os.path.getctime)
            post_files = {'image':m_image}
            post_data = {'time_taken':mtime, 'number_of_cars':0}
            r = requests.post(url='http://127.0.0.1:8000/captures/', files=post_files, data=post_data, auth=HTTPBasicAuth('john.wamburu', 'john'))
            print r.text
            delete_image(m_image)
        except IOError:
            print "Unable to find file or directory!"
        except Exception, e:
            print e
        counter += 1

def delete_image(image):
    """
    Called immediately after upload, so we do not fill all space on device - KEY!
    """
    path = os.path.abspath(image)
    os.remove(path)

if __name__ == '__main__':
    Process(target=take_pictures).start()
    Process(target=upload).start()

#droid.wakeLockRelease()
#droid.wifiLockRelease()
