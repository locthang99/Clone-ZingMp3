const fs = require("fs");
const lineReader = require("line-reader");
const request = require("request");
// ---------------------------------------------------------------------------------
function writeData(path, data) {
  fs.appendFile(path, "\n" + data, function (err) {
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

var listTest = ["viet-nam-nhac-khong-loi-"];
var count = 0;
var target = 10;
var step = 10
var idType =1;
const download = async (id, type, output) => {
  try {
    var r = request(
      "http://api.mp3.zing.vn/api/streaming/audio/" + id + "/128"
    );
    r.on("response", (res) => {
      console.log(res.statusCode);
      if (res.statusCode != 200) {
        count++;
        DownAll(idType)
        writeData("Error1/" + type, id);
        throw new Error("404");
      }

      //throw new Error("aaa")
    });
    r.on("complete", () => {
      count++;
      DownAll(idType)
      console.log("OK");
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
  if (!fs.existsSync("Test/" + listTypes[i]))
    fs.mkdirSync("Test/" + listTypes[i]);
  lineReader.eachLine("OutputFinal/" + listTypes[i] + ".txt", function (line) {
    let id = line.slice(14, 22);
    if (id.length == 8) ListID.push(id);
  })
};

const DownAll = (indexType) => {
  if(count == target || count==0)
  {
    target += step;
    for(let i = count;i<target;i++)
        download(ListID[i],listTypes[indexType],"Test/" + listTypes[indexType] + "/" + ListID[i] + ".mp3").catch(e=>{})
  }
}
AddListId(idType);
//sleep(3000)
setTimeout(()=>{console.log(ListID.length)},3000)
DownAll(idType)

function sleep(time) {
  var stop = new Date().getTime();
  while(new Date().getTime() < stop + time) {
      
  }
}
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
