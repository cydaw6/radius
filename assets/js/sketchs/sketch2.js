let sketch2 = function(p){
  p.w;
  p.h;

  p.sketchName = "Vectors and forces";
  let guiExist = false;
  let params2 = {
      nMover : {value:433,range:[1,1500]},
      velocityLimit: {value:5,range:[-50,150]},
      strokeWeight: {value:5,range:[0,50]},
      bodyRadius: {value:85,range:[1,100]},
      mass: {value:32,range:[-10,100]},
      vectorMagnitude: {value:7.5,range:[-100,100]},
      strokeColor: {color:'#ffffff'},
      bodyColor:   {color:'#3865ff'},
      Keybinds: ['restart = r'],
  }

  p.hNMover = 10;
  p.list = [];
  p.world;

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


  p.setup = function(){
    p.world = new World();
    p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
        
    p.w = p.windowWidth - p.leftmenuEndpositionX;
    p.h = p.windowHeight;
    p.myCanvas = p.createCanvas(p.w, p.h);
    p.myCanvas.parent('canva');
    p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
    hNMover = params2.nMover.value;
    p.world.addMovers(params2.nMover.value);

    // Gui
    if(!guiExist){
      controlKit.addPanel({label: "Vectors and forces",fixed: false, position: [0,0], width: 260})
      .addSlider(params2.nMover,'value','range',{label:"Balls"})
      .addSlider(params2.velocityLimit,'value','range',{label:"Velocity"})
      .addSlider(params2.strokeWeight,'value','range',{label:"StrokeWeight"})
      .addSlider(params2.bodyRadius,'value','range',{label:"BodyRadius"})
      .addSlider(params2.mass,'value','range',{label:"Mass"})
      .addSlider(params2.vectorMagnitude,'value','range',{label:"VectorMagnitude"})
      .addColor(params2.strokeColor,'color',{colorMode:'hex', label:"Stroke"})
      .addColor(params2.bodyColor,'color',{colorMode:'hex', label:"Body"});
      guiExist = true;
    }


  }

  p.draw = function(){
    if(hNMover != params2.nMover.value){
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
      let f = p5.Vector.div(force,params2.mass.value);
      this.acceleration.add(f);
    }
    
     edges(){
      let mheight = (params2.bodyRadius.value + params2.strokeWeight.value)/2;
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
      let mHeight = (params2.bodyRadius.value +  params2.strokeWeight.value);
      p.stroke(params2.strokeColor.color);
      p.strokeWeight(params2.strokeWeight.value);
      p.fill(params2.bodyColor.color);
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
            mouse.setMag(params2.vectorMagnitude.value);
            m.applyForce(mouse);
          }
          m.updatee();
          m.edges();
          m.draw();
          });
        } 
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
      
      
      p.txtprinted = false;
      //p.background(255);
  }
  
}
addSketchtoPage({nom: "Vectors and forces", sketch: sketch2})








