// canvas
var canvas;
const SCALE = 1.6;
const VARIABLE_SCALING = false;
const WIDTH = 540, HEIGHT = 540;

function limit (value, min, max) { return Math.min(Math.max(value, min), max); }

window.addEventListener("resize", function (ignored) {

  if (VARIABLE_SCALING) { resizeCanvas(Math.floor(limit(window.innerWidth / SCALE, 1000, 1200)), Math.floor(limit(window.innerWidth / SCALE, 580, 610))); }

}, true);

// site
var title = "sudoku solver";
var version = "version 1.0.0";

window.onload = function () { document.title = title; document.getElementById("title").innerHTML = title + "  <span style=\"font-size: 30px;\"> " + version + "<\span>"; }

function createInputAndButton (buttonMessage, createMessage) {

  var input = document.createElement("input");
  input.type = "text";
  input.id = "inputField";
  input.className = "field";

  document.getElementById("main").appendChild(input);

  var button = document.createElement("button");
  button.addEventListener("click", inputButtonClicked());
  button.className = "field_button";
  button.textContent = buttonMessage;

  document.getElementById("main").appendChild(button);

  if (createMessage) {

    var message = document.createElement("p");
    message.id = "result";
    message.className = "message";
    message.innerHTML = createMessage;

    document.getElementById("main").appendChild(message);

  }

  return [input, button];

}

function createCornerButton (buttonText) {

  var button = document.createElement("button");
  button.className = "corner_button";
  button.textContent = buttonText;
  button.addEventListener("click", cornerButtonClicked());

  document.getElementById("main").appendChild(button);

  return button;

}

function inputButtonClicked () {

  var input = document.getElementById("inputField").value;
  var message = document.getElementById("result");

  // start here...

}

function cornerButtonClicked () {

  // start here...

}

// colors
const BACKGROUND_COLOR = getComputedStyle(document.querySelector(":root")).getPropertyValue("--background-color");
const ACCENT_1 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-1");
const ACCENT_2 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--accent-2");

// project
var row = 0, column = 1;

function mousePressed() { noLoop(); }

function mouseReleased() { loop(); }