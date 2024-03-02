if (typeof BASESERVER === "undefined") var BASESERVER = location.origin;
console.log("BASESERVER=", BASESERVER);



if (typeof username == "undefined") {
  var username = typeof GLOBAL != "undefined" ? GLOBAL.username : "";
} else {
  if (username == "")
    username = typeof GLOBAL != "undefined" ? GLOBAL.username : "";
    if (username == "guest")
    username = typeof GLOBAL != "undefined" ? GLOBAL.username : "";
}



if (typeof channel_id == "undefined") {
  var channel_id = typeof GLOBAL != "undefined" ? GLOBAL.channel_id : "";
} else {
  if (channel_id == "")
    channel_id = typeof GLOBAL != "undefined" ? GLOBAL.channel_id : "";
    if (channel_id == "new")
channel_id = typeof GLOBAL != "undefined" ? GLOBAL.channel_id : "";

}


if (typeof admin_role == "undefined") {
  var admin_role = typeof GLOBAL != "undefined" ? GLOBAL.admin_role : "";
} else {
  if (admin_role == "")
    admin_role = typeof GLOBAL != "undefined" ? GLOBAL.admin_role : "";
}

const trace3 = true;
const imedia = {
  username,
  user:{},
 channel_id,
  admin_role,
  stationStartTime: 21600, // in seconds
  stationDurationTime: 21600, // in seconds
  stationStart: 21600, // in seconds
  stationDuration: 21600,
  stationStartClock: "06:00:00",
  stationDurationClock: "06:00:00",
  ACTIVECHANNEL: channel_id,
  ACTIVE: {},
  errorFlag: "",
  xbusData:[{}],
  SearchlistA:[],
  holdArray: [],
  playlistC: [],
  playlistD: [],
  playlistB: [],
  playlistA: [],
  playlistE: [],
  channelA: [],
  channelB: [],
  channelC: [],
  libraryA: [],
  libraryB: [],
  libraryC: [],
  libraryD: [],
  deletedA: [],
  scheduleA: [],
  scheduleB: [],
  playlistAdeleted: [],
  playIndex: 0,
  activeIndex:0,
  activeFunction:'welcome',
  playInsert: true,
  assetDuration: 0,
  VideoArray: [],
  YOUTUBE_API_KEY:'AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s',
  origin: "https://imediaport.com",
  youtubeSearchUrl: BASESERVER + "/api/youtube/",
  apiBulkUrl: BASESERVER + "/api/serv/bulk",
  apiScheduleUrl: BASESERVER + "/api/serv/schedule/",
  apiPlaylistUrl: BASESERVER + "/api/serv/playlist/",
  apiChannelUrl: BASESERVER + "/api/console/",
  popGo: false,
  BASESERVER,
  GLOBAL:{},
  ACI: {},
  channel_info: {},



  setACI: async function (channel_id, callback) {

channel_id=(typeof channel_id != 'undefined')? channel_id: this.GLOBAL.channel_id;

channel_info= await imedia.getChannelInfo(channel_id, (channel) => {
      this.ACI = channel;
      this.channel_info = channel;
      this.ACTIVECHANNEL = GLOBAL.channel_id = channel.channel_id;
      this.GLOBAL = GLOBAL;

      if (callback) callback(channel);
    });
    //also bCKUP CURRENT timr and date

    //for upate calculation l;this.assetDuration
  },

  youtubeSearch: async function (query, callback) {
    S_URL = this.youtubeSearchUrl + query;

    await axios(S_URL).then((data) => {
      console.log(data);
    });
  },
  masterClick: function (event) {
    //tab.sayuinput("Searching please wait..");
    var Uvalue = tab.uinput;
if(Uvalue===""){

  tab.sayuinput("Searching box is Empty");

  msgboxNoClose.show(`Nothing to searcgh for!`);
  //tab.restoreuinput();

  setTimeout(tab.restoreuinput(),4000);
  return

}
    var e = document.getElementById("searchType");
     var xvalue = e.options[e.selectedIndex].value;
     var xtext = e.options[e.selectedIndex].text;
     var xindex = e.selectedIndex;



switch (xvalue){
case "youtubesearch":
  imedia.masterClickYT(event);

break;

case "ytplaylist":
  imedia.masterClickYtPl(event);
break;

case "ytvideo":
  
break;

case "mp4":
  
break;

case "facebook":
  
break;



}





  },
  loadApi:async function loadApi( gdata, xtoken, callback) {

    if(!xtoken)xtoken = "";

   const encodedUrl = encodeURI(gdata+xtoken);
   //if(trace3)console.log(" Api URL in load",encodedUrl);



//console.log(encodedUrl);
  const response = await axios.get(encodedUrl );

  if(callback)callback(response);
    return response; 

},
   
  masterClickYT: function (event) {
    const Uvalue = tab.uinput;
    hold_ing = Uvalue;

    console.log(Uvalue);


    tab.sayuinput("Searching please wait..");

    msgboxNoClose.show(`searching for ${Uvalue}  please wait...`);
    //tab.restoreuinput();
    imedia.youtubeSearch(Uvalue, (returned) => {
      tab.restoreuinput();

    
       imedia.update_searchlist(returned.data);
    });
  },
  masterClickYtPl: function (event) {
    var playList;
    var uParams;
    var videoID;
    var hold_ing="";
   var Uvalue = tab.uinput;
   var checkurl = Uvalue.toLowerCase();

   if (checkurl.includes('youtube')){

    const url = new URL(Uvalue);
 uParams = new URLSearchParams(url.search);
   //uParams = new URLSearchParams(Uvalue);
    hold_ing = uParams.get('list');
     playList= uParams.get('list');
   videoID = uParams.get('v');
   } else {

    if (Uvalue.includes('PL')) playList = hold_ing = Uvalue;
   
  
  }



  console.log("lets get ", hold_ing);


  tab.sayuinput("Searching please wait..");
  //var Uvalue = tab.uinput;
  msgboxNoClose.show(`searching for ${ hold_ing}  please wait...`);

//console.log("(playList)=",playList);
//console.log('(videoID)=',videoID);

if(playList){
  
  
  


const API_KEY ='AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s';




const  toFetch =`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playList}&key=${API_KEY}`;

imedia.getFromPlaylistId (playList, (response) =>
    {
      imedia.update_searchlist(response)

      tab.restoreuinput();
 console.log("Return response feedback ===>>",response);
     ;
      // console.log(JSON.stringify(response.items));



})
    

}

  },
getFromPlaylistId: async function (playList,runnit){
 
  var token=""; const API_KEY= this.YOUTUBE_API_KEY;
console.log("-----------id -------->>>",playList);
  const yURLx=`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playList}&key=${API_KEY}`;

  //const yURLx = youtubeURL + yplaylistsearch+`&playlistId=${playListId}&key=${API_KEY}`;
  const vidoesById=[];
  const dataBus=[];
  duration=0;
  moredata = true;
  var counter = 0;

  while (moredata){
  const response = await   imedia.loadApi(yURLx, token);


   response.data.items.forEach((item, i )=> {
   px=counter;
 
     

      vidoesById[px]=item.snippet.resourceId.videoId;

      var id = item.snippet.resourceId.videoId;
     
     // var title = item.snippet.title;
      //var url = 'https://www.youtube.com/watch?v=' + item.id;
      //var thumb = item.snippet.thumbnails.default.url;
    
      //console.log(item.contentDetails.duration);
      
      imedia.xbusData[px] = item;

    
      if (px === (response.data.pageInfo.totalResults -1) ) moredata = false;     
counter++;
   });

token = `&pageToken=${response.data.nextPageToken}`;


}



//console.log("-----------------> PL back <-----------",imedia.xbusData);


if(runnit) {

 // console.log('--------------------count 001');
 //xbusData2 = await imedia.getInfoFromVideoIds(vidoesById.toString(),"",runnit);
 xbusData2 = await imedia.getInfoFromVideoIds(vidoesById,feedx=> runnit(feedx));

 return xbusData2; 
 //getInfoFromVideoIds 
} else {
  //console.log('--------------------count 002');
 // xbusData2 = await imedia.getInfoFromVideoIds(vidoesById.toString(),"");

  xbusData2 = await imedia.getInfoFromVideoIds(vidoesById);
  return xbusData2; 
}




// final return will be array with detailed video propert 


},

 loadFromVideoId : async function (videoById,client_id, runnit ){
  const yvideoidsearch =`videos?part=snippet,contentDetails,status,statistics`;
  const youtubeURL = 'https://www.googleapis.com/youtube/v3/';
 
    var token="";
     const API_KEY= this.YOUTUBE_API_KEY;
    const yURLx = youtubeURL + yvideoidsearch+`&id=${videoById}&key=${API_KEY}`;
    const dataBus=[];
    moredata = true;
    duration=0;
    //moredata = false;
    var counter = 0;
  
  
  const videosByX = [ ];
  //{netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" },];
  
  const response = await   loadApi(yURLx, token);
  
  response.data.items.forEach((item,px )=> {
  
    //console.log( item);
    // console.log(px);
    //  vidoesById=[ {netid:"", name:"", title:"", kind:"", thumb:"", id :"", duration: 00, shelfa: "", shelfb:"", shelfc:"", index:00, keyword:"" }];
    videosByX[px]  =
     { 
      netid       :   null,
      kind        :  item.kind,
      tag         :  item.etag,
      id          :  item.id, 
      title       :  item.snippet.title,
      description  :  item.snippet.description,
      duration    :  item.contentDetails.duration,
      embeddable  :  item.status.embeddable,
      madeForKids :  item.status.madeForKids,
      publishAt   :  item.snippet.publishedAt,
      sourceCID   :  item.snippet.channelId,
      thumbUrl    :  item.snippet.thumbnails.default.url,
      thumbWidth  :  item.snippet.thumbnails.default.width,
      thumbHeight :  item.snippet.thumbnails.default.height,
       shelfa     : "",
       shelfb     :"", 
       shelfc     :"", 
       index      :px, 
       keyword    :"" ,
       nplay:{
        id          :  item.id, 
        duration    :  item.contentDetails.duration,
  
       }
       
    
    };
     
  
     
        
        xbusData[px] = item;
  
  
     });
  
  
  
  if(runnit)runnit(videosByX);
  
  return videosByX; // final return will be array with detailed video propert 
  
  
  },

ytDuration : function (duration) {
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
    return parseInt((((years * 365 + weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds);


  

},

getInfoFromVideoIds : async function (videoByIds,runnit){


const yvideoidsearch =`videos?part=snippet,contentDetails,status,statistics`;
const youtubeURL = 'https://www.googleapis.com/youtube/v3/';
   
      var token="";
      xbusData=[];
    const API_KEY= this.YOUTUBE_API_KEY;
    var xUrl;
 moredata = true;
      duration=0;
  videoByIds.forEach((eachID,px )=> {
   xUrl = youtubeURL + yvideoidsearch+`&id=${eachID}&key=${API_KEY}`;
      
axios.get(xUrl).then((DXData)=>{ 
  var item = DXData.data.items[0];
   xbusData.push( { 
        netid       :  px,
        net_id      : px,
        kind        :  item.kind,
        tag         :  item.etag,
        id          :  item.id, 
        video_id    :  item.id, 
        start: 0,
        stop:0,
        title       :  item.snippet.title,
        Video_title :  item.snippet.title,
        description : (item.snippet.description !="")? item.snippet.description:item.snippet.title ,
        duration    :  imedia.ytDuration(item.contentDetails.duration),
        embeddable  :  item.status.embeddable,
        madeForKids :  item.status.madeForKids,
        publishAt   :  item.snippet.publishedAt,
        sourceCID   :  item.snippet.channelId,
        thumbUrl    :  item.snippet.thumbnails.default.url,
        thumbWidth  :  item.snippet.thumbnails.default.width,
        thumbHeight :  item.snippet.thumbnails.default.height,
        index:  px,
        indexDuration:   imedia.ytDuration(item.contentDetails.duration),
        indexStart :  0,
        indexStop:  0,
        indexTime:  0,
        net_id:  0,
        netid:  0,
        play_end:  0,
        play_index:  0,
        play_start:  0,
        playday :  'everyday',
       index      :px, 
         pp         :0,
         keyword    :"" ,
         nplay      : {id  :  item.id,  duration : item.contentDetails.duration}}
 
          );
     //console.log("leighth of our Array ===>",this.xbusData.length);
     }); 
       
    // this.xbusData.push(videosB);
   
     //this.xbusData.push(videosB);
        //  this.xbusData.push(item);
       // this.xbusData = xbusData;
      
       });

  // console.log("The =Data!!!! size=",this.xbusData.length);
setTimeout(() => {
  this.xbusData = xbusData;
 if(runnit)runnit(this.xbusData); 
 return this.xbusData;
}, 500);

        
 // final return will be array with detailed video propert 
        

    },
  
  getDataPost: async function (query, url, runnit) {
    
    const data = JSON.stringify(query);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    done = await axios.get(url, data, config).then((done_data) => {
      if (runnit) runnit(done_data);
      return done_data;
    });
  },
  getPlaylist: async function (query, url, runnit) {
    //const youtubeSearchUrl=BASESERVER+"/api/youtube/"+query;
    //var token="";

    //apiurl= BASESERVER+searchUrl+channel_id;

    const data = JSON.stringify(query);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    console.log("----------------:: Query ::----------------->", data);

    done = await axios.put(url, data, config).then((done_data) => {
      if (runnit) runnit(done_data);

      return done_data;
    });
  },
  youtubeSearch: (query, callback) => {
    const youtubeSearchUrl = BASESERVER + "/api/youtube/" + query;
    //var token="";

    //apiurl= BASESERVER+searchUrl+channel_id;

    const response = axios
      .get(youtubeSearchUrl)

      .then((returned) => {
        if (callback) callback(returned);

        return returned;
      })
      .catch((error) => {
        console.log(error);
      });

    //return response;
  },

  removeFlag: (flag) => {
    errorFlag = new String(this.errorFlag);

    if (errorFlag != "") {
      errorFlag.replace(flag, "");
      this.errorFlag = errorFlag;
      return 1;
    }
    return 0;
  },
  isFlag: (flag) => {
    return flag != undefined
      ? this.errorFlag.includes(flag)
      : this.errorFlag != "";
  },

  addFlag: (flag) => {
    if (!this.errorFlag.includes(flag)) this.errorFlag += flag;
  },
  searchCheck: (callEvent, callIndex) => {
    console.log(
      " We Have  id as|" + callEvent.id,
      " and status as" + callEvent.checked + "  of " + callIndex
    );
    // imedia.searchCheck(this)
  },
  trimYoutube: async (ydatas, callback) => {
    
    ydatas.forEach((ydata, i) => {
     let  xtitle="";
      const { title, video_title, description   } = ydatas;
      //console.log(ydata.description,ydata);
      // console.log(i,ydata.title);
let program=ydata;
    if(typeof program_name != "undefined")
      xtitle = program_name;
    if (typeof video_title != "undefined") xtitle = program.video_title;
    if (typeof title != "undefined") xtitle = program.title;
    if (typeof description != "undefined") xtitle = program.description;

let yUpdte= {title:text.trimTo(xtitle, 50), video_title:text.trimTo(xtitle, 50), description :text.trimTo(xtitle, 250)};
ydatas[i]  ={ ...ydatas , ...yUpdte} ; 


      //ydatas[i].description = text.trimTo(xtitle, 250);
      //ydatas[i].title = text.trimTo(xtitle, 50);
    });

    if(callback)callback(ydatas);
    return ydatas;
  },
  loadPlaylist: async function (ldata, callback) {
  console.log("<<<<<||||||||||||| 01 ||||||||||||||||>>>");


    workData =
      typeof ldata != "undefined" ? ldata : "playlist" + imedia.ACTIVECHANNEL;


      console.log("imedia.ACTIVECHANNEL,imedia.ACTIVECHANNEL,imedia.ACTIVECHANNEL,imedia.ACTIVECHANNEL,imedia.ACTIVECHANNEL,=", imedia.ACTIVECHANNEL);
    const query = {
      query: { channel_id: GLOBAL.channel_id, request: "get_work_playlist" },
    };
    //tab.sayuinput(query);
    //console.log("query>>>>",query);
    //console.log("apiScheduleUrl>>>", imedia.apiScheduleUrl);
    //imedia.getDataPost(query , imedia.apiScheduleUrl,(cback)=>{
    //console.log("apiScheduleUrl>>>", imedia.apiPlaylistUrl);

    imedia.getPlaylist(query, imedia.apiPlaylistUrl, (cback) => {
      // console.log("-------------------------------01----->>",cback);
     data = cback.data.list;


console.log("-------------------long list ----------------------",   data );
if(typeof  data == 'undefined') return false;
     // const data = imedia;
       
        
       imedia.playlistA = data;
     // imedia.setAtIndex(1);

setTimeout(() => {
imedia.setAtIndex();
}, 1000);
          //mlx = await imedia.savePlaylistA();

          if (callback) callback(data);
          return data;
    })  
       
  },
  update_playlist: function (data) {
    console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA);
    console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

    let holdArray = [].concat(data, imedia.searchlistA);
    imedia.searchlistA = holdArray;
    console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

    imedia.make_showlist(holdArray);
    tab.restoreuinput();
    //imedia.make_showlist(returned.data);
    return holdArray;
  },
 publishSchedule: function (data) {


scheduleA =(data)? data : imedia.scheduleA;
console.log(" >>>>>>>>>>>>>>>>> publishing, imedia.scheduleA----------->",scheduleA);   
  imedia.saveSchedulelist(scheduleA );
    //imedia.make_showlist(holdArray);
   // tab.restoreuinput();
    //imedia.make_showlist(returned.data);
   // return holdArray;
  },
loadsearchlist: async function (ldata, callback) {
    // console.log("<<<<<||||||||||||| 01 ||||||||||||||||>>>")

    workData =
      typeof ldata != "undefined" ? ldata : "playlista" + imedia.ACTIVECHANNEL;

    const query = {
      query: { channel_id: GLOBAL.channel_id, request: "get_work_searchlist" },
    };
 // tab.sayuinput("");
 //console.log("query>>>>",query);
 //console.log("apiPlaylistUrl>>>", imedia.apiPlaylistUrl);
 //imedia.getDataPost(query , imedia.apiScheduleUrl,(cback)=>{
    //console.log("apiScheduleUrl>>>", imedia.apiPlaylistUrl);

    imedia.getPlaylist(query, imedia.apiPlaylistUrl, (xcback) => {
     // console.log("-------------------------------01----->>",cback);
      //console.log("---------------------------raw--------------",  cback );
      xlongdata = xcback.data.list;
   

//console.log("-------------------long list ----------------------",  xlongdata  );
if(typeof xlongdata == 'undefined') return false;
      //const data = imedia
       // .trimYoutube(longdata)

        //.then((data) => {
          //console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA );
          //console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

         // let holdArray =  xlongdata ;
          imedia.searchlistA = xlongdata ;
          //console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

          imedia.make_showlist(xlongdata);

         // tab.restoreuinput("");

          //mlx = await imedia.savePlaylistA();

          if (callback) callback(xlongdata);
          return xlongdata ;
          return returned;
      //  }).catch((error) => { console.log(error); });
    });
  },
  update_searchlist: async function (data) {
    console.log(" >>>>>>>>>>>>>>>>> feedback old", imedia.searchlistA);
    console.log(" >>>>>>>>>>>>>>>>> feedback new", data);

    let holdArray = data.concat(imedia.searchlistA);
    imedia.searchlistA = holdArray;
    if(imedia.searchlistA.length===0){

      holdArray = data;

    }
    console.log(" >>>>>>>>>>>>>>>>> feedback joined", holdArray);

    imedia.make_showlist(holdArray);
   // tab.restoreuinput();
    //imedia.make_showlist(returned.data);
    return holdArray;
  },
  loadschedule: async function (ldata, callback) {
    // console.log("<<<<<||||||||||||| 01 ||||||||||||||||>>>")

    workData =
      typeof ldata != "undefined" ? ldata : "playlista" + imedia.ACTIVECHANNEL;

    const query = {
      query: { channel_id: GLOBAL.channel_id, request: "get_work_searchlist" },
    };
   
    //tab.sayuinput(query);
    //console.log("query>>>>",query);
    //console.log("apiScheduleUrl>>>", imedia.apiScheduleUrl);
    //imedia.getDataPost(query , imedia.apiScheduleUrl,(cback)=>{
    //console.log("apiScheduleUrl>>>", imedia.apiPlaylistUrl);

    imedia.getPlaylist(query, imedia.apiPlaylistUrl, (cback) => {
      // console.log("-------------------------------01----->>",cback);
      //console.log("---------------------------raw--------------",  cback );
      longdata = cback.data.list;
   

console.log("-----------------------------------------",  longdata  );

      const data = imedia
        .trimYoutube(longdata)

        .then((data) => {
          //console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA );
          //console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

          let holdArray = [].concat(data, imedia.searchlistA);
          imedia.searchlistA = holdArray;
          //console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

          imedia.make_showlist(holdArray);
          tab.restoreuinput();

          //mlx = await imedia.savePlaylistA();

          if (callback) callback(returned);
          return holdArray;
          return returned;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  update_schedule: function (data) {
    console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA);
    console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

    let holdArray = [].concat(data, imedia.searchlistA);
    imedia.searchlistA = holdArray;
    console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

    imedia.make_showlist(holdArray);
    tab.restoreuinput();
    //imedia.make_showlist(returned.data);
    return holdArray;
  },
    loadlibry: async function (ldata, callback) {
    // console.log("<<<<<||||||||||||| 01 ||||||||||||||||>>>")

    workData =
      typeof ldata != "undefined" ? ldata : "playlista" + imedia.ACTIVECHANNEL;

    const query = {
      query: { channel_id: GLOBAL.channel_id, request: "get_work_searchlist" },
    };
    //tab.sayuinput(query);
    //console.log("query>>>>",query);
    //console.log("apiScheduleUrl>>>", imedia.apiScheduleUrl);
    //imedia.getDataPost(query , imedia.apiScheduleUrl,(cback)=>{
    //console.log("apiScheduleUrl>>>", imedia.apiPlaylistUrl);


    imedia.getPlaylist(query, imedia.apiPlaylistUrl, (cback) => {
      // console.log("-------------------------------01----->>",cback);
      //console.log("---------------------------raw--------------",  cback );
      longdata = cback.data.list;
   

console.log("-----------------------------------------",  longdata  );

      const data = imedia
        .trimYoutube(longdata)

        .then((data) => {
          //console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA );
          //console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

          let holdArray = [].concat(data, imedia.searchlistA);
          imedia.searchlistA = holdArray;
          //console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

          imedia.make_showlist(holdArray);
          tab.restoreuinput();

          //mlx = await imedia.savePlaylistA();

          if (callback) callback(returned);
          return holdArray;
          return returned;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  update_libry: function (data) {
    console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA);
    console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

    let holdArray = [].concat(data, imedia.searchlistA);
    imedia.searchlistA = holdArray;
    console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

    imedia.make_showlist(holdArray);
    tab.restoreuinput();
    //imedia.make_showlist(returned.data);
    return holdArray;
  },
  loadepg: async function (ldata, callback) {
    // console.log("<<<<<||||||||||||| 01 ||||||||||||||||>>>")

    workData =
      typeof ldata != "undefined" ? ldata : "playlista" + GLOBAL.channel_id;

    const query = {
      query: { channel_id: GLOBAL.channel_id, request: "get_work_searchlist" },
    };
    //tab.sayuinput(query);
    //console.log("query>>>>",query);
    //console.log("apiScheduleUrl>>>", imedia.apiScheduleUrl);
    //imedia.getDataPost(query , imedia.apiScheduleUrl,(cback)=>{
    //console.log("apiScheduleUrl>>>", imedia.apiPlaylistUrl);

    imedia.getPlaylist(query, imedia.apiPlaylistUrl, (cback) => {
      // console.log("-------------------------------01----->>",cback);
      //console.log("---------------------------raw--------------",  cback );
      longdata = cback.data.list;
   

console.log("-----------------------------------------",  longdata  );

      const data = imedia
        .trimYoutube(longdata)

        .then((data) => {
          //console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA );
          //console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

          let holdArray = [].concat(data, imedia.searchlistA);
          imedia.searchlistA = holdArray;
          //console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

          imedia.make_showlist(holdArray);
          tab.restoreuinput();

          //mlx = await imedia.savePlaylistA();

          if (callback) callback(returned);
          return holdArray;
          return returned;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  update_epg: function (data) {
    //console.log(" >>>>>>>>>>>>>>>>> feed back old", imedia.searchlistA);
    //console.log(" >>>>>>>>>>>>>>>>> feed back new", data);

    let holdArray = [].concat(data, imedia.searchlistA);
    imedia.searchlistA = holdArray;
    //console.log(" >>>>>>>>>>>>>>>>> feed back joined", holdArray);

    imedia.make_showlist(holdArray);
    tab.restoreuinput();
    //imedia.make_showlist(returned.data);
    return holdArray;
  },
  clear_showlist: async function (data) {
    $("#showlist").html(
      "Cleared.. please make a new search or load a saved one"
    );
  },
  make_showlist: async function (zdata) {
    //console.log(data);
    cx = ` <div id="showlist" class=" list_show_box yscroll "  >
        `;

    start_on = "<div class='searchlist-item-containter'>"; //`<ul class="unext"  style="--month:''" >`;

    end_on = "</div>"; //`</ul>`;

    var JOB = start_on;

    //$("#showlist").html(start_on);
   //console.log("zzzzzzzzzzzzzzz---==>",zdata);

    //imedia.searchlistA
    //let data= await imedia.trimYoutube(datax);
    //imedia.searchlist
    console.log(" zdata.length =",  zdata.length);


   //if( zdata[zdata.length-1] === null) zdata.pop();

    zdata.forEach((video, i) => {
//console.log("--------------------- the video load ------------------",video.title);
    

thisID = "search_#" + i;

if (typeof video != 'undefined' && video != null){
//const { title}= video;
     //let  video_title =(typeof video.title != 'undefined' )? video.title : video.video_title;


let video_title = (typeof video.title!=='undefined'&& video.title!==null)? video.title : text.trimTo(video.description, 20);
  //console.log("==============================video===",video_title);
      //embeddable":true,"thumbUrl
 mxx="";
      JOB += ` <div class="do_list_item" ondblclick="imedia.youtubePopId('${i}')" " >
<img onmouseover="imedia.show('${video_title}')" id="thumb_${thisID}" class="do_list_item_img dnd" src="${
        video.thumbUrl
      }"/>

<h2  class="do_list_item_title" href="#" >${text.trimTo(video_title, 20)}</h2>
<p class="do_list_item_info" href="#" > ${text.trimTo( video.description,
        120
      )} </p> 

<h3  onmouseover="imedia.prevshow('${
        video.id
      }')" class="do_list_item_duration" > ${playtime.secondsToClock(
        video.duration
      )}</h3>
<i id="del_${i}"class="fa-solid fa-trash-can do_list_item_delete" onclick="imedia.delete_search('${i}')"></i>
<i id="add_${i}" class="fas fa-share-square do_list_item_add" onclick="imedia.add_search('${i}')"></i>
<form class="do_list_item_select">  <input class="" type="checkbox" onchange="imedia.searchCheck(this,'${i}')" id="chk_${thisID}" name="chk_${thisID}" value="something" checked> </form>
</div>`;

      };
      //$("#showlist").append( `<li> <div class="tab_list_items">  <div  class="tab_list_items_1"> <input class=""  type="radio" value="" id="flexCheckIndeterminate"> </div> <div class="tab_list_items_2">${video.title}</div> <i class="fa-solid fa-trash-can tab_list_items_3"></i>  <i class="fa-solid fa-trash-can tab_list_items_4"></i> </div> </li>`);

      //JOB +=  `<li> <div class="tab_list_items">  <div  class="tab_list_items_1"> <input class=""  type="radio" value="" id="flexCheckIndeterminate"> </div> <div class="tab_list_items_2"> ${video.title} </div> <i class="fa-solid fa-trash-can tab_list_items_3"></i>  <i class="fa-solid fa-trash-can tab_list_items_4"></i> </div> </li>`;
    });

    JOB += end_on;
    //console.log(JOB);
    //$("#showlist").append(end_on);

    $("#showlist").html(JOB);

    //let  feedback= await imedia.sendBulk (listData, this.apiBulkUrl);
  },


  publishShedule:function(request){



  },

  makeSchedule: function (){
   
  imedia.getChannelInfo(imedia.ACI.channel_id, (channel)=>{ 


   var playlistAs =[];
   var playlistBs =[];
   var schedulelistA ={};
   const  scheduleA= [];
   schedulelistB={};
   loadIndex=0;
   imedia.callFunction('schedule');

//get them all here as Array


playlistAs = imedia.playlistA;

 sheduleRenderA= `  
#schedulelist

<div class="items">
<div class="items-head">
  <p>Programs Schedule for ${channel.channel_name}</p>
  <hr>
  <div id="Publisher" class="btn btn-group">
  <button type="button" class="btn btn-danger" onclick="imedia.saveSchedulelist()"> Publish Schedule</button>
  
  
  </div>
  <hr>
</div>
<div id="items-body" class="items-body">
</div>
</div>`



sheduleRenderC= ` 
</div>
</div>`;

$('#schedulelist').html(sheduleRenderA);

this.epg_duration =0;

playlistAs.forEach(( playlistA, index)=>{





const maps = imedia.make_epc(playlistA,channel ,imaps=>{


const {iepg, iprogram } = imaps


//contenType: instructioins, breakers, filers, AI, program, file_from libry, liveFeed, Alarm, AnnouceTime, stutdown, shutDownTile
//console.log ("The Naps and Payloads", imaps);

loadIndex = index;
    schedulelistA = {
    program : iprogram ,
      duration: playlistA.duration,
      start:playlistA.start,
      stop: playlistA.stop,
      epg: iepg ,
      contentType:'program',
      controlMessage:[],
        video_id: playlistA.video_id,
     video_title: playlistA.video_title,
        video_description: playlistA.description,
        video_asset_type:playlistA.video_asset_type,
        video_thumbUrl :playlistA.thumbUrl,
        hotspots: [],
        index
          } ;

         // schedulelistB = imedia.make_epc(schedulelistA,channel);
         //console.log(playlistA, schedulelistA);
     
//imedia.scheduleA.push(schedulelistA);
scheduleA.push(schedulelistA);

//const {epg} =  schedulelistB;




          sheduleRenderB= ` 
  <div class="items-body-content">
    <span>${imedia.secondsToClockM(iepg.start)}  -  ${imedia.secondsToClockM(iepg.end)} </span>
    <span>${iepg.program} :: ${iepg.title}</span>
   
    <i class="fa fa-angle-right"></i>
     <span>${index} : ${imedia.secondsToClockM(iepg.duration)}</span>
  </div>
  `;

 
  
  $('#items-body').append(sheduleRenderB);


    })

  });



    
    
 /*** 
    const {  currentSessionTime,  sessionCount,stationDurationTime,
      stationStartTime,
      channel_info,
      channel_id,
      channel_name,

    } = imedia.ACI;
*/
//console.log(imedia.ACI);

sheduleRenderC= ` 
    </div>
    </div>`;
    
   // $('#schedulelist').append(sheduleRenderC);



const scheduleType = "loop";
const scheduleDay = "everyday";

//`channel_id: channel_info:   schedule_id:   index: list user,  type:, `;
imedia.scheduleA = {
schedule_id: channel.channel_id +scheduleDay+scheduleType,
name: channel.channel_id +scheduleDay+scheduleType,
channel_id: channel.channel_id,
channel_info :channel,
index: loadIndex,
user:username,
type : scheduleType ,
day: scheduleDay,
date: this.GLOBAL.week+ this.GLOBAL.day,
list :scheduleA,
channel_schedule: "",
cretedAt: "",
updateAT: ""

};


console.log (imedia.scheduleA);
/*** 

schedulelistA = {
program_name:programA.program_name,
program_id: programA.program_id,
program_description: programA.description,
program_thumbUrl: programA.thumbUrl,
duration: playlistA.duration,
start:playlistA.start,
stop: playlistA.stop,
video_id: playlistA.video_id,
video_title: playlistA.video_title,
video_description: playlistA.descruption,
video_asset_type:playlistA.asset_type,
video_thumbUrl :playlistA.thumbUrl
  } ;
  
  
  */

//$('#schedulelist').html(sheduleRenderC);



//$('')


  });
      


  }
  ,

make_epc: async function (list, channel, callback ){

assetDuration = this.epg_duration;

const iprogram = {
  channel_id: channel.channel_id,
  name: "n/a",
  id:0,
  thumbUrl:"",
  duration:null,
  slots:[{}]
    };
//used to program_info

// program=imedia.getProgramInfo(channel.program_id);
   // imedia.getChannelInfo(chan_id, (channel)=>{ 
  //const { channel_id , channel_name,info,serverTime, serverZTime,sessionCount, sessionTime,stationDurationClock,stationDurationTime,stationStartClock,stationStartTime, station_id_logo,thumb_url,timeZone} = channel;

const iepg = {};

iepg.start = channel.stationStartTime + assetDuration
epg_duration= iepg.duration=list.duration - (list.start+list.stop);

this.epg_duration += epg_duration;

iepg.end = channel.stationStartTime + this.epg_duration;

iepg.program=(typeof list.program == 'undefined' || list.program=="" )? 'n/a':list.program ;
iepg.title = text.trimTo(list.video_title+" | "+list.description, 45)+"...";
iepg.info = list.description;
//list.epg = epg;
//iepg.duration =
//const iepg= epg;

//console.log(iepg, iprogram);



   // get here

if(callback) callback({iepg, iprogram } );

   return {iepg, iprogram } ;

  //});


  }
  ,
  savePlaylist: async function () {
    const dataA = this.playlistA;

    const listData = {
      query: { channel_id: channel_id, request: "playlist_update" },

      username: username,
      channel_id: channel_id,
      role: imedia.admin_role,
      data: {
        list: dataA,
        name: "Playlist",
        createdAt: "",
        updatedAt: "",
      },
    };

    console.log(listData);
 
    console.log(" The Urtl for our PUT >>>>>>>>>>", this.apiBulkUrl);

    let feedback = await imedia.putPlaylist(
      listData,
      this.apiPlaylistUrl,
      (returnData) => {
        console.log("Feeed ===>", returnData);
      }
    );
    //console.log("Feeed ===>",listData);
  },
  saveSearchlist: async function () {
    const dataA = this.searchlistA;

    const listData = {
      query: { channel_id: channel_id, request: "searchlist_update" },

      username: GLOBAL.username,
      channel_id: channel_id,
      role: GLOBAL.admin_role,
      data: {
        list: dataA,
        name: "searchlist",
        createdAt: "",
        updatedAt: "",
      },
    };

    console.log(listData);
  
    console.log(" The Urtl for our PUT >>>>>>>>>>", this.apiBulkUrl);

    let feedback = await imedia.putPlaylist(
      listData,
      this.apiPlaylistUrl,
      (returnData) => {
        console.log("Feeed ===>", returnData);
      }
    );
    //console.log("Feeed ===>",listData);
  },
  saveSchedulelist: async function () {
    const dataA = this.scheduleA;


    console.log("---------------almost done!----------channel_id---------------",channel_id);
    console.log("---------------almost done!----------username---------------",username);


    const listData = {
      query: { channel_id: channel_id, request: "schedule_update" },
      username: imedia.username,
      channel_id: channel_id,
      role: imedia.admin_role,
      data: dataA
    };

    console.log(listData);
 
    console.log(" The Urtl for our PUT >>>>>>>>>>", this.apiBulkUrl);

    let feedback = await imedia.putPlaylist(
      listData,
      this.apiPlaylistUrl,
      (returnData) => {
        console.log("Feeed ===>", returnData);
      }
    );
    //console.log("Feeed ===>",listData);
  },
  playCH: (CH) => {
    //const channel_Url=BASESERVER+"/api/youtube/"+query;
    var XCH = CH ? CH : this.ACTIVECHANNEL;

    var url = "https://imediaport.com/stream/?ch=" + XCH;
    //onetv

    var $iframe = $("#player");
    if ($iframe.length) {
      $iframe.attr("src", url);
      return false;
    }
    return true;
  },
  send_Bulk: async function (bulkdata, url, runnit) {
    console;

    if (trace2) console.log(url);

    const kdata = { data: [] };

    kdata.data = bulkdata;

    const data = JSON.stringify(bulkdata);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    //'content-type': 'multipart/form-data;
    done = await axios.post(url, data, config).then((done_data) => {
      if (runnit) runnit(done_data);
      return done_data;
    });
    //console.log(done);
  },
  putPlaylist: async function (bulkdata, url, runnit) {
    //console

    if (trace2) console.log(url);

    //const kdata={};

    //kdata.data = bulkdata;

    const data = JSON.stringify(bulkdata);
    console.log("our data now ===============003=======", data);

    const config = {
      // headers: {'Content-Type': 'multipart/form-data'}
      headers: { "Content-Type": " application/json" },
    };

    done = await axios.put(url, data, config).then((done_data) => {
      if (runnit) runnit(done_data);
      return done_data;
    });
    //console.log(done);
  },
  put_Bulk: async function (bulkdata, url, runnit) {
    //console

    if (trace2) console.log(url);

    //const kdata={};

    //kdata.data = bulkdata;

    const data = JSON.stringify(bulkdata);
    console.log("our data now ===============003=======", data);

    const config = {
      // headers: {'Content-Type': 'multipart/form-data'}
      headers: { "Content-Type": " application/json" },
    };

    done = await axios.put(url, data, config).then((done_data) => {
      if (runnit) runnit(done_data);
      return done_data;
    });
    //console.log(done);
  },
  sendlistOne: async function (lister, callback) {
    var callfeed;

    //console.log
    imedia.sendPlaylist(lister, (listback) => {
      if (callback) callback(listback);

//imedia.setAtIndex();
console.log("attention pls!!!");//imedia.updateschedule();

      return listback;
    });
  },
  clearlist: async function (lista, callback) {
    this.playlistB = this.searchlistA;
    this.searchlistA = [];
    imedia.clear_showlist();
  },
  sendlistSelected: async function (lista, listb) {
    var giverlist = typeof lista != "undefined" ? lista : this.searchlistA;

    this.playlistA = this.searchlistA;

    console.log("attention pls!!!"); //imedia.updateschedule();
  },

  makeLibry: async function (lista, callback) {
    const {
      description,
      duration,
      embeddable,
      id,
      indexDuration,
      indexStart,
      indexStop,
      indexTime,
      netid,
      shedule,
      thumbUrl,
      timeEngine,
      title,
      trimstart,
      trimstop,
    } = lista;
    if (embeddable) {
      //program_id, program_name, video_id, playday, play_date ,listnames,thumb_url, description,                                                                      net_id, play_at, play_index, start, stop ,duration, video_asset_type, video_title, published,active
      const lisaLibry = {
        description: text.trimTo(description, 50),
        program_name: "",
        program_id: null,
        playday: null,
        duration,
        video_id: id,
        indexDuration,
        indexStart,
        indexStop,
        indexTime,
        net_id: netid,
        shedule,
        thumbUrl: thumbUrl,
        play_index: timeEngine,
        video_title: text.trimTo(title, 20),
        start: trimstart,
        stop: trimstop,
        video_asset_type: "youtube",
      };

      if (callback) callback(lisaLibry);
      return lisaLibry;
    } else {
      if (callback) callback(false);
      return false;
    }
  },

  sendPlaylist: async function (lista, callback) {
    let insertIndex =0;//console.log("strtubf lista", lista);'
   // console.log(imedia.activeIndex, imedia.activeIndex);
    var lisaLibry = await imedia.makeLibry(lista);
    //console.log(lisaLibry,lista);
    insertIndex = (imedia.activeIndex!= null)? imedia.activeIndex: imedia.playlistA.length;
    //this.playlistA = this.searchlistA;
    if (this.playInsert) {
      //imedia.activeIndex
      this.playlistA.splice(insertIndex + 1, 0, lisaLibry);

      //insertIndex =imedia.activeIndex  = insertIndex + 1;
     imedia.setAtIndex(insertIndex + 2);//---------------------------------------------------check----
    } else {
      this.playlistA.push(lisaLibry);
      imedia.setAtIndex(0);
      //this.libraryA.push()
    }


    if (callback) callback(lisaLibry);
    //let lmx = imedia.updateschedule();//-------------------------------------------------------
    return lisaLibry;
    //var  giverlist = (typeof lista != 'undefined')? lista : this.searchlistA
  },
  sendlistAllxx: async function (lista, callback) {
    imedia.sendsearchlistAll(lista, (callfback) => {
    //  const mx = imedia.updateschedule();//-------------------------------------------------------
    });
  },

  sendlistAll: async function (lista, callback) {
    msgboxNoClose.show(`sending search to Playlist please wait...`);

    var giverlists = typeof lista != "undefined" ? lista : this.searchlistA;

    //this.playlistA = this.searchlistA;
    giverlists.forEach((giverlist) => {
      imedia.sendPlaylist(giverlist, (retdata) => {
        if (callback) callback(retdata);

      //  imedia.updateschedule();
        return retdata;

        // imedia.updateschedule();
      });
    });

    //setTimeout( imedia.updateschedule(),2000);
    //playlistA: [],
    //  searchlistA: []
  },
  xupdateschedule: async function (sentlist) {

    if(sentlist){
   // imedia.activeIndex = 0; @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    <---- update pls  28/6/2023
  }


  if ( imedia.activeIndex == null)imedia.activeIndex= imedia.playlistA.length;
 imedia.maxIndex=imedia.playlistA.length;
  
  this.assetDuration;
    var VideoArray = [];
    var pp = 0;
    //sentlist =

    this.assetList =
      typeof sentlist != "undefined" ? sentlist : imedia.playlistA;

   // $("#playlist").html(` <ul>`);

   // const channel = imedia.channel_info;

    //console.log(channel);

    //this.sesssions = channel;
  this.assetPP=0;
  this.assetDuration=0;
  this.assetCount =0
this.assetList.forEach((prog, p) => {
    
 this.assetCount =p;
  program =  imedia.setProgramSchedule(prog);

  this.assetList[p] = program;

      if (trace2) console.log("net id", program.net_id);
      this.assetList[p].net_id = p;
      this.assetDuration += this.assetList[p].duration;
      //program.net_id = p;
      pp = program.pp;
      VideoArray[p] = program.video_id;
    });

    imedia.setAtIndex(0);

  },
  //============================++++++++++++++++++++++++++++++++++++++  set Program +++++++++++++++++++++++++++++++
  getfromChannel: async function (keydata, url, runnit) {
    const data = JSON.stringify(keydata);

    //console.log("our data now ===============003=======", data);

    const config = {
      // headers: {'Content-Type': 'multipart/form-data'}
      headers: { "Content-Type": " application/json" },
    };

    axios.put(url, data, config).then((done_data) => {
      // console.log("=================== 004 -----------------our jkourney", done_data.data);

      if (runnit) runnit(done_data.data);
      return done_data;
    });
  },
  secondsToClock: function (secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  },

  secondsToClockM: function (secs) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  },
  getChannelInfo: async function (channel_id, callback) {
    if (typeof channel_id == "undefined") channel_id = this.ACTIVECHANNEL;

    query = { query: { channel_id: channel_id, reguest: "get_channel_info" } };
    const url = imedia.apiChannelUrl + channel_id;

    //console.log("=================== 002 -----------------our journey start", query);
    //maxim = await imedia.getChannelInfo ();

    imedia.getfromChannel(query, url, (cInfo) => {
      //console.log("Retunred info  from our jkourney is---------->",cInfo);

      this.ACTIVE = cInfo;

      if (callback) callback(cInfo);
      return cInfo;
    });
  },

  setProgramLive: function (prog, pp, p) {
    const program = prog;
    //console.log("==========data prog========",prog) ;
    //console.log("==========data channel========",channel) ;

    //(prog,pp,p, channel);

    const {
      currentSessionTime,
      sessionCount,
      stationDurationTime,
      stationStartTime,
    } = this.ACI;

    /**

this.session= session = await imedia.getCurrentSession(); <------------------


 */
    // {currentSessionTime, sessionCount, stationDurationTime, stationStartTime};

    stationDuration = stationDurationTime; // = session.stationDurationTime ;
    stationStart = stationStartTime; // = session.stationStartTime;

    //console.log( "start and duration", stationStart+" | "+ stationDuration);
    //  program_id 		net_id	channel_id	play_at	play_index	playday	play_date	listname	program_name description	duration start	stop	video_id	 video_title		video_asset_type		thumb_url		published	createdAt	updatedAt	active

    mx = prog;

    // potime for live program
    potime = stationStart + (sessionCount - 1) * stationDurationTime;

    // potime for Schedule manger

    //potime = stationStart;

    //+ (sessionCount -1 )* stationDurationTime;

    mx.index = index = p;
    mx.net_id = mx.netid = p;
    var xtitle = "";
    if (typeof program.program_name != "undefined")
      xtitle = program.program_name;
    if (typeof program.video_title != "undefined") xtitle = program.video_title;
    if (typeof program.title != "undefined") xtitle = program.title;
    if (typeof program.description != "undefined") xtitle = program.description;

    +program.description;
    //real duration ------
    trim = prog.start + prog.stop;
    duration = prog.duration - trim;
    if (duration < 60) duration = 62;
    //md.video_id =
    play_start = potime + pp;
    play_end = play_start + duration;
    mx.play_start = play_start;
    mx.pp = pp + duration;
    mx.video_title = xtitle;
    mx.title = xtitle;
    mx.play_end = play_end;
    mx.index = index;
    mx.duration = duration;
    //return {play_start, play_end , index, video_id , duration };

    console.log("==========datamx out========", mx);
    return mx;
  },

setProgramSchedule:  async function (prog, callback) {
 
  const program= mx = prog;
  
  if (!prog.start)prog.start=0;
  if(!prog.stop)prog.stop=0;
  if(!prog.duration) prog.duration = prog.indexDuration;
  
p= imedia.assetCount ;
   const {
      currentSessionTime,
      sessionCount,
      stationDurationTime,
      stationStartTime,
    } = imedia.ACI;

    

    potime = stationStartTime;


    //+ (sessionCount -1 )* stationDurationTime;

    mx.index = index = p;
    mx.net_id = mx.netid = p;
    var xtitle = "";
    if (typeof program.program_name != "undefined")
      xtitle = program.program_name;
    if (typeof program.video_title != "undefined") xtitle = program.video_title;
    if (typeof program.title != "undefined") xtitle = program.title;
    if (typeof program.description != "undefined") xtitle = program.description;

    +program.description;
    //real duration ------
    //console.log(p+"prog.duration=", prog.duration);
    //console.log(prog.video_id+"type of duration=", typeof prog.duration);

    trim = prog.start + prog.stop;
    
    duration = prog.duration - trim;
    if (duration < 60) duration = 62;
    //md.video_id =
    play_start = potime +  imedia.assetDurations ;
    play_end =  play_start + duration;
    mx.play_start = play_start;
    mx.pp =  imedia.assetDurations =  imedia.assetDurations + duration;
    mx.video_title = xtitle;
    mx.title = xtitle;
    mx.play_end = play_end;
    mx.index = index;
    mx.duration = duration;

    //console.log( imedia.assetDurations );
   //imedia.assetDurations =+ duration;
    //return {play_start, play_end , index, video_id , duration };
    if(callback)callback(mx);

    //console.log("==========datamx out========",mx) ;
    return mx;
  },

  prevshow: (id) => {
    //imedia.prevShow(id);
    // 
    
    console.log (id);
  },
  prevShow: (it) => {
    //$('#framecup').attr('visibility','visible');

    // $('#iframe_cup').css('visibility', 'visible');
    var video_id = it;

    console.log(" We are here frp = ", video_id);
    //visibility:hidden;
    //	visibility:visible;
    //$('#framecup').attr('display','inline');
    // $("#phold").removeClass("pophold");
    // $("#phold").addClass("popshow");

    //$("#framecup").removeClass("frame_cup");
    //$("#framecup").addClass("frame_cup_show");
    const origin = "&origin=" + imedia.origin;

    $("#iplayer").attr(
      "src",
      ` https://www.youtube.com/embed/${video_id}?autoplay=1${origin}`
    );
  },
  show: (id) => {
    player.playVideoById(id);
    console.log(id);
  },

  add_search: function (id) {
    //console.log("|"+id+"|");
    //imedia.searchlistA[i].thumb_url= imedia.searchlistA[i].thumbail;
    let theLisa = this.searchlistA[id];

    imedia.sendlistOne(theLisa);
    //console.log(theLisa);
  },
  delete_search: (id) => {
    xdelete = imedia.searchlistA.splice(id, id);
    imedia.deletedA.push(xdelete);
    //console.log(" xdelete =", xdelete);
    imedia.make_showlist(imedia.searchlistA);
   // console.log(id);
  },
  empty_playlist: () => {

    if (imedia.playlistD.length>1)imedia.playlistE = imedia.playlistD;
    if (imedia.playlistC.length>1)imedia.playlistD = imedia.playlistC;
    if (imedia.playlistB.length>1)imedia.playlistC = imedia.playlistB;
    if (imedia.playlistA.length>1)imedia.playlistB = imedia.playlistA;
    imedia.playlistA = [];
    imedia.setAtIndex();



  },

  cyoutubePopId: (i) => {
    console.log("actVideo i=", i);
    // console.log(imedia.searchlistA);

    imedia.searchlistA[i].video_id = imedia.searchlistA[i].id;

    console.log(video_id);
    // video_id

    imedia.popShow(video_id);
  },
  get getChannel() {
    nCH = this;
    station_name = this.name;

    channel_id = this.channel_id;

    // this.info = nCH.info|| this.info;
    info = this.info;
    channel_id = this.channel_id;
    station_id_logo = this.station_id_logo;
    thumbUrl = (typeof this.thumbUrl != 'undefined')? this.thumbUrl: this.thumbUrl;
    timeZone = this.timeZone;

    console.log;

    const stationDurationTime = imedia.setTimeToSeconds(nCH.stationDuration);

    this.stationDurationTime = stationDurationTime;

    this.stationStartTime = stationStartTime = imedia.setTimeToSeconds(
      nCH.stationStart
    );
    console.log("station duration", this.stationDurationTime);
    zone = nCH.timeZone * 3600 * 1000;
    const d = new Date();
    const seconds = d.getTime() + zone;
    holdtime = new Date(seconds).toISOString().slice(11, 19);

    c = holdtime.split(":");
    currentTime = +c[0] * 60 * 60 + +c[1] * 60 + +c[2];
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

    sessionstart = currentTime + compansate - stationDurationTime;

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
      thumb_url: thumbUrl,
      thumbUrl,
      timeZone,
    };
  },

  getCurrentSession: async function () {
    //console.log("=================== 001 -----------------our jkourney");
    //maxim = await imedia.getChannelInfo ();
  },

  get xgetCurrentSession() {
    // stationDurationTime = imedia.setTimeToSeconds(this.stationDuration);

    const { stationStartTime, stationDurationTime } = this;

    zone = this.timeZone * 3600 * 1000;
    const d = new Date();
    const seconds = d.getTime() + zone;

    holdtime = new Date(seconds).toISOString().slice(11, 19);

    c = holdtime.split(":");
    currentTime = +c[0] * 60 * 60 + +c[1] * 60 + +c[2];
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
      }s
    }

    sessionstart = currentTime + compansate - stationDurationTime;

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

    return {
      currentSessionTime,
      sessionCount,
      stationDurationTime,
      stationStartTime,
    };
  },
  setTimeToSeconds: function (time) {
    a = ctime.split(":");
    return (stationDurationTime = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]);
  },
  setClockToSeconds: function (time) {
    a = time.split(":");
    return (stationDurationTime = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]);
  },
  overAtIndex: function (butObj, index) {
    //console.log( )
    //let HoldingIndex ={};
    caller = butObj.name;
    actor = index;
    //onsole.log('Mouxe Over at..', caller+" | "+actor);
  },
  clickEventIndex: function (butObj, index, e) {
    const iSbase = document.getElementById("timelist");
    //const butObj= Event.target;
    //const index = e.target.for;

    //console.log("Event ------->", e);
    //console.log("Object for ------->",butObj.for);
    const deleteChannelA = {};
    let HoldingIndex = {};
    caller = butObj.name;
    callerID = butObj.id;
    actor = index;
    //index= butObj.for;

    //xMousePos = e.pageX;
    //yMousePos = e.pageY;
    //yoff = yMousePos - $(document).scrollTop() - $('#timeline').offset().top
    //yoff =yMousePos  - $("#playlist").offset().top;

    //actor  = index;
    //console.log('=========Mouse X n Y.',yoff);
    //this.newindex =
    let newindex = index;
    const bodyx = "body" + index;
    //console.log("bodyx=", bodyx+"|"+caller);

    switch (caller) {
      case "up":
        HoldingIndex = this.playlistA[actor - 1];
        HoldingIndex.index = HoldingIndex.net_id = HoldingIndex.netid = actor;

        this.playlistA[actor - 1] = this.playlistA[actor];
        this.playlistA[actor - 1].index =
          this.playlistA[actor - 1].net_id =
          this.playlistA[actor - 1].netid =
            actor - 1;
        this.playlistA[actor] = HoldingIndex;
        //this.playlistA.splice(imedia.activeIndex, 0, lisaLibry);
        //console.log(HoldingIndex );
        /*
elUP = `divbody${index-1}`;
elDOWN = `divbody${index}`;
console.log(callerID+"Our main object Up ID=",elUP);
console.log(callerID+"Our main object Down ID=",elDOWN);

elementUp = document.getElementById(elUP);
elementDown = document.getElementById(elDOWN);
console.log(callerID+"Our main direct object DownID=",elementDown.id);
imedia.newindex  =newindex = index-1
 imedia.setAtIndex(this.newindex);

 elementDif =elementUp.offsetDown -  elementDown.offsetTop ;

 var rect = elementUp.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
 console.log( 'The Diiference is  ------> ',  elementDif);
 */

        //$("#playlist").scrollTop(-(40+6));

        //elementDif = elementDown.offsetTop - elementUp.offsetTop
        //$("#playlist").scrollTop(yPos);
        //imedia.setMouseTo(yoff);
        //$("#"+callerID).focus();

        //$("#playlist").scrollTop(-(40+6));
        imedia.newindex = newindex = index - 1;
        imedia.setAtIndex(this.newindex+1);

        //$("#playlist").scrollTop(0, -46);
        iSbase.scrollBy(0, -46);
        break;
      case "down":
        if(actor + 1 < this.playlistA.length){


        HoldingIndex = this.playlistA[actor + 1];
        HoldingIndex.index = HoldingIndex.net_id = HoldingIndex.netid = actor;
        this.playlistA[actor + 1] = this.playlistA[actor];
        this.playlistA[actor + 1].index =
          this.playlistA[actor + 1].net_id =
          this.playlistA[actor + 1].netid =
            actor + 1;
        this.playlistA[actor] = HoldingIndex;
        //this.playlistA.splice(imedia.activeIndex, 0, lisaLibry);
        //console.log(HoldingIndex );
        imedia.newindex = newindex = index + 1;
        console.log(newindex);

        imedia.setAtIndex(newindex+1);
        //$("#playlist").scrollBy(0, - 46);
        //$("#playlist").scrollTop(46);
        //const iSbase = document.getElementById("timelist");
        //$("#playlist").scrollTop(0, -46);
        iSbase.scrollBy(0, 46);
} else { 
  imedia.setAtIndex(0);
  playAlert();
//ping   soft a'larm
console.log("at the end sir!!!");

}
        //imedia.setMouseTo(yoff);
        //$("#"+callerID).focus();
        break;
      case bodyx:
        imedia.setAtIndex(newindex+1);

        //setTimeout(() => {}, 1000);
        break;

      case "save":
        imedia.setAtIndex(newindex+1);
        break;
      case "trash":
        if (newindex == 0) {
          deleteChannelAi = this.playlistA[newindex];
          this.playlistA.shift();
          this.playlistAdeleted.push(deleteChannelAi);
        } else {
          deleteChannelAi = this.playlistA.splice(newindex, newindex);
          this.playlistAdeleted.push(deleteChannelAi);
        }
        imedia.setAtIndex(newindex+1);
        break;
      case "copy":
        HoldingIndex = this.playlistA[newindex];
        this.playlistA.splice(newindex + 1, 0,HoldingIndex);
        imedia.setAtIndex();
        break;
    }

    //console.log('clicked By =============>' ,butObj.name );

    if (caller == bodyx) {

      
      if (this.newindex) {
        imedia.setAtIndex(this.newindex+1);
        this.newindex = null;
      } else {
        imedia.setAtIndex(index+1);
      }
    }
  },

  libryViewUpdate: function () {
    if (imedia.activeIndex) {
//console.log("load =",  this.playlistA[imedia.activeIndex]);
      //var thumburl = this.playlistA[imedia.activeIndex].thumb_url;
     
      var thumbUrl = this.playlistA[imedia.activeIndex].thumbUrl;

      //$('#libryplayer').css('backgroundImage', )
      $("#libryplayer").css("background-image", "url(" + thumbUrl + ")");
    }
  },

  clickAtIndex: function (butObj, index) {
    console.log("Event ------->", Event);
    const deleteChannelA = {};
    let HoldingIndex = {};
    caller = butObj.name;
    callerID = butObj.id;
    actor = index;
    //console.log('And now we have ...', caller+" | "+actor);
    //this.newindex =
    let newindex = index;
    const bodyx = "body" + index;
    //console.log("bodyx=", bodyx+"|"+caller);

    switch (caller) {
      case "up":
        HoldingIndex = this.playlistA[actor - 1];
        HoldingIndex.index = HoldingIndex.net_id = HoldingIndex.netid = actor;

        this.playlistA[actor - 1] = this.playlistA[actor];
        this.playlistA[actor - 1].index =
          this.playlistA[actor - 1].net_id =
          this.playlistA[actor - 1].netid =
            actor - 1;
        this.playlistA[actor] = HoldingIndex;
        //this.playlistA.splice(imedia.activeIndex, 0, lisaLibry);
        //console.log(HoldingIndex );
        imedia.newindex = newindex = index - 1;
        imedia.setAtIndex(this.newindex+1);
        imedia.setMouseTo(callerID, newindex);
        imedia.activeindex = imedia.activeIndexndex = imedia.newindex = newindex = index - 1;



        //$("#"+callerID).focus();
        break;
      case "down":
        HoldingIndex = this.playlistA[actor + 1];
        HoldingIndex.index = HoldingIndex.net_id = HoldingIndex.netid = actor;
        this.playlistA[actor + 1] = this.playlistA[actor];
        this.playlistA[actor + 1].index =
          this.playlistA[actor + 1].net_id =
          this.playlistA[actor + 1].netid =
            actor + 1;
        this.playlistA[actor] = HoldingIndex;
        //this.playlistA.splice(imedia.activeIndex, 0, lisaLibry);
        //console.log(HoldingIndex );
        
        imedia.activeIndex = imedia.activeIndex = imedia.newindex = newindex = index + 1;

        //console.log(newindex);
        imedia.setAtIndex(newindex+1);
        imedia.setMouseTo(callerID, newindex);
        //$("#"+callerID).focus();
        break;
      case bodyx:
        imedia.setAtIndex(this.newindex+1);
        //setTimeout(() => {}, 1000);
        break;

      case "save":
        imedia.setAtIndex(newindex+1);
        break;
      case "trash":
        deleteChannelA = this.playlistA.splice(newindex, newindex);
        this.playlistAdeleted.push(deleteChannelA);
        imedia.setAtIndex(newindex+1);
        break;
      case "edit":
       // imedia.setAtIndex(newindex);
        break;
    }

    //console.log('clicked By =============>' ,butObj.name );

    if (caller == bodyx) {
      if (this.newindex) {
        imedia.setAtIndex(this.newindex+1);
        this.newindex = null;
      } else {
        imedia.setAtIndex(index+1);
      }
    }
  },
  getEventType: function (event) {
    //const log = document.getElementById("timelist");
    console.log("events =" + event.target.id, `${event.type}\n${event}`);
  },

  setMouseTo: function (yPos) {
    /**
 const hotbody ="divbody"+index;
 console.log("our hot ies = ",hotbody);
  let listlong = this.playlistA.length;
  const hostBox =document.getElementById("timelist");
const ele = document.getElementById("timelist");
let tx = ele.scrollHeight;
let ty = ele.scrollWidth;
let yeach = tx /listlong;
let subelement = document.getElementById(hotbody);

//let subtx = subelement.clientHeight;
//let subtx = subelement.height;

//console.log(subtx);
  //var input = document.getElementById('test-input');
  //setCaretPosition(elementID, input.value.length);
//let cursor = document.getElementById("cursor");
let element = document.getElementById(elementID);
let x = element.offsetLeft;
let y = element.offsetTop;
 */

    //element.offsetTop
    $("#playlist").scrollTop(yPos);

    //sst Y

    //hostBox.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    //$("#"+elementID).mouseYPos(y + 5);

    //.mouseXPos(e.pageX + 0)
    //cursor.style.top = y + 5;
    //console.log(`yeach single = ${subtx} index = ${index}  ele.scrollHeight all = ${tx}`);
  },
  setCaretPosition: function () {



  },

  // Set the cursor position of the "#test-input" element to the end when the page loads

  playAtIndex: function (xindex, offset, flag) {

    //correct the xindex to index above 
    console.log("flag>>>>>>>>>", flag);

    isPlayer = isPlayer ? isPlayer : playtime.isPlayer;
    isCuePlayer = isCuePlayer ? isCuePlayer : playtime.isCuePlayer;
    isPrevPlayer = isPrevPlayer ? isPrevPlayer : playtime.isPrevPlayer;

    if (typeof flag == "undefined") flag = false;
    console.log("flag>>>>>>>>>", flag);
    //if(!flag) addclass = "boxxhidden";

    if (!offset) offset = 0;
    if(index) imedia.activeIndex = index;

    var VideoArray = [];
    this.assetCount =0;
    // ;this.assetList = sentlist ;
    $("#playlist").html(` <ul>`);

    this.assetList.forEach((program, p) => {
      // this.assetList[p].net_id = p;
      this.assetCount =p;
      //program.net_id = p;
      VideoArray[p] = program.video_id;
      addclass = "";

      if (p < index - 1) {
        //  if(!flag) addclass = "boxxhidden";
      }

      if (p == index - 1) {
        // addclass = "boxxdisable";
        addclass = "boxxon";
      }

      if (p == index) {
        //   addclass = "boxxon";
        addclass = "boxxdisable";

        startTrim = this.assetList[p].start + offset;

        if (isPlayer)
          player.loadVideoById(
            this.assetList[p].video_id,
            startTrim,
            this.assetList[p].stop
          );

        if (isCuePlayer)
          cueplayer.cueVideoById(
            this.assetList[p + 1].video_id,
            this.assetList[p + 1].start,
            this.assetList[p + 1].stop
          );
      }
      if (p == index + 1) {
        addclass = "boxxnext";
      }

      $("#playlist").append(
        `<div draggable="true"   name="divbody${p}" id="divbody${p}" > <a class="cool boxxSelected" id="body${p}" name="body${p}" onclick='imedia.clickAtIndex(this,` +
          p +
          `)' >
  <div draggable="true" class="boxx   ` +
          addclass +
          `"  >
      <div class="listlog">` +
          imedia.secondsToClockM(program.play_start) +
          `-` +
          imedia.secondsToClockM(program.play_end) +
          `
      </div>
      <div class="listinfo">
      ` +
          program.net_id +
          `|` +
          imedia.secondsToClockM(program.duration) +
          `</div>
          <div class="boxxtitle shadowbox">
          ` +
          program.program_name +
          `</div>
          <div class="btn-group-sm boxxbuttons">
          <button type="button" name="edit" id="edit${p}" class="btn btn-dark"  onclick='imedia.clickAtIndex(this,` +
          p +
          `)'>Chk</button>
          <button type="button" name="play" id="play${p}" class="btn btn-dark"  onclick='imedia.clickAtIndex(this,` +
          p +
          `)'>|>|</button>
          <button type="button" name="up" id="up${p}" class="btn btn-dark"  onclick='imedia.clickAtIndex(this,` +
          p +
          `)'>Up</button>
          <button type="button" name="down" id="down${p}" class="btn btn-dark"  onclick='imedia.clickAtIndex(this,` +
          p +
          `)'>Dn</button>
        </div>
  
    
          <div class="boxx-pix" style="background-image: url('` +
          program.thumb_url +
          `'); background-size: cover;
          background-repeat: no-repeat;"></div>
     
 
          </div>
</a></div>`
      );
    });

    $("#playlist").append(` </ul>`);

    // console.log(player);
    // console.log(VideoArray);

    // player.loadVideoById(VideoArray[1],0, 0);
    // player.cueVideoById(VideoArray[1+1],0, 0);
  },


  setAtIndex: async function (xindex, offset) {
    //console.log("they want",index);

  
    if ( xindex!= null)imedia.activeIndex =  index = xindex-1;

   // setProgramSchedule: function (prog, pp, p) 
    isPlayer = isPlayer ? isPlayer : playtime.isPlayer;
    isCuePlayer = isCuePlayer ? isCuePlayer : playtime.isCuePlayer;
    isPrevPlayer = isPrevPlayer ? isPrevPlayer : playtime.isPrevPlayer;

    if (!offset) offset = 0;
   // console.log (" index = "+index , " and this playIndex ="+imedia.activeIndex+" and Active="+imedia.activeIndex );
  
    if(xindex==0)index  =   imedia.activeIndex ; 
    if(xindex==null)index  =   imedia.activeIndex = +1

//console.log ("stage 2 index here= "+index , " and Active Index ="+imedia.activeIndex );
 /** 
  * if(index==-1)index =  imedia.activeIndex = -1
if(index==+1)index =  imedia.activeIndex = +1
*/

//22@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  temp by pass please correct the playlistA to assest list need a dedicated function ===
this.assetList = this.playlistA;

imedia.activeIndex  = index ;
    imedia.activeIndex =  index;

    var VideoArray = [];

    // ;this.assetList = sentlist ;
    $("#playlist").html(` <ul>`);
    pp=0;
imedia.assetDurations=0;
imedia.assetCount =0
imedia.assetList.forEach((prog, i) => {
      // this.assetList[p].net_id = p;
    imedia.assetCount = i;
    // imedia.setProgramSchedule(prog, pp, p) 
   // console.log(i,`=i imedia.assetDuration and  imedia.assetCount`);
    //console.log(imedia.assetDuration,  imedia.assetCount);
     
 const gram = imedia.setProgramSchedule(prog,  program =>{
index = imedia.activeIndex ;
      const p = imedia.assetCount;
  

imedia.makeList(program,index);



    VideoArray[p] = program.video_id;

  });


}) ;

  $("#playlist").append(` </ul>`);
  imedia.callFunction('playlist');
 
  },
makeList :function (program, index){


      
  const p=program.net_id =  imedia.assetCount;

  addclass = "";

  if (p < index - 1) {
    // if(!flag) addclass = "boxxhidden";
  }

  if (p === index - 1) {
    // addclass = "boxxdisable";
    //addclass = "boxxon";
  }

  if (p === index) {
    //console.log(program);
    addclass = "boxxSelected";
    // addclass = "boxxon";
    imedia.libryViewUpdate(index);
    imedia.activeIndex = index;

  }
  
  if (p === index + 1) {
    // addclass = "boxxnext";
  }

  var program_name = program.program_name + " | " + program.video_title;

  $("#playlist").append(
    `<div class="cool" name='divbody${p}' id='divbody${p}' ><a class="cool" name='body${p}' id='body${p}'  onclick='imedia.clickEventIndex(this,${p},event)' >
<div draggable="true" class="boxx   ` +
      addclass +
      `">
<div class="listlog">` +
      imedia.secondsToClockM(program.play_start) +
      `-` +
      imedia.secondsToClockM(program.play_end) +
      `
</div>
<div class="listinfo">
  ` +
      (program.net_id + 1) +
      `|` +
      imedia.secondsToClockM(program.duration) +
      `</div>
      <div class="boxxtitle shadowbox">
      ` +
      program_name +
      `</div>
      <div class="btn-group-sm boxxbuttons">

      <button type="button" name="up" id="up${p}" for="${p}"  class="btn btn-dark"  onmouseover='imedia.overAtIndex(this,` +
      p +
      `)' onclick='imedia.clickEventIndex(this,${p}, event)'><i class="fa-solid fa-arrow-up btn_icons"></i></button>
      <button type="button" name="down" id="down${p}" for="${p}" class="btn btn-dark" onmouseover='imedia.overAtIndex(this,` +
      p +
      `)'  onclick='imedia.clickEventIndex(this,${p},event)'> <i class="fa-solid fa-arrow-down  btn_icons"></i></button>
      <button type="button" name="copy" id="copy${p}" for="${p}" class="btn btn-dark" onmouseover='imedia.overAtIndex(this,` +
      p +
      `)'  onclick='imedia.clickEventIndex(this,${p},event)'><i class="fa-regular fa-copy  btn_icons"></i></button>
      <button type="button" name="trash" id="trash${p}" for="${p}" class="btn btn-dark  btn_icons" onmouseover='imedia.overAtIndex(this,` +
      p +
      `)'  onclick='imedia.clickEventIndex(this,${p},event)'><i class="fa-solid fa-trash  btn_icons"></i></button>

      </div>
    <div class="boxx-pix" style="background-image: url('` +
      program.thumbUrl +
      `'); background-size: cover;
    background-repeat: no-repeat;"></div>


    </div>
</a></div>`
  );



}
  ,

  iclockWork: function () {
    // $("#infox").append( "::");
    // console.log("clocking  inside ....");
    playtime.extclockWork();

    if (playtime.playLapsed <= 5) {
      // $("#infox").append ("  >>.."+playtime.playLapsed(player));
    }

    if (playtime.playLapsed(player) == 2) {
      playtime.playAtIndex(imedia.activeIndex + 1);
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

  youtubePopId: (i) => {
    console.log("actVideo i=", i);
    console.log(imedia.searchlistA);

    video_id = imedia.searchlistA[i].id;
    console.log(video_id);
    // video_id

    imedia.popShow(video_id);
  },
  function_hide_all: function () {
    //var mainlist =[{id: '#main_playlist'},{id:' #main_calendar'},{id: '#main_playlist'},{id:'#main_calendar'},{id:'#main_schedule'},{id:'#main_libry'},{id:'#main_programs'}, {id:'#main_epg'}];
    //mainlist.forEach(list=>{
    //var hideid= "#"+list.id;
    //console.log("About to hide ",hideid);
    //$(hideid).css("visibility", "hidden");

    //case 'main_calendar': console.log("------------------02-------------");
    $("#main_playlist").css("visibility", "hidden");
    $("#main_playlist").removeClass("now_show");
    $("#main_playlist").addClass("now_hide");

    $("#main_calendar").css("visibility", "hidden");
    $("#main_calendar").removeClass("now_show");
    $("#main_calendar").addClass("now_hide");

    $("#main_schedule").css("visibility", "hidden");
    $("#main_schedule").removeClass("now_show");
    $("#main_schedule").addClass("now_hide");

    $("#main_libry").css("visibility", "hidden");
    $("#main_libry").removeClass("now_show");
    $("#main_libry").addClass("now_hide");

    $("#main_programs").css("visibility", "hidden");
    $("#main_programs").removeClass("now_show");
    $("#main_programs").addClass("now_hide");

    $("#main_epg").css("visibility", "hidden");
    $("#main_epg").removeClass("now_show");
    $("#main_epg").addClass("now_hide");

    $("#main_timelist").css("visibility", "hidden");
    $("#main_timelist").removeClass("now_show");
    $("#main_timelist").addClass("now_hide");



    $("#main_welcome").css("visibility", "hidden");
    $("#main_welcome").removeClass("now_show");
    $("#main_welcome").addClass("now_hide");



    $("#main_cupdate").css("visibility", "hidden");
    $("#main_cupdate").removeClass("now_show");
    $("#main_cupdate").addClass("now_hide");
    //case 'main_calendar': console.log("------------------02-------------");

    //$(hideid).hide();

    /***
   * 
#main_playlist {
	visibility:hidden;
}
 #main_calendar  {
	visibility:hidden;
}
 #main_schedule {
	visibility:hidden;
}
 #main_libry {
	visibility:hidden;
}

#main_programs {
	visibility:hidden;
}
 #main_epg  {
	visibility:hidden;
}
 #main_calenda  {
	visibility:hidden;
}

#main_timelist {
visibility:hidden;
}

#main_welcome {
	visibility:hidden;
	}
	
   */

    //})
  },

  function_Show_now: function (idx) {
    var showid = "#" + idx;

    //ar mainlist =[{id: 'timelis'},{id:'schedule_cal'},{id:'schedule'},{id:'libry'},{id:'programs'}, {id:'epg'}];
    console.log("About to show ", showid);

    //$(showid).show();

    $(showid).css("visibility", "visible");
  },

  selectSwitch: function (e) {
    //var e = document.getElementById("function");
    var xvalue = e.options[e.selectedIndex].value;
    var xtext = e.options[e.selectedIndex].text;
    var xindex = e.selectedIndex;

    if (e.name == "xxfunction") {
      imedia.function_hide_all();

      console.log("--------------01--------------", xvalue);

      switch (xvalue) {
        case "main_calendar":
          console.log("------------------02-------------");
          $("#main_calendar").css("visibility", "visible");
          $("#main_calendar").removeClass("now_hide");
          $("#main_calendar").addClass("now_show");
        case "main_calendar":
          console.log("------------------02-------------");
          break;
        case "main_schedule":
          console.log("------------------03-------------");
          $("#main_schedule").css("visibility", "visible");
          $("#main_cschedule").removeClass("now_hide");
          $("#main_schedule").addClass("now_show");
        case "main_schedule":
          console.log("------------------04-------------");
      }

      // imedia.function_hide_all();

      imedia.function_Show_now(xvalue);

      main_calendar;
    } else {
      /** 
  selectElement = document.querySelector('#admincp');
  output = selectElement.value;

console.log(SCall.selectedIndex,  SCall.name);
console.log(SCall.id,  SCall.name);

console.log("the value = ", output);
if('admincp' == SCall.id){
 const homepage= location.origin;
 console.log(homepage);
*/


      switch (xvalue) {
        case "playlist":
          imedia.function_hide_all();
          imedia.function_Show_now("timelist");
          break;

        case "schedule":
          imedia.function_hide_all();
          imedia.function_Show_now("schedule_cal");

          break;
        case "programs":
          imedia.function_hide_all();
          imedia.function_Show_now("main_progrms");
          break;

        case "libry":
          imedia.function_hide_all();
          imedia.function_Show_now("main_libry");
          break;
        case "epg":
          imedia.function_hide_all();
          imedia.function_Show_now("main_epg");
          break;
        case "logout":
          window.location = "/./logout";

          break;
          case "switch":
            //--- save-current -cannel opne project or warn
            window.location = "/./serv/playcon/"+xtext;
  
            break;
      }
    }
  },

  selectClick: function (e) {
    //var e = document.getElementById("function");
    var xvalue = e.options[e.selectedIndex].value;
    var xtext = e.options[e.selectedIndex].text;
    var xindex = e.selectedIndex;

    console.log("========TAS!=========");

    //onchange='imedia.selectSwitch(this)' onclick='imedia.selectClick(this)'
    /** 
  <select id="function"  name="function" class="form-select"  onchange='imedia.selectSwitch(this,event)' onclick='imedia.selectClick(this,event)'>
  <option value="playlist" selected>:Playlist</option>
  <option value="schedule">:Schedule</option>
  <option  value="epg">:EPGuide</option>
  <option  value="libry">:Library</option>
  <option  value="programs">:Programs</option>
*/
  },
  functionSwitch: function (e, event) {
    /***
   * 
   * #main_welcome {
	visibility:visible;
   */
    //var e = document.getElementById("function");
    var xvalue = e.options[e.selectedIndex].value;
    var xtext = e.options[e.selectedIndex].text;
    var xindex = e.selectedIndex;

    console.log("-------------------------" + xvalue + "---------------------");

    if (e.name == "function") {
      imedia.function_hide_all();

     imedia.callFunction(xvalue);
    }
    // imedia.function_hide_all();

    // imedia.function_Show_now(xvalue);
  },
  callFunction: function(xvalue){
 imedia.function_hide_all();

    //console.log("--------------01--------------", xvalue);

    switch (xvalue) {
      case "calendar":
        var element = document.getElementById("main_calendar");
        element.classList.remove("now_hide");
        element.classList.add("now_show");
        $("#main_calendar").css("visibility", "visible");
       // console.log("------------------02-------------");
        break;

        $("#main_calendar").removeClass("now_hide");
        $("#main_calendar").addClass("now_show");
        break;

      case "schedule":
       // console.log("------------------03-------------");
        var element = document.getElementById("main_schedule");
        element.classList.remove("now_hide");
        $("#main_schedule").css("visibility", "visible");
       
        $("#main_schedule").removeClass("now_hide");
        $("#main_schedule").addClass("now_show");
break;

case "cupdate":
  //console.log("------------------03-------------");
  var element = document.getElementById("main_cupdate");
  element.classList.remove("now_hide");
  $("#main_cupdate").css("visibility", "visible");
 
  $("#main_cupdate").removeClass("now_hide");
  $("#main_cupdate").addClass("now_show");
break;
        console.log("done ---------3");
        break;

      case "playlist":
       // console.log("------------------04-------------");
        var element = document.getElementById("main_playlist");
        element.classList.remove("now_hide");
   
        $("#main_playlist").css("visibility", "visible");
        $("#main_playlist").removeClass("now_hide");
        $("#main_playlist").addClass("now_show");
        //console.log("done ---------4");
        break;

      case "epg":
        //console.log("------------------05-------------");
        var element = document.getElementById("main_epg");
        element.classList.remove("now_hide");
        $("#main_schedule").css("visibility", "visible");
        $("#main_epg").css("visibility", "visible");
        $("#main_epg").removeClass("now_hide");
        $("#main_epg").addClass("now_show");
      //  console.log("done ---------5");
        break;

      case "libry":
        console.log("------------------06-------------");

        $("#main_libry").css("visibility", "visible");
        $("#main_libry").removeClass("now_hide");
        $("#main_libry").addClass("now_show");
       // console.log("done ---------6");
        break;

      case "programs":
        console.log("------------------07-------------");
        $("#main_programs").css("visibility", "visible");
        $("#main_programs").removeClass("now_hide");
        $("#main_programs").addClass("now_show");
       // console.log("done ---------7");
        break;

      case "welcome":
       // console.log("------------------08-------------");
        $("#main_welcome").css("visibility", "visible");
        $("#main_welcome").removeClass("now_hide");
        $("#main_welcome").addClass("now_show");
       // console.log("done ---------8");
        break;

      case "timelist":
       // console.log("------------------09-------------");
        $("#main_timelist").css("visibility", "visible");
        $("#main_timelist").removeClass("now_hide");
        $("#main_timelist").addClass("now_show");
       // console.log("done ---------9");
        break;
    }
  }
,
dateclick: function(event){
console.log ("We got ,,,,,,==",event.target.id);

}
,
  popShow: (it) => {
    //$('#framecup').attr('visibility','visible');

    $("#iframe_cup").css("visibility", "visible");
    var video_id = it;

    console.log(" We are here frp = ", video_id);
    //visibility:hidden;
    //	visibility:visible;
    //$('#framecup').attr('display','inline');
    $("#phold").removeClass("pophold");
    $("#phold").addClass("popshow");

    //$("#framecup").removeClass("frame_cup");
    //$("#framecup").addClass("frame_cup_show");
    const origin = "&origin=" + imedia.origin;

    $("#pframe").attr(
      "src",
      ` https://www.youtube.com/embed/${video_id}?autoplay=1{origin}`
    );
  },
  popHide: (it) => {
    $("#iframe_cup").css("visibility", "hidden");
    //	visibility:visible;

    //$('#framecup').attr('visibility','hidden');
    // #framecup
    //$('#framecup').attr('display','none');

    //$("#fcup").removeClass("fcupshow");

    //$("#fcup").addClass("fcup");

    //alert();
    $("#phold").removeClass("popshow");
    $("#phold").addClass("pophold");
    $("#pframe").attr("src", ``);

    console.log("hide it=", it.id);
    this.popGo = false;
  },
  popOut: (it) => {
    if (this.popGo) {
      imedia.popHide();
    }
  },
  popOver: (it) => {
    if (this.popGo) {
      console.log("do some thing here", it);
      //imedia.popHide(it);
    }
  },

  onthePop: (event) => {
    this.popGo = true;
  },
  checkChannel_ID: (cidobj) => {
    let cid = cidobj.value;
    console.log(cid, cidobj.id);
    info = document.getElementById("for" + cidobj.id);

    var usernameRegex = /^[a-zA-Z0-9]+$/;

    if (usernameRegex.test(cid)) {
      info.style.color = "white";
      info.innerHTML = "Channel ID";
      imedia.removeFlag("#channel_id");

      if (cid.length > 4) {
        // AJAX request

        var xhttp = new XMLHttpRequest();
        xhttp.open(
          "GET",
          "https://imediaport.com/server/php/ajaxdb.php?channel_id=" + cid,
          true
        );
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = JSON.parse(this.responseText);
            info = document.getElementById("for" + cidobj.id);
            info.innerHTML = response.feedback;
            // console.log("response=",response);
            // alert(response.status);
            if (response.status == 1) {
              info.style.color = "red";
              imedia.addFlag("#channel_id");
            } else {
              info.style.color = "green";

              imedia.removeFlag("#channel_id");
            }
          }
        };

        var data = {
          channel_id: cid,
        };
        //xhttp.send(JSON.stringify(data));
        // xhttp.send(data);
        xhttp.send();
      }
    } else {
      info.innerHTML =
        "Please enter valid input no specail character or space ";
      info.style.color = "red";
    }
  },
  formEvenCheck: function (xobj) {
    // alert(document.getElementById("urlother").disabled);

    // check for object name if iframe_url
    // alert(xobj.name);

    if (xobj.name == "chosecbrand") {
      const myother = "cbrand";
      // const otherindex = 13;
      const dlogo = document.getElementById("logoUrl");
      const dbrand = document.getElementById("cbrand");
      if (xobj.selectedIndex == 1) {
        dbrand.value = "same";
      }

      if (xobj.selectedIndex == 2) {
        if (
          dbrand.value == "same" ||
          dbrand.value == "blank" ||
          dbrand.value == "none"
        ) {
          dbrand.value = dlogo.value;
        }
      }
    }

    if (xobj.name == "cbrand") {
      const dbrand = document.getElementById("chosecbrand");
      const myother = "cbrand";

      // if (dbrand.value!="same" || dbrand.value!="blank" || dbrand.value!="none")

      switch (xobj.value) {
        case "none":
          dbrand.selectedIndex = 0;
          break;
        case "blank":
          dbrand.selectedIndex = 0;

          break;
        case "same":
          dbrand.selectedIndex = 1;

          break;
        case "the same":
          dbrand.selectedIndex = 2;

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
      // alert(document.getElementById("age").disabled);

      // alert(otherobj.disabled);

      if (xobj.selectedIndex != otherindex && otherobj.disabled == false) {
        otherobj.disabled = true;
      }

      switch (sindex) {
        case 0:
          break;

        case 1:
          break;

        case 13:
          // alet("now we are ..");
          otherobj.disabled = false;
          otherobj.focus();

          break;
      }
      // end of switch
    }

    // end of if

    if (xobj.name == "logoUrl") {
      var logoCase = document.getElementById("samplelogo"); // "samplelogo"

      var upUrl = xobj.value;

      let upImage = "url('" + upUrl + "')";
      // alert(upImage);
      logoCase.style.backgroundImage = upImage;
    }
  },
};





//================================ call setACI,


function app() {
  playtime.setextclockWork = externalClock;

  setTimeout(playtime.startClock(), 2000);

  var playsession = playtime.getCurrentSession;
  playtime.setPlayer = player;

  // PLPPomK5QKeyWV7PYC9s-PxrDhVIDpt4Oe

  //var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLZKvBPKDFWqP_VAujIzE9Yg", "", (ret) => { // var ytList = ytube.baseFromPlaylistId("PLSXwhHiUvMLbej6cHELyyTvOVrZZw3mob","",(ret)=>{
  var ytList = runmaster("onetv", (ret) => {
    console.log("index===", ret.index);
    let iwindwex = ret.index;

    videoIDs = [];
    programs = ret.programs;
    console.log("DATA", programs);

    programs.forEach((clip, i) => {
      // console.log(clip);
      videoIDs[i] = clip.vidoe_id;
    });

    index = ret.index;

    videosx = videoIDs; // .toString;

    console.log("channel info", ret.channel);
    channel = ret.channel;
    // playtime.setChannel(ret.channel);

    playtime.setStationStart = programs;

    indexmark = iwindwex.mark;
    indexoffset = iwindwex.offset;

    console.log(".here 1=" + indexmark, indexoffset);

    setTimeout(() => {
      playtime.playAtIndex(indexmark, indexoffset);

      console.log("here 2=" + indexmark, indexoffset);
    }, 5000);
    // console.log( videosx);
  });
}

function masterClick(event) {
  const Uvalue = tab.uinput;
  console.log(Uvalue);
}

class MessageBox {
  constructor(option) {
    this.option = option;

    this.msgBoxArea = document.querySelector("#msgbox-area");

    if (this.msgBoxArea === null) {
      this.msgBoxArea = document.createElement("DIV");
      this.msgBoxArea.setAttribute("id", "msgbox-area");
      this.msgBoxArea.classList.add("msgbox-area");

      document.body.appendChild(this.msgBoxArea);
    }
  }

  show(msg, callback, closeLabel) {
    if (msg === "" || msg === undefined || msg === null) {
      // If the 'msg' parameter is not set, throw an error

      throw "Message is empty or not defined.";
    }

    if (closeLabel === undefined || closeLabel === null) {
      // Of the close label is undefined, or if it is null

      closeLabel = "Close";
    }

    const option = this.option;

    const msgboxBox = document.createElement("DIV");
    const msgboxContent = document.createElement("DIV");
    const msgboxCommand = document.createElement("DIV");
    const msgboxClose = document.createElement("A");

    // Content area of the message box
    msgboxContent.classList.add("msgbox-content");
    msgboxContent.innerText = msg;

    // Command box or the button container
    msgboxCommand.classList.add("msgbox-command");

    // Close button of the message box
    msgboxClose.classList.add("msgbox-close");
    msgboxClose.setAttribute("href", "#");
    msgboxClose.innerText = closeLabel;

    // Container of the Message Box element
    msgboxBox.classList.add("msgbox-box");
    msgboxBox.appendChild(msgboxContent);

    if (
      option.hideCloseButton === false ||
      option.hideCloseButton === undefined
    ) {
      // If the hideCloseButton flag is false, or if it is undefined

      // Append the close button to the container
      msgboxCommand.appendChild(msgboxClose);
      msgboxBox.appendChild(msgboxCommand);
    }

    this.msgBoxArea.appendChild(msgboxBox);

    msgboxClose.onclick = (evt) => {
      evt.preventDefault();

      if (msgboxBox.classList.contains("msgbox-box-hide")) {
        return;
      }

      clearTimeout(this.msgboxTimeout);

      this.msgboxTimeout = null;

      this.hide(msgboxBox, callback);
    };

    if (option.closeTime > 0) {
      this.msgboxTimeout = setTimeout(() => {
        this.hide(msgboxBox, callback);
      }, option.closeTime);
    }
  }

  hideMessageBox(msgboxBox) {
    return new Promise((resolve) => {
      msgboxBox.ontransitionend = () => {
        resolve();
      };
    });
  }

  async hide(msgboxBox, callback) {
    if (msgboxBox !== null) {
      // If the Message Box is not yet closed

      msgboxBox.classList.add("msgbox-box-hide");
    }

    await this.hideMessageBox(msgboxBox);

    this.msgBoxArea.removeChild(msgboxBox);

    clearTimeout(this.msgboxTimeout);

    if (typeof callback === "function") {
      // If the callback parameter is a function

      callback();
    }
  }
}

/** 
document.querySelector("#msgboxPersistent").addEventListener("click", () => {
  msgboxPersistent.show(
    "Hello! I am a persistent message box! I will hide myself if you close me."
  );
});



msgboxShowMessage.addEventListener("click", () => {
  msgbox.show(
    "Hello! I am a non-persistent message box! I will hide myself automatically after 5 seconds, but you may also close me.",
    null
  );
});

msgboxHiddenClose.addEventListener("click", () => {
  msgboxNoClose.show(
    "Hello! My close button is hidden, but I will close myself after 5 seconds."
  );
});

// Show the message at the beginning
msgboxPersistent.show(
  "Hello! I am a message box! I will appear on the page load period. I also have a callback. You may check on 'Console' to see.",
  () => {
    console.log(
      "I am the callback! Of course, you may add various javaScript codes to make the callback function colourful."
    );
  },
  "Has callback"
);

*/


console.log(`
*********************************************************
*                                                       *
*         1NetWork iMediaPORT Engine                    *
*                     V 2.2                             *
*                                                       *
*                                                       *
*********************************************************
     (c) DMVX Limited 2023 - Reginald Hassan Richmen`);