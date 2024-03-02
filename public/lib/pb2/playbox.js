var player;
var progMaster =[];
var hotMaster ;
var hotReel ={};
var hotindex;
var hotCall ;
var m3u8  = false;
var player;
var pb_index;
var pb_oCH;
var pb_Programs;
var pb_Program;
const xload = {};
var mVideo ;
var mOffset;


var imaster;
var isDone= false;
var active = false;
var programs;
var program;
var index;
var oCH;

var player;



//=================================//
let isPlayout  = false;

const xparams = new URLSearchParams(window.location.search)
videosrc= xparams.get('playout')
 //videosrc= get_request('playout');


if(videosrc){

    isYt = true;
    console.log("we are in",videosrc);
    isPlayout  = true;
   isYt    = true;
   hotCall = videosrc;


if(videosrc.includes("youtube")){
 // videosr
 isYt    = true;

  videocode = (videosrc.includes('?'))? "&autoplay=1&volume=1&mute=0&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1" : "?autoplay=1&volume=1&mute=0&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";
  
 //videosrc =   videosrc + videocode;

 if(thisApp.system.isMobile) videosrc.replace("mute=0","mute=1");

}



}


console.log (`
*********************************************************
*                                                       *
*                1NetWork PlayBOX                       *
*                     V 2.0                             *
*                                                       *
*                                                       *
*********************************************************
     (c) DMVX Limited 2023 - Reginald Hassan Richmen

`);
var trace2 = false;
var  reels=[];
const baseChannel="onetv";
basePlaylist = "PLBrVE3sZeUAfRGBhbGb52oU5ldHjo5WsC";

const tapes = [];
const videos = [];
separator ="µ|µ";


var reel = {
     
  role:[],
     videos: "",
     separator :"µ|µ",
     rox:[],
     


 addVideo : (newVideo)=>{



  this.videos =(this.videos==!"")? this.videos +  separator + JSON.stringify( newVideo): JSON.stringify( newVideo)

}

};





async function loadApi( gdata, xtoken) {

     if(!xtoken)xtoken = "";
 
 const encodedUrl = encodeURI(gdata+xtoken);
 
 //console.log(encodedUrl);
   const response = await axios.get(encodedUrl );
     return response; 
 
 }
     

const text = {


strip: function (text) {
    // strip control chars
    text = text.replace(/\p{C}/gu, '');

    // other common tasks are to normalize newlines and other whitespace

    // normalize newline
    text = text.replace(/\n\r/g, '\n');
    text = text.replace(/\p{Zl}/gu, '\n');
    text = text.replace(/\p{Zp}/gu, '\n');

    // normalize space
    text = text.replace(/\p{Zs}/gu, ' ');

    return text;
}
,
trimTo : (string, size)=>{
    

string =(string)? string: "";
size  =(size)? size: 0;
//console.log("starting ,,,");
if(string.length>size){

     string = string.slice(0, size - string.length+1);    

} 

if(trace2 )console.log("ending ,,," +string);

return text.strip(string);
}



}


if(trace2 )console.log (text.trimTo("we the going is going good many of your friends will run away", 20));




async function sendProgramsBulk( bulkdata,runnit ){
  //BASESERVER=BASESERVER +"/submit";
 //const searchUrl="";
 //const searchUrl="/api/programs/bulk";


 console.log(bulkdata);

 bulkdata.forEach(data=>{

console.log(data.channel_id);

 })

const searchUrl="/api/programs/bulkifnew";
       var token="";

   
      
      apiurl=  BASESERVER +searchUrl;//+channel_id;


      //loadApi(BASESERVER+searchUrl+channel_id, token);


   if(trace2 )console.log( apiurl);
   
   const kdata={data:[] };

   kdata.data = bulkdata;

const data = JSON.stringify(bulkdata);
const config = {
    headers: {'Content-Type': 'application/json'}
}

done = axios.post( apiurl, data, config); 
console.log(done);
if (runnit) runnit(done);
return done;

    
}  


async function saveBulkApi( gdata, payload) {

  if(!xtoken)xtoken = "";

const encodedUrl = encodeURI(gdata+xtoken);

//console.log(encodedUrl);
const response = await axios.get(encodedUrl );
  return response.data;
}

 


async function getProgramsByChannel(channel_id,runnit ){
 
  const searchUrl="/api/programs/channel/";
       var token="";
       apiurl= BASESERVER+searchUrl+channel_id;
    
   /*  
     const videosByX = [ ];

  done = await loadApi(BASESERVER+searchUrl+channel_id, token)

.then( (response)=>{
 if (runnit) runnit(done);
  return done;



});


   */     
 

 const encodedUrl = encodeURI(apiurl+token);
 
 console.log(encodedUrl);


 console.log('searching...');
   const response = await axios.get(encodedUrl )
  .then((sData)=>{

          console.log('sData waiting...')
        ;

        console.log(sData.data);
          if (runnit) runnit(sData.data);
         done
            return  sData.data
        });


      
       

//console.log(done.data);
//if (runnit) runnit(done.data);


//return  done;



}  





 async function getScheduleByCid(channel_id,runnit ){


 
const searchUrl="/api/programs/cid/";
     var token="";
  
  
   
   //const videosByX = [ ];
   //{netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" },];
   
   const response = await   loadApi(BASESERVER+searchUrl+channel_id, token);

   if(trace2 )console.log(BASESERVER +searchUrl+channel_id);


   
      if(trace2 ) console.log(response.data);

   if(runnit)runnit(response.data);
   
   return response.data; // final return will be array with detailed video propert 
  

    //return response.data;
   };



   function tablistaction(){


/*
    axios.get(ServerUrl+'/api/programs/channel/onetv')
    .then((response) => {
      console.log(response.data[1]);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });


*/

    
getProgramsByChannel(baseChannel,(payload)=>{

      console.log("here are  here now");

console.log(payload);
progMaster = payload;

$("#btn_tablist").click();

$("#tablist").html(baseChannel+' :: Station Schedule');

$("#tablist").append(` <div class='proglist'> 
<ul>


` )

payload.forEach(program => {

  $("#tablist").append(`
  
  <a hreh='' onmouseover="HitHover('${program.play_index}')">
  <div>
  <l1 href='' onclick="prevlist('${program.play_index}')">  ${program.program_name} :: ${program.duration}</li></div></a>
  `
  )
  
});


$("#tablist").append(`</lu></div>` )
;

    });


    //#tabinfo




   };

   function prevlist(action){

hotindex = action;

hotReel = progMaster[action];


  var disvide = hotReel.video_id;


console.log(progMaster);
console.log(hotReel );

console.log( prevplayer);

prevplayer.cueVideoById (disvide);



   }


   function HitHover(actionX){

    console.log(progMaster);
    console.log(hotReel );


console.log(actionX)


   }



   function oonPlayerReady(event) {
    event.target.playVideo();
  }

  function onPPlayerReady(event) {
    playtime.isPlay=true;
    // event.target.mute();
    // event.target.setVolume(0);
    event.target.setVolume(50);

    event.target.playVideo();

    //event.target.unMute();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPPlayerStateChange(event) {
    function onPlayerReady(event) {
      // event.target.mute();
      // event.target.setVolume(0);
      event.target.setVolume(50);
      event.target.playVideo();
      // setTimeout(player.unMute(),2000)
    }
  }


  function onCPlayerReady(event) {
    playtime.isPlay=true;
    // event.target.mute();
    // event.target.setVolume(0);
    event.target.setVolume(50);

    //event.target.playVideo();

    //event.target.unMute();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onCPlayerStateChange(event) {
    function onPlayerReady(event) {
      // event.target.mute();
      // event.target.setVolume(0);
      event.target.setVolume(50);
     // event.target.playVideo();
      // setTimeout(player.unMute(),2000)
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
 
async function startChannel(channel , cback , xplayer){
  token="";

  console.log("we got 555432");

  const BASESERVER=ServerUrl+"/api/channel/"+channel;


 loadApi( BASESERVER, token) .then((data)=>{

  console.log("we goy 3333", BASESERVER);
console.log(data.data);
  if(cback)cback(data.data, xplayer);
  console.log(" we hot it",data);

  return data;


  }) .catch(error => {
      console.log(error);
  });



}




  function playClock(){

  }



