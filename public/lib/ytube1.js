// plan to load API APP keys from .ENV
//const express = require("express")
//const app = express();
//const axios = require("axios");
const trace3= true;
const xbusData = [];
const vbusData = [];
const vidoesById = [];
const YOUR_API_KEY=`AIzaSyCW2pN3FIDIcCNiLjoHFLIzjbp7mRFLAMI`;
var maxResults = 10;
const playlist = 'PLBrVE3sZeUAeMNYDN-Hr9q4Y5H-ctVbt9';

const maxrs=`&maxResults=${maxResults}`;
const youtubeURL = 'https://www.googleapis.com/youtube/v3/';
const yplaylistsearch = 'playlistItems?part=snippet,status,contentDetails'+maxrs;
//const videoidsearch =`videos/?part=contentDetails,snippet,status`;
//const videoidsearch =`videos/?part=snippet%2CcontentDetails`;
//const videoidsearch =`videos?part=contentDetails,snippet,status`;
const yvideoidsearch =`videos?part=snippet,contentDetails,status,statistics`;
//youtubeURL = 'https://www.googleapis.com/youtube/v3/';
//var therest= `${YOUR_API_KEY}&id=${videoslist}`;
//
var ols =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=`;




async function loadFromVideoId(videoById,client_id, runnit ){
 
 
  var token="";
   const API_KEY= (client_id)? client_id:YOUR_API_KEY;
  const yURLx = youtubeURL + yvideoidsearch+`&id=${videoById}&key=${API_KEY}`;
  const dataBus=[];
  moredata = true;
  duration=0;
  //moredata = false;
  var counter = 0;


const videosByX = [ ];
//{netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" },];

const response = await   loadApi(yURLx, token);

response.data.items.forEach((item,px )=> {

  //console.log( item);
  // console.log(px);
  //  vidoesById=[ {netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" }];
  videosByX[px]  =
   { 
    netid       :   null,
    kind        :  item.kind,
    tag         :  item.etag,
    id          :  item.id, 
    title       :  item.snippet.title,
    instanceof  :  item.snippet.description,
    duration    :  item.contentDetails.duration,
    embeddable  :  item.status.embeddable,
    madeForKids :  item.status.madeForKids,
    publishAt   :  item.snippet.publishedAt,
    sourceCID   :  item.snippet.channelId,
    thumbUrl    :  item.snippet.thumbnails.default.url,
    thumbWidth  :  item.snippet.thumbnails.default.width,
    thumbHeight :  item.snippet.thumbnails.default.height,
     shelfa     : "",
     shelfb     :"", 
     shelfc     :"", 
     index      :px, 
     keyword    :"" ,
     nplay:{
      id          :  item.id, 
      duration    :  item.contentDetails.duration,

     }
     
  
  };
   

   
      
      xbusData[px] = item;


   });



if(runnit)runnit(videosByX);

return videosByX; // final return will be array with detailed video propert 


}



async function loadFromPlaylistId(playListId,client_id,runnit){
 
  var token=""; const API_KEY= (client_id)? client_id:YOUR_API_KEY;
  const yURLx = youtubeURL + yplaylistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
  const vidoesById=[];
  const dataBus=[];
  duration=0;
  moredata = true;
  var counter = 0;

  while (moredata){
  const response = await   loadApi(yURLx, token);


   response.data.items.forEach((item, i )=> {
   px=counter;
 
     
      vidoesById[px]=item.snippet.resourceId.videoId;

      var id = item.snippet.resourceId.videoId;
     
     // var title = item.snippet.title;
      //var url = 'https://www.youtube.com/watch?v=' + item.id;
      //var thumb = item.snippet.thumbnails.default.url;
    
      //console.log(item.contentDetails.duration);
      
      xbusData[px] = item;

    
      if (px === (response.data.pageInfo.totalResults -1) ) moredata = false;     
counter++;
   });

token = `&pageToken=${response.data.nextPageToken}`;


}





if(runnit) {

 xbusData2 = await loadFromVideoId(vidoesById.toString(),"",runnit);

} else {
  xbusData2 = await loadFromVideoId(vidoesById.toString(),"");


}



return xbusData2; 
// final return will be array with detailed video propert 


}



async function baseFromVideoId(videoById,client_id, runnit ){
 
 
  var token="";
   const API_KEY= (client_id)? client_id:YOUR_API_KEY;
  const yURLx = youtubeURL + yvideoidsearch+`&id=${videoById}&key=${API_KEY}`;
  const dataBus=[];
  moredata = true;
  duration=0;
  //moredata = false;
  var counter = 0;
var timeEngine =0;

const videosByX = [ ];
//{netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" },];

const response = await   loadApi(yURLx, token);

response.data.items.forEach((item,px )=> {
duration =0;
  //console.log( item);
  // console.log(px);
  //  vidoesById=[ {netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" }];
 if (item.status.embeddable){
 
  duration =  ytDuration(item.contentDetails.duration);
 timeEngine = timeEngine + duration ;
  videosByX[px]  =
   { 
    netid       :   null,
    id          :  item.id, 
    title       :  item.snippet.title,
    duration    :  duration,
    description : item.snippet.description,
    embeddable  :  item.status.embeddable,
    thumbUrl    :  item.snippet.thumbnails.default.url,
    trimstart   :0,
    trimstop    :0,
    indexStart   :0,
    indexStop    :0,
    indexDuration:0,
    indexTime     :0,
    shedule       : null,
    timeEngine : timeEngine
  
  };


  

   };

   
      
  xbusData[px] = item;
  


   });

if(runnit)runnit(videosByX);

return videosByX; // final return will be array with detailed video propert 


}





async function baseFromPlaylistId(playListId,client_id ,runnit){
 
  var token=""; const API_KEY= (client_id)? client_id:YOUR_API_KEY;
  const yURLx = youtubeURL + yplaylistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
  const vidoesById=[];
  const dataBus=[];
  duration=0;
  moredata = true;
  var counter = 0;

if(trace3)console.log(" Api URL",yURLx);

  while (moredata){
  const response = await   loadApi(yURLx, token);


   response.data.items.forEach((item, i )=> {
   px=counter;
 
     
      vidoesById[px]=item.snippet.resourceId.videoId;

      var id = item.snippet.resourceId.videoId;
     
     // var title = item.snippet.title;
      //var url = 'https://www.youtube.com/watch?v=' + item.id;
      //var thumb = item.snippet.thumbnails.default.url;
    
      //console.log(item.contentDetails.duration);
      
      xbusData[px] = item;

    
      if (px === (response.data.pageInfo.totalResults -1) ) moredata = false;     
counter++;
   });

token = `&pageToken=${response.data.nextPageToken}`;


}





if(runnit) {

 xbusData2 = await baseFromVideoId(vidoesById.toString(),"",runnit);

} else {
  xbusData2 = await baseFromVideoId(vidoesById.toString(),"");


}



return xbusData2; 
// final return will be array with detailed video propert 


}

async function getVideoFromPlaylistId(playListId,client_id ,runnit){
 

  console.log("trace got here 20222=======================");
  var token=""; const API_KEY= (client_id)? client_id:YOUR_API_KEY;
  const yURLx = youtubeURL + yplaylistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
  const vidoesById=[];
  const dataBus=[];
  duration=0;
  moredata = true;
  var counter = 0;

  while (moredata){
  const response = await   loadApi(yURLx, token);


   response.data.items.forEach((item, i )=> {
   px=counter;
 
     
      vidoesById[px]=item.snippet.resourceId.videoId;

      var id = item.snippet.resourceId.videoId;
     
   
      xbusData[px] = item;

    
      if (px === (response.data.pageInfo.totalResults -1) ) moredata = false;     
counter++;
   });

token = `&pageToken=${response.data.nextPageToken}`;


}






return vidoesById.toString ;
// final return will be array with detailed video propert 


}




async function loadApi( gdata, xtoken) {

    if(!xtoken)xtoken = "";

    if(trace3)console.log(" Api URL in load",encodedUrl);
const encodedUrl = encodeURI(gdata+xtoken);



//console.log(encodedUrl);
  const response = await axios.get(encodedUrl );
    return response; 

}
    



const showData = (buxData) => {
    duration=0;

buxData.forEach(item => {

    var id = item.snippet.resourceId.videoId;
    var title = item.snippet.title;
   // var duration = item.contentDetails.duration;
    var url = 'https://www.youtube.com/watch?v=' + item.id;
    var thumb = item.snippet.thumbnails.default.url;
    var position = item. snippet.position;

        console.log(id);
        console.log("Duration"+duration);
        console.log(url);
        console.log(thumb);
        console.log(title);
        console.log(position);



});

    
};


function ytDuration(duration) {
  const match = duration.match(/P(\d+Y)?(\d+W)?(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/)
  // An invalid case won't crash the app.
  if (!match) {
      console.error(`Invalid YouTube video duration: ${duration}`)
      return 0
  }
  const [
      years,
      weeks,
      days,
      hours,
      minutes,
      seconds
  ] = match.slice(1).map(_ => _ ? parseInt(_.replace(/\D/, '')) : 0)
return (((years * 365 + weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds
}

if (ytDuration('PT1H') !== 3600) {
  throw new Error()
}

if (ytDuration('PT23M') !== 1380) {
  throw new Error()
}

if (ytDuration('PT45S') !== 45) {
  throw new Error()
}

if (ytDuration('PT1H23M') !== 4980) {
  throw new Error()
}

if (ytDuration('PT1H45S') !== 3645) {
  throw new Error()
}

if (ytDuration('PT1H23M45S') !== 5025) {
  throw new Error()
}

if (ytDuration('P43W5DT5M54S') !== 26438754) {
  throw new Error()
}

if (ytDuration('P1Y43W5DT5M54S') !== 57974754) {
  throw new Error()
}

//module.exports  = {loadFromVideoId, loadFromPlaylistId, loadApi, showData};
const ytube =  {loadFromVideoId, loadFromPlaylistId, baseFromVideoId, ytDuration, baseFromPlaylistId,  loadApi, showData};