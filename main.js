function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    
    video = createCapture(VIDEO)
    video.hide()
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}
var img = "";
var modal_status = "";
var objects = [];
function preload() {
    img = loadImage("dog_cat.jpg")
}
function modelLoaded() {
    console.log("modelo carregado")
    modal_status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results
    }

}
function draw() {
    image(video,0,0,380,380);
    fill(255, 0, 0); 
    //text("Dog", 45, 75); 
    noFill(); 
    stroke(255, 0, 0);
     //rect(30, 60, 450, 350 );
     fill("#FF0000");
     //text("Cat", 320,120);
     noFill();
     stroke("#FF0000");
     //rect(300, 90, 270, 320);
     if(modal_status != ""){
        objectDetector.detect(video,gotResult)
        r = random(255)
        g = random(255)
        b = random(255)
        for(var i = 0; i < objects.length;i++){
            document.getElementById("status").innerHTML = "status:objeto detectado"
            document.getElementById("numberOfObject").innerHTML = "quantidade do objeto detectado" + objects.length
            fill(r,g,b)
            var percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r,g,b) 
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
     }
}
