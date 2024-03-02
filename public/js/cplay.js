
const xplaybox ={
  markIndex:0,
  playIndex:0,

  externalclock: function(){},
  
  iclockWork: function () {
    playbox.externalclock() ;
  
      // $("#infox").append( "::");
      // console.log("clocking  inside ....");
            // playbox.extclockWork();
      
      
              if (playbox.playLapsed <= 5) { // $("#infox").append ("  >>.."+playbox.playLapsed(player));
      
      
              }
      
      
              if (playbox.playLapsed(player) == 2) {
      
                  playbox.playAtIndex(this.playIndex + 1);
      
      
              }
      
      // playbox.setPlayIndex=index;
      
      
          },
    
  
  playAtIndex : async function (index,offset) {

   epg = epgb4 = epgafter ={};
   if(trace) console.log("here at this ",index );
   if(trace)  console.log("index this ",this.playIndex );
          
   if(trace) console.log("asset",this.assetList);

    //this.assetList = 

      if(!offset)offset=0;

      if(trace)  console.log();
   this.playIndex = (index)? index : this.playIndex+1;
    program = this.assetList[this.playIndex];
    if(trace) console.log("Active",  this.assetList[this.playIndex]);

    p =    this.playIndex;
    if(trace) console.log("here at this ",this.playIndex );
   var VideoArray = [];
    
    // ;this.assetList = sentlist ;
      //$("#timelist").html(` <ul>`);

      player.loadVideoById(program.video_id, program.start, program.stop);
              
    



      this.assetList.forEach((program, p) => {
         // this.assetList[p].net_id = p;
          //program.net_id = p;
          VideoArray[p] = program.video_id;
          addclass = "";
    
          if (p < index - 1) {
              addclass = "boxxhidden";
          };
    
          if (p == index - 1) {
              addclass = "boxxdisable";
          };
    
          if (p == index) {
              addclass = "boxxon";
              startTrim = this.assetList[p].start + offset;
              player.loadVideoById(this.assetList[p].video_id, startTrim, this.assetList[p].stop);
              //cueplayer.cueVideoById(this.assetList[p + 1].video_id, this.assetList[p + 1].start, this.assetList[p + 1].stop);
    
    
          };
  
          if (p == index + 1) {
              addclass = "boxxnext";
          }
    
    /*
          $("#timelist").append(`<a class="cool" ondblclick='playbox.playAtIndex(` + p + `)' >
    <div draggable="true" class="boxx   ` + addclass + `">
        <div class="listlog">` + playbox.secondsToClockM((program.play_start)) + `-` + playbox.secondsToClockM(program.play_end) + `
        </div>
        <div class="listinfo">
        ` + program.net_id + `|` + playbox.secondsToClockM(program.duration) + `</div>
            <div class="boxxtitle shadowbox">
            ` + program.program_name + `</div>
            <div class="btn-group-sm boxxbuttons">
            <button type="button" class="btn btn-dark">Chk</button>
            <button type="button" class="btn btn-dark">|>|</button>
            <button type="button" class="btn btn-dark">Up</button>
            <button type="button" class="btn btn-dark">Dn</button>
          </div>
    
      
            <div class="boxx-pix" style="background-image: url('` + program.thumb_url + `'); background-size: cover;
            background-repeat: no-repeat;"></div>
       
    
            </div>
    </a>`);
    */
    
      });
    
    
      //$("#timelist").append(` </ul>`);
    
    return  { p , addclass , epg , epgb4 , epgafter}
    
    },
  
  playNext: function (xplay) {
  
      // assetList : [],
      // baseList : [],
      // playIndex:0,
      // AssetPlayTime:0,
      // basePlayTime:0,
      
      // playbox.
      
        return; // playbox.formatTime(xplay.getCurrentTime());
         
      },
  
  get getCurrentSession() {
      
      // alert(this.stationDuration);
      
      // amx = this.stationDuration;
      
      
      // a= this.stationDuration.split(":");
      // stationDurationTime = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
      
              stationDurationTime = playbox.setTimeToSeconds(this.stationDuration);
      
      
      // b= this.stationStart.split(":");
      // stationStartTime = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
      
              stationStartTime = playbox.setTimeToSeconds(this.stationStart);
      
              zone = this.timeZone * 3600 * 1000;
              const d = new Date();
              const seconds = d.getTime() + zone;
              holdtime = new Date(seconds).toISOString().slice(11, 19);
      
              c = holdtime.split(":");
              currentTime = (+ c[0]) * 60 * 60 + (+ c[1]) * 60 + (+ c[2]);
              sessionPaDay = this.getSessionPaDay;
      
              if (trace) {
                  console.log("stationDurationTime=" + stationDurationTime);
              }
              if (trace) {
                  console.log(" stationStartTime=" + stationStartTime);
              }
              if (trace) {
                  console.log("currentTime=" + currentTime);
              }
              if (trace) {
                  console.log("asession pa day=" + sessionPaDay);
              }
      
            //  getStationStart;
              compansate = stationStartTime;
      
              if (trace) {
      console.log("firt comp="+compansate );
      console.log("oneday="+ this.oneDay  );
      console.log("start time="+ stationStartTime );
      console.log("time now========="+ currentTime  );
      }
      
              if (currentTime < stationStartTime) {
              
                  compansate = this.oneDay +  stationStartTime;
                 if (trace)  console.log("next comp="+compansate );
      
              }
      
              sessionstart = (currentTime + compansate)  - stationDurationTime;
      
              sessionCount = 0;
      
      
              while (sessionstart > stationDurationTime) {
                  sessionstart = sessionstart - stationDurationTime;
      
      
                  sessionCount = sessionCount + 1;
              }
      
              currentSessionTime = sessionstart;
              if (trace) {
                  console.log("currentSessionTime=" + currentSessionTime);
              }
              if (trace) {
                  console.log("sessionCount=" + sessionCount);
              }
      
              return {currentSessionTime, sessionCount, stationDurationTime, stationStartTime};
      
          },
      
  setTimeToSeconds: function (time) {
      
              a = time.split(":");
              return stationDurationTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);
      
          },
  get getCurrentTime() {
      // stationStart:
      // sstime
              text = this.stationStart;
              ray = text.split(":");
              sstime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);
      
      
              return sstime;
      
          },
  get showClock() {
              zone = this.timeZone * 3600 * 1000;
              const d = new Date();
              const seconds = d.getTime() + zone;
              return new Date(seconds).toISOString().slice(11, 19);
          },
      
  playTimeClock: function (xplay) {
              return playbox.formatTime(xplay.getCurrentTime());
          },
mobileAndTabletCheck : function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
             check = true;
            })(navigator.userAgent||navigator.vendor||window.opera);
            return check;
          },
  playTime: function (xplay) {
              return xplay.getCurrentTime();
          },
      
      // =================================== player elpesed  count down  opposite of playtime ================== codes
      
  playLeftClock: function (xplay) {
              ttime = xplay.getDuration() - xplay.getCurrentTime();
      
              return playbox.formatTime(ttime);
      //
      // new Date(ttime).toISOString().slice(11, 19);
          },
      
  playLapsed: function (xplay) {
              ttime = "";
              if (playbox.isPlay) {
                  ttime = xplay.getDuration() - xplay.getCurrentTime();
              }
              return Math.round(ttime);
      //
      // new Date(ttime).toISOString().slice(11, 19);
      
          },
      
  durationClock: function (xplay) {
              return playbox.formatTime(xplay.getDuration());
          },
      
  duration: function (xplay) {
              return xplay.getDuration();
          },
      
  formatTime: function (time) {
              time = Math.round(time);
      
              var minutes = Math.floor(time / 60),
                  seconds = time - minutes * 60;
      
              seconds = seconds < 10 ? "0" + seconds : seconds;
      
              return minutes + ":" + seconds;
          },
      
      
   secondsToClock: function (secs) {
              var sec_num = parseInt(secs, 10);
              var hours = Math.floor(sec_num / 3600);
              var minutes = Math.floor(sec_num / 60) % 60;
              var seconds = sec_num % 60;
      
              return [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).filter((v, i) => v !== "00" || i > 0).join(":");
          },
      
      
  secondsToClockM: function (secs) {
              var sec_num = parseInt(secs, 10);
              var hours = Math.floor(sec_num / 3600);
              var minutes = Math.floor(sec_num / 60) % 60;
              var seconds = sec_num % 60;
      
              return [hours, minutes].map((v) => (v < 10 ? "0" + v : v)).filter((v, i) => v !== "00" || i > 0).join(":");
          },
      
  startClock: function () {
    console.log( "clock starting ...");
  return setInterval(playbox.inClock, 1000);
          },
      
  inClock: function () {
              playbox.iclockWork();

      // ================================================================== internal clock ================== codes
      tickclock++
      timeToGo=0;
     // console.log("offset=",index.offset);
    //console.log("video=",program.video_id);
    //console.log(player);

  if(index && tickclock>2){

//if (index.offset+3>player.getDuration()) playbox.playAtIndex(null,0 )

  }

 // $("#info").html("off:"+playbox.secondsToClock(index.offset));
 if(index)timeToGo = player.getDuration() - player.getCurrentTime();
            

 if(trace4){

           
            if(index)  $("#d1").html("m.i:"+index.mark + "ni:"+ playbox.playIndex);
            if(index)   $("#d2").html("I.os:"+playbox.secondsToClock(index.offset));
            if(index)   $("#d3").html("off:"+playbox.secondsToClock(timeToGo)+" of "+playbox.secondsToClock(index.duration));

            if(index) $("#info2").html(index.video_id+" | "+ programs[index.mark].video_id);
            //  $('#current-time').text(formatTime( player.getCurrentTime() ));
           // $('#duration').text(formatTime( player.getDuration() ));
   
 }          


/**
 *          sessionTime,
            sessionCount,
            stationDurationTime,
            stationStartTime,
            station_name,
            channel_id,
            info,
            station_id_logo,
            thumb_url,
            timeZone
 * 
 * 
 */

     if(debug){

            if(channel)  $("#c1").html("s:"+channel.sessionCount+" od "+playbox.secondsToClock(channel.sessionTime));
            

             } 
        
          if(timeToGo <5){

            if(debug) {
             if(index)   $("#d4").html("CN:"+playbox.secondsToClock(timeToGo));

}

         
                console.log("===========count down ============");

}

    ;
      // ===================================================================Automatiion engine ===========================================================
if(timeToGo < 2 && tickclock > 30){ playbox.playAtIndex(null,0);

if(debug){
    if(trace4) console.log("===========next coming============");

}

    tickclock=0;

}
        
      
      // clockWork();   //================ for extarnal  appps
      
          },
      
toggleSound: function(event) {
            console.log(player);
          if(player){
            if (player.isMuted()) {
              player.unMute();
            } else {
              player.mute();
            };
          };
          },

//===================================== detection functions

deviceType :  function(checktype){
mobile= "Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i"
xmobile = mobile.split("|");
checkype = (checktype)? checktype : xmobile;
check ="";
 xmobile.forEach(dev=>{
  if(navigator.userAgent.match(dev)){
   console.log("This Device is=",dev);
  check= check+" "+dev;

  }



 })

 return (check!="")? check: "Desktop";

  }
  ,

thisHost: function(){
   return  playbox.detectBrowser()+"|"+playbox.deviceType();
  },
  detectBrowser:  function () {
 
             let userAgent = navigator.userAgent;
             let browserName;
           
             if (userAgent.match(/chrome|chromium|crios/i)) {
               browserName = "Chrome";
             } else if (userAgent.match(/firefox|fxios/i)) {
               browserName = "Firefox";
             } else if (userAgent.match(/safari/i)) {
               browserName = "Safari";
             } else if (userAgent.match(/opr\//i)) {
               browserName = "Opera";
             } else if (userAgent.match(/edg/i)) {
               browserName = "Edge";
             } else if (userAgent.match(/android/i)) {
               browserName = "Android";
             } else if (userAgent.match(/iphone/i)) {
               browserName = "iPhone";
             } else {
               browserName = "Unknown";
             }
           
            return browserName ;
},

muteToplay : async function(xplayer){

if (xplayer.getPlayerState()==-1&&xplayer.isMuted()==false){
  xplayer.mute();
  xplayer.playVideo();

  //prompt prompt mute


}
  console.log("play state="+xplayer.getPlayerState(),"mute="+xplayer.isMuted())


}
,

setScreen :function(screen, logo){

  let viewportHeight = window.innerHeight;
  let viewportWidth = window.innerWidth;
  $('#'+screen).css('width', window.innerWidth);
  $('#'+screen).css('height', window.innerWidth/2);


}


  
  //===================================end of Object

  }


//var trace4=false;
const urlParams = new URLSearchParams(location.search);
 for (const key of urlParams.keys()) {
     console.log("Keys ===>",key);
 }
var trace4=true;
//var debug = false;
var debug = true;
//var trace4 = false;
//var trace = false;
var trace = true;
cCall = "onetv";
apiurl = (called_page)? BASESERVER+"/api/channel/" +called_page:BASESERVER+"/api/channel/" + cCall ;
var imaster;

//onetv---
isYt = true;
YplayGo = true;

var isDone= false;
var active = false;
var programs;
var program;
var channel;
var index;
var oCH;
var xMASTER;
var player;
var tickclock=0;
var toMute = 1;
var baseChannel=(called_page)? called_page:"" ;













  

async function liveBox(xapiurl, callback){

  xMASTER  = await axios.get(xapiurl).then((data)=>{


  callback(data.data);
  //imaster = data.data;

  });






}









const mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

 toMute= mobileAndTabletCheck();
// This code loads the IFrame Player API code asynchronously. This is the Youtube-recommended script loading method
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '480',
    width: '720',
    videoId: 'ba_vd54yZWE',
     playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      loop: 1,
      autohide: 1,
      mute: 1,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onError,
    },
  });


}


  
     

      function onPlayerReady(event) {
     
       // playbox.isPlay=true;
       event.target.mute();
        //--0 event.target.setVolume(0);
        console.log("play ready");

        //--1 event.target.setVolume(50);

        event.target.playVideo();

        // event.target.unMute();
        
        initialize();
        engine();
        playbox.startClock();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;

      function onPlayerStateChange(event) {
        function onPlayerReady(event) {
        
          // event.target.setVolume(0);
         //--1  event.target.setVolume(50);
          event.target.playVideo();
          //setTimeout(player.unMute(),3000)
        }

       // $('#cpinfo').text( playbox.thisHost());
      }

      
      function stopVideo() {
        player.stopVideo();
      }
      function onError() {
        player.stopVideo();
      }



function initialize(){



  // Update the controls on load
  updateTimerDisplay();
  updateProgressBar();

  // Clear any old interval.
  clearInterval(time_update_interval);

  // Start interval to update elapsed time display and
  // the elapsed part of the progress bar every second.
  time_update_interval = setInterval(function () {
      updateTimerDisplay();
      updateProgressBar();
  }, 1000)

}



// This function is called by initialize()
function updateTimerDisplay(){
  // Update current time text display.
 // $('#current-time').text(formatTime( player.getCurrentTime() ));
 // $('#duration').text(formatTime( player.getDuration() ));

  //playbox.iclockWork();
}

playbox.externalclock = function (){


  $('#current-time').text(playbox.secondsToClock( player.getCurrentTime() ));
  $('#duration').text(playbox.secondsToClock( player.getDuration() ));


}

function time_update_interval(){
console.log("..");

}

function formatTime(time){
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
  seconds = time - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ":" + seconds;
}


$('#progress-bar').on('mouseup touchend', function (e) {

  // Calculate the new time for the video.
  // new time in seconds = total duration in seconds * ( value of range input / 100 )
  var newTime = player.getDuration() * (e.target.value / 100);

  // Skip video to new time.
  player.seekTo(newTime);

});


// This function is called by initialize()
function updateProgressBar(){
  // Update the value of our progress bar accordingly.
  $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);








}


//=============================================== startup

function engine(){


  liveBox(apiurl,(imaster)=>{


    programs = imaster.programs;
    channel = imaster.channel
    index = imaster.index;
    program= programs[index.mark+1]
    if(index)console.log(player);
//console.log(" SHOW PROGRAM HERE ->", imaster);
 //payload = {channel: cInfo, programs: data, index: {count:progIndex, offset : markStartoffset , mark: markIndex}};
    if(trace){
    if(index)console.log("offset=",index.offset);
    if(index)console.log("video=",program.video_id);
    if(index)console.log(player);
   } //player.loadVideoById(program.video_id,index.offset);
    //player.playVideo();

    //update payload
    playbox.assetList = programs;
    playbox.playAtIndex(index.mark,index.offset)
    
    .then((xx)=>{

      $('#cpinfo').text("WE ARE TALKING", playbox.thisHost());

      if(playbox.thisHost()=="Chrome|Desktop"){
        player.unMute();
      // isM= mobileAndTabletCheck();
     // $('#cpinfo').text("WE ARE TALKING");
      setTimeout(() => {
        playbox.muteToplay(player);
       // if(talk)player.unMute();
      }, 2000);
      };

      playbox.setScreen('player');




    });
//console.log(" We got her 616");
   
    //playbox.playIndex = playbox.markIndex = index.mark+1;


    

  })
  //console.log(imaster);
 

}





const playAtIndex = function (index,offset) {
        
  if(!offset)offset=0;
  this.playIndex = index;


  var VideoArray = [];

// ;this.assetList = sentlist ;
  $("#timelist").html(` <ul>`);


  this.assetList.forEach((program, p) => {
     // this.assetList[p].net_id = p;
      //program.net_id = p;
      VideoArray[p] = program.video_id;
      addclass = "";

      if (p < index - 1) {
          addclass = "boxxhidden";
      };

      if (p == index - 1) {
          addclass = "boxxdisable";
      };

      if (p == index) {
          addclass = "boxxon";
          startTrim = this.assetList[p].start + offset;
          player.loadVideoById(this.assetList[p].video_id, startTrim, this.assetList[p].stop);
          cueplayer.cueVideoById(this.assetList[p + 1].video_id, this.assetList[p + 1].start, this.assetList[p + 1].stop);


      };
      if (p == index + 1) {
          addclass = "boxxnext";
      }


      $("#timelist").append(`<a class="cool" ondblclick='playbox.playAtIndex(` + p + `)' >
<div draggable="true" class="boxx   ` + addclass + `">
    <div class="listlog">` + playbox.secondsToClockM((program.play_start)) + `-` + playbox.secondsToClockM(program.play_end) + `
    </div>
    <div class="listinfo">
    ` + program.net_id + `|` + playbox.secondsToClockM(program.duration) + `</div>
        <div class="boxxtitle shadowbox">
        ` + program.program_name + `</div>
        <div class="btn-group-sm boxxbuttons">
        <button type="button" class="btn btn-dark">Chk</button>
        <button type="button" class="btn btn-dark">|>|</button>
        <button type="button" class="btn btn-dark">Up</button>
        <button type="button" class="btn btn-dark">Dn</button>
      </div>

  
        <div class="boxx-pix" style="background-image: url('` + program.thumb_url + `'); background-size: cover;
        background-repeat: no-repeat;"></div>
   

        </div>
</a>`);


  });


  $("#timelist").append(` </ul>`);



}


// ======================== imported from onpointerover.ng/stream App

function setisYplay() {
  if (player) {
    isYplay = true;

    //console.log("isYplay is now TRUE");
  } else {
   // console.log("isYplay is not ready");
    setTimeout(() => {
      if (isYt) setisYplay();
    }, 2000);
  }

  return isYplay;
}





function onPlayerStateChange(event) {
  //this.onPlayerStateChange(event);

  if (player.getPlayerState() == 1) {
    $("#xplay").removeClass("fa-pause-circle");

    $("#xplay").addClass("fa-play-circle");
    //"fa-play-circle"
    //player.pauseVideo();
  } else {
    $("#xplay").removeClass("fa-play-circle");
    $("#xplay").addClass("fa-pause-circle");
    //player.playVideo();
  }

  //console.log("we re redy - App 100 ");
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

function stopVideo(event) {
  if (player.getPlayerState() == 1) {
    player.stopVideo();

    $("#xplay").removeClass("fa-pause-circle");

    $("#xplay").addClass("fa-play-circle");
  }
}

function pauseVideo(event) {
  if (YplaySet) {
    if (player.getPlayerState() == 1) {
      player.pauseVideo();

      $("#xplay").removeClass("fa-play-circle");

      $("#xplay").addClass("fa-pause-circle");
    }
  }
}

function playVideo(event) {
  if (isYplay) {
    let dPlayer = document.getElementById("player");

    

    if (dPlayer.getPlayerState() != 1) {
      dPlayer.playVideo();

      $("#xplay").removeClass("fa-pause-circle");

      $("#xplay").addClass("fa-play-circle");
    }
  }
}

function detectMob() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}


function SoundStateChange(event) {
  if (ism3u8) {
    let player2 = document
      .getElementById("player")
      .contentWindow.jwplayer("player2");
    //console.log(player2.getMute());
    player2.setMute();

    if (player2.getMute()) {
      $("#xmute").removeClass("fa-volume-high");

      $("#xmute").addClass("fa-volume-low");
    } else {
      $("#xmute").removeClass("fa-volume-low");

      $("#xmute").addClass("fa-volume-high");
    }
  }

  if (isYt) {
    if (player.isMuted()) {
      player.unMute();

      $("#xmute").removeClass("fa-volume-low");

      $("#xmute").addClass("fa-volume-high");
    } else {
      player.mute();
      $("#xmute").removeClass("fa-volume-high");

      $("#xmute").addClass("fa-volume-low");
    }
  }
}

function PlayerStateChange(event) {
  if (YplayGo) {
    if (ism3u8) {
      let player2 = document
        .getElementById("player")
        .contentWindow.jwplayer("player2");
      player2.playToggle();
      console.log(player2);
      if (player2.getState() == "playing") {
        $("#xplay").removeClass("fa-play-circle");

        $("#xplay").addClass("fa-pause-circle");
      } else {
        $("#xplay").removeClass("fa-pause-circle");

        $("#xplay").addClass("fa-play-circle");
      }
    }

    if (isYt) {
      if (player.getPlayerState() == 1) {
        $("#xplay").removeClass("fa-play-circle");
        $("#xplay").addClass("fa-pause-circle");

        //"fa-play-circle"
        pauseVideo();
      } else {
        $("#xplay").removeClass("fa-pause-circle");

        $("#xplay").addClass("fa-play-circle");
        playVideo();
      }
    }
  }
}


if ( window.location !== window.parent.location ) {
  // The page is in an iframe
 
  $("#player").on('keydown',function(e)
  {             

    window.parent.keyDownTextField(e);
    window.parent.yshowMenu();
    window.parent.navhost.focus();
    window.parent.dynamicmenu.focus();
    
e.preventDefault();

  });


} else {
  // The page is not in an iframe
}