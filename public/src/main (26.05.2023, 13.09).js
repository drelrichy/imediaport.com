console.log(
  "++==================== 1Network Manager - Main Modele version 1.0 =================="
);
//const m3u8playUrl = "../stream/?v=";
const YTplayUrl = "../stream/?v=";

//supress event defaul on form objects and clicks  add class="supress"

const m3u8playUrl = "../stream/?v=";

$(function () {
  console.log("++==================== 1Network Manager 2.0 Started! ");

  const mx2 = get_request("update");
  const xx2 = get_request("code");

  //alert(xx2);
  if (mx2) {
    let xmodeSelect = document.getElementById("modeSelect");
    let xcidSelect = document.getElementById("cidSelect");
    //loadform(actman)

    setTimeout(() => {
      xmodeSelect.selectedIndex = 1;
      modeaction();
    }, 1000);

    setTimeout(() => {
      $("#cidSelect").val(xx2.trim());
      console.log("--------ss-------" + xx2);
    }, 2000);

    setTimeout(() => {
      $("#cidSelect").val(xx2).change();

      console.log("---------------");
    }, 4000);

    //loadform(actman);

    //var conceptName = $('#aioConceptName').find(":selected").text();
    //For selected value

    //var conceptName = $('#aioConceptName').find(":selected").val();

    //alertset(document.getElementById('modeSelect').selectedIndex);
    //setTimeout(xmodeSelec.selectedIndex= 1,6000000000);
    //setTimeout(  $('#cidSelect').val(mx2),25000000000);
    //setTimeout(  console.log('#cidSelect'),25000000000);

    xmodeSelect.onchange = function (event) {
      // modeaction();
      modeaction(event.target);
      //$('#cidSelect').val(mx2)
      $("#cidSelect").val(xx2.trim());
      console.log("Eventtt 111100000"); //
      //muchchange(modeman);
      //localizeaction ();
    };

    xcidSelect.onchange = function (event) {
      // $('#cidSelect').val(mx2.trim()).change();
      console.log("Event ============");
      console.log(event.target);
      loadform(event.target);
      //alert("we see u");
      //$('#cidSelect').val(mx2)
      console.log("eeeee veen tt 111100000"); //
      //muchchange(modeman);
      //localizeaction ();
    };
  }

  //modeaction();
  //muchchange(modeman);
  //localizeaction ();
  //cidSelect"
  //modeset(modeman);

  //--------------------------------

  var filegetter = document.getElementById("fileToUpload");
  var xfile = document.getElementById("fileToUpload");
  var statusP = document.getElementById("forlogoUrl");

  //main();
  print_country("country");
  buildSelect("channeltype", "ctype");

  //set Nigeria as Default 169 -1
  localizeaction();

  //xx = setchannels("sl","cidSelect");

  // File input field trigger when the HTML element is clicked
  $("#dropBox").click(function () {
    //$("#fileToUpload").click();
  });

  // Prevent browsers from opening the file when its dragged and dropped
  $(document).on("drop dragover", function (e) {
    e.preventDefault();
  });

  // Call a function to handle file upload on select file  function(event){
  //$('#fileToUpload').on('change', loadfile);});
  $("#fileToUpload").on("change", function (event) {
    event.preventDefault();
    loadfile(event);
  });

  $("#thumbsUppp").on("change", function (e) {
    e.preventDefault();
    loadfile(e);
  });
});

function setSelectByText(SelectOBJ, valueToSelect) {
  const dd = document.querySelector(SelectOBJ);
  dd.selectedIndex = [...dd.options].findIndex(
    (option) => option.text === valueToSelect
  );
}

function setSelectByVal(SelectOBJ, valueToSelect) {
  const dd = document.querySelector(SelectOBJ);
  dd.selectedIndex = [...dd.options].findIndex(
    (option) => option.text === valueToSelect
  );
}

//<input   style=" float:left; width: 30% ;font-size: 12px; margin: 8px; " for="logo_url" type="file" name="fileToUpload" id="fileToUpload" class="nosupress"  />

//=========================== load file
function echo(mx) {
  console.log(mx);
}
async function loadfile(event) {
  const xmyFile = event.id == null ? event.target : event;

  hostpathname = "https://onetv.ng/images/uploads/";

  const xmessenger = "for" + xmyFile.id;
  const feedus = document.getElementById(xmessenger);
  const xfileURL = document.getElementById(xmyFile.name);
  var xupUrl = "";
  //alert(feedus.id);
  feedus.innerHTML = "Uploading...";
  // Get the files from the form input
  var xfiles = xmyFile.files;
  // Create a FormData object
  var xformData = new FormData();
  var xfile = xfiles[0];

  xformData.append("file", xfile, xfile.name);

  let back = 0;

  if (back) {
    // Set up the request
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    // Open the connection  xhr.open('POST', php_fileserver , true);
    xhr.open("POST", "https://onetv.ng/server/ajaxupload.php", true);
    let back = 0;

    // Set up a handler for when the task for the request is complete
    xhr.onload = function () {
      if (xhr.status == 200) {
        //alert(file.name);

        let resback = xhr.response;
        //alert(resback);
        console.log(resback);
        //alert(resback);
        let back = 0;
        //resback.status==1
        if (back == "1") {
          console.log(resback.msg);

          upUrl = hostpathname + resback.msg;

          let upImage = "url('" + upUrl.replace(" ", "%20") + "')";

          fileURL.value = upUrl.replace(" ", "%20");

          //  alert(logoCase.style.backgroundImage);
          feedus.innerHTML = "Upload copmlete!";
        } else {
          //feedus.innerHTML = this.response.msg;
        }
      } else {
        //
      }
    };

    // Send the data.
    xhr.send(formData);
  }

  $.ajax({
    url: "../server/ajaxupload.php",
    type: "post",
    data: xformData,
    contentType: false,
    processData: false,
    success: function (xreply) {
      const xresponse = JSON.parse(xreply);
      //let resback = response;

      //let back=0;
      //resback.status==1
      if (xresponse.status != 0) {
        console.log(xresponse);

        xupUrl = hostpathname + xresponse.data;

        let xupImage = "url('" + xupUrl.replace(" ", "%20") + "')";

        xfileURL.value = xupUrl.replace(" ", "%20");

        feedus.innerHTML = xresponse.msg;
        // alert(response.msg);
      } else {
        feedus.innerHTML = xresponse.msg;
        console.log(xresponse.msg);
      }
    },
    error: function (error) {
      console.log(error);
      //error code
    },
  });

  xfileURL.focus();
}

//============================ Build ajax Selector ============================================================
//This function will execute on change of selection box One
function buildSelect(category, feedSelect) {
  //alert("show it > --"+phpserverlocation);

  let brand = category; // $("#phoneBrand").val(); //get pre-set value from selection box One
  let mlist = category; //ge
  //url: phpserverlocation+"https://onetv.ng/ajaxgetformDB.php",
  $.ajax({
    type: "POST",
    url: "https://onetv.ng/server/gdb.php",
    data: {
      category: category, // set selection box One value in AJAX POST Request
      loadMenu: true,
    },
    dataType: "JSON",
    beforeSend: function () {
      //    alert();  //You can Add some functions to do before sending AJAX Request Eg: Page Loader
    },
    success: function (feedback) {
      // alert(feedback.responseText);

      //alert(feedback);
      if (feedback.status == 1) {
        //execute if status value 1 on Feed back data from database response

        const dataArr = feedback.data.split(","); // converting Feedback data value to array

        for (let index = 0; index < dataArr.length; index++) {
          addOption(feedSelect, dataArr[index]); // Add new values to selection box Two
        }
      } else {
        // alert(" error ooh "+feedback.status);
        console.log(feedback);
      }
    },
    error: function (error) {
      alert(" error ooh== " + error.responseText);
      console.log(error);
    },
  });
}

//set values in selection box two
function addOption(parentID, optionValue, optionText) {
  if (optionText == null) optionText = optionValue;
  //console.log("|"+optionValue+"|");
  optionText = optionText.trim();
  optionValue = optionValue.trim();
  //console.log("|"+optionValue+"|");
  $("#" + parentID).append(
    `<option value="${optionValue}">
                        ${optionText}
                    </option>`
  );
}

function switchPlayer(toplayer) {
  var x = document.getElementById(playerA);
  var y = document.getElementById(playerB);

  if (toplayer != null) {
    const z = document.getElementById(toplayer);

    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "block";
  } else {
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
  }
}

function xembed(xurl, xcode) {
  if ((ct = 0)) count();

  let rText = "";
  if (xurl.includes(embedyt) && xcode == "SHYE") rText = xurl;
  if (xurl.includes(embedyt) && xcode == "SHYEP") rText = xurl;
  if (xurl.includes(shortyt) && xcode == "SHY")
    rText = xurl.replace(shortyt, embedyt);
  if (xurl.includes(longyt) && xcode == "SHY")
    rText = xurl.replace(longyt, embedyt);
  if (xurl.includes(playyt) && xcode == "SHY")
    rText = xurl.replace(playyt, embedyt);
  if (xurl.includes(playyt) && xcode == "SHYP")
    rText = xurl.replace(playlistyt, playlistemebedyt);
  if (xurl.includes(playlistyt))
    rText = xurl.replace(playlistyt, playlistemebedyt);

  //eSrc= eSrc.replace(playlistyt,playlistemebedyt);"SHYP":

  if (rText == "" && xurl.includes("youtu")) {
    // https://www.youtube.com/watch?v=
    rText = xurl.replace("youtube.com/watch?v=", "youtube.com/embed/");
    rText = xurl.replace("youtu.be/watch?v=", "youtube.com/embed/");
  }

  if (rText == "") rText = xurl;

  console.log(
    "EMBED REPORT =" +
      xurl +
      "<- in and out -> " +
      rText +
      " and Xcode =" +
      xcode
  );

  return rText;
}

function formEvenCheck(xobj) {
  //alert(document.getElementById("urlother").disabled);

  //check for object name if iframe_url
  //alert(xobj.name);


  if (xobj.name == "chosecbrand") {
    const myother = "cbrand";
    //const otherindex = 13;
    const dlogo = document.getElementById("logoUrl");
    const dbrand = document.getElementById("cbrand");
    if (xobj.selectedIndex == 1)dbrand.value="same";

    if (xobj.selectedIndex == 2){
      
      if (dbrand.value=="same" || dbrand.value=="blank" || dbrand.value=="none") dbrand.value= dlogo.value;
  
  
  }
   



  }

  if (xobj.name == "cbrand") {
    const dbrand = document.getElementById("chosecbrand");
    const myother = "cbrand";

    //if (dbrand.value!="same" || dbrand.value!="blank" || dbrand.value!="none")

    switch  (xobj.value  ){
case "none": dbrand.selectedIndex = 0;
break;
case "blank": dbrand.selectedIndex = 0;


  break;
  case "same": dbrand.selectedIndex = 1;


  break;
  case "the same" : dbrand.selectedIndex = 2;

  break;

  dbrand.selectedIndex = 2; 

  break;


    }


  
  }


  if (xobj.name == "streamUrlType") {
    const otherid = "urlother";
    const otherindex = 13;
    const otherobj = document.getElementById("streamUrlMore");
    const sindex = xobj.selectedIndex;
    //alert(document.getElementById("age").disabled);

    //  alert(otherobj.disabled);

    if (xobj.selectedIndex != otherindex && otherobj.disabled == false)
      otherobj.disabled = true;

    switch (sindex) {
      case 0:
        break;

      case 1:
        break;

      case 13:
        //alet("now we are ..");
        otherobj.disabled = false;
        otherobj.focus();

        break;
    }
    //end of switch
  }

  //end of if

  if (xobj.name == "logoUrl") {
    var logoCase = document.getElementById("samplelogo"); //"samplelogo"

    var upUrl = xobj.value;

    let upImage = "url('" + upUrl + "')";
    //  alert(upImage);
    logoCase.style.backgroundImage = upImage;
  }
}

function embedIt(streamUrl) {
  let embedObject = document.getElementById("iframe");

  if ((ct = 0)) count();
  //console.log(player);

  yplayer = document.getElementById("player");
  let xcode = "";
  let day = "";
  //let eTitle="";

  let eSrc = "";
  let xxobj = streamUrl;
  if (xxobj.includes("https")) xcode += "S";
  if (xxobj.includes("http")) xcode += "H";
  if (xxobj.includes("iframe")) xcode += "I";
  if (xxobj.includes("youtube")) xcode += "Y";
  if (xxobj.includes("youtu.be")) xcode += "Y";
  if (xxobj.includes("embed")) xcode += "E";
  if (xxobj.includes(".m3u8")) xcode += "8";
  if (xxobj.includes("list=")) xcode += "P";
  if (streamUrl == "") {
    return "";
  } else {
    //alert(xcode);
    let move = false;

   

    switchPlayer(player0);
    //  stopVideo();
    document.getElementById(playerB).src = "";

    switch (xcode) {
      //clears stuff

      // Case 1
      case "SHIYE":
        //1
alert("na hime!");
        eTitle = getx("title", streamUrl);
        eSrc = getx("src", streamUrl);

        hintText = "youtube embed iframe scured server";
        document.getElementById("iframe_url").selectedIndex = "1";

        if (eTitle != "") document.getElementById("cInfo").value = eTitle;

        if (eSrc != "") {
          eSrc = xembed(eSrc, xcode);
          document.getElementById("iframe").value = eSrc;

          player.loadVideoByUrl(eSrc);

          player.playVideo();
        }
        break;

      //case 2
      case "SHYE":
        hintText = "youtube embed direct scured server";
        document.getElementById("iframe_url").selectedIndex = "2";

        if (eSrc != "") {
          player.loadVideoByUrl(eSrc);
          document.getElementById("iframe").value = eSrc;

          player.playVideo();
        }

        break;

      //case3
      case "SHY":
        hintText = "youtube video link scured server";
        document.getElementById("iframe_url").selectedIndex = "3";

        eSrc = xembed(xxobj, xcode);
        document.getElementById("player").src = eSrc;
        document.getElementById("iframe").value = eSrc;
        player.playVideo();

        player.loadVideoById(eSrc);

        //if (eSrc..includes('play'){ player.loadPlaylist(playlist, previousIndex+1)};

        player.playVideo();

        break;
      //case 4
      case "SHI":
        eSrc = getx("src", streamUrl);
        hintText = "Secured Embeded HTTPS iFrame code";
        document.getElementById("iframe_url").selectedIndex = "4";
        embedObject.value = eSrc;

        if (getx("title", streamUrl) != "") {
          eTitle = getx("title", streamUrl);
          if (eTitle != "") document.getElementById("info").value = eTitle;
        }
        switchPlayer(playerB);
        document.getElementById(playerB).src = eSrc;
        break;

      // case 5
      case "HI":
        eSrc = getx("src", streamUrl);

        if (getx("title", embedObject.value) != "") {
          eTitle = getx("title", streamUrl);
          if (eTitle != "") document.getElementById("info").value = eTitle;
        }
        hintText = "Embeded HTTP iFrame code";
        document.getElementById("iframe_url").selectedIndex = "5";
        document.getElementById("iframe").value = eSrc;

        switchPlayer(playerB);
        document.getElementById(playerB).src = eSrc;
        break;
      //case 6

      case "SH8":
        hintText = "m3u8 HTTPS HLS Live Streaming media Streaming with https";
        document.getElementById("iframe_url").selectedIndex = "6";

        document.getElementById("player").src = m3u8playUrl + streamUrl;

        console.log(m3u8playUrl + streamUrl);
        //player.stopVideo();
        //switchPlayer(playerB);
        //document.getElementById(playerB).src =m3u8player+eSrc;

        break;

      //case 7
      case "H8":
        day = "m3u8 HTTP Live Streaming media Streaming with http link ";
        document.getElementById("iframe_url").selectedIndex = "7";
        player.stopVideo();
        switchPlayer(playerB);
        document.getElementById(playerB).src = m3u8player + eSrc;
        break;

      //case 8
      case "SH":
        hintText = "HTTPS Direct for channel video stream page";
        document.getElementById("iframe_url").selectedIndex = "8";

        switchPlayer(playerB);
        document.getElementById(playerB).src = eSrc;
        break;

      //case 9
      case "H":
        hintText = " HTTP Direct for channel video stream page";
        document.getElementById("iframe_url").selectedIndex = "9";

        switchPlayer(playerB);
        document.getElementById(playerB).src = eSrc;
        break;

      //case 10
      case "S":
        hintText = " Others Securd HTTPS link with details";
        document.getElementById("iframe_url").selectedIndex = "10";
        embedObject.value = eSrc;

      //Case 11
      case "H":
        hintText = " Others Securd HTTP link with details";
        document.getElementById("iframe_url").selectedIndex = "11";
        embedObject.value = eSrc;

        switchPlayer(playerB);
        document.getElementById(playerB).src = eSrc;
        break;

      //Case 12
      case "SHYP":
        hintText = "Youtube Playlist  Video Playlist ID";
        //alert("vergin --"+eSrc);
        document.getElementById("iframe_url").selectedIndex = "14";
        //const playlistyt ="https://www.youtube.com/playlist/list=";
        //const playlistemebedyt ="https://www.youtube.com/embed/playlist/list=";
        eSrc = xembed(streamUrl, xcode);

        //alert(eSrc+" "+streamUrl);

        //embedObject.value= eSrc;  streamUrl

        document.getElementById("player").src = eSrc;
        document.getElementById("iframe").value = eSrc;
        player.playVideo();

        player.loadVideoById(eSrc);

        player.playVideo();
        //switchPlayer(playerA);
        //  document.getElementById(playerB).src = eSrc;
        break;
      //Case 13
      case "SHYEP":
        //alert(eSrc+"| - |"+streamUrl);
        eSrc = streamUrl;
        hintText = "Youtube Playlist emdeded Video Playlist ID";
        document.getElementById("iframe_url").selectedIndex = "14";
        //embedObject.value= embedyt+eSrc;
        //player.loadVideoById(eSrc);

        //eSrc=streamUrl;
        //if (eSrc.includes(playlistemebedyt)){
        document.getElementById("player").src = eSrc;
        //id="iframe"
        document.getElementById("iframe").value = eSrc; //=============================
        // embedObject.value= eSrc;
        player.playVideo();

        //document.getElementById("iframe").value = eSrc;

        //player.loadPlaylist(eSrc.replace(playlistemebedyt,""));

        //player.loadVideoByUrl(eSrc);

        //switchPlayer(playerA);
        //  document.getElementById(playerB).src = eSrc;
        break;
    }
    //end of else
  }

  return 1;
  //};

  //end of function
}

function submitChannel(ev) {
  ev.preventDefault();

  var dbkey = action.id;

  var valid;
  var rout = "https://onetv.ng/server/ajaxsave.php";
  let move = false;
  display = document.getElementById("forsubmit");

  var form = "#channelform"; //defined the #form ID
  var formData = $(form).serializeArray(); //serialize the form into array
  if (action.modenum == 0) rout = "https://onetv.ng/server/ajaxsave.php"; //get the route using attribute action
  if (action.modenum == 1) rout = "https://onetv.ng/server/ajaxupdate.php"; //?key="+dbkey; //get the route using attribute action
  if (action.mode == 2) rout = "https://onetv.ng/server/ajaxsave.php"; //get the route using attribute action

  display.innerHTML = "processing now please wait!";
  //rout = "https://onetv.ng/server/ajaxsave.php";

  move = true;

  if (move) {
    jQuery.ajax({
      url: rout,
      data: formData,
      type: "GET",

      success: function (result) {
        mnews = document.getElementById("forsubmit");
        console.log("result");
        data = JSON.parse(result);

        if (data.status == true) {
          mnews.innerHTML = data.msg;
          // $("#mail-status").html(data);
          let msg = document.getElementById("messager");
          console.log(data.log);

          msg.innerHTML = "<p style='color: green;'> " + data.msg + "</p>";

          reload();
        } else {
          let error = data.msg;
          mnews = document.getElementById("forsubmit");

          console.log(mnews);
          mnews.innerHTML = error;
          document.getElementById("messager").innerHTML =
            "<p style='color: red;'>Sorry " +
            action.mode +
            " for " +
            action.cid +
            " .. " +
            error +
            "</p>";
        }
      },
      
      error: function (error) {
        mnews = document.getElementById("forsubmit");
        mnews.innerHTML = error;
        document.getElementById("messager").innerHTML =
          "<p style='color: red;'>Sorry " +
          action.mode +
          " for " +
          action.cid +
          " .. " +
          error +
          "</p>";
        //+ action.mode +" Channel."+action.cid;
      },
    });
  }

  //reload();
  //alert("yess!");
  //sendChannel(ev);
  return false;
}
function checkCID(cidobj) {
  let cid = cidobj.value;

  info = document.getElementById("for" + cidobj.id);
  var usernameRegex = /^[a-zA-Z0-9]+$/;

  if (usernameRegex.test(cid)) {
    info.innerHTML = "";

    if (cid.length > 4) {
      // AJAX request
      var xhttp = new XMLHttpRequest();
      xhttp.open(
        "GET",
        "https://onetv.ng/server/cid.ajaxdbcheck.php?cid=" + cid,
        true
      );
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Response
          var response = JSON.parse(this.responseText);
          info.innerHTML = response.feedback;

          //alert(response.status);
          if (response.status == 1) {
            info.style.color = "red";
          } else {
            info.style.color = "green";
          }
        }
      };

      var data = { cid: cid };
      xhttp.send(JSON.stringify(data));
      xhttp.send(data);
    }
  } else {
    info.innerHTML = "Please enter valid input no specail character or space ";
    info.style.color = "red";
  }
}
