//console.log(" Stareted ... channel V- 1.2");
console.log ("************************************** channels.js V- 1.4 loaded ******************************");
var menutime =0;

class vvalidate {
  constructor(flag, error, id) {
    this.flag = false;
    this.error = "";
    this.flagid="";
  }
}




function hideMenu(){
 xhideMenu();
}

function xhideMenu(){

  
if(document.getElementById("mxcontrol").style.visibility != "hidden") document.getElementById("mxcontrol").style.visibility = "hidden";
 


  if(document.getElementById("navhost").style.visibility != "hidden") document.getElementById("navhost").style.visibility = "hidden";
  if(document.getElementById("ticker").style.visibility != "visible") document.getElementById("ticker").style.visibility = "visible";


  idleTime =0;

//alert(document.getElementById("mediacontrol").style.visibility);

}
function yshowMenu(){
  
//alert(document.getElementById("navhost").style.visibility);

  //if(document.getElementById("mxcontrol").style.visibility!=null){

  if(document.getElementById("mxcontrol").style.visibility == "hidden") document.getElementById("mxcontrol").style.visibility = "visible";
 // };

  //if(document.getElementById("navhost").style.visibility!=null){
  if(document.getElementById("navhost").style.visibility == "hidden")  document.getElementById("navhost").style.visibility = "visible";
  //};
  if(document.getElementById("ticker").style.visibility == "visible") document.getElementById("ticker").style.visibility = "hidden";
  //};
  idleTime =0;

}

function PlayerStateChange(event) {
    let txt="";
console.log(player);
txt=player.getPlayerState();
alert(txt);
player.playVideo();
txt=player.getPlayerState();
alert(txt);
  //alert("PlayerStateChange(this)");
  if (txt==1) {
    
          player.pauseVideo();
 
  }
  else {
   
          player.playVideo();
     
  } 
}


var flagError  = new vvalidate();

//fflagError.flag = false;


function cxcPlay(url, cFunction) {
getfile="channels/"+url+".xml";



//Read rootFolder.txt File
fetch(getfile).then(function(response) {
  return response
}).then(function(data) {
 return data.text()
}).then(function(Normal) {
 document.getElementById("tvScreen").innerHTML = Normal;
 //video.innerHTML = Normal;
}).catch(function(err) {
 console.log('Fetch problem show: ' + err.message);
});


}




//===Full Screen

//window.addEventListener("load", startup, false);

function startup() {
  // Get the reference to video
  const video = document.getElementById("wideScreen");

  // On pressing ENTER call toggleFullScreen method
  document.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
      toggleFullScreen(video);
    }
  }, false);
}

function toggleFullScreen(video) {
  if (!document.fullscreenElement) {
    // If the document is not in full screen mode
    // make the video full screen
    video.requestFullscreen();
  } else {
    // Otherwise exit the full screen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}


//===== end of full screen


function calledPage(){
  
 if(document.URL.indexOf("#")!=-1&&callerPage=="" ) {currentChannel= document.URL.substring(document.URL.indexOf("#")+1,document.URL.lengt);

callerPage =currentChannel;

document.title = currentChannel+ siteName ;
    //let currentChannel = "onetv";
    //let oldChannel = "";


  if(currentChannel!=""){


  };

 
  

  };

}













function pplayChannel(url, cFunction) {

currentChannel=url;


document.title = currentChannel+siteName;


          if (oldChannel!="") {

            //console.log(" ======>>"+ document.getElementById(oldChannel).className);
//holding
//document.getElementById(oldChannel).className.replace(" active", "");

};
            //holding 
         // if (oldChannel!="" && oldChannel!=currentChannel)document.getElementById(oldChannel).className.replace(" active", "");
         
        var xhttp;
        xhttp=new XMLHttpRequest();



        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {



            if (currentChannel!=oldChannel){

          //console.log(">Call>"+callerPage+"<<");

        //  if()
          if(xhttp.status!=0)  cFunction(this);
            return xhttp
           }
          }
        };

  

   xhttp.open("GET", "channels/"+url+".xml", true);
        //xhttp.open("GET", url, true);
        xhttp.send();

      }

      function myFunction(xhttp) {

  
    
        document.getElementById("tvScreen").innerHTML = xhttp.responseText;
        oldChannel=currentChannel;
      }   // main




function buttonclass(){

  document.getElementById(currentChannel).className += " active";
  var btns = document.getElementsByClassName("btn");
 //console.log (btns);
 for (var i = 0; i < btns.length; i++) {
  // var current = document.getElementsByClassName("active");
 btns[i].className = btns[i].className.replace(" active", "");
  //console.log (i);

};

}

function setActive(url){
    // console.log(url);
   var header = document.getElementById("showMenu");

   var btns = header.getElementsByClassName("btn");

   for (var i = 0; i < btns.length; i++) {
     btns[i].addEventListener("click", function() {
     var current = document.getElementsByClassName("active");
     current[0].className = current[0].className.replace(" active", "");
     this.className += " active";
     });
   }
 }


 function hideMenu(thisMenu){
   magga = document.getElementById("navhost")
//console.log(thisMenu);
//console.log(magga);
//setTimeout( nowHide(magga), 50000000);
 }

function nowHide(thisMenu){
     magga = document.getElementById("navhost")
//console.log("now Ready to hid");

//magga.className.replace(" show", "");
//document.getElementById("menu").click();

}





 xchannels =[];
let siteName =" on OneTV.ng - Live! ";
let callerPage="";
let oldChannel="";
let currentChannel="";
let playChannel="";
//let callerPage=currentChannel;
let url="";


function cPlay(iptvcid ){
    setchannels("cid", iptvcid); 
}

function playchannel (iptvcid, otherobj ) {

    setchannels("cid",iptvcid); 
    player.playVideo();

}

function iPlay(playmedia){
    //<iframe width="726" height="408" src="https://www.youtube.com/embed/ZLGLG0FypqM?list=PLSXwhHiUvMLbEu6fuhZYVS4XW2V_iq9Ex&autoplay=1&volume=1&controls=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1" title="we are one Montage" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;'  allowfullscreen></iframe>

let tvcode = playmedia;

tvcode= tvcode.trim();


if(tvcode.includes('?')){let codeadd = "?autoplay=1&volume=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";
}else {let codeadd = "&autoplay=1&volume=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";
};

if(tvcode.includes('youtube')){



let playcode = tvcode+codeadd;
action.xchad.streamUrl= playcode;

console.log("playing "+iptvc.cid);
console.log("playing url "+iptvc.streamUrl+" and the code="+playcode);

player.loadVideoByUrl(playcode);
    document.getElementById("player").src=playcode;
  //  document.getElementById("channelLogo").src=iptvc.logoUrl;
   

 
    player.playVideo();
   // embedIt(iptvc.streamUrl);
} else 
{
    switchPlayer(player0);
    player.stopVideo();
    document.getElementById(playerB).src="";
    player2.stopVideo();

}


}

function getchannels(iptvc ,feedSelect) {

//<iframe width="726" height="408" src="https://www.youtube.com/embed/ZLGLG0FypqM?list=PLSXwhHiUvMLbEu6fuhZYVS4XW2V_iq9Ex&autoplay=1&volume=1&controls=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1" title="we are one Montage" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;'  allowfullscreen></iframe>

let tvcode = iptvc.streamUrl;

tvcode= tvcode.trim();
//console.log("ready to play"+tvcode)
let codeadd = "&autoplay=1&volume=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";

//tvcode= tvcode.trim();

//alert(tvcode);

if(tvcode.includes('?')){ codeadd = "&autoplay=1&volume=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";
}else { codeadd = "?autoplay=1&volume=1&controls=0&disablekb=1&title=0&share=0&open_playlist=0&random=0&autohide=1&enablejsapi=1";
};

if(tvcode.includes('youtube')){




let playcode = tvcode+codeadd;


//console.log("playing "+iptvc.cid);
console.log("playing url "+iptvc.streamUrl+" and the code="+playcode);

globalplay= playcode;

document.getElementById("player").src=playcode;
  
} else 
{
  //  switchPlayer(player0);
    player.stopVideo();
    document.getElementById(playerB).src="";
    //player2.stopVideo();

}

let playcode = tvcode+codeadd;


//console.log("playing "+iptvc.cid);
//console.log("playing url "+iptvc.streamUrl);

    document.getElementById("player").src=playcode;
    document.getElementById("channelLogo").src=iptvc.logoUrl;
   



}


function setchannels(iptvc ,feedSelect) {

if (iptvc==null)iptvc="all";
if(feedSelect==null)feedSelect="";
//var xchannel;
    console.log ("getchannels(iptvc ,feedSelect) started"+iptvc);
        $.ajax({
            type: "GET",
            url: "https://onetv.ng/server/gc.db.php",
            data: {
                 iptvc: iptvc, // set selection box One value in AJAX POST Request
                 loadMenu: true,
             },
            dataType: "JSON",
            beforeSend: function() {
                console.log(" get starting ..");
            //You can Add some functions to do before sending AJAX Request Eg: Page Loader
            },
            success: function(feedback) {
            
             let dataArr = feedback.data.split("|~|");
            
            let dd = dataArr[0];
            xchannels[0] =  JSON.parse(dd);
               
                if (feedback.status == 1) { //execute if status value 1 on Feed back data from database response



                    switch (iptvc){

case "all":

                    for (let index = 0; index < dataArr.length; index++) {
                         xchannels[index] =  JSON.parse( dataArr[index]);
                        xchan = xchannels[index];
                         if(iptvc=="all") makeMenu("dynamicmenu", xchannels[index],index); // Add new values to selection box Two
                    
                    

                    };
                    break;
case "sl":
        
    var options = $(feedSelect).attr('options');
    
         for (let index = 0; index < dataArr.length; index++) {
        xchannels[index] =  JSON.parse( dataArr[index]);
       xchan = xchannels[index];
       options[options.length] = new Option(xchan.id, xchan.cid, true, true);
         };
       //makeMenu("dynamicmenu", xchannels[index],index); // Add new values to selection box Two
  

break;



case "cid":

feedSelect=feedSelect.trim();

for (let index = 0; index < dataArr.length; index++) {
    xchannels[index] =  JSON.parse( dataArr[index]);
   xchan = xchannels[index];
   
   console.log("|"+xchan.cid+"=show010*****="+feedSelect+"|");
  
    if(xchan.cid.trim()==feedSelect.trim()){ 
     
      xchan.cid = xchan.cid.trim();
      action.xchan = xchan;
        getchannels(xchan);
        //document.getElementById("savechannel").value = dataArr[index];
    };
}
break;

                }

               
                    }


                 else {
                 
console.log(feedback)

                }

            },
            error: function(error) {
           
                console.log(error);

            },
        
        });


let rett = action.cid;
if(iptvc=="all") rett = "home";
        return  rett;
     
    }






    //set values in selection box two
    function makeMenu(parentID, channel, xindex) {
    console.log(channel.cid);

    //<a tabindex="12" accesskey="2"   id="music"      class=""    onclick="  cPlay(this.id, myFunction)" href="#home"  >1Music-TV</a>
let nindex=xindex+10;
        $('#' + parentID).append(
      '<a tabindex="'+nindex+'"       alt="'+channel.cid+'"  id="'+channel.cid+'"    tips="'+channel.cInfo+'"      name="'+channel.cFname+'"   onclick="  ciPlay(this,this.src)" href="#'+channel.cid+'"  >'+channel.cid.toUpperCase()+' </a>'
      
        );

       
    }

    function makeSelect(parentID, channel, xindex) {
        console.log(channel.cid);
    
        //<a tabindex="12" accesskey="2"   id="music"      class=""    onclick="  cPlay(this.id, myFunction)" href="#home"  >1Music-TV</a>
    let nindex=xindex+10;
            $('#' + parentID).append(
          '<a tabindex="'+nindex+'"       alt="'+channel.cid+'"  id="'+channel.cid+'"    tips="'+channel.cInfo+'"      name="'+channel.cFname+'"   onclick="  ciPlay(this,this.src)" href="#'+channel.cid+'"  >'+channel.cid.toUpperCase()+' </a>'
          
            );
    
           
        }
    


function ciPlay(caller, logo){
    console.log("channel ="+caller);

   let imax = setchannels("cid", caller.id );

       
    
    }
    


function ciMenu(caller, logo){
console.log("menu ="+caller);
   

}






window.addEventListener("keydown", (event) => {
  document.getElementById("navhost").focus();
   document.getElementById("navhost").style.visibility = "visible";
    idleTime =0;
      // console.log(event.key);
  //document.getElementById("pressed").innerHTML = event.key;
  //document.getElementById("demo").innerHTML = event.code;
  
  
  
      }, true);
  
  
    
  
  
         $(this).keypress(function (e) {
  
             // console.log(idleTime+"  andd  "+document.getElementById("navhost").style.visibility);
                   idleTime = 0;
                    showMenu();
              }
             );
      
  
  
           
  
  
function timerIncrement() {
              //idleTime = idleTime + 1;
              idleTime ++;
              if (idleTime > 10) {
      
xhideMenu();
//if(document.getElementById("mediacontrol").style.visibility != "hidden") document.getElementById("mediacontrol").style.visibility = "hidden";
  
//if(document.getElementById("navhost").style.visibility != "hidden") document.getElementById("navhost").style.visibility = "hidden";
//idleTime =0;

  console.log(idleTime+"  and  "+document.getElementById("navhost").style.visibility);




                
              }
          }
  
