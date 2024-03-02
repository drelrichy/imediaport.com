//welcome
//============================ Ajax Creat New Channel ============================================================
function createNewChannel() {
  var valid;

let move = false;
  valid = validateNewChannel();
  
  alert("almost done");
  

  if(move) {
      jQuery.ajax({
          url: "createNewChannel.php",
          data:'userName='+$("#userName").val()+'&userEmail='+
          $("#userEmail").val()+'&subject='+
          $("#subject").val()+'&content='+
          $(content).val(),
          type: "POST",
          success:function(data){
              $("#mail-status").html(data);
          },
          error:function (){}
      });
  }




  return false;
}
//============================ Ajax Validate New  Channel ============================================================
function validateNewChannel(){
return true;
}

//============================ Build ajax Selector ============================================================
        //This function will execute on change of selection box One
        function buildSelect(category ,feedSelect) {

          //alert("show it > --"+phpserverlocation);

            let brand = category; // $("#phoneBrand").val(); //get pre-set value from selection box One
              let mlist = category ;//ge
            //url: phpserverlocation+"https://onetv.ng/ajaxgetformDB.php",
              $.ajax({
                  type: "POST",
                  url: "https://onetv.ng/server/gdb.php",
                  data: {
                       category: category, // set selection box One value in AJAX POST Request
                       loadMenu: true,
                   },
                  dataType: "JSON",
                  beforeSend: function() {
  
                //    alert();  //You can Add some functions to do before sending AJAX Request Eg: Page Loader
                  },
                  success: function(feedback) {
                   // alert(feedback.responseText);

                   // alert(feedback);
                      if (feedback.status == 1) { //execute if status value 1 on Feed back data from database response
  
                          const dataArr = feedback.data.split(","); // converting Feedback data value to array
                         
                          for (let index = 0; index < dataArr.length; index++) {
                              addOption(feedSelect, dataArr[index]); // Add new values to selection box Two
                          }
  
  
                      } else {
                       // alert(" error ooh "+feedback.status);
  console.log(feedback)
 
                      }
                  },
                  error: function(error) {
                    //alert(" error ooh "+feedback.status);
                      console.log(error);
                  },
              });
          }
  
          //set values in selection box two
          function addOption(parentID, optionValue) {
          

              $('#' + parentID).append(
                  `<option value="${optionValue}">
                      ${optionValue}
                  </option>`
              );
          }
  
        

  function aall()
  {
      // Ajax config
      $.ajax({
          type: "GET", //we are using GET method to get all record from the server
          url: php_serverlocation+'all.php', // get the route value
          success: function (response) {//once the request successfully process to the server side it will return result here
  
              // Parse the json result
              response = JSON.parse(response);
  
              var html = "";
              // Check if there is available records
              if(response.length) {
                  html += '<div class="list-group">';
                  // Loop the parsed JSON
                  $.each(response, function(key,value) {
                      // Our employee list template
                      html += '<a href="#" class="list-group-item list-group-item-action">';
                      html += "<p>" + value.first_name +' '+ value.last_name + " <span class='list-email'>(" + value.email + ")</span>" + "</p>";
                      html += "<p class='list-address'>" + value.address + "</p>";
                      html += '</a>';
                  });
                  html += '</div>';
              } else {
                  html += '<div class="alert alert-warning">';
                    html += 'No records found!';
                  html += '</div>';
              }
  
  
  
              // Insert the HTML Template and display all employee records
              $("#employees-list").html(html);
          }
      });
  }
  
  //=======================================ajax  form submit======================================================
  
  function nowsubmitForm(xthis)
  {
  
  
      //$("#btnSubmit").on("click", function() {
  //onclick(submitForm());
  
             $this 		    = $("#btnSubmit"); //submit button selector using ID
          var $caption      = $this.html();// We store the html content of the submit button
          var form 			    = "#channelform"; //defined the #form ID
          var formData      = $(form).serializeArray(); //serialize the form into array
          //var route 			= $(form).attr('action'); //get the route using attribute action
          var route 			  = "https://onetv.ng/server/ajaxsave.php"; //get the route using attribute action
  
  
  

          var valid;	
          valid = validateNewChannel();
          
          if(valid) {


            $.ajax({
  
  
              type: "POST", //we are using POST method to submit the data to the server side
              url: route, // get the route value
              data: formData, // our serialized array data for server side
              beforeSend: function () {//We add this before send to disable the button once we submit it so that we prevent the multiple click
                 // $this.attr('disabled', true).html("Processing...");
              },
              success: function (response) {//once the request successfully process to the server side it will return result here
                  
                //$this.attr('disabled', false).html($caption);
        
                  // Reload lists of employees
                 // all();
        
                  // We will display the result using alert
                  console.log(response);
        
                  // Reset form
                 // resetForm();
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
        
        console.log(error);                // You can put something here if there is an error from submitted request
              }
          });
        
        




          }
  // after form check  sendtodb();
   
  //	});
  }
  
  function sendtodb(){
    
    $.ajax({
  
  
      type: "POST", //we are using POST method to submit the data to the server side
      url: route, // get the route value
      data: formData, // our serialized array data for server side
      beforeSend: function () {//We add this before send to disable the button once we submit it so that we prevent the multiple click
         // $this.attr('disabled', true).html("Processing...");
      },
      success: function (response) {//once the request successfully process to the server side it will return result here
          
        //$this.attr('disabled', false).html($caption);

          // Reload lists of employees
         // all();

          // We will display the result using alert
          console.log(response);

          // Reset form
         // resetForm();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {

console.log(error);                // You can put something here if there is an error from submitted request
      }
  });



  }


  function resetForm()
  {
      //$('#form')[0].reset();
  }
  
   //=======================================ajax check CID ======================================================
    
  function checkCID(cidobj){
    let cid = cidobj.value;

    info = document.getElementById('for'+cidobj.id);
       var usernameRegex = /^[a-zA-Z0-9]+$/;
    
       if(usernameRegex.test(cid)){
        info.innerHTML ="";
    
          if(cid.length > 3){
    
             // AJAX request
             var xhttp = new XMLHttpRequest();
             xhttp.open("GET", "../server/cid.ajaxdbcheck.php?cid="+cid, true); 
             xhttp.setRequestHeader("Content-Type", "application/json");
             xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
    
                   // Response
                   var response = JSON.parse(this.responseText); 
                   info.innerHTML = response.feedback;

                   if(response.sttus==1) {info.style.color="red"} else {info.style.color="green"};

                }
             };

            
             var data = {cid: cid};
             xhttp.send(JSON.stringify(data));
             xhttp.send(data);
          }
       }else{
        info.innerHTML = "Please enter valid input no specail character or space ";
        info.style.color="red";
       }
    
    }
    
  
  //=======================================ajax file upload======================================================
    //function loadfile(Upload,fileto) {

    function loadfile(myFile ,fileURLL ) {

      
      var myForm    = document.getElementById("formAjax");  // Our HTML form's ID
      //var myFile    = document.getElementById(Upload.id);  // Our HTML files' ID
      var messeger= "for"+fileURLL;
      
      //alert("mess="+messeger);

     // var statusP   = document.getElementById('for'+fileURLL);
     var statusP   = document.getElementById(messeger);
      var fileURL   = document.getElementById(fileURLL);
      //var logoCase  = document.getElementById('samplelogo');//"samplelogo"
      var upUrl ="";
  
  //alert(location.hostname);
  
      event.preventDefault();
  
      statusP.innerHTML = 'Uploading...';
  
      // Get the files from the form input
      var files = myFile.files;
  
      // Create a FormData object
      var formData = new FormData();
  
      // Select only the first file from the input array
      var file = files[0];
    //name="fileToUpload" id="fileToUpload"
      // Add the file to the AJAX request
      //alert(file.name);
      formData.append('fileToUpload', file, file.name);
  
      // Set up the request
      var xhr = new XMLHttpRequest();
      xhr.responseType="json";
      // Open the connection  xhr.open('POST', php_fileserver , true);
      xhr.open('POST', "../server/upload.php" , true);
  
      // Set up a handler for when the task for the request is complete
      xhr.onload = function () {
       
        if (xhr.status == 200) {
          //alert(file.name);
//alert(this.response);
          let resback =xhr.response;
        
  
  if(resback.status=="1"){


   // alert(resback.status);
    upUrl =  hostpathname + resback.msg;
//alert (upUrl);


    //encodeURIComponent(string)
    let upImage = "url('"+upUrl.replace(" ", '%20')+"')";
    //alert(logoCase.style.backgroundImage);
      fileURL.value  = upUrl.replace(" ", '%20');
     

     

      //  alert(logoCase.style.backgroundImage);
    statusP.innerHTML = 'Upload copmlete!';

  } else {


    statusP.innerHTML = this.response.msg;

  };
  
  
  
        } else {

         //
        }


      };
  
      // Send the data.
      xhr.send(formData);
    
     fileURL.focus();
      
     };
  
  
  
  
    function switchPlayer(toplayer) {
      var x = document.getElementById(playerA);
      var y = document.getElementById(playerB);
  
  
      if (toplayer!=null ){
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
  
  
    };
  
  
  
      function count(){
          // do whatever you like here
  document.getElementById("info").value= player.videoTitle;
          setTimeout(count, 1000);
          console.log(ct);
  ct=ct+1;
      }
  
  
  
  function doTitle(){
  
        if(ct=0)  count();
  console.log(ct);
 // document.getElementById("info").value= player.videoTitle;
  //  alert(player.videoTitle);
  
  
      }
  
  
  function xembed(xurl,xcode){
  if(ct=0)  count();
  
    let rText = "";
  
      if (xurl.includes(shortyt)&&xcode=="SHY") rText= xurl.replace(shortyt, embedyt);
      if (xurl.includes(longyt)&&xcode=="SHY") rText= xurl.replace(longyt, embedyt);
  
    return rText;
  
  
    }
  
    //processForm = (this) =>{
  
  
  
  //=======================================pform======================================================
  
  //formEvenCheck
  //=======================================form Event check function======================================================
  function formEvenCheck(xobj){
    //alert(document.getElementById("urlother").disabled);
   
     //check for object name if iframe_url
  //alert(xobj.name);
   
     if (xobj.name=="streamUrlType"){
   
   
       const otherid="urlother";
       const otherindex =13;
       const otherobj =  document.getElementById('streamUrlMore');
       const sindex = xobj.selectedIndex;
     //alert(document.getElementById("age").disabled);
   
     //  alert(otherobj.disabled);
   
   
     if (xobj.selectedIndex!=otherindex && otherobj.disabled ==false) otherobj.disabled=true;
   
   
   switch (sindex ){
     case 0: ;
   
     break;
   
     case 1 :;
     break;
   
     case 13 :;
     //alet("now we are ..");
     otherobj.disabled= false;
     otherobj.focus();
   
     break;
   
   
     }
     //end of switch
   
   
     }
   
     //end of if
   
     if (xobj.name=="logoUrl"){

      
        var logoCase  = document.getElementById('samplelogo');//"samplelogo"
     
        var upUrl= xobj.value ;
 
        let upImage = "url('"+upUrl+"')";
      //  alert(upImage);
        logoCase.style.backgroundImage=upImage;
      


     }
    
     }
   

  function pform(xobj){
   //alert(document.getElementById("urlother").disabled);
  
    //check for object name if iframe_url
  
  
    if (xobj.name=="iframe_url"){
  
  //  alert("me!"+xobj);
      const otherid="urlother";
      const otherindex =13;
      const otherobj =  document.getElementById('urlother');
      const sindex = xobj.selectedIndex;
    //alert(document.getElementById("age").disabled);
  
    //  alert(otherobj.disabled);
  
  
    if (xobj.selectedIndex!=otherindex && otherobj.disabled ==false) otherobj.disabled=true;
  
  
  switch (sindex ){
    case 0: ;
  
    break;
  
    case 1 :;
    break;
  
    case 13 :;
    //alet("now we are ..");
    otherobj.disabled= false;
    otherobj.focus();
  
    break;
  
  
    }
    //end of switch
  
  
    }
  
    //end of if
  
  
    }
  
  
  function embedIt(embedObject){
    if(ct=0)  count();
    //console.log(player);
    yplayer= document.getElementById("player");
    let xcode ="";
    let day ="";
    //let eTitle="";
    let eSrc="";
    let xxobj = embedObject.value;
  if (xxobj.includes('https'))    xcode += "S";
  if (xxobj.includes('http'))     xcode += "H";
  if (xxobj.includes('iframe') )  xcode += "I";
  if (xxobj.includes('youtube'))  xcode += "Y";
  if (xxobj.includes('youtu.be')) xcode += "Y";
  if (xxobj.includes('embed') )   xcode += "E";
  if (xxobj.includes('.m3u') )   xcode += "8";
  if (embedObject.value==""){ return "" ;} else {
    //alert(xcode);
  if(xcode=="SHIYE"){
   eTitle=  getx("title",embedObject.value);
   eSrc =   getx("src",embedObject.value);
  } else  eSrc = embedObject.value;
  
    switchPlayer(player0);
    player.stopVideo();
    document.getElementById(playerB).src="";
  //alert(xcode);
  
  switch (xcode) {
  
  
    //clears stuff
  
  
  // Case 1
  case  "SHIYE" :
  //1
                    hintText = "youtube embed iframe scured server";
                    document.getElementById("iframe_url").selectedIndex = "1";
  
                    if (eTitle!="")document.getElementById("info").value=eTitle;
                    if (eSrc!="") {
                    player.loadVideoByUrl(eSrc);
                    document.getElementById("iframe").value = eSrc;
  
                    player.play();
  
                    };
                    break;
  
    //case 2
  case "SHYE":
                    hintText =  "youtube embed direct scured server";
                    document.getElementById("iframe_url").selectedIndex = "2";
  
                    if (eSrc!="") {
                    player.loadVideoByUrl(eSrc);
                    document.getElementById("iframe").value = eSrc;
  
                    player.playVideo();
  
  
  
                        };
  
                      break;
  
  //case3
  case "SHY":
  
                    hintText = "youtube video link scured server";
                    document.getElementById("iframe_url").selectedIndex = "3";
                    eSrc= xembed(xxobj,xcode);
                    embedObject.value = eSrc;
                    player.loadVideoByUrl(eSrc);
  
                    player.playVideo();
  
  
  
                    break;
  //case 4
  case "SHI":
                    eSrc =   getx("src",embedObject.value);
                    hintText = "Secured Embeded HTTPS iFrame code";
                    document.getElementById("iframe_url").selectedIndex = "4";
                    embedObject.value= eSrc;
  
                    if(getx("title",embedObject.value)!="")  {eTitle=  getx("title",embedObject.value);
                      if (eTitle!="")document.getElementById("info").value=eTitle;
                    };
                    switchPlayer(playerB);
                    document.getElementById(playerB).src = eSrc;
                    break;
  
  // case 5
  case "HI":         eSrc =   getx("src",embedObject.value);
  
                  if(getx("title",embedObject.value)!="")  {eTitle=  getx("title",embedObject.value);
                    if (eTitle!="")document.getElementById("info").value=eTitle;
                  };
                    hintText = "Embeded HTTP iFrame code";
                    document.getElementById("iframe_url").selectedIndex = "5";
                    embedObject.value= eSrc;
  
  
                    switchPlayer(playerB);
                    document.getElementById(playerB).src = eSrc;
                    break;
  //case 6
  
  case"SH8":        hintText =  "m3u8 HTTPS HLS Live Streaming media Streaming with https";
                    document.getElementById("iframe_url").selectedIndex = "6";
  
  
                    player.stopVideo();
                    switchPlayer(playerB);
                    document.getElementById(playerB).src =m3u8player+eSrc;
  
                    break;
  
  //case 7
  case"H8":
                    day = "m3u8 HTTP Live Streaming media Streaming with http link ";
                    document.getElementById("iframe_url").selectedIndex = "7";
                    player.stopVideo();
                    switchPlayer(playerB);
                    document.getElementById(playerB).src =m3u8player+eSrc;
                    break;
  
  //case 8
  case"SH":
                    hintText =  "HTTPS Direct for channel video stream page";
                    document.getElementById("iframe_url").selectedIndex = "8";
  
  
                    switchPlayer(playerB);
                    document.getElementById(playerB).src = eSrc;
                    break;
  
  //case 9
  case"H":
                    hintText = " HTTP Direct for channel video stream page";
                    document.getElementById("iframe_url").selectedIndex = "9";
  
                    switchPlayer(playerB);
                    document.getElementById(playerB).src = eSrc;
                    break;
  
  
  
  //case 10
  case "S":
                    hintText =  " Others Securd HTTPS link with details";
                    document.getElementById("iframe_url").selectedIndex = "10";
                    embedObject.value= eSrc;
  
  //Case 11
  case "H":
                    hintText =  " Others Securd HTTP link with details";
                    document.getElementById("iframe_url").selectedIndex = "11";
                    embedObject.value= eSrc;
  
                    switchPlayer(playerB);
                    document.getElementById(playerB).src = eSrc;
                    break;
  
  //Case 12
  case "":
                                      hintText =  "Youtube Video ID";
                                      document.getElementById("iframe_url").selectedIndex = "12";
                                      embedObject.value= embedyt+eSrc;
                                      player.loadVideoById(eSrc);
  
                                      player.playVideo();
                                      //switchPlayer(playerA);
                                    //  document.getElementById(playerB).src = eSrc;
                                      break;
  
  
  };
  //end of else
  };
  
  return 1;
  //};
  
  
  //end of function
  }
  
  
  
  
  function getx(xcall, xobj){
  let rText ="";
  if( xobj.includes(xcall+'="')){
  
  let lent  = xcall.length;
  let posa  =  xobj.indexOf(xcall+'="');
  let posb  = xobj.indexOf('"',posa+lent+3);
  
  let cells = xobj.match('="');
  //let posc = xobj.indexOf('"',posa+3);
  
   rText = xobj.substring(posa+lent+2,posb);
  } else { return "" };
  //alert(rText);
  //
  //  embedObject
  
  
  return rText;
  //let result = text.substr(1, 4);
  
  //alert(embedObject.value);
  
  //
  }
  
  