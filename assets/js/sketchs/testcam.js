
let camcontrol1 = function(p){
  // GLOBAL VARIABLES
  p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
  let predictions = [];

  // Create a new handpose method
  let handpose;
  let options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
  }
  //
  p.sketchName = "Finger Pensil";
  let guiExist = false;
  let params2 = {
    frameRate: {value:25,range:[1,80]}, //number of points
    angleIncrement: {value:0.01,range:[-360,360]},
    
  }

  
  


  p.setup = function() {
    p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
    p.w = p.windowWidth - p.leftmenuEndpositionX;
    p.h = p.windowHeight;
    p.myCanvas = p.createCanvas(p.w, p.h);
    p.myCanvas.parent('canva');
    p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
    p.background(0);
    p.frameRate(25);
    p.lineList = [];
    p.circleList = [];
    p.rayon = 0;

   // Gui
   if(!guiExist){
      controlKit.addPanel({label: p.sketchName,fixed: false, position: [0,0], width: 260})
      .addSlider(params2.frameRate, 'value','range',{label: "Frame rate"})
      .addSlider(params2.angleIncrement,'value','range',{label:"Angle"});
      guiExist = true;
    }


    


    p.video = p.createCapture(p.VIDEO);
    p.video.hide();
    p.video.size(p.width, p.height);
    handpose = ml5.handpose(p.video, modelReady);
    // Listen to new 'predict' events
    handpose.on('predict', results => {
      predictions = results;
    });
    
  }

  function modelReady() {
    console.log("Model ready!");
  }

  p.draw = function() {
    
    //p.image(p.video, 0, 0, p.w, p.h);
    
    drawKeypoints();
    if(p.keyIsPressed === true){
      if(p.key == 'r' ){
          console.log('r');
          p.setup();
      } 
    }   
    p.frameRate(params2.frameRate.value);
   
  }

 
  // A function to draw ellipses over the detected keypoints
  function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      
      /*  
      indexFinger
      middleFinger
      palmBase
      pinky
      ringFinger
      thumb
      */
     let fdIndex = [];
     let fdthumb = [];
     let allowedParts = ["indexFinger","thumb"];
      for(let w = 0; w < allowedParts.length; w++) {
        
        const keypoint = prediction.annotations[allowedParts[w]];
        if(allowedParts[w] == "indexFinger"){
          fdIndex = [keypoint[keypoint.length-1][0],keypoint[keypoint.length-1][1]];
        }else{
          fdthumb = [keypoint[keypoint.length-1][0],keypoint[keypoint.length-1][1]];
        }

        for (let j = keypoint.length-1; j < keypoint.length; j++) {
          const kp = keypoint[j];
          //distance: sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
          //console.log(Math.sqrt(Math.pow((fdthumb[0]-fdIndex[0]),2) + Math.pow((fdthumb[1]-fdIndex[1]),2)));
          let distance = Math.sqrt(Math.pow((fdthumb[0]-fdIndex[0]),2) + Math.pow((fdthumb[1]-fdIndex[1]),2));
          if(distance <= 30){
            p.fill(0, 255, 0);
            p.noStroke();
            p.ellipse(
            (p.w)-
            kp[0]*(p.w/640),kp[1]*(p.h/480), 10, 10);
          }
          
        }
      }
      /*
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        
        p.fill(0, 255, 0);
        p.noStroke();
        
        p.ellipse(
        //(p.w)-
        keypoint[0]*(p.w/640),keypoint[1]*(p.h/480), 10, 10);
      }
      */
    }
  }

  /** Inherent function to sketch on radius */
  p.keyReleased = function() { 
      if(new String(p.key)[0] == new String("s")[0]){
      var today = new Date();
      var yyyy = today.getFullYear();
      let thedate = yyyy + '' + today.getMonth() + 1 + "" + today.getDate() + '_'+  today.getHours() + ''+today.getMinutes()+''+today.getSeconds();
      p.save("radius_"+thedate.toString()+".png");
      }
  }

  p.delete = function(){
      p.remove();
  }

  p.windowResized = function() {
    /*
      p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
          
      p.w = p.windowWidth - p.leftmenuEndpositionX;
      p.h = p.windowHeight;
      p.resizeCanvas(p.windowWidth - p.leftmenuEndpositionX, p.windowHeight);
      p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
      
      p.background(0);
      p.txtprinted = false;
     */
  }
}


addSketchtoPage({nom: "Finger Pensil", sketch: camcontrol1});