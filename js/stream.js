/*
-connect length of span to valueNow and make valueNow interactive based of click

- pause and play button(icon change);

- stream video(to give camera effect)

- a button to start recording but also capture image 3sec into recording.

- video rec,
- slide into video pkayer;
---------------------------
---------------------------

~ video recorder
~ video preview
~ view download
------------------
~ VR([webcam]){
  record: 
    start:
    
    end:
}

*/

document.querySelector("#warning").style.display = "none";

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
  
      const webcam = document.createElement("video");
      webcam.className = "webcam";
      
      const source = document.querySelector("source");
      
      webcam.srcObject = stream;
      webcam.controls = false;
      
      const srn = document.querySelector("#screen");
      
      srn.appendChild(webcam)
      //play saga
      srn.addEventListener("click",function() {
        
        document.querySelector(".cover").style.display = "none";
        
        webcam.style.display = "block";
        
        webcam.play();
      })
      
      const data = [];
      const recBtn = document.querySelector(".record-btn");
      
  
      const recorder = new MediaRecorder(stream);
  
      recorder.ondataavailable = function(e) {
        data.push(e.data);
      };
      
      recBtn.onclick =function(e){
        
        if(recorder.state === "inactive"){
          
          recorder.start()
          
          this.style.background = "white";
          this.style.border = "solid red";
          this.dataset.recording = true;
          return;
        }else{
          recorder.stop();
          
          this.style.background = "red";
          this.style.border = "solid white";
          this.dataset.recording = false;
        }
      }
      
      recorder.onerror = function(e) {
        throw e.error || new Error(e.name); // e.name is FF non-spec
      }
      
      
      recorder.onstop = function(e) {
        let vdo = document.querySelector('.vdo');
        
        vdo.src = window.URL.createObjectURL(new Blob(data,{type : "video/mp4"}));
        
        vdo.controls = false;
        const vp = document.querySelector(".video-player")
        vp.style.display = "block";
        vp.scrollIntoView({
          behavior : "smooth"
        })
      };
      
      window.onbeforeunload = function() {
        
        alert("Your recorded clip will be destroyed");
        
        window.URL.revokeObjectURL(url)
      }
      
      
    }).catch(function onError(error) {
      console.log(`An erro : ${error.message}`);
  });


const supportsVideo = !!document.createElement("video").canPlayType;

if(supportsVideo){
  
  /*
  const progress = document.querySelector('#progress');
  
  const progressBar = document.querySelector("#progressBar");
  
  const progress2 = document.querySelector("#progress2");
  */
  
  const rangeP = document.querySelector("#rangeP");
  
  //This is the button
  const playpause = document.querySelector("#playpause");
  
  //And this is the icon image
  const playpauseIcon = document.querySelector("#playpause-icon");
  
  const video = document.querySelector(".vdo");
  
  const muteunmute = document.querySelector("#mute-unmute-btn");
  const mtumt = document.querySelector("#mute-unmute-icon")
  
  //icon change
  if (video.ended || video.paused) {
    playpauseIcon.src = "../res/img/icons/play-button-w.png";
    
  } else {
    playpauseIcon.src = "../res/img/icons/pause-button-w.png";
  }
  
  //playing = pause , pause = play, end = play
  playpause.addEventListener("click",function(){
    
    if (video.paused || video.ended) {
      
      playpauseIcon.src = "../res/img/icons/pause-button-w.png";
      video.play();
      
      this.dataset.playing = true;
    } else {
      video.pause();
      playpauseIcon.src = "../res/img/icons/play-button-w.png";
      
      this.dataset.playing = false;
    }
  })
  
  video.addEventListener("playing",function(){
    playpauseIcon.src = "../res/img/icons/pause-button-w.png";
  })
  
  //Mute and Unmute
  if (video.muted) {
    mtumt.src = "../res/img/icons/mute.png";
  } else {
    mtumt.src = "../res/img/icons/speaker.png";
  }
  
  muteunmute.addEventListener("click",function(){
    if(video.muted){
      video.muted = !video.muted;
      mtumt.src="../res/img/icons/speaker.png"
    }else{
      video.muted = !video.muted;
      mtumt.src = "../res/img/icons/mute.png";
    }
  })
  
  //Progress
  /*video.addEventListener("loadedmetadata",function(e){
    
    if(this.duration === Infinity){
      this.currentTime = 1e101;
      
    }
    rangeP.setAttribute("max", Math.floor(video.duration));
  })*/
  function ifNull(media){
    if(media.duration === Infinity || media.duration === NaN || media.duration === undefined){
      return true;
    }else{
      return false;
    }
  }
  
  function calcDuration(media){
    return new Promise((resolve,reject)=>{
      media.onloadedmetadata = function(){
        media.currentTime = Number.MAX_SAFE_INTEGER;
        if(ifNull(media)){
          media.ontimeupdate = function() {
            if(!ifNull(media)){
              resolve(media.duration)
            }
            
            media.ontimeupdate = () => {
              if (!ifNull(media)) {
                resolve(media.duration)
              }
            }
          }
        }else{
          resolve(media.duration);
        }
      }
    })
  }
  
  calcDuration(video).then((d)=>{
    rangeP.setAttribute("max",d);
    video.currentTime = 0;
  })
  
  video.addEventListener("timeupdate",function(e){
    
      rangeP.value = video.currentTime;
      
      getBackground(rangeP)
      
      //progress2.style.width = Math.floor((video.duration / video.currentTime) * 100) + "%";
  })
  
  video.addEventListener("ended",function(e){
    playpauseIcon.src = "../res/img/icons/play-button-w.png";
    
    this.dataset.playing = false;
  })
  
  function getBackground(element){
    this.e = element;
    const e = this.e;
    
    if(e.value === e.min) return;
    
    let percentage = (e.value - e.min)/(e.max - e.min) * 100;
    let oldC = '#d3edff';
    e.style.background = `linear-gradient(to right, #4568DC, #B06AB3 ${percentage}%,${oldC} ${percentage}%)`
  };
  
  rangeP.addEventListener("input",function(e){
    console.log(e.target.value);
    
    video.currentTime = e.target.value;
  });
  
  /*
  progressBar.addEventListener("click",function(e){
    let pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
    
    video.currentTime = pos * video.duration;
  })
  */
};