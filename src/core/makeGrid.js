'use strict';

let widthFallback = 100;
let heightFallback = 100;

// Defaults
let defaults = {
  cellSize: [8, 8, 2],
  cells: 100,
  scale: false
};

const setSize = ({ width, height, scale, ...rest }, window) => {
  width = (scale || width > window.outerWidth) ? window.outerWidth : width || widthFallback;
  height = (scale || height > window.outerHeight) ? window.outerHeight : height || heightFallback;

  return Object.assign({}, { width, height, scale }, rest);
};

const setGrid = ({ cells, width, height, grid, cellSize, ...rest }) => {
  let side, cols, rows;
  if (cellSize.length === 3) {
    cols = Math.floor((width - cellSize[2]) / (cellSize[0] + cellSize[2]));
    rows = Math.floor((height - cellSize[2]) / (cellSize[1] + cellSize[2]));
  } else {
    side = Math.sqrt(cells);
    side = side > 1 ? Math.floor(side) : 1;
    cols = rows = side;
  }

  grid = [cols, rows];

  return Object.assign({}, { cells, width, height, grid, cellSize }, rest);
};

const setCell = ({ width, height, grid, cellSize, ...rest }) => {
  let cellWidth = Math.floor((width / grid[0]) * 0.9);
  let cellHeight = Math.floor((height / grid[1]) * 0.9);
  let cellGutter = Math.ceil(cellWidth * 0.1);
  cellSize = [cellWidth, cellHeight, cellGutter];

  return Object.assign({}, { width, height, grid, cellSize }, rest);
};

const makeGrid = (opts = {}, win = window) => {
  // Options
  /*console.log('default', defaults);
  console.log('opts', opts);*/
  opts = Object.assign({}, defaults, opts);
  //console.log('Merged opts', opts);

  // Set width & height
  opts = setSize(opts, win);

  // Set columns & rows
  if (!opts.grid || opts.grid && opts.grid.length !== 2) {
    opts = setGrid(opts);
  }

  // Set cellSize
  if (!opts.cellSize || opts.cellSize && opts.cellSize.length !== 3) {
    opts = setCell(opts);
  }

  console.log('makeGrid opts', opts);

  return opts;
};

export default (opts, win) => makeGrid(opts, win);
