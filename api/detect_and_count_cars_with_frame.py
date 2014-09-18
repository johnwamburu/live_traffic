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
    
# Loads the data as a VideoCapture format, which is really just
# an image sequence.
image_sequence = 'Data/Camera3/image_%05d.jpg'
cap = cv2.VideoCapture(image_sequence)

# Load our cascade classifier from cars3.xml
car_cascade = cv2.CascadeClassifier(r'cars3.xml')

# Reduce frame number of tests.

