export function dijkstra(grid, startNode, targetNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === targetNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(grid, closestNode);
  }
}

export function getNodesInShortestPathOrder(targetNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = targetNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  };
  return nodesInShortestPathOrder;
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

function getUnvisitedNeighbors(grid, currentNode) {
  const neighbors = [];
  const {col, row} = currentNode;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisitedNeighbors(grid, currentNode) {
  const unvistedNeighbors = getUnvisitedNeighbors(grid, currentNode);
  for (const neighbor of unvistedNeighbors) {
    neighbor.distance = currentNode.distance + 1;
    neighbor.previousNode = currentNode;
  };
}

const sortNodesByDistance = unvisitedNodes => unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);