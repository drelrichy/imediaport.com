function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "_53H7UKdcEE",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();

  //console.log(player);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  if (player) player.stopVideo();
}
