
let lindensketch = function(p){

    p.baseFPS = 60;
    
    p.colorIncrement = 1;


    

    p.scene;
    p.colors = [];
    let gui = null;

    p.nloops = 10;
    p.grammaire = [];
    p.systemL;
    p.tortue;
    p.whereinstring = 0; // where in the L-system are we
    p.currentangle = 0; // l'angle pointé

    p.txtprinted = false;

    p.x = 0;
    p.y = 0;

    p.pg; // offscreenbuffer
    p.fontt;
    let params = {

        StepIncrement: 20,
        StepIncrementMin: 0,
        StepIncrementMax: 200,
        angle: -90,  // l'incrémentation d'angle à chaque changement de direction
        angleMin: -360,
        angleMax: 360,
        weigth: 9,
       
        Steplength: 17, // distance parcourue à chaque mouvement
        ClearEachFrame : false,
        Keybinds: ['restart = r'],
       
    }


    p.hideGui = function(){
        gui.hide();
    }

    p.delete = function(){
        p.remove();
    }

    p.getRndInteger = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

   
    p.setup = function(){
        
        p.fontt = p.loadFont('assets/fonts/Demode.ttf');
        p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
        
        p.w = p.windowWidth - p.leftmenuEndpositionX;
        p.h = p.windowHeight;
        p.myCanvas = p.createCanvas(p.w, p.h);
        p.myCanvas.parent('canva');
        p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
        p.pg = p.createGraphics(p.windowWidth, p.windowHeight);
        p.background(0,0,0,0);

        /* Test */
        let obj = {
            valueA : 0.25,
            valueB : 1.25,	
            func : function(x,y){
                return Math.sin(x * this.valueA) * Math.cos(y * this.valueB);
            },
        }

        controlKit.addPanel({fixed: false, position: [0,0]})
        .addNumberInput(obj,'valueA')
        .addNumberInput(obj,'valueB')
        .addFunctionPlotter(obj,'func');
        //

        console.log(controlKit);

        //p.stroke(0, 0, 0, 255);

        if(gui == null){
            //gui = p.createGui(this, "Parameters");
            //gui.addObject(params);
        }
        


        p.grammaire[0]  =  new Regle('A', '-BF+AFA+FB-');
        p.grammaire[1] =  new Regle('B', '+AF-BFB-FA+');
        p.systemL = new SystemL("A", p.grammaire);
        p.tortue = new Tortue(p.systemL.phrase, 20, p.radians(90));
       
       
        

        // COMPUTE THE L-SYSTEM
        for (let i = 0; i < p.nloops; i++) {
            p.systemL.generate();
        }
    }

    p.draw = function(){
        if(params.ClearEachFrame == true){
            p.background(0,0,0,0);
        }

        if(!p.txtprinted){
            p.pg.background(0,0,0,0);
        
            p.pg.textFont(p.fontt);
            p.pg.textSize(32);
            p.pg.text('RADIUS', (p.w-200)/2, (p.h-100)/2);
            p.image(p.pg, 50, 50);
            p.image(p.pg, 0, 0, 50, 50);
            p.txtprinted = true;
        }
       
    

        for(let i =0; i < params.StepIncrement; i++){
            p.tortue.render(p.systemL.phrase[p.whereinstring]);
            p.whereinstring++;
            if (p.whereinstring > p.systemL.phrase.length-1) p.whereinstring = 0;
        }
       

        


        if(p.keyIsPressed === true){
            if(p.key == 'f'){
                p.frameRate(10000);
            }else if(p.key == 'r'){
                p.clear();
                p.background(0,0,0,0);
                p.x = 0;
                p.y = 0;
                p.systemL = new SystemL("A", p.grammaire);
                p.tortue = new Tortue(p.systemL.phrase, 20, p.radians(90));
                for (let i = 0; i < p.nloops; i++) {
                    p.systemL.generate();
                }
                p.txtprinted = false;
            }else if( p.key == 'c'){
                for(let j = 0; j <  params.Roots; j++){
                    p.scene.roots[j].changeColor();
                }
            }
        }
       
        p.frameRate(70);
    }


    class Tortue{
        constructor(phrase, step, angle){
            this.phrase = phrase;
            this.step = step;
            this.angle = angle;
        }

        render(k){
            
            if (k=='F') { // draw forward
                // polar to cartesian based on step and currentangle:
                let x1 = p.x + params.Steplength*p.cos(p.radians(p.currentangle));
                let y1 = p.y + params.Steplength*p.sin(p.radians(p.currentangle));
                p.strokeWeight(params.weigth);
                if((x1 >= (p.w-200)/2 && (x1) <= ((p.w-200)/2)+200) && (y1 >= (p.h-120)/2 && (y1) <= ((p.h-100)/2)+90) ){
                }else if((x1 < 0 && (x1) > (p.w) && (y1) <0 && (y1) > (p.h))){

                }else{
                    p.stroke(0,0,0,255);
                    p.line(p.x,  p.y, x1, y1); // connect the old and the new

                    // give me some random color values:
                    let r = p.random(128, 255);
                    let g = p.random(0, 192);
                    let b = p.random(0, 255);
                    let a = p.random(50, 100);
                    
                    // pick a gaussian (D&D) distribution for the radius:
                    let radius = 0;
                    radius += p.random(0, 15);
                    radius += p.random(0, 15);
                    radius += p.random(0, 15);
                    radius = radius / 3;
                    
                    // draw the stuff:
                    p.stroke(r, g, b,255);
                    p.fill(r, g, b, a);
                    p.ellipse(p.x, p.y, radius-5, radius-13);
                }
               
                // update the turtle's position:
                p.x = x1;
                p.y = y1;
            } else if (k == '+') {
                p.currentangle += params.angle; // turn left
            } else if (k == '-') {
                p.currentangle -= params.angle; // turn right
            }
            
            
        }



    }

    class SystemL{
        constructor(axiome, grammaire){
            this.phrase = axiome;
            this.grammaire = grammaire;
            this.generation = 0;  // where we are in the L-system
        }

        generate(){
            let outputstring = ''; // start a blank output string

            // iterate through 'therules' looking for symbol matches:
            for (let i = 0; i < this.phrase.length; i++) {
                let ismatch = 0; // by default, no match
                for (let j = 0; j < this.grammaire.length; j++) {
                    if (this.phrase[i] == this.grammaire[j].name)  {
                        outputstring += this.grammaire[j].regle; // write substitution
                        ismatch = 1; // we have a match, so don't copy over symbol
                        break; // get outta this for() loop
                    }
                }
                // if nothing matches, just copy the symbol over.
                if (ismatch == 0) outputstring+= this.phrase[i];
            }
            this.phrase = outputstring;
            //console.log(outputstring);
            this.generation++;
        }
    }

    class Regle{
        constructor(name, regle){
            this.name = name;
            this.regle = regle;
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
   
    p.rchoice = function(){
        return (p.getRndIntegerrandom(0, 2) == 0) ? true : false;
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.pg.resizeCanvas(p.windowWidth, p.windowHeight);
        
        p.txtprinted = false;
        //p.background(255);
    }
    p.delete = function(){
        p.remove();
    }
    
    p.hideGui = function(){
        if(gui){
            gui.hide();
        }
        
    }

}

//addSketchtoPage({nom: "L-system", sketch: lindensketch})