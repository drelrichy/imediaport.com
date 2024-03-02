//welcome
console.log(
  "************************************** system.js v 1.3 loaded ******************************"
);
let xchann = [];
var rett;

$("div").on("tap", function () {
  alert("who touc me!");
  // $(this).hide();
});

function schannels(iptvc, feedSelect) {
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
              //options[options.length] = new Option(xchan.id, xchan.channel_id, true, true);
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

//Re build build -  Form Items

          case "ff":
            //alert(xchan.channel_id+"<--->"+feedSelect);
            for (let index = 0; index < dataArr.length; index++) {
              xchann[index] = JSON.parse(dataArr[index]);

              xchan = xchann[index];
              //   console.log(xchan.channel_id+"<--->"+feedSelect);
              xchan.channel_id = xchan.channel_id.trim();
              feedSelect = feedSelect.trim();
              if (xchan.channel_id == feedSelect) {
                action.channel = xchan;
                //getchannels(xchan);
                //alert(xchan.channel_id+"<--->"+feedSelect);

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

action = {
  xchad: {},
  channel: {},
  mode: "new",
  cid: "new",
  id: 0,
  csize: 0,
  flag: "",

  check: {},
};

function loadform(callch) {
  //alert("Index: " + y[x].index + " is " + ;
  var select = document.getElementById("cidSelect");
  var valx = select.options[select.selectedIndex].value;
  var option = select.options[select.selectedIndex].text;
  var ix = select.selectedIndex;

  let deform = option;
  action.cid = option;
  action.id = ix;
  //alert(deform);
  schannels("ff", deform);
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

function modeaction(his) {
  var x = document.getElementById("modeSelect").selectedIndex;
  var y = document.getElementById("modeSelect").options[x].value;
  var z = document.getElementById("modeSelect").options[x].text;
  //alert(y);
  action.mode = y;


  action.modenum = x;

  document.getElementById("messager").innerHTML =
    "<p style='color: blue;'>1Tv Network Manager,  " +
    action.mode +
    " Channel |>> " +
    action.cid +
    " <<| ";
  document.getElementById("channel_id").disabled = false;
  document.getElementById("cNumber").disabled = false;
  document.getElementById("cidSelect").disabled = true;
  //document.getElementById("cNumber").disabled=true;

  switch (x) {
    case 0:
      //clear tables
      document.getElementById("channelform").reset();
      document.getElementById("cidSelect").selectedIndex = 0;
      // document.getElementById("cidSelect").disabled=true;
      action.cid = "new";
      action.mode = "new";
      localizeaction();
      //alert(action.cid);

      // document.getElementById("messager").innerText = "Welcome to 1Tv Network Manager,"+ action.cid +" Channel."+action.mode;
      break;

    case 1:
      document.getElementById("cidSelect").disabled = false;
      document.getElementById("cidSelect").required = true;
      //document.getElementById("messager").innerText = "Welcome to 1Tv Network Manager, Edit  Channel.";
      //schannels(iptvc ,feedSelect);
      //setchannels("sl","cidSelect");
      //alert(document.getElementById("modeSelect").length);
      //alert(action.cid);
      if (document.getElementById("cidSelect").length < 3)
        schannels("sl", "cidSelect");
      action.csize = document.getElementById("cidSelect").length;

      document.getElementById("cidSelect").focus();
      document.getElementById("cidSelect").click();
      document.getElementById("sendbutton").value = "Update Channel";

      break;

    case 2:
      document.getElementById("cidSelect").disabled = false;
      document.getElementById("cidSelect").required = true;

      //document.getElementById("messager").innerText = "Welcome to 1Tv Network Manager, Copy  Channel.";
      break;

    case 3:
      // document.getElementById("messager").innerText = "Welcome to 1Tv Network Manager, Suspend Channel.";

      break;
    case 4:
      document.getElementById("messager").innerText =
        "Welcome to 1Tv Network Manager, Delete Channel.";

      break;
  }
}

function isset(name) {
  return name != null;
}

function isnotset(name) {
  return name == null;
}

function get_request(name) {
  if (isset(name)) {
    if (
      (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
        location.search
      ))
    )
      return decodeURIComponent(name[1]);
  } else {
    let pagecall = "";
    if (document.URL.indexOf("#") != -1) {
      let pagecall = document.URL.substring(
        document.URL.indexOf("#") + 1,
        document.URL.lengt
       // length
      );
      return pagecall;
    }
  }
}

function showResult(str) {
  if (str.length == 0) {
    document.getElementById("livesearch").innerHTML = "";
    document.getElementById("livesearch").style.border = "0px";
    return;
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("livesearch").innerHTML = this.responseText;
      document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
    }
  };
  xmlhttp.open("GET", "livesearch.php?q=" + str, true);
  xmlhttp.send();
}

//============================ Ajax Creat New Channel ============================================================

function submitChannel(ev) {
  ev.preventDefault();

  var dbkey = action.id;

  var valid;
  var route = "";
  let move = false;
  display = document.getElementById("forsubmit");

  var form = "#channelform"; //defined the #form ID
  var formData = $(form).serializeArray(); //serialize the form into array
  if (action.modenum == 0) rout = "https://onetv.ng/server/ajaxsave2.php"; //get the route using attribute action
  if (action.modenum == 1) rout = "https://onetv.ng/server/ajaxupdate2.php"; //?key="+dbkey; //get the route using attribute action
  if (action.mode == 2) rout = "https://onetv.ng/server/ajaxsave2.php"; //get the route using attribute action

  display.innerHTML = "processing now please wait!";
  //rout = "https://onetv.ng/server/ajaxsave.php";

  move = true;

  if (move) {
    jQuery.ajax({
      url: rout,
      data: formData,
      type: "POST",

      success: function (result) {
        mnews = document.getElementById("forsubmit");
        data = JSON.parse(result);

        if (data.status == true) {
          mnews.innerHTML = data.msg;
          // $("#mail-status").html(data);
          let msg = document.getElementById("messager");
          console.log(data.log);
          alert(data.data);
          msg.innerHTML = "<p style='color: green;'> " + data.msg + "</p>";

          reload();
        } else {
          let error = data.msg;
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

function sendChannel(ev) {
  ev.preventDefault();

  var dbkey = action.id;
  //alert(dbkey);
  //alert("here 000");
  var valid;
  var route = "";
  let move = false;
  valid = true;

  mnews = document.getElementById("forsubmit");

  var form = "#channelform"; //defined the #form ID
  //var formData= $("#channelform").serialize();
  var formData = "";

  //var formData      = $("form").serializeArray(); //serialize the form into array
  //var route 			= $(form).attr('action'); //get the route using attribute action

  if (action.modenum == 0) rout = "https://onetv.ng/server/ajaxsave2.php"; //get the route using attribute action
  if (action.modenum == 1)
    rout = "https://onetv.ng/server/ajaxupdate2.php?key=" + dbkey; //get the route using attribute action
  if (action.mode == 2) rout = "https://onetv.ng/server/ajaxsave2.php"; //get the route using attribute action
  rout = "../server/ajaxsave2.php";

  mnews.innerHTML = "processing now please wait!";

  $.ajax({
    type: "POST", //we are using POST method to submit the data to the server side
    url: route, // get the route value
    data: formData, // our serialized array data for server side
    beforeSend: function () {
      //We add this before send to disable the button once we submit it so that we prevent the multiple click
      // $this.attr('disabled'"", true).html("Processing...");
    },
    success: function (response) {
      //once the request successfully process to the server side it will return result here
      mnews = document.getElementById("forsubmit");
      mnews.innerHTML = response;
      mnews.style.fontSize = "small";
      mnews.style.color = "green";
      alert(response);
      console.log(response);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(error);
      alert(textStatus);

      mnews = document.getElementById("forsubmit");
      mnews.innerHTML = textStatus;
      if (response.sttus == 1) {
        info.style.color = "red";
      } else {
        info.style.color = "green";
      }
      mnews.style.color = "red";

      console.log(error);
      alert(error);

      // You can put something here if there is an error from submitted request
    },
  });

  return false;
}
//============================ Ajax Validate New  Channel ============================================================
function validateNewChannel() {
  return true;
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
  if (optionLabel == null) optionText = optionValue;
  console.log("|" + optionValue + "|");
  optionText = optionText.trim();
  optionValue = optionValue.trim();
  console.log("|" + optionValue + "|");

  $("#" + parentID).append(
    `<option value="${optionValue}">
                      ${optionText}
                  </option>`
  );
}

//=======================================ajax  form submit======================================================

function nowsubmitForm(xthis) {
  //$("#btnSubmit").on("click", function() {
  //onclick(submitForm());

  $this = $("#btnSubmit"); //submit button selector using ID
  var $caption = $this.html(); // We store the html content of the submit button
  var form = "#channelform"; //defined the #form ID
  var formData = $(form).serializeArray(); //serialize the form into array
  //var route 			= $(form).attr('action'); //get the route using attribute action
  var route = "https://onetv.ng/server/ajaxsave.php"; //get the route using attribute action

  var valid;
  valid = validateNewChannel();

  if (valid) {
    $.ajax({
      type: "POST", //we are using POST method to submit the data to the server side
      url: route, // get the route value
      data: formData, // our serialized array data for server side
      beforeSend: function () {
        //We add this before send to disable the button once we submit it so that we prevent the multiple click
        // $this.attr('disabled', true).html("Processing...");
      },
      success: function (response) {
        //once the request successfully process to the server side it will return result here

        //$this.attr('disabled', false).html($caption);

        // Reload lists of employees
        // all();

        // We will display the result using alert
        console.log(response);

        // Reset form
        // resetForm();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(error); // You can put something here if there is an error from submitted request
      },
    });
  }
  // after form check  sendtodb();

  //	});
}

function sendtodb() {
  $.ajax({
    type: "POST", //we are using POST method to submit the data to the server side
    url: route, // get the route value
    data: formData, // our serialized array data for server side
    beforeSend: function () {
      //We add this before send to disable the button once we submit it so that we prevent the multiple click
      // $this.attr('disabled', true).html("Processing...");
    },
    success: function (response) {
      //once the request successfully process to the server side it will return result here

      //$this.attr('disabled', false).html($caption);

      // Reload lists of employees
      // all();

      // We will display the result using alert
      console.log(response);

      // Reset form
      // resetForm();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(error); // You can put something here if there is an error from submitted request
    },
  });
}

function resetForm() {
  //$('#form')[0].reset();
}

//=======================================ajax check CID ======================================================

function checkCID(cidobj) {
  let cid = cidobj.value;

  info = document.getElementById("for" + cidobj.id);
  var usernameRegex = /^[a-zA-Z0-9]+$/;

  if (usernameRegex.test(cid)) {
    info.innerHTML = "";

    if (cid.length > 3) {
      // AJAX request
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", "../server/cid.ajaxdbcheck.php?cid=" + cid, true);
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

//=======================================ajax file upload======================================================
//function loadfile(Upload,fileto) {

function loadfile(myFile, fileURLL) {
  var myForm = document.getElementById("formAjax"); // Our HTML form's ID
  //var myFile    = document.getElementById(Upload.id);  // Our HTML files' ID
  var messeger = "for" + fileURLL;

  //alert("mess="+messeger);

  // var statusP   = document.getElementById('for'+fileURLL);
  var statusP = document.getElementById(messeger);
  var fileURL = document.getElementById(fileURLL);
  //var logoCase  = document.getElementById('samplelogo');//"samplelogo"
  var upUrl = "";

  //alert(location.hostname);

  event.preventDefault();

  statusP.innerHTML = "Uploading...";

  // Get the files from the form input
  var files = myFile.files;

  // Create a FormData object
  var formData = new FormData();

  // Select only the first file from the input array
  var file = files[0];
  //name="fileToUpload" id="fileToUpload"
  // Add the file to the AJAX request
  //alert(file.name);
  formData.append("fileToUpload", file, file.name);

  // Set up the request
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  // Open the connection  xhr.open('POST', php_fileserver , true);
  xhr.open("POST", "../server/upload.php", true);

  // Set up a handler for when the task for the request is complete
  xhr.onload = function () {
    if (xhr.status == 200) {
      //alert(file.name);
      //alert(this.response);
      let resback = xhr.response;

      if (resback.status == "1") {
        // alert(resback.status);
        upUrl = hostpathname + resback.msg;
        //alert (upUrl);

        //encodeURIComponent(string)
        let upImage = "url('" + upUrl.replace(" ", "%20") + "')";
        //alert(logoCase.style.backgroundImage);
        fileURL.value = upUrl.replace(" ", "%20");

        //  alert(logoCase.style.backgroundImage);
        statusP.innerHTML = "Upload copmlete!";
      } else {
        statusP.innerHTML = this.response.msg;
      }
    } else {
      //
    }
  };

  // Send the data.
  xhr.send(formData);

  fileURL.focus();
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

function count() {
  // do whatever you like here
  document.getElementById("info").value = player.videoTitle;
  setTimeout(count, 1000);
  console.log(ct);
  ct = ct + 1;
}

function doTitle() {
  if ((ct = 0)) count();
  console.log(ct);
  // document.getElementById("info").value= player.videoTitle;
  //  alert(player.videoTitle);
  //https://www.youtube.com/embed/playlist?list=PLSXwhHiUvMLahyawKfJFmCzDhrsFOPeeP
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
  if (xurl.includes(playlistyt))
    rText = xurl.replace(playlistyt, playlistemebedyt);

  //eSrc= eSrc.replace(playlistyt,playlistemebedyt);"SHYP":

  console.log(xurl + "<- in and out -> " + rText);
  if (rText == "") rText = xurl;

  return rText;
}

//processForm = (this) =>{

//=======================================pform======================================================

//formEvenCheck
//=======================================form Event check function======================================================
function formEvenCheck(xobj) {
  //alert(document.getElementById("urlother").disabled);

  //check for object name if iframe_url
  //alert(xobj.name);

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

function pform(xobj) {
  //alert(document.getElementById("urlother").disabled);

  //check for object name if iframe_url

  if (xobj.name == "iframe_url") {
    //  alert("me!"+xobj);
    const otherid = "urlother";
    const otherindex = 13;
    const otherobj = document.getElementById("urlother");
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
  if (xxobj.includes(".m3u")) xcode += "8";
  if (xxobj.includes("playlist")) xcode += "P";
  if (streamUrl == "") {
    return "";
  } else {
    //alert(xcode);
    let move = false;

    if (xcode == "SHIYE") {
      eTitle = getx("title", embedObject.value);
      eSrc = getx("src", embedObject.value);
    } else {
      eSrc = streamUrl;
    }

    switchPlayer(player0);
    player.stopVideo();
    document.getElementById(playerB).src = "";
    //alert(xcode);
    //alert(xcode);

    switch (xcode) {
      //clears stuff

      // Case 1
      case "SHIYE":
        //1

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

        embedObject.value = eSrc;
        player.loadVideoByUrl(eSrc);

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

        player.stopVideo();
        switchPlayer(playerB);
        document.getElementById(playerB).src = m3u8playUrl + eSrc;

        break;

      //case 7
      case "H8":
        day = "m3u8 HTTP Live Streaming media Streaming with http link ";
        document.getElementById("iframe_url").selectedIndex = "7";
        player.stopVideo();
        switchPlayer(playerB);
        document.getElementById(playerB).src = m3u8playUrl + eSrc;
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
        eSrc = xembed(eSrc, xcode);

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

function getx(xcall, xobj) {
  let rText = "";
  if (xobj.includes(xcall + '="')) {
    let lent = xcall.length;
    let posa = xobj.indexOf(xcall + '="');
    let posb = xobj.indexOf('"', posa + lent + 3);

    let cells = xobj.match('="');
    //let posc = xobj.indexOf('"',posa+3);

    rText = xobj.substring(posa + lent + 2, posb);
  } else {
    return "";
  }
  //alert(rText);
  //
  //  embedObject

  return rText;
  //let result = text.substr(1, 4);

  //alert(embedObject.value);

  //
}
