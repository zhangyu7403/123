var player;
var timerId;
var nextSong;
function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
//		videoId:'1s84rIhPuhk',
	    // host: 'https://www.youtube.com',
        playerVars: {
            'controls': 0,
            'autoplay': 1,
            'loop':1,
	        'enablejsapi': 1,
	        'fs': 0,
            // 'origin': 'https://sarbagyadhaubanjar.github.io',
	        'rel': false,
	        'showinfo': 0,
	        'iv_load_policy': 3,
	        'modestbranding': 1,
	        'cc_load_policy': 0,
          },
        events: {
            onReady: onPlayerReady,
            onStateChange: function (event) { sendPlayerStateChange(event.data) },
            onPlaybackQualityChange: function (event) { PlaybackQualityChange.postMessage(event.data) },
            onPlaybackRateChange: function (event) { PlaybackRateChange.postMessage(event.data) },
            onError: onPlayerError
        },
    });
}
 function onPlayerReady(event) {
        event.target.playVideo();
//        window.android.jsCallAndroidArgs('Ready');
 }
 
 function onPlayerError(error) {
	 console.log("error:"+error.data);
     window.android.jsCallError(error.data);
 }

function hideAnnotations() {
    document.body.style.height = '1000%';
    document.body.style.width = '1000%';
    document.body.style.transform = 'scale(0.1)';
    document.body.style.transformOrigin = 'left top';
}

function sendPlayerStateChange(playerState) {
    clearTimeout(timerId);
//    StateChange.postMessage(playerState);
    console.log("playerState"+playerState);
//    window.print("打印"+playerState);
    if (playerState == 1) {
        startSendCurrentTimeInterval();
//        sendVideoData(player);
    }else if (playerState == YT.PlayerState.ENDED) {
         //实现循环播放
         player.stopVideo();
//         player.playVideo();
         loadById(nextSong, 0);
		 window.android.jsCallAndroidArgs('stop');

    }else if(playerState == 5){
         player.playVideo();
    }


}

function sendVideoData(player) {
    var videoData = {
        'duration': player.getDuration(),
        'videoUrl': player.getVideoUrl(),
        'availableQualityLevels': player.getAvailableQualityLevels(),
        'videoEmbedCode': player.getVideoEmbedCode(),
    };
    VideoData.postMessage(JSON.stringify(videoData));
}
function setNextSong(id) {
    nextSong = id;
    return nextSong;
}

function startSendCurrentTimeInterval() {
    timerId = setInterval(function () {
        // CurrentTime.postMessage(player.getCurrentTime());
        // LoadedFraction.postMessage(player.getVideoLoadedFraction());
		window.android.jsCurrentPosition(player.getCurrentTime());
    }, 1000);
}

function play() {
    player.playVideo();
    return '';
}

function pause() {
    player.pauseVideo();
    return '';
}

function loadById(id, startAt) {
    player.loadVideoById(id, startAt);
    return '';
}

function cueById(id, startAt) {
    player.cueVideoById(id, startAt);
    return '';
}
function getCurrentPosition(){
    //返回当前播放位置
    return player.getCurrentTime();
;
}

function mute() {
    player.mute();
    return '';
}

function unMute() {
    player.unMute();
    return '';
}

function setVolume(volume) {
    player.setVolume(volume);
    return '';
}

function seekTo(position, seekAhead) {
    player.seekTo(position, seekAhead);
    return '';
}

