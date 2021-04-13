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

def DownloadFile(path,output):
    with open(path,encoding="utf-8") as fp:
        for line in fp:
            print("Downdloading: "+line[14:22])
            download(line[14:22],output)
            #time.sleep(1)
##################################################################################

def download(id,output):
    r = requests.get("http://api.mp3.zing.vn/api/streaming/audio/"+id+"/128")
    with open(output+"/"+id+".mp3", "wb") as handle:
        for data in tqdm(r.iter_content()):
            handle.write(data)

##################################################################################
if __name__ == "__main__":
    DownloadFile("test.txt","Down")
