let backgroundColor = '#061b10';
let accentColor = '#c11263';

let data;
let selectedId;

async function setup() {
    createCanvas(windowWidth, windowHeight);
    data = await loadTable("assets/earthquakes.csv", ",", "header");

    let params = getURLParams();
    selectedId = params.id;
}

function draw() {
    background(backgroundColor);

    let row = data.findRow(selectedId, "id");

    if (row) {
        // Lettura csv (nome colonna o indice)
        let place = row.getString("place");
        let time = row.getString("time");
        let mag = float(row.getString("mag"));   // Colonna 3
        let depth = float(row.getString("depth")); // Colonna 4

        
        if (isNaN(mag)) mag = 6.5;
        if (isNaN(depth)) depth = 50;

        // testi
        fill(255);
        noStroke();
        textSize(24);
        text("Terremoto a: " + place, 40, 45);

        textSize(14);
        fill(156, 163, 175);
        text("Data e ora: " + time, 40, 75);
        text("• Magnitudo: " + mag, 40, 100);
        text("• Profondità: " + depth + " km", 40, 120);

        // Pulsante per tornare a pag principale
        fill(211, 89, 145);
        stroke(accentColor);
        rect(40, 150, 140, 35, 6);
        noStroke();
        fill(255);
        textSize(13);
        text("← Indietro", 77, 172);

        
        push();
        translate(width / 2, height / 2 + 20);

        // imposto dim massima cerchio est
        let outerDiameter = constrain(map(mag, 6.0, 9.0, 40, 130), 40, 130);
        let innerDiameter = constrain(map(depth, 0, 700, 10, outerDiameter * 0.7), 10, outerDiameter * 0.7);

        // Pallino est = Magnitudo
        noFill();
        stroke(accentColor);
        strokeWeight(2.5);
        circle(0, 0, outerDiameter);

        // Pallino int = Profondità
        fill(accentColor, 120);
        stroke(accentColor);
        strokeWeight(1);
        circle(0, 0, innerDiameter);

        pop();

        // Legenda decodifica 
        fill(255);
        textSize(13);
        text("Legenda del Glifo:", width - 280, 80);
        fill(156, 163, 175);
        text("• Pallino esterno = Magnitudo dell'evento", width - 280, 105);
        text("• Pallino interno = Profondità ipocentro (km)", width - 280, 125);

    } else {
        fill(255);
        textSize(18);
        text("Nessun evento selezionato o ID non valido.", 40, 50);
    }
}

function mousePressed() {
    if (mouseX >= 40 && mouseX <= 180 && mouseY >= 150 && mouseY <= 185) {
        window.location.href = "index.html";
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}