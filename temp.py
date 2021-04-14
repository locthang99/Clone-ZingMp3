import string
import hashlib
import hmac
import requests
import json
from threading import Thread
import time
import datetime
import urllib
from tqdm import tqdm
import os
##################################################################################

def writeData(path,data):
    f = open(path,'a+',encoding='utf-8')
    obj=json.dumps(data,ensure_ascii=False).encode("utf8")
    f.write(obj.decode()+"\n")

def writeError(path,data):
    f = open(path,'a+',encoding='utf-8')
    obj=json.dumps(data,ensure_ascii=False).encode("utf8")
    f.write(obj.decode()+"\n")

def writeTotal(data):
    f = open("total.txt",'w',encoding='utf-8')
    f.write(str(data))

def getStart():
    f = open("total.txt")
    return int(f.read())

def AddSong(path,output):
    with open(path,encoding="utf-8") as fp:
        for line in fp:
            try:
                if(len(line)>20):
                    #print(line[0:len(line)-2])
                    song = json.loads(line[0:len(line)-2])
                    writeData(output, song)

            except:
                print("vl")
            #download(line[14:22],output)
            #time.sleep(1)
##################################################################################
if __name__ == "__main__":

    t = "thai-lan-"
    p = r"C:\Users\KhunGLonG\Desktop\clone\Official\VN"
    p2 = r"C:\Users\KhunGLonG\Desktop\clone\Cover\VN"
    p3 = r"C:\Users\KhunGLonG\Desktop\clone\Cover\NotVN"
    out = os.path.join(r"Output",t)
    AddSong(os.path.join(p3,t),out)

