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
