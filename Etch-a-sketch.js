let gridSize = 16;
let grid = document.getElementById("grid");

function recreateGrid(gridSize) {
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
            cell.style.border = "1px solid black";
            cell.style.width = `${30/gridSize}vw`;
            cell.style.display = "flex";
            row.appendChild(cell);
            rowElement[j] = cell;
        }
    }
}

recreateGrid(gridSize);
