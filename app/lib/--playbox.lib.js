
const eachChannel = {
    name:"",
    channel_id:"",
    info:"",
    station_id_logo:"",
    thumb_url:"",
    timeZone: + 1, //utc  or gmt

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
isPlay: false};



const xptime = {
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

 set setStationStart(sentlist) {
        this.playIndex = 0;
        var VideoArray = [];

        this.assetList = sentlist;
        $("#timelist").html(` <ul>`);


        this.assetList.forEach((program, p) => {
            this.assetList[p].netid = p;
            program.netid = p;
            VideoArray[p] = program.id;


/*
  trimstart   :0,
    trimstop    :0,
    indexStart   :0,
    indexStop    :0,
    indexDuration:0,
    indexTime     :0,
    shedule       : '00:00:00',
    timeEngine : timeEngine

    */

            $("#timelist").append(`<a class="cool" ondblclick='playtime.playAtIndex(` + p + `)' >
  <div draggable="true" class="boxx">
      <div class="listlog">` + playtime.secondsToClock((program.timeEngine - program.duration)) + `-` + playtime.secondsToClock(program.timeEngine) + `
      </div>
      <div class="listinfo">
      ` + program.netid + `|` + playtime.secondsToClock(program.duration) + `</div>
          <div class="boxxtitle shadowbox">
          ` + program.title + `</div>
          <div class="btn-group-sm boxxbuttons">
          <button type="button" class="btn btn-dark">Chk</button>
          <button type="button" class="btn btn-dark">|>|</button>
          <button type="button" class="btn btn-dark">Up</button>
          <button type="button" class="btn btn-dark">Dn</button>
        </div>
  
    
          <div class="boxx-pix" style="background-image: url('` + program.thumbUrl + `'); background-size: cover;
          background-repeat: no-repeat;"></div>
     
 
          </div>
</a>`);


            mxs = `
            
    <l1 ondblclick='playtime.playAtIndex(` + p + `)'  ><div draggable="true" class="boxx">
                <div class="proglist" > <div class="proglist" > ` + program.netid + ` </div><div class="proglist" > ` + playtime.secondsToClock(program.duration) + `</div>

                  <div class="proglist"  > <img class="progximg" height="50px" src="` + program.thumbUrl + ` " /></div> 
                 
                   </div> <div class="proglist ptitle" >  "` + program.title + `",</div> <div class="proglist" > <input type="checkbox"></div><div class="proglist" >` + playtime.secondsToClock(program.timeEngine) + `</div> </div>
    </l1>
    
    
    `;


            this.xlist += program.id + ",";
            console.log(program.id);
            this.VideoArray = VideoArray;


        });

        this.xlist += 'PeNa4auZWBk';

        $("#timelist").append(` </ul>`);

        console.log(player);
        console.log(VideoArray);

// player.loadVideoById(VideoArray[1],0, 0);

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

/*

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


*/


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

    settime: function () { // return this.firstName + " " + this.lastName;
    },

    fullName: function () { // sreturn this.firstName + " " + this.lastName;
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


    playAtIndex: function (index) {
        this.playIndex = index;
        var VideoArray = [];

// ;this.assetList = sentlist ;
        $("#timelist").html(` <ul>`);


        this.assetList.forEach((program, p) => {
            this.assetList[p].netid = p;
            program.netid = p;
            VideoArray[p] = program.id;
            addclass = "";

            if (p < index - 1) {
                addclass = "boxxhidden";
            };

            if (p == index - 1) {
                addclass = "boxxdisable";
            };

            if (p == index) {
                addclass = "boxxon";

                player.loadVideoById(this.assetList[p].id, this.assetList[p].trimstart, this.assetList[p].trimstop);
                cueplayer.cueVideoById(this.assetList[p + 1].id, this.assetList[p + 1].trimstart, this.assetList[p + 1].trimstop);


            };
            if (p == index + 1) {
                addclass = "boxxnext";
            }


            $("#timelist").append(`<a class="cool" ondblclick='playtime.playAtIndex(` + p + `)' >
      <div draggable="true" class="boxx   ` + addclass + `">
          <div class="listlog">` + playtime.secondsToClock((program.timeEngine - program.duration)) + `-` + playtime.secondsToClock(program.timeEngine) + `
          </div>
          <div class="listinfo">
          ` + program.netid + `|` + playtime.secondsToClock(program.duration) + `</div>
              <div class="boxxtitle shadowbox">
              ` + program.title + `</div>
              <div class="btn-group-sm boxxbuttons">
              <button type="button" class="btn btn-dark">Chk</button>
              <button type="button" class="btn btn-dark">|>|</button>
              <button type="button" class="btn btn-dark">Up</button>
              <button type="button" class="btn btn-dark">Dn</button>
            </div>
      
        
              <div class="boxx-pix" style="background-image: url('` + program.thumbUrl + `'); background-size: cover;
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

//const playtime = ptime;

//playtime.timeZone = + 1;

