
let sketch5 = function(p){
    p.x = 0;
    p.r = 0.0;

    p.sketchName = "Two stars";
    let guiExist = false;
    let params = {
        points: {value:360,range:[1,10000]}, //number of points
        pointAngle: {value:360,range:[1,360]},
        moveRadius : 100,
        weight: {value:1,range:[1,100]},
        originX: {value:0,range:[0,p.w]},
        originY: {value:0,range:[0,p.h]},
        color: {color:'#3865ff'},
        clear: false,
        Keybinds: ['restart = r'],
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

        // Gui
        if(!guiExist){
            controlKit.addPanel({label: p.sketchName,fixed: false, position: [0,0], width: 260})
            .addSlider(params.points, 'value','range',{label: "Points"})
            .addSlider(params.pointAngle,'value','range',{label:"Angle"})
            .addSlider(params.weight,'value','range')
            .addCheckbox(params,'clear',{label: "CleanedFrame"})
            .addColor(params.color,'color',{colorMode:'hex'});
            guiExist = true;
        }
    }

    
    p.draw = function(){
        console.log();
        if(p.keyIsPressed === true || params.clear){
            if(p.key == 'r' || params.clear){
                console.log('r');
                p.setup();
            } 
             
          }
        let pointAngle  = params.pointAngle.value/params.points.value; //angle between points
        for(let angle = 270; angle < 630; angle = angle+pointAngle) { 
            let x = p.cos(p.radians(angle)) * params.moveRadius; 
            let y = p.sin(p.radians(angle)) * params.moveRadius;
            p.stroke(params.color.color);
            p.translate(params.originX/2, params.originY/2);
            p.translate(300, 60);
            p.rotate(p.r);
            p.strokeWeight(params.weight.value);
            p.point(x+(params.originX/2), y+(params.originY/2));
            //line(x+300, y+300, 300, 300); 
        }
            p.r+=0.1;
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

}
addSketchtoPage({nom: "Two stars", sketch: sketch5});