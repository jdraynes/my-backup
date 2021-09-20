const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

const audioElement = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audioElement);

track.connect(audioContext.destination);

const playButton = document.querySelector(".tape-controls-play");

playButton.addEventListener("click",function(){
  
  if(audioContext.state === "suspended"){
    audioContext.resume()
  }
  
  if(this.dataset.playing === "false"){
    audioElement.play();
    this.dataset.playing = "true"
  }else if(this.dataset.playing === "true"){
    audioElement.pause();
    this.dataset.playing = "false";
  }
}, false);

audioElement.addEventListener("ended",()=>{
  playButton.dataset.playing = "false";
});

const gainNode = audioContext.createGain();


const volumeControl = document.querySelector("#volume");

volumeControl.addEventListener("input",function(){
  gainNode.gain.value = this.value
});

const pannerOptions = {pan : 0};

const panner = new StereoPannerNode(audioContext,pannerOptions);

const pannerControl = document.querySelector("#panner");

pannerControl.addEventListener("input",function(){
  panner.pan.value = this.value;
});

track.connect(gainNode).connect(panner).connect(audioContext.destination);

console.log(5 % 2);
