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

car_cascade = cv2.CascadeClassifier(r'cars3.xml') #Our classifier is from cars3.xml

images_to_detect = 'images/image_%05d.jpg'
cap = cv2.VideoCapture(images_to_detect)

my_frames = 26
for f in xrange(my_frames):
    ret, m_image = cap.read()
    
    # Crop so that only the road remains, eliminate what we do not want. I'll Get back to that.
    m_image = m_image[330:450,:-900]
    
    cars = car_cascade.detectMultiScale(m_image, 1.008, 5)
    for (x,y,w,h) in cars:
        cv2.rectangle(m_image,(x,y),(x+w,y+h),(255,0,0),2)
    
    print 'Processing %d : Cars Detected : [%s]' % (f, len(cars))

    cv2.imshow('frame', m_image)
    cv2.waitKey(300)

cap.release()
cv2.destroyAllWindows()
