export function astar(grid, startNode, targetNode) {
  const visistedNodesInOrder = [];
  startNode.distance = 0;
  startNode.totalDistance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    const currentNode = closestNodes(unvisitedNodes);
    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) return visistedNodesInOrder;
    currentNode.isVisited = true;
    visistedNodesInOrder.push(currentNode);
    if (currentNode === targetNode) return visistedNodesInOrder;
    updateUnvisitedNeighbors(grid, currentNode, targetNode);
  }
}

function closestNodes(unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.totalDistance > unvisitedNodes[i].totalDistance) {
      currentClosest = unvisitedNodes[i];
      index = i;
    } else if (
      currentClosest.totalDistance === unvisitedNodes[i].totalDistance
    ) {
      if (
        currentClosest.heuristicDistance > unvisitedNodes[i].heuristicDistance
      ) {
        currentClosest = unvisitedNodes[i];
        index = i;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}

function updateUnvisitedNeighbors(grid, currentNode, targetNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
  for (const neighbor of unvisitedNeighbors) {
    updateNode(currentNode, neighbor, targetNode)
  }
}

function updateNode(currentNode, neighborNode, targetNode) {
  if (!neighborNode.heuristicDistance) neighborNode.heuristicDistance = manhattanDistance(neighborNode, targetNode);
  const distanceToCompare = currentNode.distance + 1;
  if (distanceToCompare < neighborNode.distance) {
    neighborNode.distance = distanceToCompare;
    neighborNode.totalDistance = neighborNode.distance + neighborNode.heuristicDistance;
    neighborNode.previousNode = currentNode;
  }
}

function getUnvisitedNeighbors(grid, currentNode) {
  const neighbors = [];
  const { col, row } = currentNode;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function manhattanDistance(nodeOne, nodeTwo) {
    const xOne = nodeOne.col;
    const yOne = nodeOne.row;
    const xTwo = nodeTwo.col;
    const yTwo = nodeTwo.row;

    const xChange = Math.abs(xOne - xTwo);
    const yChange = Math.abs(yOne - yTwo);

    return xChange + yChange;
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