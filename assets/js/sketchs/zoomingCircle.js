
let sketch4 = function(p){
  // GLOBAL VARIABLES
  p.SUN_DIAMETER = 150;
  p.NUMBER_OF_RAYS = 100;
  p.angle = p.TWO_PI/p.NUMBER_OF_RAYS;
  p.RING_OF_LINES = p.SUN_DIAMETER*.5;
  p.lineList = [];
  p.circleList = [];
  p.rayon;
  let gui;
  let params = {
    frameRate : 25,
    frameRateMin : 1,
    frameRateMax : 1000,
    angleIncrement: 0.01,
    angleIncrementMin: -360,
    angleIncrementMax: 360,
    
  }
  p.hideGui = function(){
    gui.hide();
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

    if(gui == null){
      gui = p.createGui(this, "Options");
      gui.addObject(params);
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

   
    p.frameRate(params.frameRate);
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

    p.keyReleased = function() { 
      if(new String(p.key)[0] == new String("s")[0]){
       var today = new Date();
       var yyyy = today.getFullYear();
       let thedate = yyyy + '' + today.getMonth() + 1 + "" + today.getDate() + '_'+  today.getHours() + ''+today.getMinutes()+''+today.getSeconds();
       p.save("radius_"+thedate.toString()+".png");
      }
   } 
    
    p.rayon+=0.5;
    p.angle += params.angleIncrement;
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
}


addSketchtoPage({nom: "Circles", sketch: sketch4});