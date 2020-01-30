from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import os, sys, time, threading, multiprocessing
from pylab import *
from PIL import *
import cv2
import glob
#import os
max_size = (28,28)


fw = open("C:/Users/DELL/Desktop/sih/Crop_disease/input_img_pro.csv","w")

for img in glob.glob("C:/Users/DELL/Desktop/sih/Crop_disease/Disease/*.jfif"):
    
        
         
    print("In 1 \n")
    image= cv2.imread(img)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    image = cv2.resize(gray, max_size)
    
    new_im = image.ravel()
        
    
            
    for i in range(len(new_im)):
        wr = "%s , "%(str(new_im[i]))
        fw.write(wr)
    cl = "%s \n"%(str(0))
    fw.write(cl)
            

    
    




fw.close()