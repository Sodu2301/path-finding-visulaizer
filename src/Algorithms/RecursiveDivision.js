export function recursiveDivision(
  grid,
  wallNodesArray,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls
) {
  if (rowEnd < rowStart || colEnd < colStart) return;

  const wallNodes = wallNodesArray;
  const nodes = getAllNodes(grid);
  const gridWidth = Math.floor(document.documentElement.clientWidth / 25);
  const gridHeight = Math.floor(document.documentElement.clientHeight /41);

  if (!surroundingWalls) {
    nodes.forEach((node) => {
      if (!node.isStart && !node.isFinish) {
        const { row, col } = node;
        if (
          row === 0 ||
          col === 0 ||
          row === gridHeight - 1 ||
          col === gridWidth - 1
        )
          wallNodes.push(node);
      }
    });
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    const possibleRows = [];
    const possibleCols = [];
    for (let rowNum = rowStart; rowNum <= rowEnd; rowNum += 2) {
      possibleRows.push(rowNum);
    }
    for (let colNum = colStart - 1; colNum <= colEnd + 1; colNum += 2) {
      possibleCols.push(colNum);
    }
    const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    const randomColIndex = Math.floor(Math.random() * possibleCols.length);
    const currentRow = possibleRows[randomRowIndex];
    const randomCol = possibleCols[randomColIndex];
    nodes.forEach((node) => {
      if (!node.isStart && !node.isFinish) {
        const { row, col } = node;
        if (
          row === currentRow &&
          col !== randomCol &&
          col >= colStart - 1 &&
          col <= colEnd + 1
        )
          wallNodes.push(node);
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivision(
        grid,
        wallNodes,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls
      );
    } else {
      recursiveDivision(
        grid,
        wallNodes,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivision(
        grid,
        wallNodes,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls
      );
    } else {
      recursiveDivision(
        grid,
        wallNodes,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls
      );
    }
  } else {
    const possibleRows = [];
    const possibleCols = [];
    for (let rowNum = rowStart - 1; rowNum <= rowEnd + 1; rowNum += 2) {
      possibleRows.push(rowNum);
    }
    for (let colNum = colStart; colNum <= colEnd; colNum += 2) {
      possibleCols.push(colNum);
    }
    const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    const randomColIndex = Math.floor(Math.random() * possibleCols.length);
    const randomRow = possibleRows[randomRowIndex];
    const currentCol = possibleCols[randomColIndex];
    nodes.forEach((node) => {
      if (!node.isStart && !node.isFinish) {
        const { row, col } = node;
        if (
          col === currentCol &&
          row !== randomRow &&
          row >= rowStart - 1 &&
          row <= rowEnd + 1
        )
          wallNodes.push(node);
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivision(
        grid,
        wallNodes,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls
      );
    } else {
      recursiveDivision(
        grid,
        wallNodes,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivision(
        grid,
        wallNodes,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls
      );
    } else {
      recursiveDivision(
        grid,
        wallNodes,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls
      );
    }
  }
  return wallNodes;
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
