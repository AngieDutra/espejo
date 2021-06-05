//'use strict';

var video;
var x;
var y;
var curvePointX = 0;
var curvePointY = 0;
var pointCount = 0.5;
var diffusion = 0;
var streamReady = false;

var inputText = 'QUERIBLE';
var kerning = 1; // between letters

var fontSize = 10;

/* CONFIGURACION */
function setup() {
  createCanvas(490, 740);
  background(255);
  // Recibe imagen
  video = createCapture(VIDEO, function() {
    streamReady = true;
  });
  video.size(width*2 * pixelDensity(), height * pixelDensity());
  video.hide();

  //Test con imagen original
/*
  espejo = createCapture(VIDEO, function() {
    streamReady = true;
  });
  espejo.size(820, height);
  espejo.hide();
*/
  textFont('Times');
  textSize(fontSize);
  textAlign(LEFT, CENTER);
}


/* VISUALIZACION */
function draw() {
  if (streamReady) {
    
  var x = 0;
  var y = 0;
  var counter = 0;

    // translate position (display) to position (image)
    video.loadPixels();

    for (var j = 0; j <= (width, height); j++) {

      // Retrieve color from capture device
      var c = color(video.get(x, y));

      // convert color c to HSV
      //var cHSV = chroma(red(c), green(c), blue(c));
      //strokeWeight(cHSV.get('hsv.h') / 50);
      //stroke(c);

      noStroke();
      push();
      translate(x, y);
      
      var letter = inputText.charAt(counter);
      fill(c);
	    text(inputText, -width/2 , 0);
	    var letterWidth = textWidth(letter) + kerning;
	    // for the next letter ... x + letter width
	    x += letterWidth;

      // Distancia entre palabras
      diffusion = round(map(width, 0, height, 500, 100));

      beginShape();
      curveVertex(x, y);
      curveVertex(x, y);

      for (var i = 0; i < pointCount; i++) {
        var rx = int(random(-diffusion, diffusion));
        curvePointX = constrain(x + rx, 0, width*2 - 1);
        var ry = int(random(-diffusion, diffusion));
        curvePointY = constrain(y + ry, 0, height*2 - 1);
        curveVertex(curvePointX, curvePointY);
      }
      curveVertex(curvePointX, curvePointY);
      
      pop();
      endShape();

      x = curvePointX;
      y = curvePointY;
    }
  }
}

/* COMANDOS POR TECLADO */
function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) clear(); background(255);
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'q' || key == 'Q') noLoop();
  if (key == 'w' || key == 'W') loop();
}