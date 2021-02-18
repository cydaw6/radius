
let sketch5 = function(p){
    p.x = 0;
    p.r = 0.0;
    let looping = true;
    let gui;
    let params = {

        points: 100, //number of points
        pointAngle: 360,
        pointAngleMin: 1,
        moveRadius : 100,
        weight: 1,

        originX: 0,
        originXMin: 0,
        originXMax: p.width,

        originY: 0,
        originYMin: 0,
        originYMax: p.height,

        R: 56,
        RMax: 255,
        G: 101,
        GMax: 255,
        B: 255,
        BMax: 255,

        Keybinds: ['restart = r'],

    }
    p.delete = function(){
        p.remove();
    }
    
    p.hideGui = function(){
        gui.hide();
    }
    p.setup = function(){
        p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
        
        p.w = p.windowWidth - p.leftmenuEndpositionX;
        p.h = p.windowHeight;
        p.myCanvas = p.createCanvas(p.w, p.h);
        p.myCanvas.parent('canva');
        p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
        p.background(0);
       
        p.rectMode(p.CENTER);
        params.originX = p.width;
        params.originXMax = p.width;
        params.originYMax = p.height;
        params.originY = p.height;

        if(gui == null){
            gui = p.createGui(this, "Options");
            gui.addObject(params);
        }
    }
    p.keyReleased = function() { 
        if(new String(p.key)[0] == new String("s")[0]){
         var today = new Date();
         var yyyy = today.getFullYear();
         let thedate = yyyy + '' + today.getMonth() + 1 + "" + today.getDate() + '_'+  today.getHours() + ''+today.getMinutes()+''+today.getSeconds();
         p.save("radius_"+thedate.toString()+".png");
        }
     } 
    p.draw = function(){
        if(p.keyIsPressed === true){
            if(p.key == 'r'){
                console.log('r');
                p.setup();
            } 
             
          }
        let pointAngle  = params.pointAngle/params.points; //angle between points
        for(let angle = 270; angle < 630; angle = angle+pointAngle) { 
            let x = p.cos(p.radians(angle)) * params.moveRadius; 
            let y = p.sin(p.radians(angle)) * params.moveRadius;
            p.stroke(params.R,params.G, params.B);
            p.translate(params.originX/2, params.originY/2);
            p.translate(300, 60);
            p.rotate(p.r);
            p.strokeWeight(params.weight);
            p.point(x+(params.originX/2), y+(params.originY/2));
            //line(x+300, y+300, 300, 300); 
        }
            p.r+=0.1;
    }
}
addSketchtoPage({nom: "Two stars", sketch: sketch5});