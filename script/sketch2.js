let data;

function preload() {
    data = loadJSON('data/hagit.json');
    img = loadImage('images/hagit.png'); // Load the image of Hagit!!
}
// function preload() {
//     data = loadTable("data/hagit.csv", "csv", "header"); // load csv file
//   }

// let col =255;

let nSlider; //number of epicycles
let zSlider // Z axis controler
let x = [];
let colorOfLine = 0;
let showImage = false;
let fourierX;
let time = 0;
let path = [];
let fr = 70; //starting FPS -frames per second
// translate((-width/2)+20,(-height/2));
function setup() {

    var canvas = createCanvas(380, 360);
    canvas.parent('sketch-holder');
    colorMode(HSB, 1, 1, 1);
    background(360);

    frameRate(fr)
    zSlider = createSlider(-0.1, 0.5, 0, .001);
    zSlider.position(760, 645);
    zSlider.style('width', '60px');
    // zSlider.changed(emptyArray);


    nSlider = createSlider(0, data.drawing.length - 2, 0, 1);
    nSlider.position(650, 645);
    nSlider.style('width', '60px');
    nSlider.changed(emptyArray);


    checkbox = createCheckbox(false);
    checkbox.position(570, 647);
    checkbox.changed(myCheckedEvent);

    function myCheckedEvent() {
        if (this.checked()) {
            //   console.log('Checking!');
            showImage = true;
        } else {
            //   console.log('Unchecking!');
            showImage = false;
        }
    }

    for (let i = 0; i < data.drawing.length; i += 1) {
        const c = new Complex(data.drawing[i].x, data.drawing[i].y);
        x.push(c);
    }
    fourierX = dft(x);
    fourierX.sort((a, b) => b.amp - a.amp);
}

// function myCheckedEvent(){
//     image(img, 67, 64, img.width / 4.61, img.height / 4.66);
// }

function emptyArray() {
    path = [];
    time = 0;
}


function epicycles(x, y, rotation, fourier) {
    for (let i = 1; i < (fourier.length) - nSlider.value(); i++) {
        let colorx = fourier.length - nSlider.value() - 1;
        let num = 27
        let bum = 53
        let colorz = ((colorx + num) % (num) + 1); //to make colors run in circles of 20 
        let colori = ((i + bum) % (bum))
        let colors = (colori) / (colorz)
        // console.log(colori)
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += (radius * cos(freq * time + phase + rotation));
        y += (radius * sin(freq * time + phase + rotation));
        strokeWeight(0.7);
        stroke(colors, 100, 100);
        fill(colors, 100, 100, .1);
        ellipse(prevx, prevy, radius * 2);
        // stroke(255);
        line(prevx, prevy, x, y);
        strokeWeight(2);
        stroke(colors, 100, 100);
        point(prevx, prevy);
    }
    return createVector(x, (y));
}

function draw() {
    translate((-width / 2 + 160), (height / 2 - 240));
    // background(0);
    // background(56, 53, 126);// RGB
    background(0.673527, .584, .4902);// HSB
    scale(1.2);//scale(1.3);

    let v = epicycles(width / 2, height / 2, 0, fourierX);
    path.unshift(v);
    
        // image(img, 67, 64, img.width / 4.61, img.height / 4.66);

   

    if (showImage === true) {
        // console.log('its true')
        image(img, 110, 54, img.width /3.79, img.height / 3.79);//image(img, 66.5, 64, img.width / 4.61, img.height / 4.66);
    } else {
        // console.log('its false')
    }
    strokeWeight(1.3);
    stroke(0, 0, 1)
    beginShape();
    noFill();
    console.log(path.length)
    // stroke(col)
    for (let i = 0; i < (path.length); i++) {

        strokeWeight(1.3);
        vertex(path[i].x+(i*zSlider.value()), path[i].y-(i*zSlider.value()*0.5 ));
    }
    endShape();
    textSize(12);
    textFont('Ultra');
    noStroke();
    fill(1);
    text('Circles - ' + (data.drawing.length - nSlider.value() - 1), width / 2 - 30, height / 2 + 160);
    text('Donkey', width / 2 - 100, height / 2 + 160);
    text('Z - ' + zSlider.value() * 1000 , width / 2 + 80, height / 2 + 160);
    const dt = (TWO_PI / fourierX.length);
    time += dt ;

    if (time > (TWO_PI- TWO_PI/32) && zSlider.value() == 0) {
        path.pop();
    }
    if (time > TWO_PI * 24) {
        time = 0;
        path = [];
    }

    if(path.length > 4000){
        path.pop();
      }
}