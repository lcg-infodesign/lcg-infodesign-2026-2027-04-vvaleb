let backgroundColor = '#061b10';
let accentColor = '#c11263';

let data;
let maxMag = 0;

let margin = 40;
let gutter = 3;

let hoveredLabel = "";
let hoveredId = null;
let hovered = false;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    data = await loadTable("assets/earthquakes.csv", ",", "header");

   
    for (let i = 0; i < data.getRowCount(); i++) {
        let mag = data.getNum(i, "mag");
        if (mag > maxMag) {
            maxMag = mag;
        }
    }
}

function draw() {
    background(backgroundColor);

    // intestaz iniziale 
    fill(255);
    noStroke();
    textSize(23);
    text("Cronologia dei Terremoti", margin, 40);
    textSize(13);
    fill(156, 163, 175);
    text("Ogni barra verticale rappresenta un evento sismico. Cliccala e scopri di più.", margin, 65);

    let numberOfGutters = data.getRowCount() - 1;
    let barsWidth = width - 2 * margin - numberOfGutters * gutter;
    let barWidth = barsWidth / data.getRowCount();
    
    let xPos = margin;
    let chartTop = 100;
    let chartHeight = height - chartTop - 2 * margin;

    hovered = false;
    noStroke();

    for (let i = 0; i < data.getRowCount(); i++) {
        let mag = data.getNum(i, "mag");
        let place = data.getString(i, "place");
        let id = data.getString(i, "id");

        let scaledMag = map(mag, 6.0, maxMag, 20, chartHeight);

        // barra vertic
        fill(6, 36, 21);
        stroke(accentColor);
        strokeWeight(1);
        rect(xPos, chartTop + chartHeight - scaledMag, barWidth, scaledMag);

        // hover mouse
        if (
            mouseX >= xPos &&
            mouseX <= xPos + barWidth &&
            mouseY >= chartTop &&
            mouseY <= chartTop + chartHeight
        ) {
            hoveredLabel = place;
            hoveredId = id;
            hovered = true;
        }

        xPos += barWidth + gutter;
    }

    if (hovered) {
        cursor(HAND);
        fill(255);
        noStroke();
        textSize(14);
        text(hoveredLabel, mouseX + 10, mouseY - 10);
    } else {
        cursor(ARROW);
    }
}

function mousePressed() {
    if (hovered && hoveredId) {
        window.location.href = "detail.html?id=" + hoveredId;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}