
//var trace = true;
var trace = false;
const axios = require('axios'); // node
const ytApi = require("youtube-search-api");
const YOUR_API_KEY ='AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s';

/*
import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key':'806e8e51fbmshd10d124bfd1947fp1c8d12jsn044e04d49402',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  },
};

export const fetchFromAPI = async (url) => {





  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

*/

playtime = {

    name: "",
    channel_id: "",
    info: "",
    station_id_logo: "",
    thumb_url: "",
    timeZone: + 1,
    holding: "",
    buffer :15,
    id: 0,
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

   YOUR_API_KEY:`AIzaSyCW2pN3FIDIcCNiLjoHFLIzjbp7mRFLAMI`,
   maxResults : 10,
   playlist : 'PLBrVE3sZeUAeMNYDN-Hr9q4Y5H-ctVbt9',
    
 maxrs:`&maxResults=${this.maxResults}`,
   youtubeURL :'https://www.googleapis.com/youtube/v3/',
  playlistsearch : 'playlistItems?part=snippet,status,contentDetails'+this.maxrs,
   videoidsearch :`videos?part=snippet,contentDetails,status,statistics`,
   ols :`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=`,
    
    


    client_id:'AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s',

// ================================= make play list ===============================

// setStationStart : function (sentlist){

    set setStationStart(sentlist) {
        this.playIndex = 0;
        var VideoArray = [];

        this.assetList = sentlist;
// $("#timelist").html(` <ul>`);


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

/*
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
*/


            this.xlist += program.id + ",";
            console.log(program.id);
            this.VideoArray = VideoArray;


        });

        this.xlist += 'PeNa4auZWBk';

// $("#timelist").append(` </ul>`);

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


    setChannel: async  function (nCH) {

        /***
         * The data-> {
  id: 207,
  channel_id: 'onetv',
  cNumber: 78,
  cid: 'onetv',
  cFname: '1tv one channel',
  cInfo: 'onetv lifestyle channel',
  streamUrl: '#onetv',
  streamUrlType: 'httpS',
  streamUrlMore: '',
  logoUrl: 'https://onetv.ng/images/id/1tv-home.png',
  thumbUrl: '',
  cmemo: '',
  country: 'Nigeria|Rivers',
  ctype: 'Lifestyle',
  ckeyword: '',
  status: '',
  cbrand: 'same',
  timeZone: '+01:00',
  StationStartTime: '06:00:00',
  StationDurationTime: '06:00:00',
  createdAt: 2023-05-26T20:43:32.000Z,
  updatedAt: 2023-05-26T20:43:32.000Z
}
         */


        station_name = this.name = nCH.cFname || this.name;

        channel_id = this.channel_id = nCH.channel_id || this.channel_id;

// this.info = nCH.info|| this.info;
        info = this.info = nCH.info || this.info;
        channel_id = this.channel_id = nCH.channel_id || this.channel_id;
        station_id_logo = this.station_id_logo = nCH.logoUrl || this.station_id_logo;
        thumb_url = this.thumb_url = nCH.thumbUrl || this.thumb_url;
        timeZone = this.timeZone = parseInt(nCH.timeZone )|| this.timeZone;
       
        if(trace) console.log("time Zone",timeZone);


        this.stationStart = stationStart = playtime.secondsToClock(nCH.StationStartTime);
        this.stationDuration= stationDuration = playtime.secondsToClock(nCH.StationDurationTime);
        const stationDurationTime = this.stationDurationTime = nCH.StationDurationTime;
        const stationStartTime = this.stationStartTime = nCH.StationStartTime;
        
        

        zoneSeconds = this.timeZone * 3600;
        //this.stationStartTime = stationStartTime = stationStartTime;//+ zoneSeconds;
        if(trace)console.log("station duration", stationDurationTime);

       
        const d = new Date();

        if(trace) console.log("zone compensation",playtime.secondsToClock(zoneSeconds));
        const seconds = d.getTime() + zoneSeconds;
        if(trace) console.log("T now",playtime.secondsToClock(seconds));

        holdtime = new Date(seconds).toISOString().slice(11, 19);

        c = holdtime.split(":");
        this.currentTime =  currentTime = (+ c[0]) * 60 * 60 + (+ c[1]) * 60 + (+ c[2]);
        this.serverZoneTime= serverZoneTime = currentTime + zoneSeconds;
        this.serverZTime = serverZTime = serverZoneTime;
        if(trace)console.log("currentTime",playtime.secondsToClock(currentTime));
        if(trace) console.log("ServerZoneTime",playtime.secondsToClock(serverZTime));
        sessionPaDay = this.getSessionPaDay;
        serverTime = currentTime;



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
if (serverZoneTime < stationStartTime) {

    compansate = this.oneDay + stationStartTime;
    if (trace) {
        console.log("next comp=" + compansate);
    }

}

sessionstart = (serverZoneTime + compansate) - stationDurationTime;

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
        };

   // console.log( " Locale time" , playtime.calcTime('Lagos', '+1'));
   this.currentSessionTime=  this.sessionTime  = currentSessionTime;

// station_name channel_id, info , station_id_logo thumb_url  timeZone holding,
        const sessionTime = currentSessionTime;
        if(trace)console.log("currentSessionTime",playtime.secondsToClock( currentSessionTime));
        return {
            sessionTime: currentSessionTime,
            sessionCount,
            stationDurationTime,
            stationStartTime,
            stationStart,
            stationDuration,
            station_name,
            channel_id,
            info,
            station_id_logo,
            thumb_url,
            timeZone,
            serverZTime ,
            serverTime
        };

    },


calcTime: function(city, offset) {
        // create Date object for current location
        var d = new Date();
    
        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000*offset));
    
        // return time as a string
        return "The local time for city"+ city +" is "+ nd.toLocaleString();
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

            console.log
        
        
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

        return {currentSessionTime, sessionCount, stationDurationTime, stationStartTime};

    },

    setTimeToSeconds: function (time) {

        a = time.split(":");
        return stationDurationTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);

    },
    setClockToSeconds: function (time) {

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

// $("#cuecd").html(playtime.secondsToClock(playtime.playLapsed(player)));


// ===================================================================Automatiion engine ===========================================================


// clockWork();   //================ for extarnal  appps

    },


    playAtIndex: function (index) {
        this.playIndex = index;
        var VideoArray = [];

// ;this.assetList = sentlist ;
// $("#timelist").html(` <ul>`);


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

/* ====
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
*/

        });


// $("#timelist").append(` </ul>`);


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

    },


playNowX: async function (xprograms,channel, callback){
 //let roles = dprograms;
 this.preIxDuration=0;
 this.IxDuration = 0;
  var progIndex= 0;
  var markIndex = 0;
  var VideoIndex="";
  var markStartoffset=0;
  var programs =[];
var preIndex;
 
 

xprograms.forEach((iprogram,i) => {
    program = iprogram.dataValues;


console.log("Pre IxDuration @"+progIndex, this.preIxDuration);
 



  if(program.active){
   // programroles [progIndex]= program;
        //=========================================== our work ====================================================     W O R K  =========================================
  //
  //roles[progIndex]= program;
  programindex = progIndex;
  //console.log("We have..", this.preIxDuration +"|"+ this.IxDuration);
   this.preIxDuration =   this.IxDuration;
 
  program.epg_duration = program.duration -(program.start+program.stop);
    
  
  program.epg_start = playtime.timeTrim ( channel.stationStart + this.preIxDuration);
  program.epg_end = playtime.timeTrim (program.epg_start + program.epg_duration);
    
 durationIndex  = program.epg_duration;
 this.IxDuration += program.epg_duration;

 console.log("We have..", this.preIxDuration +"|"+ this.IxDuration);
 console.log("compare..sessionT", channel.sessionTime  +"|"+ this.preIxDuration);
 
 if (channel.sessionTime <= this.IxDuration  && markIndex==0){
        
    
          index_Video_id= program.video_id;
          durationIndex =  program.duration;
          //markIndex =  progIndex;
          markIndex =  preIndex ;
          markStartoffset = channel.sessionTime - this.preIxDuration ;
          console.log("calculate n compare  session & pre - duration =",channel.sessionTime +" | "+this.IxDuration  );



          console.log("Sected program.start =",program.start );
          console.log("Selected Play from:"+playtime.secondsToClock(program.epg_start )+ "  to "+playtime.secondsToClock(program.epg_end));
          console.log("Selected Session Time :"+playtime.secondsToClock(channel.stationStartTime+ channel.sessionTime)+" Mrk index:"+ markIndex  +" Dur:"+playtime.secondsToClock(program.epg_duration) + "  offs="+playtime.secondsToClock(markStartoffset));
          console.log("  offset="+markStartoffset);
            
          console.log("direct Session Time :"+playtime.secondsToClock( channel.sessionTime)+" Mrk index:"+ markIndex  +" Dur:"+playtime.secondsToClock(program.epg_duration) + "  offs="+playtime.secondsToClock(markStartoffset));
          console.log("pre Index Time:"+playtime.secondsToClockM( this.preIxDuration)+" IndexDuration"+ playtime.secondsToClockM(this.IxDuration));
          
         // console.log("preIxDuration 2", preIxDuration );

         // console.log("IxDuration 2",IxDuration);
      //make epg===================




      } ;

      

 
  
 preIndex = progIndex;
      
      
 
   programs[progIndex]= program; 


  progIndex++

  //console.log("preIndexDuration",preIxDuration);
  //preIndexDuration = Number(indexDuration) ;

      }


    // console.log("session time =>", playtime.secondsToClock(cInfo.sessionTime));  
     });
  
  //console.log("markIndex",markIndex);
  //console.log("our data after ===xxxxxx=>",xprograms);
  //xInfo =JSON.stringify(cInfo)
  payload =  { channel, programs, index: {count:progIndex, offset : markStartoffset , mark: markIndex, video_id:VideoIndex, duration: durationIndex}};
  
  //console.log("our payload  after ============>",payload.programs);

 if (callback) callback( payload);

 return  payload;
},

playNowY: async function (xprograms,channel, callback){
    //let roles = dprograms;
    this.preIxDuration=0;
    this.IxDuration = 0;
     var progIndex= 0;
     var markIndex = 0;
     var VideoIndex="";
     var markStartoffset=0;
     var programs =[];
     var preMarkIndex=0;
    var preIndex;
    
    
   
   xprograms.forEach((iprogram, ipx) => {
       program = iprogram.dataValues;
   
   this.preIxDuration =   this.IxDuration;

   program.epg_duration = program.duration -(program.start+program.stop);
       
     
     program.epg_start = playtime.timeTrim ( channel.stationStart + this.preIxDuration);
     program.epg_end = playtime.timeTrim (program.epg_start + program.epg_duration);
       
    durationIndex  = program.epg_duration;
    this.IxDuration += program.epg_duration;
   
   // console.log("We have..", this.preIxDuration +"|"+ this.IxDuration);
    console.log("compare ST"+channel.sessionTime +" IXD="+this.IxDuration +" PreIXD="+ this.preIxDuration+" VIDEO"+ program.video_id);
    
    if (channel.sessionTime > this.IxDuration - program.duration + this.buffer && markIndex==0){

           
        console.log("INSIDE compare ST"+channel.sessionTime +" IXD="+this.IxDuration +" PreIXD="+ this.preIxDuration);
    
             index_Video_id = program.video_id;
             durationIndex =  program.duration;
             markIndex =  progIndex;
             //markIndex =  preMarkIndex ;
             markStartoffset = channel.sessionTime - this.preIxDuration  ;
             console.log("calculate n compare  session & pre - duration =",channel.sessionTime +" | "+this.IxDuration);
   
   
      console.log("markStartoffset=",markStartoffset +" time="+playtime.secondsToClockM(  markStartoffset));
         //make epg===================
   
   
      }
     
    preMarkIndex = progIndex;
         
         
    
programs[ipx]= program; 
   
   
   
   
     //console.log("preIndexDuration",preIxDuration);
     //preIndexDuration = Number(indexDuration) ;
   
         
   
       // console.log("session time =>", playtime.secondsToClock(cInfo.sessionTime));  
        });
     
     //console.log("markIndex",markIndex);
     //console.log("our data after ===xxxxxx=>",xprograms);
     //xInfo =JSON.stringify(cInfo)
     payload =  { channel, programs, index: {count:progIndex, offset : markStartoffset , mark: markIndex, video_id:VideoIndex, duration: durationIndex}};
     
     console.log("our payload  after ============>",payload.programs);
   
    if (callback) callback( payload);
   
    return  payload;
   },
  


   igetNow: async function (xprograms,channel, callback){
    //let roles = dprograms;
    var MasterTime = 0;
    this.preIxDuration=0;
    this.IxDuration = 0;
     var progIndex= 0;
     var markIndex = 0;
     var VideoIndex="";
     var markStartoffset=0;
     var programs =[];
     var preMarkIndex=0;
    var preIndex;
    var offset =0;
    var mark ;
    var video_id;
    var duration;
  

 console.log("channel start .=============>>>",channel);
 console.log("Session Time",playtime.secondsToClock(channel.sessionTime));
   
   xprograms.forEach((iprogram, ipx) => {
    program = iprogram.dataValues;
    duration = program.duration - (program.start + program.stop);

    if(ipx==0){
dholding = 0;
allduration =0;

    } else {

     dholding =+ lastduration;
      video_id= program.video_id;
    // var  duration;

    };

    const sTime = channel.sessionTime;
    const cSession = channel.sessionCount;

/*** 
    console.log("The Current Session time is =", sTime);
    console.log("The Current Session count =", cSession);
    console.log("Down side dholding =", allduration );
    console.log("Upside dholding+duration =", dholding+duration);
   
*/
   // payload =  { channel, programs, index: {count:ipx , offset , mark , video_id, duration }};
     

 if (sTime > allduration  && sTime < allduration +duration){

 console.log("Down side dholding =", allduration );
 console.log("Upside dholding+duration =", allduration +duration);

 mark = ipx;
 offset = sTime - allduration;
 preIndex =ipx;


}


programs[ipx]= program;
lastduration = duration;
allduration += duration;
MasterTime  = MasterTime + duration;


   console.log("all time =>", playtime.secondsToClock(MasterTime));  
        });

    console.log("offset====>", offset);
     console.log("mark ====>",mark);
     console.log("video_id ===xxxxxx=>",video_id);video_id
     //xInfo =JSON.stringify(cInfo)

     payload =  { channel, programs, index: {count: preIndex, offset , mark, video_id, duration}};
     
  //console.log("our payload  after ============>",payload.programs);
   
    if (callback) callback( payload);
   
    return  payload;
   },
 

getNow: async function (xprograms,channel, callback){
    //let roles = dprograms;
    var MasterTime = 0;
    this.preIxDuration=0;
    this.IxDuration = 0;
     var progIndex= 0;
     var markIndex = 0;
     var VideoIndex="";
     var markStartoffset=0;
     var programs =[];
     var preMarkIndex=0;
    var preIndex;
    var offset =0;
    var mark ;
    var video_id;
    var duration;
  

 console.log("channel=============>>>",channel);
 console.log("Session Time",playtime.secondsToClock(channel.sessionTime));
   
   xprograms.forEach((iprogram, ipx) => {
    program = iprogram.dataValues;
    duration = program.duration - (program.start + program.stop);

    if(ipx==0){
dholding = 0;
allduration =0;

    } else {

     dholding =+ lastduration;
      video_id= program.video_id;
    // var  duration;

    };

    const sTime = channel.sessionTime;
    const cSession = channel.sessionCount;

/*** 
    console.log("The Current Session time is =", sTime);
    console.log("The Current Session count =", cSession);
    console.log("Down side dholding =", allduration );
    console.log("Upside dholding+duration =", dholding+duration);
   
*/
   // payload =  { channel, programs, index: {count:ipx , offset , mark , video_id, duration }};
     

 if (sTime > allduration  && sTime < allduration +duration){

 console.log("Down side dholding =", allduration );
 console.log("Upside dholding+duration =", allduration +duration);

 mark = ipx;
 offset = sTime - allduration;
 preIndex =ipx;


}


programs[ipx]= program;
lastduration = duration;
allduration += duration;
MasterTime  = MasterTime + duration;


   console.log("all time =>", playtime.secondsToClock(MasterTime));  
        });

    console.log("offset====>", offset);
     console.log("mark ====>",mark);
     console.log("video_id ===xxxxxx=>",video_id);video_id
     //xInfo =JSON.stringify(cInfo)

     payload =  { channel, programs, index: {count: preIndex, offset , mark, video_id, duration}};
     
  //console.log("our payload  after ============>",payload.programs);
   
    if (callback) callback( payload);
   
    return  payload;
   },
 
   

playNow: async function (xprograms,channel, callback){
    //let roles = dprograms;
    this.preIxDuration=0;
    this.IxDuration = 0;
     var progIndex= 0;
     var markIndex = 0;
     var VideoIndex="";
     var markStartoffset=0;
     var programs =[];
     var preMarkIndex=0;
    var preIndex;
    var offset =0;
    var mark ;
    var video_id;
    var  duration;
  

 //console.log("channel",channel);
   
   xprograms.forEach((iprogram, ipx) => {
    program = iprogram.dataValues;
    duration = program.duration - (program.start + program.stop);

    if(ipx==0){
dholding = 0;
allduration =0;

    } else {

     dholding =+ lastduration;
      video_id= program.video_id;
    // var  duration;

    };

    const sTime = channel.sessionTime;
    const cSession = channel.sessionCount;


    console.log("The Current Session time is =", sTime);
    console.log("The Current Session count =", cSession);
    console.log("Down side dholding =", allduration );
    console.log("Upside dholding+duration =", dholding+duration);
   

   // payload =  { channel, programs, index: {count:ipx , offset , mark , video_id, duration }};
     

 if (sTime > allduration  && sTime < allduration +duration){

 console.log("Down side dholding =", allduration );
 console.log("Upside dholding+duration =", allduration +duration);

 mark = ipx;
 offset = sTime - allduration;
 preIndex =ipx;


}


programs[ipx]= program;
lastduration = duration;
allduration += duration;
/*


 
   
   this.preIxDuration =   this.IxDuration;

   program.epg_duration = program.duration -(program.start+program.stop);
       
     
     program.epg_start = playtime.timeTrim ( channel.stationStart + this.preIxDuration);
     program.epg_end = playtime.timeTrim (program.epg_start + program.epg_duration);
       
    durationIndex  = program.epg_duration;
    this.IxDuration += program.epg_duration;
   
   // console.log("We have..", this.preIxDuration +"|"+ this.IxDuration);
    console.log("compare ST"+channel.sessionTime +" IXD="+this.IxDuration +" PreIXD="+ this.preIxDuration+" VIDEO"+ program.video_id);
    
    if (channel.sessionTime > this.IxDuration - program.duration + this.buffer && markIndex==0){

           
        console.log("INSIDE compare ST"+channel.sessionTime +" IXD="+this.IxDuration +" PreIXD="+ this.preIxDuration);
    
             index_Video_id = program.video_id;
             durationIndex =  program.duration;
             markIndex =  progIndex;
             //markIndex =  preMarkIndex ;
             markStartoffset = channel.sessionTime - this.preIxDuration  ;
             console.log("calculate n compare  session & pre - duration =",channel.sessionTime +" | "+this.IxDuration);
   
   
      console.log("markStartoffset=",markStartoffset +" time="+playtime.secondsToClockM(  markStartoffset));
         //make epg===================
   
   
      }
     

    preMarkIndex = progIndex;
         
         
    
programs[ipx]= program; 
   
   
   
   
     //console.log("preIndexDuration",preIxDuration);
     //preIndexDuration = Number(indexDuration) ;
   */
         
   
       // console.log("session time =>", playtime.secondsToClock(cInfo.sessionTime));  
        });
     
     //console.log("markIndex",markIndex);
     //console.log("our data after ===xxxxxx=>",xprograms);
     //xInfo =JSON.stringify(cInfo)

     payload =  { channel, programs, index: {count: preIndex, offset , mark, video_id, duration}};
     
  //console.log("our payload  after ============>",payload.programs);
   
    if (callback) callback( payload);
   
    return  payload;
   },

timeTrim: function (time){

    //console.log ("the time is =",time);
    return ( this.oneDay>time)? time : time -  this.oneDay;



},



baseFromPlaylistId : async function (playListId,client_id ,runnit){
 
    var token=""; const API_KEY= (client_id)? client_id:YOUR_API_KEY;
    const yURLx = youtubeURL + playlistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
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
  
   xbusData2 = await baseFromVideoId(vidoesById.toString(),"",runnit);
  
  } else {
    xbusData2 = await baseFromVideoId(vidoesById.toString(),"");
  
  
  }
  
  
  
  return xbusData2; 
  // final return will be array with detailed video propert 
  
  
  },

  youtubeSearch: async function (search_params){

    //youtubeSearch(search_params);
  
  console.log(search_params);
  //youtubesearchapi.GetListByKeyword("<keywords>",[playlist boolean],[limit number],[options JSONArray]
  mallam= await ytApi.GetListByKeyword(search_params);
   //mallam = await yt.search(search_params);
   console.log(mallam);
  
   return mallam;
  
  },

  baseFromVideoId: async function(videoById,client_id, runnit ){
 
 
    var token="";
     const API_KEY= (this.client_id)? this.client_id:YOUR_API_KEY;
    const yURLx = this.youtubeURL + this.videoidsearch+`&id=${videoById}&key=${API_KEY}`;
    const dataBus=[];
    moredata = true;
    duration=0;
    //moredata = false;
    var counter = 0;
  var timeEngine =0;
  var xbusData =[];
  const videosByX = [ ];
  //{netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" },];
  
  await axios.get(yURLx+token)
//awaitefetchFromAPI 

.then(function (response) { 
    // handle success
  
  response.data.items.forEach((item,px )=> {
  duration =0;
    //console.log( item);
    // console.log(px);
    //  vidoesById=[ {netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" }];
   if (item.status.embeddable){
   
    duration =  playtime.ytDuration(item.contentDetails.duration);
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
    
  })
  
     });
  
  if(runnit)runnit(videosByX);
  
  return videosByX; // final return will be array with detailed video propert 
  
  
  },
  ytDuration: function (duration) {
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
,  
ytSearch: async function (search_params){

   // client_id:'AIzaSyCoGwLPIE5z5uckQM-',;
   // this.client_id:YOUR_API_KEY;


 var token=""; 
 const API_KEY= (this.client_id)? this.client_id:YOUR_API_KEY;
//const yURLx = youtubeURL + playlistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
    const vidoesById=[];
    const dataBus=[];
    duration=0;
    moredata = true;

    var counter = 0;
//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

const yURLx =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1000&q=${search_params}&type=video&videoEmbeddable=true&videoSyndicated=true&videoType=any&key=${API_KEY}`; 

//Authorization: Bearer [YOUR_ACCESS_TOKEN]
//Accept: application/json




    //youtubeSearch(search_params);
  
  console.log(search_params);
  //youtubesearchapi.GetListByKeyword("<keywords>",[playlist boolean],[limit number],[options JSONArray]
  //mallam= await ytApi.GetListByKeyword(search_params);
   //mallam = await yt.search(search_params);
   console.log(mallam);


   var counter = 0;
  
    while (moredata){

    const response = await   loadApi(yURLx, token);

    //youtubesearchapi.GetListByKeyword("<keywords>",[playlist boolean],[limit number],[options JSONArray])
  
    //response = await ytApi.GetListByKeyword(search_params);

     response.data.items.forEach((item, i )=> {
     px=counter;
   
       
        vidoesById[px]=item.snippet.resourceId.videoId;
  
        var id = item.snippet.resourceId.videoId;
       
       // var title = item.snippet.title;
        //var url = 'https://www.youtube.com/watch?v=' + item.id;
        //var thumb = item.snippet.thumbnails.default.url;
      
        console.log("duration :", item.contentDetails.duration);
        
        xbusData[px] = item;
  
      
        if (px === (response.data.pageInfo.totalResults -1) ) moredata = false;     
  counter++;
     });
  
  token = `&pageToken=${response.data.nextPageToken}`;
  
  
  }
  
  



  
   return mallam;
  



  },

ytubeSearch : async function (search_params,detail,runnit){
const  json = {"web":{"client_id":"424513893067-q9k3tsbjh0u8nhn1gat93hv8omk4p6k0.apps.googleusercontent.com","project_id":"onetv-338322","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["https://onetv.ng:8040/access"],"javascript_origins":["https://onetv.ng:8040"]}};
 const ytweb = json.web;


    if(!detail)detail=false;
    var token="";

 const API_KEY= (this.client_id)? this.client_id:YOUR_API_KEY;
//const yURLx = youtubeURL + playlistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
    const vidoesById=[];
    const dataBus=[];
    const xbusData=[];
    duration=0;
    moredata = true;

    var counter = 0;
//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

const yURLx =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${search_params}&type=video&videoEmbeddable=true&videoSyndicated=true&videoType=any&key=${API_KEY}`; 



    var counter = 0;
 
   while (moredata){
    //const response = await   loadApi(yURLx, token);
  
  console.log(" Sewarching  for",yURLx);

    //const axios = require('axios');

// Make a request for a user with a given ID
await axios.get(yURLx+token)
//awaitefetchFromAPI 

.then(function (res) {
    // handle success

    response = res;
   // console.log(response.data.items);
  


//console.log(response.);
     response.data.items.forEach((item, i )=> {
     px=counter;
   
       //console.log(item.snippet.resourceId);
       // vidoesById[px]=item.snippet.resourceId.videoId;
       vidoesById[px]=item.id.videoId;
  
       // var id = item.snippet.resourceId.videoId;
       
       // var title = item.snippet.title;
        //var url = 'https://www.youtube.com/watch?v=' + item.id;
        //var thumb = item.snippet.thumbnails.default.url;
      
        //console.log(item.contentDetails.duration);
        
        xbusData[px] = item;
  
      
        if (px === (response.data.pageInfo.totalResults -1) ) moredata = false;     
  counter++;
     });
  
  token = `&pageToken=${response.data.nextPageToken}`;
  
    })
    

.catch(function (error) {
  // handle error
  console.log(error);
})
;

moredata=false;  
    
  
  }
  
  
  
 
  
  if(runnit) {
  
    if(!detail){xbusData2 = await playtime.baseFromVideoId(vidoesById.toString(),"",runnit)}  else
 runnit(vidoesById);


  } ;
  
  
  
  return  (detail)? await playtime.baseFromVideoId(vidoesById.toString(),""):vidoesById;
  // final return will be array with detailed video propert 
  
  
  },
  fetchFromAPI : async (url) => {
    this.BASE_URL = 'https://youtube-v31.p.rapidapi.com';


    //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

    xoptions = {
        params: {
          maxResults: 50,
         
        },
        headers: {
          'X-RapidAPI-Key':'806e8e51fbmshd10d124bfd1947fp1c8d12jsn044e04d49402',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        },
      };
      



    
    const { data } = await axios.get(`${this.BASE_URL}/${url}`, xoptions);
  
    return data;
  }

  
  
  

//-----------------------  end of Object --------------------
};

module.exports = playtime;




/*
import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key':'806e8e51fbmshd10d124bfd1947fp1c8d12jsn044e04d49402',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  },
};

export const fetchFromAPI = async (url) => {




    
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

*/