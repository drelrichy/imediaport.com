

    console.log(`
    
     ******************************************
     *                                        *
     *                                        *
     *      Play Back Engine 2.0 Started      *
     *                                        *
     *                                        *
     ******************************************
    
    `);




    
if(typeof toMute==='undefined') var toMute=0;

const  play = {
  nflag: false,
  cflag:false,
  pflag: false,
  nBolt:0,
  
  engine: function (cdata){
  //this  = {...data};
  //      console.log(ldata.data);
  //const {status, message , channel , schedule, data} = cdata;
  this.CDATA =cdata;
  this.VASSETS= this.CDATA.schedule.list;
  console.log(this.VASSETS);
  
   const f1 = `<div  id="plist">
      <article id='vlist' >
        <h1>Program list for ${this.CDATA.channel.channel_name}</h1>
        <dl id='lchild'>
        
          </dl>
          </article> </div>`;
  
    if (engx )$('#plisted').html(f1);
  
  
    var lastCT=0; 
  this.VASSETS.forEach(vasset => {
  
   if( vasset.epg.start=== null){
    vasset.epg.start = lastCT;
  
   vasset.epg.end = lastCT +  vasset.epg.duration ;
  
   }
  
    
  timex ="";
  // vasset.index+": "+imedia.secondsToClockM(vasset.epg.start) +" - "+imedia.secondsToClockM(vasset.epg.end) + '  |' + imedia.secondsToClockM(vasset.epg.duration) ;
  
          const f2 =` <div class="list">
            <dt>${timex}</dt>
            <dd>${vasset.video_title}</dd>
          </div>`;
  
          if (engx)   $('#lchild').append(f2);
  
          lastCT = vasset.epg.end;
  
  });
  
  play.init();
  
  
  },
  now: function(){
  
    play.init();
    player.unMute();
    
  }
  ,
  
  init: function (){
    
  
  VASSETS = this.VASSETS;
  
  const { serverZTime ,sessionCount,  serverTime, stationDurationTime, stationStartTime} = this.CDATA.channel;
  
  
  const sessionTime = padClock + this.CDATA.channel.sessionTime;
  
  iTime = serverZTime ;
  
  
  
  loadUp= 0;
  xfound =0;
  var nIndex =0;
  var nOffSet = 0;
  VASSETS.forEach((program,i)=>{
  
  
    if(loadUp + program.duration > sessionTime  && xfound === 0){
  xfound =1;
  nIndex =i;
  nOffSet =  ( sessionTime  - loadUp );
  Video_ID = program.video_id;
  console.log(program);
  $('#show2').html(program.program_name);
  
  //console.log (">>"+ loadUp, imedia.secondsToClock(loadUp)+"|"+imedia.secondsToClock(sessionTime));
    
  //console.log ("D:" +program.duration+":"+imedia.secondsToClock(program.duration) + "index ="+nIndex ,"offset="+  nOffSet+" | "+imedia.secondsToClock(nOffSet));
  
  play.at({video_id: program.video_id, nIndex, nOffSet});
  
  }
  
   // else console.log (loadUp, imedia.secondsToClock(loadUp));
  
  
  var  imessage = "";
  //` Scount = ${sessionCount}, loadUp = ${loadUp}, STime = ${sessionTime} :${imedia.secondsToClock(sessionTime)} , ServerZTime = ${serverZTime} : ${imedia.secondsToClock(serverZTime)}, serverTime= ${serverTime}, stationDurationTime = ${stationDurationTime}, stationStartTime = ${stationStartTime}`
  
  
  $('#show1').html(imessage);
  
  
  loadUp += program.duration;
  
  
  })
  
  
  
  }
  
  ,
  at: function (mxl){
    this.nBolt=0;
  var {video_id, nOffSet, nIndex } = mxl; 
  
  
  
  play.pflag= true;
   play.pload  = mxl; 
  //this.nIndex= nIndex;
  if (nOffSet === null) nOffSet = 0;
  
  
  console.log("of set at time in Seconds ",nOffSet);
    //videocode =  "&autoplay=1&volume=1&mute=0&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1" 
  
  videocode =  "&mute=0&controls=0&disablekb=1&title=0&share=0&open_playlist=0&origin=https://onetv.ng&autohide=1&enablejsapi=1";
    
  
   if (toMute) videocode =  "&mute=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&origin=https://onetv.ng&autohide=1&enablejsapi=1";
    
   //videosrc =   videosrc + videocode;
   
  //alert(' let dPlayer = document.getElementById("player");');player.loadVideoByUrl(videosrc);
  //videocode =  "?autoplay=1&volume=1&mute=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1&t="+nOffSet+"s";
   
  console.log(mxl);
  
  
  this.pload = mxl;
  this.pflag= true;
  
  
  var doPlay = "https://www.youtube.com/embed/"+video_id+"?t="+nOffSet+"s&autoplay=1"+videocode;
  //var doPlay = "https://www.youtube.com/embed/"+video_id+"?enablejsapi=1&t="+nOffSet+"&autoplay=1";
    
  console.log("---------playing code----------->>>",doPlay);
  
  
  //document.getElementById("player").src=doPlay;
  
  
  
  setTimeout(() => {
   // player.loadVideoById(video_id, nOffSet);
   //document.getElementById("player").src=doPlay;
  }, 3000);
  
  //player.cueVideoById(video_id, nOffSet);
  //player.loadVideoById(video_id, nOffSet);
  //player.playVideo();
    
  },
  clock: function (){
                                                        //===================CLOCK=============
    isPlayer = true;
  
    
  
    if (!playReady) {
      
      console.log('error save ');
  
      
     // return 
    }
  
  
  //if (!playReady) return;
  
  if(play.pflag){
  play.pflag= false;
  
  
  const {video_id, nOffSet, nIndex } = play.pload ; 
  this.nIndex= nIndex;
  
  console.log(player);
  
  
  
  if (typeof player  != 'undefined'){
  
  player.loadVideoById(video_id, nOffSet);
  
  //var doPlay = "https://www.youtube.com/embed/"+video_id+videocode;
  
  //console.log("-------------------->>>",doPlay);
  
  
  //document.getElementById("player").src=doPlay;============
  
  //player.loadVideoByUrl(`https://www.youtube.com/watch?v=${video_id}&autoplay=1&mute=1&t=${nOffSet}`);
  
  //player.loadVideoByUrl(`https://www.youtube.com/watch?v=4yD2RxaQm6M&t=16s`);
  //player.playVideo();=======
  }
  
  }
  
  var duration = 0;
  var   pT;
  var lT;
  //const duration = this.VASSETS[this.nIndex].duration;
  if (playReady){
    pT= player.getCurrentTime();
    lT= Math.round(player.getDuration() - player.getCurrentTime());
  }
  
  if(lT < 5 && !play.cflag){ 
  
    play.nflag= true;
    play.cflag= true;
  
    //console.log("  >>>>>>>>>>>>>>>>>>>>>>>?="+this.VASSETS.length, this.nIndex +1 );
  
  
  
  vasset = this.VASSETS[this.nIndex];
  
  //player.cueVideoById(vasset.video_id);
  
  }
  
  
  if(lT < 1 && play.nflag&&this.nBolt>10){ 
  
    if (this.VASSETS.length > this.nIndex +1){
  
  this.nIndex++;// =============
  
  } else {
  
  
  this.nIndex = 0;
  
  
  }
  vasset = this.VASSETS[this.nIndex];
  
  play.nflag = false;
  play.cflag = false;
  
  
  play.at({video_id: vasset.video_id, nIndex: this.nIndex, nOffSet:0});
  
   //player.loadVideoById(vasset.video_id);//=============
  //player.loadVideoByUrl(`https://www.youtube.com/watch?v=${video_id}&autoplay=1&mute=1&t=${nOffSet}`);
  
  //player.loadVideoByUrl(`https://www.youtube.com/watch?v=4yD2RxaQm6M&t=16s`);
  
  //player.playVideo();//==========
  
  
  
  
  }
  
  
  
  
  
  
  
  // console.log(pT);
  
  //$('#infoo').html('#:'+this.nIndex+"  "+imedia.secondsToClock(pT)+"    :: "+padClock+"  |"+ lT);
  
  
  if (padClock==5 ){
  
    //videocode = (videosrc.includes('?'))? "&autoplay=1&volume=1&mute=0&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1" : "?autoplay=1&volume=1&mute=0&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";
    
    //videosrc =   videosrc + videocode;
  
  
  }
  
  //if(player.getPlayerState()!==1)padClock++;
  this.nBolt++;
  padClock ++;
  
  //console.log(padClock);
  
  //$('#infoo').html(padClock);
  
  }
  
  }
  
  


    const  xxplay = {
        nflag: false,
        cflag:false,
        
        engine: function (cdata){
        //this  = {...data};
        //      console.log(ldata.data);
        //const {status, message , channel , schedule, data} = cdata;
        this.CDATA =cdata;
        this.VASSETS= this.CDATA.schedule.list;
        console.log(this.VASSETS);
        
        
        
         const f1 = `<div  id="plist">
            <article id='vlist' >
              <h1>Program list for ${this.CDATA.channel.channel_name}</h1>
              <dl id='lchild'>
              
                </dl>
                </article> </div>`;
        
          $('#plisted').html(f1);
        
        
          var lastCT=0; 
        this.VASSETS.forEach(vasset => {
        
         if( vasset.epg.start=== null){
          vasset.epg.start = lastCT;
        
         vasset.epg.end = lastCT +  vasset.epg.duration ;
        
         }
        
          
        timex = vasset.index+": "+imedia.secondsToClockM(vasset.epg.start) +" - "+imedia.secondsToClockM(vasset.epg.end) + '  |' + imedia.secondsToClockM(vasset.epg.duration) ;
        
                const f2 =` <div class="list">
                  <dt>${timex}</dt>
                  <dd>${vasset.video_title}</dd>
                </div>`;
        
                $('#lchild').append(f2);
        
                lastCT = vasset.epg.end;
        
        });
        
        play.init();
        },
        now: function(){
        
          play.init();
          player.unMute();
          
        }
        ,
        
        init: function (){
          
        
        VASSETS = this.VASSETS;
        
        const { serverZTime ,sessionCount,  serverTime, stationDurationTime, stationStartTime} = this.CDATA.channel;
        
        
        const sessionTime = padClock + this.CDATA.channel.sessionTime;
        
        iTime = serverZTime ;
        
        
        
        loadUp= 0;
        xfound =0;
        var nIndex =0;
        var nOffSet = 0;
        VASSETS.forEach((program,i)=>{
        
        
          if(loadUp + program.duration > sessionTime  && xfound === 0){
        xfound =1;
        nIndex =i;
        nOffSet =  ( sessionTime  - loadUp );
        Video_ID = program.video_id;
        console.log(program);
        $('#show2').html(program.program_name);
        
        console.log (">>"+ loadUp, imedia.secondsToClock(loadUp)+"|"+imedia.secondsToClock(sessionTime));
          
        console.log ("D:" +program.duration+":"+imedia.secondsToClock(program.duration) + "index ="+nIndex ,"offset="+  nOffSet+" | "+imedia.secondsToClock(nOffSet));
        
        play.at({video_id: program.video_id, nIndex, nOffSet});
        
        }
        
          else console.log (loadUp, imedia.secondsToClock(loadUp));
        
        
        var  imessage = ` Scount = ${sessionCount}, loadUp = ${loadUp}, STime = ${sessionTime} :${imedia.secondsToClock(sessionTime)} , ServerZTime = ${serverZTime} : ${imedia.secondsToClock(serverZTime)}, serverTime= ${serverTime}, stationDurationTime = ${stationDurationTime}, stationStartTime = ${stationStartTime}`
        
        
        $('#show1').html(imessage);
        
        
        loadUp += program.duration;
        
        
        })
        
        
        const ss=
          `info
        : 
        "local music channel"
        serverTime, serverZTime, stationDurationTime, stationStartTime
        : 
        21600`;
        }
        
        ,
        at: function (mxl){
        
        
        const {video_id, nOffSet, nIndex } = mxl; 
        
        console.log(player);
        
        this.pload = mxl;
        this.pflag= true;
        
        player.cueVideoById(video_id, nOffSet);
        player.playVideo();
          
        },
        clock: function (){
        
          if (!playReady) return
        
        if(play.pflag){
        
        const {video_id, nOffSet, nIndex } = play.pload ; 
        this.nIndex= nIndex;
        
        console.log(player);
        
        play.pflag= false;
        
        player.loadVideoById(video_id, nOffSet);
        //player.loadVideoByUrl(`https://www.youtube.com/watch?v=${video_id}&autoplay=1&mute=1&t=${nOffSet}`);
        
        //player.loadVideoByUrl(`https://www.youtube.com/watch?v=4yD2RxaQm6M&t=16s`);
        player.playVideo();
        
        
        }
        
        const duration = this.VASSETS[this.nIndex].duration;
        
        const  pT= player.getCurrentTime();
        const  lT= Math.round(player.getDuration() - player.getCurrentTime());
        
        
        if(lT < 5 && !play.cflag){ 
        
          play.nflag= true;
          play.cflag= true;
        
          //console.log("  >>>>>>>>>>>>>>>>>>>>>>>?="+this.VASSETS.length, this.nIndex +1 );
        
        
        
        vasset = this.VASSETS[this.nIndex];
        
        //player.cueVideoById(vasset.video_id);
        
        }
        
        
        if(lT < 2 && play.nflag){ 
        
          if (this.VASSETS.length > this.nIndex +1){
        
        this.nIndex++;
        
        } else {
        
        
        this.nIndex = 0;
        
        
        }
        vasset = this.VASSETS[this.nIndex];
        
        play.nflag = false;
        play.cflag = false;
         player.loadVideoById(vasset.video_id);
        //player.loadVideoByUrl(`https://www.youtube.com/watch?v=${video_id}&autoplay=1&mute=1&t=${nOffSet}`);
        
        //player.loadVideoByUrl(`https://www.youtube.com/watch?v=4yD2RxaQm6M&t=16s`);
        player.playVideo();
        
        
        
        
        }
        
        
        
        
        
        
        
        // console.log(pT);
        
        $('#info1').html('#:'+this.nIndex+"  "+imedia.secondsToClock(pT)+"    :: "+padClock+"  |"+ lT);
        
        
        
        
        
        //if(player.getPlayerState()!==1)padClock++;
        
        padClock++;
        
        }
        
        }
        
        
        
        