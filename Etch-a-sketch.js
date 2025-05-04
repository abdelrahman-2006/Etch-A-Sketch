let mouseDownHandler;
let mouseOverHandler;
let gridSize = 16;
let grid = document.getElementById("grid");
let e = 0;
let choicePen = document.getElementById("choice-pen");
let randomPen = document.getElementById("Random-pen");
let darkeningPen = document.getElementById("Darkening-pen");
let ereaser = document.getElementById("Ereaser");
let ereaseAll = document.getElementById("Erease-all");
let gridSizeInput = document.getElementById("grid-size");
let mousedown = false;
function resetStatus(){
    choicePen.style.background = "#0D1117";
    randomPen.style.background = "#0D1117";
    darkeningPen.style.background = "#0D1117";
    ereaser.style.background = "#0D1117";

    if (mouseDownHandler) {
        document.removeEventListener("mousedown", mouseDownHandler);
    }
    document.removeEventListener("mouseup", handleMouseUp);
    if (mouseOverHandler) {
        grid.removeEventListener("mouseover", mouseOverHandler);
    }
}

function createGrid(gridSize) {
    grid.innerHTML = "";
    let gridRow = [];
    let rowElement = [];
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.id = `grid-row-${i}`;
        row.style.display = "flex";
        row.style.flexDirection = "row";
        row.style.height = `${30/gridSize}vw`;
        grid.appendChild(row);
        gridRow[i] = row;

        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.id = `grid-item-${j}`;
            cell.className = "grid-item";
            cell.style.border = "1px double black";
            cell.style.width = `${30/gridSize}vw`;
            cell.style.display = "flex";
            cell.style.backgroundColor = "rgb(255, 255, 255)";
            row.appendChild(cell);
            rowElement[j] = cell;
        }
    }
}
function handleMouseDown(e,color) {
    let cellTarget = e.target;
    if (cellTarget.className === "grid-item") {
        if(color =="random"){
            cellTarget.style.backgroundColor=randomColor();
        }else if(color =="darken"){
            let backgroundColor = cellTarget.style.backgroundColor
            let colors = getRGBvalues(backgroundColor)
            cellTarget.style.background = darkeningPenLogic(colors[0],colors[1],colors[2])
        }else{
            cellTarget.style.backgroundColor = color;
        }
    }
    mousedown = true;
}

function handleMouseUp() {
    mousedown = false;
}

function handleMouseOver(e,color) {
    let cellTarget = e.target;
    if(mousedown){
        if(color =="random"){
            cellTarget.style.backgroundColor=randomColor();
        }else if(color =="darken"){
            let backgroundColor = cellTarget.style.backgroundColor
            let colors = getRGBvalues(backgroundColor)
            cellTarget.style.background = darkeningPenLogic(colors[0],colors[1],colors[2])
        }else{
            cellTarget.style.backgroundColor = color;
        }
    }
}

function changeColorLogic(color) {
    mouseDownHandler = function(e) { handleMouseDown(e, color); };
    mouseOverHandler = function(e) { handleMouseOver(e, color); };

    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mouseup", handleMouseUp);
    grid.addEventListener("mouseover", mouseOverHandler);
}
//choicePen
function chooseColor() {
    let red, green, blue;

    while (true) {
        red = parseInt(prompt("Enter red (0-255):"), 10);
        green = parseInt(prompt("Enter green (0-255):"), 10);
        blue = parseInt(prompt("Enter blue (0-255):"), 10);

        if (
            !isNaN(red) && red >= 0 && red <= 255 &&
            !isNaN(green) && green >= 0 && green <= 255 &&
            !isNaN(blue) && blue >= 0 && blue <= 255
        ) {
            return `rgb(${red}, ${green}, ${blue})`;
        } else {
            alert("Invalid input! Please enter values between 0 and 255.");
            return chooseColor();
        }
    }
}

choicePen.addEventListener("click", () => {
    resetStatus();
    choicePen.style.background = "green";
    let color = chooseColor();
    changeColorLogic(color);
});
//end
//randomColorPen
function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

randomPen.addEventListener("click", () => {
    resetStatus();
    randomPen.style.background = "green";
    changeColorLogic("random")

});
//end
//darkeningPen
function getRGBvalues(color) {
    const result = color.match(/\d+/g);
    return result ? result.map(Number) : [255, 255, 255];
}
function darkeningPenLogic(red, green, blue){
    red-=26;
    green-=26;
    blue-=26;
    if (red < 0) {
        red = 0;
    }
    if (green < 0) {
        green = 0;
    }
    if (blue < 0) {
        blue = 0;
    }
    console.log(red, green, blue);
    
    return `rgb(${red}, ${green}, ${blue})`;
    
}
darkeningPen.addEventListener("click", () => {
    resetStatus();
    darkeningPen.style.background = "green";
    changeColorLogic("darken")
});
//end
//ereaser
ereaser.addEventListener("click", () => {
    resetStatus();
    ereaser.style.background = "green";
    changeColorLogic("rgb(255, 255, 255)");
    
});
//end

ereaseAll.addEventListener("click", () => {
    createGrid(gridSize);
});
gridSizeInput.addEventListener("click", () => {
    gridSize=prompt("enter new grid size: ","1-100");
    if (gridSize > 100) {
        alert("Grid size must be less than 100");
    }else if (gridSize < 1) {
        alert("Grid size must be greater than 0");
    }
    else if(gridSize > 0 && gridSize <= 100){
    createGrid(gridSize);
    changeColorLogic("rgb(0, 0, 0)");
    }else{
        alert("Error: Invalid input");
    }
});
changeColorLogic("rgb(0,0,0)")
createGrid(gridSize)