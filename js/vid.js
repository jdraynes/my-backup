const d = document;

const supportsVideo = !!document.createElement("video").canPlayType;

if(supportsVideo){
  //ids
  const videoContainer = d.getElementById("videoContainer");
  const video = d.getElementById("video");
  const videoControls = d.getElementById("video-controls");
  
  video.controls = false;
  videoControls.style.display = "block";
  
  //Buttons
  let pauseplay = document.getElementById("playpause");
  const stop = d.getElementById("stop");
  const mute = d.getElementById("mute");
  const volinc = d.getElementById("volinc");
  const voldec = d.getElementById("voldec");
  const progress = d.getElementById("progress");
  const progressBar = d.getElementById("progress-bar");
  const fullscreen = d.getElementById("fs");
  
  pauseplay.addEventListener("click",(e) => {
    if(video.paused || video.ended){
      video.play();
    }else{
      video.pause();
    }
  })
  
  stop.addEventListener("click",(e)=>{
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
  })
  
  mute.addEventListener("click",(e)=>{
    video.muted = !video.muted;
  })
  
  volinc.addEventListener("click",(e)=>{
    alterVolume("+");
  })
  voldec.addEventListener("click", (e) => {
    alterVolume("-");
  })
  
  var alterVolume = function(dir){
    let currentVol = Math.floor(video.volume * 10)/10;
    
    if(dir === "+"){
      if(currentVol < 1) video.volume += 0.1;
    }else if(dir === "-"){
      if(currentVol > 0) video.volume -= 0.1;
    }
  }
  
  video.addEventListener("loadedmetadata", (e)=>{
    progress.setAttribute("max",video.duration);
  });
  video.addEventListener("timeupdate", (e) => {
    if(!progress.getAttribute("max")) progress.setAttribute("max",video.duration)
    
    progress.value = video.currentTime;
    progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + "%";
  })
  
  progress.addEventListener("click",function(e){
    
    let pos = (e.pageX - this.offsetLeft)/ this.offsetWidth;
    video.currentTime = pos * video.duration;
  });
  
  var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

  if(!fullScreenEnabled){
  fullscreen.style.display = "none";
  }
  
  fullscreen.addEventListener("click",(e)=>{
    handleFullscreen();
  })
  
  var handleFullscreen = function() {
   if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
   }
   else {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
      else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
      else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
      setFullscreenData(true);
   }
  }
  
  var isFullScreen = function(state) {
   videoContainer.setAttribute("data-fullscreen",!!state);
  }
  
  document.addEventListener('fullscreenchange', function(e) {
   setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
  });
  document.addEventListener('webkitfullscreenchange', function() {
    setFullscreenData(!!document.webkitIsFullScreen);
  });
  document.addEventListener('mozfullscreenchange', function() {
    setFullscreenData(!!document.mozFullScreen);
  });
  document.addEventListener('msfullscreenchange', function() {
    setFullscreenData(!!document.msFullscreenElement);
  });

}