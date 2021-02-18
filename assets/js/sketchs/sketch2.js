let sketch2 = function(p){
  p.w;
  p.h; 

  p.hNMover = 10;
  p.list = [];
  p.world;

  let gui;
  let params = {
      nMover : 10,
      nMoverMin: 1,
      nMoverMax: 1500,

      velocityLimit: 5,
      velocityLimitMin: -50,
      velocityLimitMax: 150,

      strokeWeight: 1,
      strokeWeightMin: 20,
      strokeWeightMax: 50,
      

      bodyRadius:20,
      bodyRadiusMin:1,
      bodyRadiusMax:100,
      
      mass: 2,
      massMin: -10,
      massMax: 100,

      vectorMagnitude: 1,
      vectorMagnitudeMin: -100,
      vectorMagnitudeMax: 100,

      strokeColorR:255,
      strokeColorRMax:255,
      strokeColorG:255,
      strokeColorGMax:255,
      strokeColorB:255,
      strokeColorBMax:255,

      bodyColorR : 69,
      bodyColorRMax : 255,
      bodyColorG : 237,
      bodyColorGMax : 255,
      bodyColorB : 184,
      bodyColorBMax : 255,
      
  }

  p.hideGui = function(){
    gui.hide();
}
  p.delete = function(){
    p.remove();
  }
  p.keyReleased = function() { 
    if(new String(p.key)[0] == new String("s")[0]){
     var today = new Date();
     var yyyy = today.getFullYear();
     let thedate = yyyy + '' + today.getMonth() + 1 + "" + today.getDate() + '_'+  today.getHours() + ''+today.getMinutes()+''+today.getSeconds();
     p.save("radius_"+thedate.toString()+".png");
    }
 } 
  p.setup = function(){
    p.world = new World();
    p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
        
    p.w = p.windowWidth - p.leftmenuEndpositionX;
    p.h = p.windowHeight;
    p.myCanvas = p.createCanvas(p.w, p.h);
    p.myCanvas.parent('canva');
    p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
    hNMover = params.nMover;
    p.world.addMovers(params.nMover);
    if(gui == null){
      gui = p.createGui(this, "Options");
      gui.addObject(params);
    }
  }

  p.draw = function(){
    if(hNMover != params.nMover){
      p.setup();
  }
    p.background(0);
    p.world.draw();
  }

  class Mover{
    
    constructor(){
      this.location = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p.createVector(0,0);
      this.acceleration = p.createVector(0,0);
      this.mass = p.random(1,2);
    }
    
    updatee(){
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.velocity.limit(params.velocityLimit);
      this.acceleration.mult(0); // nettoyer l'acceleration
    }
    
     applyForce(force){
      let f = p5.Vector.div(force,params.mass);
      this.acceleration.add(f);
    }
    
     edges(){
      let mheight = (params.bodyRadius+params.strokeWeight)/2;
      if((this.location.x+mheight >= p.w)){
        this.location.x = p.width-mheight;
        this.velocity.x *= -1;
      }
      if(this.location.x-mheight <= 0){
        this.location.x = 0+mheight;
        this.velocity.x *= -1;
      }
      
       if(this.location.y >= p.height-mheight){
        this.location.y = p.height-mheight;
        this.velocity.y *= -1;
      }
      
      if(this.location.y <= 0+mheight){
        this.location.y = 0+mheight;
        this.velocity.y *= -1;
      }
      
    }
    
    draw(){
      let mHeight = (params.bodyRadius+params.strokeWeight);
      p.stroke(params.strokeColorR,params.strokeColorG,params.strokeColorB);
      p.strokeWeight(params.strokeWeight);
      p.fill(params.bodyColorR, params.bodyColorG, params.bodyColorB);
      p.ellipse(this.location.x, this.location.y,mHeight, mHeight);
    }
  }

  class World{

    constructor(){
    this.moverList = [];
    }
  
    addMovers(){
      for(let i = 0; i < number; i++){
        this.moverList.push(new Mover());
      }
      this.moverList.push(createMovers(random(1,1000)));
    } 
  
    addMovers(number){
      for(let i = 0; i < number; i++){
        this.moverList.push(new Mover());
      }
    }
  
    draw(){
      if(this.moverList.length != 0){
        this.moverList.forEach(m => {
          /*
          PVector gravity = new PVector(width/2, height/2);
          gravity.sub(m.location);
          gravity.setMag(0.5);
          m.applyForce(gravity);
          */
          if(p.mouseIsPressed == true){
            let mouse = p.createVector(p.mouseX, p.mouseY);
            mouse.sub(m.location);
            mouse.setMag(params.vectorMagnitude);
            m.applyForce(mouse);
          }
          m.updatee();
          m.edges();
          m.draw();
          });
        } 
      }
  }
  
}
addSketchtoPage({nom: "Vectors and forces", sketch: sketch2})








