var canvas;
var context;

var cols = 50;
var rows = 50;
var cellWidth;
var cellHeight;

var field = [];

var pn = new Perlin(69);
var zOff = 0;

window.onload = function() {
    canvas = (document.getElementById("game"));
    context = canvas.getContext("2d");
    resizeCanvas();
    main();
}

window.onresize = function() {
    resizeCanvas();
}

function line(x1, y1, x2, y2) {    
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
}

function resizeCanvas() {
    let aspectRatio = 16/9
    context.canvas.width  = window.innerWidth * 0.4;
    context.canvas.height = context.canvas.width / aspectRatio;

    cellWidth = canvas.width / cols;
    cellHeight = canvas.height / rows;
}

function update(dt) {
    let yOff = 10000.0;
    for (let j = 0; j < rows; ++j) {
        let xOff = 0.0;
        for (let i = 0; i < cols; ++i) {
            field[i + j*cols] = Math.floor(pn.noise(xOff, yOff, zOff) * 2);
            xOff += 0.15;
        }
        yOff += 0.175;
    }
    // zOff += 0.001;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    for (let j = 0; j < rows; ++j) {
        for (let i = 0; i < cols; ++i) {
            let index = field[(i+0) + (j+0)*cols] * 8 + 
                        field[(i+1) + (j+0)*cols] * 4 + 
                        field[(i+1) + (j+1)*cols] * 2 +
                        field[(i+0) + (j+1)*cols] * 1;

            let x = i * cellWidth;
            let y = j * cellHeight;

            switch (index) {
                case 0: {
                    context.moveTo(x, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x, y + cellHeight);
                    break;
                }
                case 1: {
                    context.moveTo(x, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    context.lineTo(x, y + 0.5*cellHeight);
                    break;
                }
                case 2: {
                    context.moveTo(x, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    context.lineTo(x, y + cellHeight);
                    break;
                }
                case 3: {
                    context.moveTo(x, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + 0.5* cellHeight);
                    context.lineTo(x, y + 0.5*cellHeight);
                    break;
                }
                case 4: {
                    context.moveTo(x, y);
                    context.lineTo(x + 0.5*cellWidth, y);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    context.lineTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x, y + cellHeight);
                    break;
                }
                case 5: {
                    context.moveTo(x, y);
                    context.lineTo(x + 0.5*cellWidth, y);
                    context.lineTo(x, y + 0.5*cellHeight);
                    context.moveTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    break;
                }
                case 6: {
                    context.moveTo(x, y);
                    context.lineTo(x + 0.5*cellWidth, y);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    context.lineTo(x, y + cellHeight);
                    break;
                }
                case 7: {
                    context.moveTo(x, y);
                    context.lineTo(x + 0.5*cellWidth, y);
                    context.lineTo(x, y + 0.5*cellHeight);
                    break;
                }
                case 8: {
                    context.moveTo(x + 0.5*cellWidth, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x, y + cellHeight);
                    context.lineTo(x, y + 0.5*cellHeight);
                    break;
                }
                case 9: {
                    context.moveTo(x + 0.5*cellWidth, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    break;
                }
                case 10: {
                    context.moveTo(x + 0.5*cellWidth, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    context.moveTo(x, y + cellHeight);
                    context.lineTo(x, y + 0.5*cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    break;
                }
                case 11: {
                    context.moveTo(x + 0.5*cellWidth, y);
                    context.lineTo(x + cellWidth, y);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    break;
                }
                case 12: {
                    context.moveTo(x, y + 0.5*cellHeight);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    context.lineTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x, y + cellHeight);
                    break;
                }
                case 13: {
                    context.moveTo(x + cellWidth, y + cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    context.lineTo(x + cellWidth, y + 0.5*cellHeight);
                    break;
                }
                case 14: {
                    context.moveTo(x, y + cellHeight);
                    context.lineTo(x, y + 0.5*cellHeight);
                    context.lineTo(x + 0.5*cellWidth, y + cellHeight);
                    break;
                }
                case 15: {
                    break;
                }
            }
        }
    }
    context.fillStyle = 'black';
    context.fill();
}

function loop() {
    update(0);
    draw();

    window.requestAnimationFrame(loop);
}

function main() {
    window.requestAnimationFrame(loop);
}