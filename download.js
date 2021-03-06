const fs = require("fs");
const lineReader = require("line-reader");
const request = require("request");
// ---------------------------------------------------------------------------------
function writeData(path, data) {
  fs.appendFile(path, data, function (err) {
    if (err) writeErrorWrite(data);
  });
}

function writeErrorWrite(err) {
  fs.appendFile("logWrite.txt", "\n" + err, function (err) {
    if (err) throw err;
  });
}
function writeError(err) {
  fs.appendFile("log.txt", "\n" + err, function (err) {
    if (err) throw err;
  });
}
// ---------------------------------------------------------------------------------

var listTypes = [
  "-",
  "viet-nam-cai-luong-",
  "viet-nam-nhac-tre-v-pop-",
  "viet-nam-nhac-trinh-",
  "viet-nam-nhac-tru-tinh-",
  "viet-nam-rap-viet-",
  "viet-nam-nhac-thieu-nhi-",
  "viet-nam-nhac-cach-mang-",
  "viet-nam-nhac-dan-ca-que-huong-",
  "viet-nam-nhac-ton-giao-",
  "viet-nam-nhac-khong-loi-",
  "au-my-classical-",
  "au-my-folk-",
  "au-my-country-",
  "au-my-pop-",
  "au-my-rock-",
  "au-my-latin-",
  "au-my-rap-hip-hop-",
  "au-my-alternative-",
  "au-my-blues-jazz-",
  "au-my-reggae-",
  "au-my-r-b-soul-",
  "trung-quoc-",
  "han-quoc-",
  "nhat-ban-",
  "thai-lan-",
];

var listVN = [
  "viet-nam-cai-luong-",
  "viet-nam-nhac-tre-v-pop-",
  "viet-nam-nhac-trinh-",
  "viet-nam-nhac-tru-tinh-",
  "viet-nam-rap-viet-",
  "viet-nam-nhac-thieu-nhi-",
  "viet-nam-nhac-cach-mang-",
  "viet-nam-nhac-dan-ca-que-huong-",
  "viet-nam-nhac-ton-giao-",
  "viet-nam-nhac-khong-loi-",
];

var listAnother = [
  "trung-quoc-",
  "han-quoc-",
  "nhat-ban-",
  "thai-lan-",
  "phap-",
];

var listAU = [
  "au-my-classical-",
  "au-my-folk-",
  "au-my-country-",
  "au-my-pop-",
  "au-my-rock-",
  "au-my-latin-",
  "au-my-rap-hip-hop-",
  "au-my-alternative-",
  "au-my-blues-jazz-",
  "au-my-reggae-",
  "au-my-r-b-soul-",
];

// ---------------------------------------------------------------------------------


var count = 0;
var target = 0;
var step = 500
var idType = 10;
var output = "/content/gdrive/MyDrive/DatasetSong/"
const download =  (id, type, output) => {
  var err = false;
  try {
    var r = request(
      "http://api.mp3.zing.vn/api/streaming/audio/" + id + "/128"
    );
    r.on("response", (res) => {
      if (res.statusCode != 200) {
        count++;
        DownAll(idType)
        writeData("Error1/" + type, id);
        err = true
      }

    
    });
    r.on("complete", () => {
      if(err)
          return
      //console.log(id,"  OK")
      count++;
      DownAll(idType)
    });
    r.pipe(fs.createWriteStream(output));
  } catch (err) {
    count++;
    DownAll(idType)
    writeData("Error1/" + type, id);
    console.log("toang");
  }
};



var ListID = [];

const AddListId = (i) => {
  ListID = []
  // if (!fs.existsSync(output + listTypes[i]))
  //   fs.mkdirSync(output + listTypes[i]);
  lineReader.eachLine("OutputFinal/" + listTypes[i] + ".txt", function (line) {
    let id = line.slice(14, 22);
    if (id.length == 8) {
      ListID.push(id)
    };
  })
};

const DownAll = (indexType) => {
    if(count > ListID.length)
    {
      count =0;
      target =0;
      idType++;
      AddListId(idType)
      setTimeout(()=>{DownAll(idType)},3000)
      console.log("change type")
      return
    }
  if(count == target || count==0)
  {
    target += step;
    if(target>ListID.length)
      target = ListID.length
    setTimeout(()=>{
      for(let i = count;i<target;i++)
      {
        try{
          download(ListID[i],listTypes[indexType],output + listTypes[indexType] + "/" + ListID[i] + ".mp3").catch(e=>{})
        }
        catch{
        }
      }
    },5000)
  }
}

AddListId(1);

setTimeout(()=>{
  ListID.forEach(x=>{
    if(count<100)
      writeData("BashLinux/test.txt","curl -s -L api.mp3.zing.vn/api/streaming/audio/"+x+"/128 -o "+x+".mp3 & ")
  })
},3000)


// const fetch = require("node-fetch")
// fetch("https://604f32afc20143001744c8aa.mockapi.io/api/v1/config/cf").then(res=>res.json())
// .then(res=>{
//     if(!fs.existsSync("Download"))
//     {
//       fs.mkdirSync("Download");
//     }
//       if (!fs.existsSync("Download/"+listTypes[res.id])) {
//       fs.mkdirSync("Download/"+listTypes[res.id]);
//     }
//     DownManyFromFile(res.id);
// })
// //var r =/Z[O|W][0-9|A-F|U|I|O|Z|W]{6}/g

// // for(let i = 0;i<100;i++)
// // {
// //   download("ZWF09OZ7",i+".mp3")
// // }
