class RecorderAndPlayer {
  constructor(preference,DOM) {
    
    this.customStyle = DOM.customStyle;
    this.default = DOM.useDefault;
    this.prefer = preference;
    
    this.data = [/*For stream chunk*/];
    
    this.videosSrcs = [];
    
    // ---> NOTES
    // ##if user already has a custom video tag in param = this.webcam or createWebcam;
    // for the autoplay we will start playing @ 0.1 to 0.0 autoPlay();
    
    // init()
    
    // user can choose between custom css or player for the recorder button;
    
    /*
    
    {
      video,
      audio,
    }= bolean;
      {
        haveCustomCSS: boolean,
        webcam : DOM,
        recordBtn: DOM,
        
        
        
        video: DOM/ audio,
        playBtn: DOM,
        pauseBtn: DOM,
        progressBar: DOM(especially input[type = range]);
        usingDault : true;
      }
    */
  }
  
  recorder(){
    
    if(navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia(this.perference).then(function(stream){
        
        this.recording = new MediaRecorder(stream);
        
        this.recBtn.onclick = function(){
          
          if(this.recording.state === "inactive"){
            
            this.recording.start();
          }else if(this.recording.state === "active"){
            
            this.recording.stop();
          }
          
          
          recording.onerror = function(e){
            
            throw new Error(`${e.name} : ${e.message}`);
          }
          
          recording.ondataavailable = function(e){
            
            this.data.push(e.data)
          }
          
          recording.onend = function(){
            
            this.addVideo();
          }
        }
      })
    }else{
      
      console.log("Sorry,Your browser doesnt support Javascript mediaDevices")
    }
  }
  
  addRecording(){
    let src = URL.createObjectURL(new Blob(this.data));
    
    this.videosSrcs.push(src);
  }
  
  player(){
    
  }
}