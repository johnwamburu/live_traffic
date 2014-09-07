"""
Author: John Wamburu <@johnwamburu>
Author Email: wamburujohn@gmail.com
Date: 06-08-2014
For: Pipo Live Traffic Feed - On Chaka Road, with my Pipo, from the office.
Api: http://www.johnwamburu.pythonanywhere.com/

Plot:
- Load image on object save
- I have a restaurant across the road, cars just parked and staying there - tsk.
- Build my cascade classifier from cars3.xml <!-- Thank you very much Brad Philip and Paul Updike -->
- Detect cars, and count them
"""

import numpy as np
import cv2
import shutil
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

"""
Let's create a method to be called on one image only...
Plot being we will call it on object save
Once our device posts the image to server
Because I doubt that my server will allow me to run a continous script forever
With the 300 CPU-seconds I have available
Taking a hit on performance? Maybe, but I am yet to verify
"""
def analyze_image(_image):
    src = os.path.join(BASE_DIR, "media/images/%s" % _image)
    dst = os.path.join(BASE_DIR, "media/images/temp/image_00001.jpg")
    temp_dst = os.path.join(BASE_DIR, "media/images/temp/")
    shutil.copyfile(src, dst)
    my_cars = 0
    my_images = '/home/john.wamburu/api/live_traffic/media/images/temp/image_%05d.jpg'
    cap = cv2.VideoCapture(my_images)
    # Get my classifier ready ...
    car_cascade = cv2.CascadeClassifier(r'/home/john.wamburu/macau_traffic_data-master/cars3.xml')
    frames = 1
    for f in xrange(frames):
        ret, image = cap.read()
        # Crop so that only the road remain, eliminate what we do not want. Get back to that.
        #image = image[120:,:-20]
        cars = car_cascade.detectMultiScale(image, 1.008, 5)
        for (x,y,w,h) in cars:
            cv2.rectangle(image,(x,y),(x+w,y+h),(255,0,0),2)    
        print 'Processing %d : Cars Detected : --%s--' % (f, len(cars))
        my_cars += len(cars) # just in case we add more frames we do not lose count
    cap.release()
    cv2.destroyAllWindows()
    #os.remove(dst)
    return my_cars
