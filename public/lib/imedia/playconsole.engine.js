imedia.setACI(channel_id,(ACI) => {
    imedia.active_channel = ACI;
  });
  
if(typeof BASESERVER ==="undefined") var BASESERVER = location.origin;
console.log("BASESERVER=", BASESERVER);

function engine(event){


    console.log(`
    
     ******************************************
     *                                        *
     *                                        *
     *  Playcon runtime Engine 2.0 Started    *
     *                                        *
     *                                        *
     ******************************************
    
    `);
    


    $("#masterinput").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#universalclick").click();
        }
    });
    const txtx =

    `curl \
    'https://youtube.googleapis.com/youtube/v3/search?part=duration&videoDefinition=any&videoDimension=any&videoEmbeddable=true&key=[YOUR_API_KEY]' \
    --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
    --header 'Accept: application/json' \
    --compressed
  `
;
   console.log("getting info for =",GLOBAL.channel_id);

    
  const channel_info = imedia.getChannelInfo(GLOBAL.channel_id, (channel)=>{ imedia.channel_info = imedia.ACI = channel ; console.log("<<<<<|||||||||||||Setting - ACI  - active channel information ||||||||||||||||>>>", channel) ; });







    imedia.loadPlaylist(); 
    imedia.loadsearchlist()//loads search
  VBASESERVER  = 'https://imediaport.com:4646';
const TTV_URL ="https://onetv.ng/stream/?mobile=1&mute1&ch="+channel_id;
const TV_URL = VBASESERVER + "/play/?ch=" +channel_id;

document.getElementById('player').src= TTV_URL;

    $('player').attr('src',TTV_URL);

console.log("<<<<<|||||||||||||channel id  02 ||||||||||||||||>>>", channel_id);


console.log("<<<<<||||||||||||| useranme  02 ||||||||||||||||>>>", username);

console.log("<<<<<||||||||||||| imedia channel id  02 ||||||||||||||||>>>", imedia.channel_id);


console.log("<<<<<||||||||||||| imedia useranme  02 ||||||||||||||||>>>", imedia.username);
    // next load libry playlist

    imedia.user = user;
    //imedia.function_hide_all();
    imedia.callFunction('welcome');
    
    var caled = document.getElementById('calendar');
    
    caled.addEventListener('onclick', (event=>{

        imedia.dateclick(event);
    }));
    //call home page
    //console.log("<<<<<||||||||||||| 03 ||||||||||||||||>>>")
    
     //imedia.playCH("onetv");
     //console.log("<<<<<||||||||||||| 04 ||||||||||||||||>>>")
    
//const VBASESERVER  = window.location.origin;


    
    }
    
    
    
    $(()=>{
    
    
    engine();
    
    
    
    });



/***

    if(typeof username == 'undefined' ){
var username =(typeof GLOBAL != 'undefined')? GLOBAL.username:"";
} else {

   if (username =="") username =(typeof GLOBAL != 'undefined')? GLOBAL.username:"";

};

if(typeof channel_id == 'undefined' ){
    var channel_id =(typeof GLOBAL != 'undefined')? GLOBAL.channel_id:"";
    } else {
    
       if (channel_id =="") channel_id =(typeof GLOBAL != 'undefined')? GLOBAL.channel_id:"";
    
    };

    if(typeof admin_role == 'undefined' ){
        var admin_role =(typeof GLOBAL != 'undefined')? GLOBAL. admin_role:"";
        } else {
        
           if ( admin_role =="")  admin_role =(typeof GLOBAL != 'undefined')? GLOBAL.admin_role:"";
        
        };
    
     */
    

     

    function app() {


        playtime.setextclockWork = externalClock;
    
        setTimeout(playtime.startClock(), 2000);
    
        var playsession = playtime.getCurrentSession;
        playtime.setPlayer = player;
    
    // PLPPomK5QKeyWV7PYC9s-PxrDhVIDpt4Oe
    
    
    
        //var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLZKvBPKDFWqP_VAujIzE9Yg", "", (ret) => { // var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLbej6cHELyyTvOVrZZw3mob","",(ret)=>{
            var ytList =  runmaster("onetv", (ret) => {
            console.log("index===",ret.index);
            let iwindwex= ret.index
    
            videoIDs = [];
            programs = ret.programs;
    console.log("DATA",programs);
    
    
            programs.forEach((clip, i) => { // console.log(clip);
                videoIDs[i] = clip.vidoe_id;
            });
    
    
    index=ret.index;
    
    
            videosx = videoIDs; // .toString;
    
            console.log("channel info",ret.channel);
            channel= ret.channel;
           // playtime.setChannel(ret.channel);
    
            playtime.setStationStart = programs;
          
            indexmark = iwindwex.mark; 
            indexoffset= iwindwex.offset;
    
            console.log(".here 1="+indexmark, indexoffset);
    
    
            setTimeout(() => {
               playtime.playAtIndex(indexmark, indexoffset);
    
               console.log("here 2="+indexmark, indexoffset);
                
            }, 5000);
    // console.log( videosx);
    
        });
    
    
    }
    




