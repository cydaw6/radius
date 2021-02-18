
let sketch3 = function(p){
    p.globalL = 10;
    p.globalH = 5;
    let hRoots = 10;
    p.baseFPS = 60;
    
    p.colorIncrement = 1;

    p.scene; 
    p.colors = [];

    let params = {
        Roots : 2,
        RootsMin: 0,
        RootsMax: 100,
        rectangleIncrement : 10,
        rectangleIncrementMin: 0,
        rectangleIncrementMax: 2000,
        rectL : 10,
        rectH : 5,
        ClearEachFrame : false,
        Keybinds: ['restart = r'],

    }

    p.sketchName = "Colored roots";
    let guiExist = false;
    let params2 = {
        Roots: {value:2,range:[0,100]}, //number of points
        rectangleIncrement: {value:10,range:[0,2000]},
        rectL: {value:10,range:[1,100]},
        rectH: {value:5,range:[1,100]},
        clear: false,
        Keybinds: ['restart = r'],
    }


    p.getRndInteger = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


    p.setup = function(){
        p.leftmenuEndpositionX = document.getElementById('allcontent').getBoundingClientRect().right;
        p.w = p.windowWidth - p.leftmenuEndpositionX;
        p.h = p.windowHeight;
        p.myCanvas = p.createCanvas(p.w, p.h);
        p.myCanvas.parent('canva');
        p.myCanvas.position(p.leftmenuEndpositionX, 0, 'fixed');
        p.background(0);
        hRoots = params2.Roots.value;
        p.scene = new Scene();

        // Gui
        if(!guiExist){
            controlKit.addPanel({label: p.sketchName,fixed: false, position: [0,0], width: 260})
            .addSlider(params2.Roots, 'value','range',{label: "Roots"})
            .addSlider(params2.rectangleIncrement,'value','range',{label:"Incrementation"})
            .addSlider(params2.rectL,'value','range', {label: "RectWidth"})
            .addSlider(params2.rectH,'value','range', {label: "RectHeight"})
            .addCheckbox(params2,'clear',{label: "CleanedFrame"});
            guiExist = true; // empêcher de créer un second panel à l'appel de setup
        }
    
        /*
        if(globalL == globalH){
        prlet("weight and height variable must\'nt be equals");
        noLoop();
        }
        */
    }

    p.draw = function(){
        if(hRoots != params2.Roots.value){
            p.setup();
        }
        if(params2.clear == true){
            p.background(0);
        }
    
        for(let i = 0; i <  params2.rectangleIncrement.value; i++){
            for(let j = 0; j <  params2.Roots.value; j++){
                let rand = p.createRectR(p.scene.roots[j], j).draw();
            }
        }
        
        if(p.keyIsPressed === true){
            if(p.key == 'f'){
                p.frameRate(10000);
            }else if(p.key == 'r'){
                p.setup();
            }else if( p.key == 'c'){
                for(let j = 0; j <  params2.Roots.value; j++){
                    p.scene.roots[j].changeColor();
                }
            }
        }
       
        p.frameRate(30);
    }

    

    p.createRectR = function(pR, i){
        
        let nx = pR.x;
        let ny = pR.y;

        let largeur, hauteur;
        if(pR.type == "A")
        {
            largeur =  params2.rectH.value;
            hauteur =  params2.rectL.value;
        }else{
            largeur = params2.rectL.value;
            hauteur =  params2.rectH.value;
        }
        
        let ok = true;
        while(ok == true){
            switch(p.getRndInteger(0, 4)){
                case 0:
                    nx = (pR.x)+(pR.largeur);
                    ny = pR.y;
                    break;
                case 1:
                    nx = (pR.x)-(largeur);
                    ny = pR.y;
                    break;
                case 2:
                    nx = (pR.x)+(pR.largeur);
                    ny = (pR.y)+(pR.hauteur)-(hauteur);
                    break;
                case 3:
                    nx = (pR.x)-(largeur);
                    ny = (pR.y)+(pR.hauteur)-(hauteur);
                    break;
            }
            if((nx <= p.width && nx >= 0) && (ny <= p.height && ny >= 0)){
                ok = false;
                
            }else{
                ok = true;
            }
        }
        
        let r;
        
        if(pR.type == "A"){
            r = new Rectangle(nx, ny, params2.rectH.value, params2.rectL.value, "B", pR.colour);
            p.scene.roots[i] = r;
            return r;
        }
        r = new Rectangle(nx, ny, params2.rectL.value, params2.rectH.value, "A", pR.colour);
        p.scene.roots[i] = r;
        return r;
    }
    
    class Scene{
        constructor(){
            this.roots = [];
            for(let i = 0; i < params2.Roots.value; i++){
                let c = [p.getRndInteger(0, 255), p.getRndInteger(0, 255), p.getRndInteger(0, 255), p.getRndInteger(25,90)];
                if(1 == p.getRndInteger(0, 1)){
                    this.roots.push(new Rectangle(p.getRndInteger(0, p.width), p.getRndInteger(0, p.height), p.globalL, p.globalH, "A", c));
                }else{
                    this.roots.push(new Rectangle(p.getRndInteger(0, p.width), p.getRndInteger(0, p.height), p.globalL, p.globalH, "B", c));
                }
            }
        }
    }

    class Rectangle{

        constructor(x, y, largeur, hauteur, type, colour)
        {
            
            this.x = x;
            this.y = y;
            this.largeur = largeur;
            this.hauteur = hauteur;
            this.type = type;
            this.colour = colour;
        }
        
        draw()
        {   
            p.fill(this.colour);
            p.rect(this.x,this.y,this.largeur,this.hauteur);
            
        }
        
        changeColor(){
            this.colour[0] = this.colour[0] + p.colorIncrement * ((p.getRndInteger(0, 1) == 0) ? 1 : 1);
            this.colour[1] = this.colour[1] + p.colorIncrement * ((p.getRndInteger(0, 1) == 0) ? 1 : 1);
            this.colour[2] = this.colour[2] + p.colorIncrement * ((p.getRndInteger(0, 1) == 0) ? 1 : 1);
        }
    }

    p.rchoice = function(){
        return (p.getRndIntegerrandom(0, 2) == 0) ? true : false;
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

addSketchtoPage({nom: "Colored roots", sketch: sketch3})