


function netchannels(iptvc, feedSelect) {
    // alert("TTT");
     
     if (iptvc == null) iptvc = "all";
     if (feedSelect == null) feedSelect = "";
     //var xchannel;
     //console.log ("getchannels(iptvc ,feedSelect) started"+iptvc);
   
     $.ajax({
       type: "GET",
       url: "https://onetv.ng/server/gc.db2.php",
       data: {
         iptvc: iptvc, // set selection box One value in AJAX POST Request
         loadMenu: true,
       },
       dataType: "JSON",
       beforeSend: function () {
         console.log(" get starting ..");
         //You can Add some functions to do before sending AJAX Request Eg: Page Loader
       },
       success: function (feedback) {
         let dataArr = feedback.data.split("|~|");
   
         let dd = dataArr[0];

         xchann[0] = JSON.parse(dd);
   
         if (feedback.status == 1) {
           //execute if status value 1 on Feed back data from database response
   
           switch (iptvc) {
             case "all":
               for (let index = 0; index < dataArr.length; index++) {
                 xchann[index] = JSON.parse(dataArr[index]);
                 xchan = xchann[index];
                 if (iptvc == "all") makeMenu("dynamicmenu", xchann[index], index); // Add new values to selection box Two
               }
               break;
             case "sl":
               //alert(feedSelect);
   
               //alert(dd);
               //var options = $("#"+feedSelect).attr('options');
   
               for (let index = 0; index < dataArr.length; index++) {
                 xchann[index] = JSON.parse(dataArr[index]);
                 xchan = xchann[index];
   
                 addOption(feedSelect, xchan.id, xchan.channel_id);
                 //options[options.length] = new Option(xchan.id, xchan.cid, true, true);
               }
               //makeMenu("dynamicmenu", xchannels[index],index); // Add new values to selection box Two
   
               break;
   
             case "channel_id":
               for (let index = 0; index < dataArr.length; index++) {
                 xchann[index] = JSON.parse(dataArr[index]);
                 xchan = xchann[index];
   
                 if (xchan.channel_id == feedSelect) {
                   action.channel = xchan;
                   getchannels(xchan);
                   //document.getElementById("savechannel").value = dataArr[index];
                 }
               }
               break;
   
   //Re build build -  Form Items ========================================================================
   
             case "ff":
               //alert(xchan.cid+"<--->"+feedSelect);
               for (let index = 0; index < dataArr.length; index++) {
                 xchann[index] = JSON.parse(dataArr[index]);
   
               

                 xchan = xchann[index];

                  //console.log("Old=>",xchan.cid+"<--->|"+feedSelect+"|");
                 // console.log("new=>","|"+xchan.channel_id+"|");
                 xchan.channel_id = xchan.channel_id.trim();
                 feedSelect = feedSelect.trim();

                 if (xchan.channel_id == feedSelect) {
                   action.channel = xchan;
                   //getchannels(xchan);
                   //alert(xchan.cid+"<--->"+feedSelect);
   
                   // document.getElementById("iframe").value=xchan.cFname;
                   document.getElementById("iframe").value=xchan.streamUrl.trim();
                   embedIt(xchan.streamUrl.trim());
   
                 
                   document.getElementById("cName").value = xchan.cFname.trim();
                   //document.getElementsByName("cFname").value=xchan.cFname ;
   
                   document.getElementById("cInfo").value = xchan.cInfo.trim();
                   document.getElementById("cNumber").value = parseInt(
                     xchan.cNumber
                   );
   
                   document.getElementById("key").value = parseInt(xchan.id);
                   document.getElementById("channel_id").value = xchan.channel_id.trim();
                   document.getElementById("xcid").value = xchan.channel_id.trim();
   
                   document.getElementById("logoUrl").value = xchan.logoUrl.trim();
                   formEvenCheck(document.getElementById("logoUrl"));
                   document.getElementById("thumbUrl").value =
                     xchan.thumbUrl.trim();
                   document.getElementById("logoUrl").value = xchan.logoUrl.trim();
                   document.getElementById("ckeyword").value =
                     xchan.ckeyword.trim();
                   let countrystate = xchan.country.trim();
                   let locat = countrystate.split("|");
                   let country = locat[0];
                   let stat = locat[1];
                   $("#country").val(country.trim());
                   xtx = document.getElementById("country").selectedIndex;
                   print_state("state", xtx);
                   $("#state").val(stat.trim());
                   let ctype = xchan.ctype.trim();
                   $("#ctype").val(xchan.ctype.trim());
                   let streamUrlType = xchan.streamUrlType.trim();
                   $("#iframe_url").val(streamUrlType);

                  let cbrand = xchan.cbrand.trim();

                  console.log("cbrand is=====","|"+cbrand+"|");

                  if(cbrand=="same"||cbrand=="none"||cbrand==null) {

                    if(cbrand=="same") document.getElementById("chosecbrand").selectedIndex=1;
                    
                   // $("#chosecbrand").val(cbrand);
                    document.getElementById("cbrand").value = cbrand;


                  } else {  

                    document.getElementById("cbrand").value = cbrand;
                    document.getElementById("chosecbrand").selectedIndex=2; 

                  };
                
console.log("TZ=","|"+xchan.timeZone+"|");
console.log("S=","|"+xchan.StationStartTime+"|");
console.log("D=","|"+xchan.StationDurationTime+"|");

$("#timeZoe").val(xchan.timeZone);
$("#StationStartTime").val(xchan.StationStartTime);
$("#StationDurationTime").val(xchan.StationDurationTime);
 

                 //  document.getElementById("cbrand").value 
                  // let chosecbrand = xchan.chosecbrand.trim();
                //   $("#chosecbrand").val(chosecbrand);

                   //alert(stat+"  "+action.modenum);
   
                   switch (action.modenum) {
                     case 1:
                       document.getElementById("channel_id").disabled = true;
                       document.getElementById("cNumber").disabled = true;
                       break;
                     case 2:
                       document.getElementById("channel_id").disabled = false;
                       document.getElementById("cNumber").disabled = false;
   
                       document.getElementById("channel_id").placeholder = "channel ID?";
                       //document.getElementById("cNumber").placeholder="";
                       document.getElementById("channel_id").value = "";
                       document.getElementById("cNumber").value =
                         1000 + action.csize + 1;
   
                       break;
                   }
   
                   //document.getElementById("savechannel").value = dataArr[index];
                 }
               }
   
               break;
           }
         } else {
           console.log(feedback);
         }
       },
       error: function (error) {
         console.log(error);
       },
     });
   
     //let rett = document.getElementById("savechannel").value;
     if (iptvc == "all") rett = "home";
     return rett;
   }
function loadform(callch) {
    //alert("Index: " + y[x].index + " is " + ;
    var select = document.getElementById("cidSelect");
    var valx = select.options[select.selectedIndex].value;
    var option = select.options[select.selectedIndex].text;
    var ix = select.selectedIndex;
  
    let deform = option;
    action.cid = option;
    action.id = ix;
   console.log("deform=",deform);
    netchannels("ff", deform);
    modeaction();
  
    document.getElementById("cidSelect").disabled = true;
  }
  
  function muchchange(his) {
    if (his.selectedIndex == 0) {
      document.getElementById("messager").innerHTML =
        "<p style='color: red;'>you must select a channel to " +
        action.mode +
        "</p>";
      //+ action.mode +" Channel."+action.cid;
  
      // alert("you must select a channel to edit")
      his.focus();
    }
  }
  
  function localizeaction() {
    //please make automatic based on user location
  
    document.getElementById("country").selectedIndex = 168;
    print_state("state", 168);
  }
  
  function reload() {
    let optiondefault = "<option value='New'> New Channels..</option>";
  
    optlist = document.getElementById("cidSelect");
    optlist.innerHTML = optiondefault;
    document.getElementById("channelform").reset();
    document.getElementById("cidSelect").selectedIndex = 0;
    document.getElementById("modeSelect").selectedIndex = 0;
    // document.getElementById("cidSelect").disabled=true;
    action.cid = "new";
    action.mode = "new";
    action.modenum = 0;
    action.id = 0;
    localizeaction();
  }
  