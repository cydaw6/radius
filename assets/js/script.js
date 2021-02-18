
let allSketchs = [];
let activeSketch;

function setCanvas(currDiv) {
    allSketchs.forEach(sk => {
        if (sk.nom == currDiv.getAttribute('data-value')) {
            // remove Gui if exist
            if (activeSketch != undefined) {
                if(activeSketch.hideGui != undefined){
                    activeSketch.hideGui();
                    p5.prototype.removeGui();
                }
                activeSketch.remove();
            }
            // change page tab 
            let title = document.getElementById("titlep");
            title.innerHTML = "Radius - " + sk.nom;
            // remove intro img if there
            try{
                document.getElementById("fimage").remove();
            }catch(error){

            }
            // replace sketch
            activeSketch = new p5(sk.sketch);
        }
    });
}

// add the sketch in the sketchs buttons
function addSketchtoPage(obj) {
    let div = document.getElementById('menuRow');
    div.innerHTML += '<button data-value="' + obj.nom + '" onclick = "setCanvas(this)" > ' + obj.nom + '</button>';
    allSketchs.push(obj);
}

// print intro img
$(document).ready(function(){
    //activeSketch = new p5(allSketchs[allSketchs.length-1].sketch);
    activeSketch = new p5(lindensketch);
    /*
    let div = document.getElementById('myContainer');
    div.innerHTML += '<img id="fimage" style="max-width: 1500px !important;" src="./assets/img/first.png" class="img-fluid" alt="Responsive image"></img>';
    */
});


function dateFormatFileName(p){
    var today = new Date();
    var yyyy = today.getFullYear();
    let thedate = yyyy + '' + today.getMonth() + 1 + "" + today.getDate() + '_'+  today.getHours() + ''+today.getMinutes()+''+today.getSeconds();
    p.save("radius_"+thedate.toString()+".png");
}

function changedGui(){
    activeSketch.paramChanged();
}

window.onresize = function(){
    activeSketch.windowResized();
};