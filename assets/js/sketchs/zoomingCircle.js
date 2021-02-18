
let sketch4 = function(p){
  // GLOBAL VARIABLES
  p.SUN_DIAMETER = 150;
  p.NUMBER_OF_RAYS = 100;
  p.angle = p.TWO_PI/p.NUMBER_OF_RAYS;
  p.RING_OF_LINES = p.SUN_DIAMETER*.5;
  p.lineList = [];
  p.circleList = [];
  p.rayon;

  p.sketchName = "Circles";
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
    
    for (let i = 0; i < p.NUMBER_OF_RAYS; i++) {
      //random(255),random(255),random(255)
      p.lineList.push(new Line(p.RING_OF_LINES-55,p.RING_OF_LINES+1000));
    }
    
    for(let i = 0; i < 20; i++)
    {
      p.circleList.push(new GrownCircle(0,0,p.rayon));
      p.rayon+=1300/12;
    }
    p.rayon = 0;


  }

  p.draw = function() {

    if(p.keyIsPressed === true){
      if(p.key == 'r' ){
          console.log('r');
          p.setup();
      } 
    }
   
    p.frameRate(params2.frameRate.value);
    p.background(0);
    p.translate(p.width/2, p.height/2);
    let i = 0;
    p.lineList.forEach(l => {
      //random(255),random(255),random(255)
      p.stroke(120,120,120);
      p.push();
      p.rotate(p.angle +i*p.TWO_PI/p.NUMBER_OF_RAYS);
      p.strokeWeight(3);
      l.draw();
      
      p.pop();
      i++;
    });

    p.circleList.forEach(c =>{
      c.draw();
      c.updateRadius(p.rayon);
    });
    
    p.rayon+=0.5;
    p.angle += params2.angleIncrement.value;
  }

  class Line{
    constructor(x1, x2){
      this.x1 = x1;
      this.x2 = x2;
    }
    
    draw(){
      p.line(this.x1, 0, this.x2, 0);
    }
  }

  class GrownCircle
  {
    constructor(posX, posY, radius){
      this.posX = posX;
      this.posY = posY;
      this.radius = radius;
    }

    updateRadius(rad)
    {
      if(this.radius > 1300){
        this.radius = 150;
      }
      this.radius +=rad;
    }

    draw(){
      p.noFill();
      p.stroke(0);
      p.strokeWeight(4);
      p.circle(this.posX,this.posY,this.radius);
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
      p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
          
      p.w = p.windowWidth - p.leftmenuEndpositionX;
      p.h = p.windowHeight;
      p.resizeCanvas(p.windowWidth - p.leftmenuEndpositionX, p.windowHeight);
      p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
      
      p.background(0);
      p.txtprinted = false;
      
  }
}


addSketchtoPage({nom: "Circles", sketch: sketch4});