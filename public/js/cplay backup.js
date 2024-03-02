cCall = "onetv";
apiurl = "http://1tv.local:8080/api/channel/" + cCall;

var imaster;
var isDone= false;
var active = false;
var programs;
var program;
var index;
var oCH;

var player;

const master  = axios.get(apiurl).then((data)=>{
imaster = data.data;
console.log(imaster);

});

// This code loads the IFrame Player API code asynchronously. This is the Youtube-recommended script loading method
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
     playerVars: {
      autoplay: 1,
      controls: 2,
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
     
       // playtime.isPlay=true;
        // event.target.mute();
        // event.target.setVolume(0);
        console.log("play ready");
        event.target.setVolume(50);

        event.target.playVideo();

        event.target.unMute();
        engine();
        initialize();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        function onPlayerReady(event) {
          // event.target.mute();
          // event.target.setVolume(0);
          event.target.setVolume(50);
          event.target.playVideo();
          // setTimeout(player.unMute(),2000)
        }
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
  $('#current-time').text(formatTime( player.getCurrentTime() ));
  $('#duration').text(formatTime( player.getDuration() ));

  playbox.iclockWork();
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
$(()=>{

setTimeout(() => {

engine()
}, 6000);




})



function engine(){

  //console.log(imaster);
    programs = imaster.programs;
    oCH = imaster.channel
    index = imaster.index;
    program= programs[index.mark]
 //payload = {channel: cInfo, programs: data, index: {count:progIndex, offset : markStartoffset , mark: markIndex}};
    console.log("offset=",index.offset);
    console.log("video=",program.video_id);
    console.log(player);
   // player.loadVideoById(program.video_id,index.offset);
    //player.playVideo();


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


      $("#timelist").append(`<a class="cool" ondblclick='playtime.playAtIndex(` + p + `)' >
<div draggable="true" class="boxx   ` + addclass + `">
    <div class="listlog">` + playtime.secondsToClockM((program.play_start)) + `-` + playtime.secondsToClockM(program.play_end) + `
    </div>
    <div class="listinfo">
    ` + program.net_id + `|` + playtime.secondsToClockM(program.duration) + `</div>
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


const playbox ={


iclockWork: function () {


    // $("#infox").append( "::");
    // console.log("clocking  inside ....");
            playtime.extclockWork();
    
    
            if (playtime.playLapsed <= 5) { // $("#infox").append ("  >>.."+playtime.playLapsed(player));
    
    
            }
    
    
            if (playtime.playLapsed(player) == 2) {
    
                playtime.playAtIndex(this.playIndex + 1);
    
    
            }
    
    // playtime.setPlayIndex=index;
    
    
        },
  

playAtIndex :function (index,offset) {
        
    if(!offset)offset=0;
    this.playIndex = index;
  
  
    var VideoArray = [];
  
  // ;this.assetList = sentlist ;
    //$("#timelist").html(` <ul>`);
  
  
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
        $("#timelist").append(`<a class="cool" ondblclick='playtime.playAtIndex(` + p + `)' >
  <div draggable="true" class="boxx   ` + addclass + `">
      <div class="listlog">` + playtime.secondsToClockM((program.play_start)) + `-` + playtime.secondsToClockM(program.play_end) + `
      </div>
      <div class="listinfo">
      ` + program.net_id + `|` + playtime.secondsToClockM(program.duration) + `</div>
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
  
  
  
  },

playNext: function (xplay) {

    // assetList : [],
    // baseList : [],
    // playIndex:0,
    // AssetPlayTime:0,
    // basePlayTime:0,
    
    // playtime.
    
    
            return; // playtime.formatTime(xplay.getCurrentTime());
        },

get getCurrentSession() {
    
    // alert(this.stationDuration);
    
    // amx = this.stationDuration;
    
    
    // a= this.stationDuration.split(":");
    // stationDurationTime = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    
            stationDurationTime = playtime.setTimeToSeconds(this.stationDuration);
    
    
    // b= this.stationStart.split(":");
    // stationStartTime = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
    
            stationStartTime = playtime.setTimeToSeconds(this.stationStart);
    
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
            return playtime.formatTime(xplay.getCurrentTime());
        },
    
playTime: function (xplay) {
            return xplay.getCurrentTime();
        },
    
    // =================================== player elpesed  count down  opposite of playtime ================== codes
    
playLeftClock: function (xplay) {
            ttime = xplay.getDuration() - xplay.getCurrentTime();
    
            return playtime.formatTime(ttime);
    //
    // new Date(ttime).toISOString().slice(11, 19);
        },
    
playLapsed: function (xplay) {
            ttime = "";
            if (playtime.isPlay) {
                ttime = xplay.getDuration() - xplay.getCurrentTime();
            }
            return Math.round(ttime);
    //
    // new Date(ttime).toISOString().slice(11, 19);
    
        },
    
durationClock: function (xplay) {
            return playtime.formatTime(xplay.getDuration());
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
            return setInterval(playtime.inClock, 1000);
        },
    
inClock: function () {
            playtime.iclockWork();
    // =================================== internal clock ================== codes
    
            $("#cuecd").html(playtime.secondsToClock(playtime.playLapsed(player)));
    
    
    // ===================================================================Automatiion engine ===========================================================
    
    
    // clockWork();   //================ for extarnal  appps
    
        },
    



}