function exengine(channel_id){

 // cdef = "onetv";
 cdef = "";

  apiurl = (channel_id)? SBASESERVER +"/api/channel/" + channel_id : SBASESERVER +"/api/channel/" + cdef ;
  
  var imaster;
  


  xliveBox(apiurl,(imaster)=>{

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

const xVideo =  programs[index.mark].video_id;

console.log(player);
   playbox.playAtIndex(index.mark,index.offset)

 
  // https://youtu.be/6qv4Frk_row?t=17
    
    .then((xx)=>{

      const codex = '?autoplay=1&t='+index.offset;
      const yembed = 'https://www.youtube.com/embed/';
      let xPlayer = document.getElementById("player");
      var pload =  yembed+ xVideo+codex;
      console.log("pload============",pload);
      xPlayer.src = pload;
     //playVideo();
     

      $('#cpinfo').text("WE ARE TALKING", playbox.thisHost());

      if(playbox.thisHost()=="Chrome|Desktop"){
        player.unMute();
      // isM= mobileAndTabletCheck();
     // $('#cpinfo').text("WE ARE TALKING");
      setTimeout(() => {
        //player.unMute();
        //playbox.muteToplay(player);
       // if(talk)player.unMute();

      }, 1000);
      };


      //playbox.setScreen('player');




    });
//console.log(" We got her 616");
   
    //playbox.playIndex = playbox.markIndex = index.mark+1;


    

  })
  //console.log(imaster);
 



}

console.log(player);

//videoId: "H_H91h6-j9o",
function onYouTubeIframeAPIReady(event) {
  //userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"; 
    console.log( "Ready for Youtube     ===========[]========>version 3.3 <==========[]==========" );
    console.log("index text ", index);
    player = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: "H_H91h6-j9o",
      playerVars: {
        playsinline: 1,
        enablejsapi: 1,
        autoplay: 1,
        mute : 0 ,
        controls: 2,
        disablekb: 1,
        title: 0,
        share: 0,
        open_playlist: 0,
        random: 0,
        autohide: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  
   setTimeout(engine,1000);
  }
  
  let forceplay=0;
  
  
  
  
  function onPlayerReady(event) {
   //player = event.target;
   //player.unMute();
  
    // BLOCKING LEFT and RIGHT KEY PRESS
    let all = document.getElementsByTagName('*');
    for (let element of all) {
        element.addEventListener("keydown", (e) => {
  
          window.parent.dynamicmenu.focus();
  
          
            if ((e.which || e.keyCode) == 37) {
  
  
              
                e.stopImmediatePropagation();
            };
            if ((e.which || e.keyCode) == 39) {
                e.stopImmediatePropagation();
            };
        }, true);
    }
  
  
    isYt = true;
    YplayGo = true;
  
    if (isYplay) console.log("play state=" + player.getPlayerState());
    //if(YplayGo) setTimeout(,3000);
  
   
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
  //console.log("player");
  