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

def AddID(path):
    with open(path,encoding="utf-8") as fp:
        for line in fp:
            ARR_ID.append(line[14:22])
            #download(line[14:22],output)
            #time.sleep(1)
##################################################################################
ARR_ID =[]


def download(id,output):
    try:
        print(ARR_ID[id])
    except:
        print("Done")
    # r = requests.get("http://api.mp3.zing.vn/api/streaming/audio/"+id+"/128")
    # with open(output+"/"+id+".mp3", "wb") as handle:
    #     for data in tqdm(r.iter_content()):
    #         handle.write(data)

##################################################################################

def process_range(id_range, store,output):
    """process a number of ids, storing the results in a dict"""
    if store is None:
        store = {}
    for id in id_range:
        store[id] = download(id, output)
        #store[id] = id

    return store


def threaded_process_range(nthreads, id_range,output):
    """process the id range in a specified number of threads"""
    store = {}
    threads = []


    # create the threads
    for i in range(nthreads):
        ids = id_range[i::nthreads]
        t = Thread(target=process_range, args=(ids,store,output))
        threads.append(t)


    # start the threads
    [ t.start() for t in threads]
    # wait for the threads to finish
    [ t.join() for t in threads ]


    return store


##################################################################################
if __name__ == "__main__":
    AddID("test.txt")
    print(ARR_ID)
    START = 0
    STEP = 10
    END = len(ARR_ID)
    while START < END:
        print("-------------------------------------------")
        print(str(START)+"----"+(datetime.datetime.now().strftime("%X")))
        threaded_process_range(STEP,list(range(START,START+STEP)),"Down")
        START+=STEP
        writeTotal(START)
        time.sleep(1)

    #DownloadFile("test.txt","Down")
