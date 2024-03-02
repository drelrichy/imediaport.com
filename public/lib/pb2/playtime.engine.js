var trace = false;
var umaster;
var imaster;
var indexmark;
var  indexoffset;
 //var trace=true;
 var RAM_MOUNT_CHANNEL_ID="";
 var RAM_REELS=[];
 const XREELS=[];
 const xreels =[];

 const urlParams = new URLSearchParams(location.search);
 for (const key of urlParams.keys()) {
     console.log("Keys ===>",key);
 }

 //ServerUrl+"
const urlP= JSON.stringify(urlParams);

hider ="hidden";

if(urlP.includes('debug')){


    hider ="";


}





 var RAM_CHANNEL={
channel_id:"",
channel_name:"",
programs_duration:''


 }

 cCall = "onetv";
 apiurl = BASESERVER+"/api/channel/" + cCall;
 

  axios.get(apiurl).then((data)=>{
    imaster = data.data;


 console.log(imaster);
 
 });



async function runmaster(cCH, runnit){

 apiurl = BASESERVER+"/api/channel/" + cCH;
 axios.get(apiurl).then((data)=>{
    umaster = data.data;
    if(runnit)runnit(data.data);
 return data.data;

 console.log(imaster);
 
 });

}


const plant = {

    active_channel: "",
    universal_input: {},
    universal_request: "",
    open_flap: "",


    input_focus: function () { // document.getElementById('masterinput').

        $("#masterinput").focus();
        $("#masterinput").css("border", " 3px solid #ccc");
    },

    channel: function (loader) {
        req = this.uinput;
        act = (req == "") ? this.active_channel : req;
        loaded = (loader) ? loader : act;


        console.log("what is  =" + loaded);


        if (loaded == "") {

            message = `<p style='color:red'>No active channel  </p> <p style='color:blue'> Please enter id for existing or new ID for new channel
  
  and click |GO!|`;

            $("#chtabinfo").html(message);

            setTimeout(() => {
                $("#chtabinfo").html("");
            }, 5000);
            plant.input_focus();

            document.getElementById("universalclick").addEventListener("click", plant.channel);


        } else {

            console.log("Now work =" + loaded);


            info = getScheduleByCid(baseChannel, (data) => {

                $("#chtabinfo").html(JSON.stringify(data[0]));

                console.log(data[0]);

            });


            plant.get_channel(loaded, plant.channel_show);


// document.getElementById("universalclick").removeEventListener("click", plant.channel());


// document.getElementById("universalclick").addEventListener("click", plant.channel());

        }


    },

    channel_show: function (ctoget, flag) {},

    get_channel: function (ctoget, callonit) {},

    get uinput() {

        this.universal_input = document.getElementById('masterinput');
// console.log("we dey");
// console.log( this.universal_input );

        return(playtime.isPlay) ? document.getElementById('masterinput').value : "";

    }

};


console.log(" timeline done");
// reel.roll=[];

function universalclick() {}
// =====================================playTime =================
var player = {
    cool: "running",
    getVideoData: function () {}
};

const ptime = {
    name: "",
    channel_id: "",
    info: "",
    station_id_logo: "",
    thumb_url: "",
    timeZone: + 1,
    holding: "",
    id: 00,
    stationStartTime: 0, // in seconds
    stationDurationTime: 0, // in seconds
    stationStart: '06:00:00',
    stationDuration: '06:00:00',
    currentSession: 0, // count starting for 0 for first
    currentSessionTime: 0, // in seconds
    oneDay: 86400, // in seconds
    assetList: [],
    baseList: [],
    sessionPaDay: 0,
    playIndex: 0,
    AssetPlayTime: 0,
    basePlayTime: 0,
    xplay: null,
    xlist: "",
    isPlay: false,

// ================================= make play list ===============================

// setStationStart : function (sentlist){

setChannel: function (nCH) {


    station_name = this.name = nCH.name || this.name;

    channel_id = this.channel_id = nCH.channel_id || this.channel_id;

// this.info = nCH.info|| this.info;
    info = this.info = nCH.info || this.info;
    channel_id = this.channel_id = nCH.channel_id || this.channel_id;
    station_id_logo = this.station_id_logo = nCH.station_id_logo || this.station_id_logo;
    thumb_url = this.thumb_url = nCH.thumb_url || this.thumb_url;
    timeZone = this.timeZone = nCH.timeZone || this.timeZone;


    const stationDurationTime = playtime.setTimeToSeconds(nCH.stationDuration);

    this.stationDurationTime = stationDurationTime;


    this.stationStartTime = stationStartTime = playtime.setTimeToSeconds(nCH.stationStart);
    console.log("station duration", this.stationDurationTime);
    zone = nCH.timeZone * 3600 * 1000;
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

// session Time;
    compansate = stationStartTime;

    if (trace) {
        console.log("firt comp=" + compansate);
        console.log("oneday=" + this.oneDay);
        console.log("start time=" + stationStartTime);
        console.log("time now=========" + currentTime);
    }

    if (currentTime < stationStartTime) {

        compansate = this.oneDay + stationStartTime;
        if (trace) {
            console.log("next comp=" + compansate);
        }

    }

    sessionstart = (currentTime + compansate) - stationDurationTime;

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

// station_name channel_id, info , station_id_logo thumb_url  timeZone holding,
    const sessionTime = currentSessionTime;

    return {
        sessionTime,
        sessionCount,
        stationDurationTime,
        stationStartTime,
        station_name,
        channel_id,
        info,
        station_id_logo,
        thumb_url,
        timeZone
    };

},

get getChannel () {

nCH = this;
    station_name = this.name ;

    channel_id = this.channel_id ;

// this.info = nCH.info|| this.info;
    info = this.info ;
    channel_id = this.channel_id;
    station_id_logo = this.station_id_logo ;
    thumb_url = this.thumb_url;
    timeZone = this.timeZone ;


    const stationDurationTime = playtime.setTimeToSeconds(nCH.stationDuration);

    this.stationDurationTime = stationDurationTime;


    this.stationStartTime = stationStartTime = playtime.setTimeToSeconds(nCH.stationStart);
    console.log("station duration", this.stationDurationTime);
    zone = nCH.timeZone * 3600 * 1000;
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

// getStationStart;
    compansate = stationStartTime;

    if (trace) {
        console.log("firt comp=" + compansate);
        console.log("oneday=" + this.oneDay);
        console.log("start time=" + stationStartTime);
        console.log("time now=========" + currentTime);
    }

    if (currentTime < stationStartTime) {

        compansate = this.oneDay + stationStartTime;
        if (trace) {
            console.log("next comp=" + compansate);
        }

    }

    sessionstart = (currentTime + compansate) - stationDurationTime;

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

// station_name channel_id, info , station_id_logo thumb_url  timeZone holding,
    const sessionTime = currentSessionTime;

    return {
        sessionTime,
        sessionCount,
        stationDurationTime,
        stationStartTime,
        station_name,
        channel_id,
        info,
        station_id_logo,
        thumb_url,
        timeZone
    };

},

    set setStationStart(sentlist) {
        this.playIndex = 0;
        this.assetDuration
        var VideoArray = [];
        var pp=0;

        this.assetList = sentlist;
        $("#timelist").html(` <ul>`);


        this.assetList.forEach((prog, p) => {
          
            program = playtime.setProgram(prog,pp,p);
            this.assetList[p] = program ;

          if(trace2)  console.log("net id",program.net_id)
            this.assetList[p].net_id = p;
            //program.net_id = p;
        pp = program.pp;
            VideoArray[p] = program.video_id;
            
//================================
            
/*



  trimstart   :0,
    trimstop    :0,
    indexStart   :0,
    indexStop    :0,
    indexDuration:0,
    indexTime     :0,
    shedule       : '00:00:00',
    timeEngine : timeEngine
program_id 		net_id	channel_id	play_at	play_index	playday	play_date	listname	program_name description	duration start	stop	video_id	 video_title		video_asset_type		thumb_url		published	createdAt	updatedAt	active



    */



            $("#timelist").append(`<a class="cool" ondblclick='playtime.playAtIndex(` + p + `)' >
  <div draggable="true" class="boxx">
      <div class="listlog">` + playtime.secondsToClockM((program.play_start)) + `-` + playtime.secondsToClockM(program.play_end) + `
      </div>
      <div class="listinfo">
      ` + program.index + `|` + playtime.secondsToClockM(program.duration) + `</div>
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


            mxs = `
            
    <l1 ondblclick='playtime.playAtIndex(` + p + `)'  ><div draggable="true" class="boxx">
                <div class="proglist" > <div class="proglist" > ` + program.net_id + ` </div><div class="proglist" > ` + playtime.secondsToClockM(program.duration) + `</div>

                  <div class="proglist"  > <img class="progximg" height="50px" src="` + program.thumb_url + ` " /></div> 
                 
                   </div> <div class="proglist ptitle" >  "` + program.program_name + `",</div> <div class="proglist" > <input type="checkbox"></div><div class="proglist" >` + playtime.secondsToClockM(program.play_end) + `</div> </div>
    </l1>
    
    
    `;


            this.xlist += program.video_id + ",";
         if(trace2)   console.log(program.video_id);
            this.VideoArray = VideoArray;


        });

        this.xlist += 'PeNa4auZWBk';

        $("#timelist").append(` </ul>`);

        console.log(player);
        console.log(VideoArray);

// player.loadVideoById(VideoArray[1],0, 0);

    },
    //============================++++++++++++++++++++++++++++++++++++++  set Program +++++++++++++++++++++++++++++++

setProgram :  function(prog,pp,p){
    this.session= session = playtime.getCurrentSession;
// {currentSessionTime, sessionCount, stationDurationTime, stationStartTime};

    stationDuration = this.stationDurationTime = session.stationDurationTime ;
    stationStart = this.stationStartTime = session.stationStartTime;

    console.log( "start and duration", stationStart+" | "+ stationDuration);
        //  program_id 		net_id	channel_id	play_at	play_index	playday	play_date	listname	program_name description	duration start	stop	video_id	 video_title		video_asset_type		thumb_url		published	createdAt	updatedAt	active
       ;
    mx = prog;
    potime = stationStart+ (sessionCount -1 )* stationDurationTime;
   mx.index= index = p;
mx.net_id= mx.netid = p;
      //real duration ------
        trim = prog.start +	prog.stop;
        duration = prog.duration - trim;
        if(duration<60)duration=62;

        play_start = potime + pp;
        play_end = play_start + duration
      mx.play_start=  play_start;
      mx.pp = pp+  duration;
      mx.play_end = play_end; mx.index= index; mx.duration = duration ;
//return {play_start, play_end , index, video_id , duration };
return mx;
      },

    get getSessionPaDay() {

        day1 = this.oneDay;

        dtx = this.stationDuration;

        dayc = playtime.setTimeToSeconds(dtx);

        this.sessionPaDay = (day1 / dayc);
        if (trace) {
            console.log("sessions a day =" + this.sessionPaDay + " a day=" + day1 + "  lent=" + dayc);
        }
        return this.sessionPaDay;

    },
    get getStationStart() {
// stationStart:
// sstime
        text = this.stationStart;
        a = text.split(":");
        stationStartTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);

        this.stationStartTime = stationStartTime;
        return stationStartTime;

    },

    set setPlayer(player) {
        this.player = player;

    },
    get getStationDuration() {
// stationStart:
// sstime
        text = this.stationDuration;
        a = text.split(":");
        stationDurationTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);

        this.stationDurationTime = stationDurationTime;
        return stationDurationTime;

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

    extclockWork: function () {},

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


    playAtIndex: function (index,offset) {
        
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


// console.log(player);
// console.log(VideoArray);

// player.loadVideoById(VideoArray[1],0, 0);
// player.cueVideoById(VideoArray[1+1],0, 0);

    },


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


    showtimeClock: function () {
        return toHHMMSS(getSeconds());
    },

    sorttimeclock: function (seconds) {},
    set setextclockWork(func) {
        this.extclockWork = func;

    }
};

const playtime = ptime;

playtime.timeZone = + 1;

function getPlayList(playlist) {

    if (! playlist) {
        playlist = document.getElementById("masterinput").value;
    }

    var ytList = ytube.baseFromPlaylistId(playlist, "", (ret) => { // var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLbej6cHELyyTvOVrZZw3mob","",(ret)=>{
        videoIDs = [];

        ret.forEach((clip, i) => { // console.log(clip);
            videoIDs[i] = clip.id;
        });


        videosx = videoIDs; // .toString;

        playtime.setStationStart = ret;
// console.log( videosx);

    });


}

function getFromID(playlist) {

    if (! playlist) {
        playlist = document.getElementById("masterinput").value;
    }

    var ytList = ytube.baseFromVideoId(playlist, "", (ret) => { // var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLbej6cHELyyTvOVrZZw3mob","",(ret)=>{
        videoIDs = [];

        ret.forEach((clip, i) => { // console.log(clip);
            videoIDs[i] = clip.id;
        });


        videosx = videoIDs; // .toString;

        playtime.setStationStart = ret;
// console.log( videosx);

    });


}
// const ytube = import("lib/ytube1")


$(() => {

    app();

});
function externalClock() { // console.log("clocking outside...");

    if (playtime.isPlay && player) {
        $("#info2").html(player.getVideoData().title);
    };
// $('#current-time').text ( showclock());
    $("#current-time").text(playtime.showClock);

    if (playtime.isPlay && player) {
        $("#duration").text(playtime.playTimeClock(player) + "  | " + playtime.durationClock(player));
    }

    var sess = playtime.getCurrentSession;
// console.log(sess);

    $("#rtclock").text((sess.sessionCount ) + " - " + playtime.secondsToClockM(sess.currentSessionTime) + " - " + playtime.secondsToClockM(sess.stationDurationTime));
// playtime.playLapsed(player)

// if(playtime.playLapsed(player) === 5 )player.loadVideoById("PeNa4auZWBk");

//
}

// const ytube =  {loadFromVideoId : loadFromVideoId() , loadFromPlaylistId :oadFromPlaylistId(), loadApi, showData};

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


// tab.title

const tab = {
open_flap: "",
old_flap: "",
tabs: [],

switch (flap) {

            this.tabs.forEach(tab => {

                $('#' + tab).css("display", "none");
                if (trace) {
                    console.log("hidding " + tab);
                }
            });
            this.old_flap = this.open_flap;
            if (trace) {
                console.log("showing " + flap);
            }

            $('#' + flap).css("display", "inline-block");
            this.title = "<h2 class='tabtitle'>" + flap + "</h2>";
            this.open_flap = flap;

        },

        get uinput() {

            this.universal_input = document.getElementById('masterinput');
    // console.log("we dey");
    // console.log( this.universal_input );
            return document.getElementById('masterinput').value;

        },

        universalClick : function (clicker) {

            clickAct = (clicker) ? clicker : this.open_flap;

            console.log(this.open_flap);

            switch (clickAct) {

                case "tabnet":
                    break;

                case "tabch": tab.switch("tabch");
                    plant.channel(this.uinput);
                    break;

                case "tabsch":
                    break;


                case "tablist":

                console.log('tablist');
tablistaction();


                    break;

                case "tabvideo":
                    break;

                case "":

                    masterCall();


                    break;


            };


        }


    }


    tab.tabs = [
        "tabnet",
        "tabch",
        "tabsch",
        "tablist",
        "tabvideo"
    ];


function masterCall () { // basePlalist

dbVideo = 'videos_id	net_id	name	description	duration	start	stop	video_id	video_title	video_asset_type	thumbUrl';


// var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLZKvBPKDFWqP_VAujIzE9Yg","",(ret)=>{

//var reels = "";
//var promo ="PLSXwhHiUvMLZKvBPKDFWqP_VAujIzE9Yg"; //basePlaylist

 let ix = 1;
var ytList = ytube.baseFromPlaylistId(tab.uinput, "", (ret) => { // videoIDs=[];
splitby="";
   
    ret.forEach((clip, i) => {

console.log("clip.embeddable="+clip.embeddable);

        if (clip.embeddable) {

            tapes[ix] = {

                netid: clip.net_id,
                name: text.trimTo(clip.title, 50),
                videos_id: clip.id,
                video_title: text.trimTo(clip.title, 255),
                description: text.trimTo(clip.description, 1000),
                duration: clip.duration,
                video_asset_type: "youtube",
                thumb_url: clip.thumbUrl,
                start: clip.trimstart,
                stop: clip.trimstop,
                index: {
                    start: clip.indexStart,
                    stop: clip.indexStop,
                    duration: clip.indexDuration,
                    time: clip.indexTime,
                    shedule: clip.shedule,
                    timeEngine: clip.timeEngine
                }

            };

            //var reels = [];

            videos[ix-1] = {
                netid: clip.net_id,
                name: text.trimTo(clip.title, 50),
                videos_id: clip.id,
                video_title: text.trimTo(clip.title, 255),
                description: text.trimTo(clip.description, 1000),
                duration: clip.duration,
                video_asset_type: "youtube",
                thumb_url: clip.thumbUrl,
                start: clip.trimstart,
                stop: clip.trimstop
            };


reelvideo ={
  channel_id: RAM_MOUNT_CHANNEL_ID,
  netid: clip.net_id,
  listname: "open",
  program_name: text.trimTo(clip.title, 150),
  video_id: clip.id,
  video_title: text.trimTo(clip.title, 255),
  description: text.trimTo(clip.description, 1000),
  duration: clip.duration,
  play_at: 0 ,
  play_index: (ix +1),
  video_asset_type: "youtube",
  thumb_url: clip.thumbUrl,
  start: clip.trimstart,
  stop: clip.trimstop,
}

           
          // reel.addVideo = reelvideo ;
           //console.log("duration="+clip.duration);
          //console.log("ix ="+ix);
               reel.addVideo(reelvideo) ;
               reels[ix-1]= reelvideo;
                ix ++;
        }

       
        splitby ="µ|µ";

    });

//console.log(reel.videos);

$("#btn_tablist").click();

tablist

$("#tablist").html("List");

reels.forEach( (reel)=>{

    console.log(reel.duration);
$("#tablist").append(reel.video_title);
$("#tablist").append("<br>Duration="+reel.duration);



});



$("#tablist").addClass('yscroll');


//baseChannel
sendProgramsBulk(RAM_MOUNT_CHANNEL_ID, reels,runback )



});
};

// Object.assign(tab, plant);
const runback =(feedback) => {



console.log (feedback)




}

const playbox={
















loadList: function (playlist,runback) { // basePlalist

         let ix = 1;
         
         
         var ytList = ytube.baseFromPlaylistId(playlist, "", (ret) => { // videoIDs=[];
        splitby="";
           
            ret.forEach((clip, i) => {
        
        
        
                if (clip.embeddable) {
        
                   
 

        reelvideo ={
          channel_id: this.RAM_MOUNT_CHANNEL_ID,
         // program_id: null,
          netid: clip.net_id,
          listname: "open",
          program_name: text.trimTo(clip.title, 150),
          video_id: clip.id,
          video_title: text.trimTo(clip.title, 255),
          description: text.trimTo(clip.description, 1000),
          duration: clip.duration,
          play_at: 0 ,
          play_index: (ix +1),
          video_asset_type: "youtube",
          thumb_url: clip.thumbUrl,
          start: clip.trimstart,
          stop: clip.trimstop,
          play_start: 0,
          play_end: 0,
        }
        
                   
        
                       reel.addVideo(reelvideo) ;
                       reels[ix-1]= reelvideo;
                        ix ++;
                }
        
               
              
            });
        
        //
        
        });
        
        
        
        $("#tablist").addClass('yscroll');
        
        
        //baseChannel
        //sendProgramsBulk(baseChannel, reels,runback )
    if(runback)runback(reels);

return     reels;

},

xsaveList: function (nCH){ // basePlalist
sendProgramsBulk(nCH, reels,runback )
},

stuffList: function (){
    let ix = 0;
   var ytList = ytube.baseFromPlaylistId(tab.uinput, "", (ret) => { // videoIDs=[];
   splitby="";
      
       ret.forEach((clip, i) => {
   
   console.log("clip.embeddable="+clip.embeddable);
   
           if (clip.embeddable) {
   
               tapes[ix] = {
   
                   netid: clip.net_id,
                   name: text.trimTo(clip.title, 50),
                   videos_id: clip.id,
                   video_title: text.trimTo(clip.title, 255),
                   description: text.trimTo(clip.description, 1000),
                   duration: clip.duration,
                   video_asset_type: "youtube",
                   thumb_url: clip.thumbUrl,
                   start: clip.trimstart,
                   stop: clip.trimstop,
                   index: {
                       start: clip.indexStart,
                       stop: clip.indexStop,
                       duration: clip.indexDuration,
                       time: clip.indexTime,
                       shedule: clip.shedule,
                       timeEngine: clip.timeEngine
                   }
   
               };
   
               //var reels = [];
   
               videos[ix] = {
                   netid: clip.net_id,
                   name: text.trimTo(clip.title, 50),
                   videos_id: clip.id,
                   video_title: text.trimTo(clip.title, 255),
                   description: text.trimTo(clip.description, 1000),
                   duration: clip.duration,
                   video_asset_type: "youtube",
                   thumb_url: clip.thumbUrl,
                   start: clip.trimstart,
                   stop: clip.trimstop
               };
   
   
   reelvideo ={
     netid: clip.net_id,
     listname: "open",
     program_name: text.trimTo(clip.title, 150),
     video_id: clip.id,
     video_title: text.trimTo(clip.title, 255),
     description: text.trimTo(clip.description, 1000),
     duration: clip.duration,
     play_at: 0 ,
     play_index: (ix +1),
     video_asset_type: "youtube",
     thumb_url: clip.thumbUrl,
     start: clip.trimstart,
     stop: clip.trimstop,
   }
   
              
             // reel.addVideo = reelvideo ;
              //console.log("duration="+clip.duration);
             //console.log("ix ="+ix);
                  reel.addVideo(reelvideo) ;
                  reels[ix]= reelvideo;
                   ix ++;
           }
   
          
           splitby ="µ|µ";
   
       });
   
   //console.log(reel.videos);
   
   $("#btn_tablist").click();
   
   tablist
   
   $("#tablist").html("List");
   
   reels.forEach( (reel)=>{
   
       console.log(reel.duration);
   $("#tablist").append(reel.video_title);
   $("#tablist").append("<br>Duration="+reel.duration);
   
   
   
   });
   
   
   
   $("#tablist").addClass('yscroll');
   
   
   //baseChannel
   sendProgramsBulk(baseChannel, reels,runback )
   
   
   
   });
   },
 
getloadlist:  function (loadlist,runback) { // basePlalist


    
    
var ytList = ytube.baseFromPlaylistId(loadlist, "", (ret) => { // videoIDs=[];
 splitby="";

 let ix = 0;
 const masterRoles=[];   
 if(trace3)console.log("we are checking", ret);

   ret.forEach((clip, i) => {
   
   
if (clip.embeddable) {
 
   reelvideo ={
     channel_id:RAM_MOUNT_CHANNEL_ID,
    // program_id: null,
     net_id: ix,
     netid: clip.net_id,
     listname: "open",
     program_name: text.trimTo(clip.title, 150),
     video_id: clip.id,
     video_title: text.trimTo(clip.title, 255),
     description: text.trimTo(clip.description, 1000),
     duration: clip.duration,
     play_at: 0 ,
     play_index: ix ,
     video_asset_type: "youtube",
     thumb_url: clip.thumbUrl,
     start: clip.trimstart,
     stop: clip.trimstop,
     play_start: 0,
     play_end: 0,
   }


   console.log("Roles =",ix);
   masterRoles[ix]    = reelvideo;    
   
   //  reel.addVideo(reelvideo) ;
 //xreels[ix]= reelvideo;
 ix ++;

           }
   
       
         
       });

       if(runback)runback( masterRoles);

       return      masterRoles;  
     
   //
   
   });
   
//if(trace3)console.log('our pay load--', xreels);



 }

,


getloadvideo:  function (videolist,runback) { // basePlalist

console.log(" the load contians =",videolist);
    
    
    var ytList = ytube.baseFromVideoId(videolist, "", (ret) => { // videoIDs=[];
     splitby="";
    
     let ix = 0;
     const masterRoles=[];   
     if(trace3)console.log("we are checking", ret);
    
       ret.forEach((clip, i) => {
       
       
    if (clip.embeddable) {
     
       reelvideo ={
         channel_id:baseChannel,
        // program_id: null,
         net_id: ix,
         netid: clip.net_id,
         listname: "open",
         program_name: text.trimTo(clip.title, 150),
         video_id: clip.id,
         video_title: text.trimTo(clip.title, 255),
         description: text.trimTo(clip.description, 1000),
         duration: clip.duration,
         play_at: 0 ,
         play_index: ix ,
         video_asset_type: "youtube",
         thumb_url: clip.thumbUrl,
         start: clip.trimstart,
         stop: clip.trimstop,
         play_start: 0,
         play_end: 0,
       }
    
    
       console.log("Roles =",ix);
       masterRoles[ix]    = reelvideo;    
       
       //  reel.addVideo(reelvideo) ;
     //xreels[ix]= reelvideo;
     ix ++;
    
               }
       
           
             
           });
    
           if(runback)runback( masterRoles);
    
           return      masterRoles;  
         
       //
       
       });
       
    //if(trace3)console.log('our pay load--', xreels);
    
    
    
     },
    
loadvideos: function(){




},

xpurge: function(){},

savetochannel: function(){
   if(RAM_REELS.length <1){

console.log ("noting to save");
return

   }


   bulkReels=[];

   RAM_REELS.forEach((reel,i)=>{
reel.channel_id = RAM_MOUNT_CHANNEL_ID;
bulkReels[i]= reel;

   })
 


 sendProgramsBulk(bulkReels, (feedbak)=>{

console.log(feedbak);
    $('#savebutton').css('color', 'green');



   }  )



},


sideList: function(playload,xlocation){
    $(xlocation).html(`<ol class="ol-days pxlist" style="--month:'MON'" >`);
 

    playload.forEach(program => {

$(xlocation).append(` <li class='noline' >${program.program_name} : ${program.duration}  </li>  `);

isx=  `<a href='' ><li> <div class='pclist'> <div>${program.program_name}   
</div> <div> ${program.duration}</div> <button>X</button> <button> E </button><button>up</button>
<button>Down</button></div> </li> </a>

`    ;           
       // tabmaster"
     //  $('#tabmaster').append(

}); 
//    })

 
$(xlocation).append("</ol>")


    
},


uploadlist: function(PL_id){


    if(RAM_MOUNT_CHANNEL_ID==""){
        console.log ( "a Channel must be mounted first"); 
        return false
        
           }

    if(isUniversal)uni = getUniversal();
    
    
    toLoad = (PL_id)? PL_id :uni;

    //1 Formalities to clear and backup current channels files
   
    if(toLoad.includes('PL')){
   playbox.getloadlist(toLoad,(playload )=>{
    RAM_REELS = playload;

      playbox.sideList(playload,'#tabmaster');
   
            $('#savebutton').css('color', 'red');
            $('#playlistbutton').css('color', 'green');

        })  ;

        return false;


    }




   



if(toLoad==""){
        //raise alarm 
       console.log("Sorry!, No Valid Video IDs or Playlist provides", toLoad);
        return false;
}


//sLoad= JSON.stringify(toLoad);
//console.log(toLoad, sLoad);
//yLoad= sLoad.replace("', '",",");
//xLoad= yLoad.replace("'","");

//yLoad=toLoad.replace(/[^a-zA-Z0-9 ]/g,"");


yLoad=toLoad.replaceAll("', '",",");
 xLoad=yLoad.replaceAll("''","");

//xLoad = xLoad.split(",");

sendToUniversal(xLoad);
playbox.getloadvideo(xLoad,(playload )=>{
    RAM_REELS = playload;

   
      playbox.sideList(playload,'#tabmaster');


            
            $('#savebutton').css('color', 'red');
            $('#playlistbutton').css('color', 'green');
          return  playload;


        })  ;


    

   
   
   
    
    //2. clear curremty setting to normal
    //




},

 update: function(){},
  
   mountchannel: function(channel_id){
    if(isUniversal)uni = getUniversal();
    toMount = (channel_id)? channel_id :uni;



    //1 Formalities to clear and backup current channels files
    if(toMount!=""){

        RAM_MOUNT_CHANNEL_ID = toMount;

$('#infobutton').text("[> "+toMount+" <]");

$('#infobutton').css('background-color', 'green');



    } else {

        //raise alarm 
        console.log("No Channel Id provides ");
    }
    //2. clear curremty setting to normal


      //confirm user authentication and access previlages 

},

isUniversal:()=>{

        return ( document.getElementById('masterinput').value!="")? true:  false;
        
        },
        
getUniversal:()=>{
        
            return  document.getElementById('masterinput').value;
            
            },
info: function(){}
//end of object playbox
        }




function isUniversal(){

return ( document.getElementById('masterinput').value!="")? true:  false;

}

function getUniversal(){

    return  document.getElementById('masterinput').value;
    
    }

    function sendToUniversal(value){

        return  document.getElementById('masterinput').value = value;
        
        }