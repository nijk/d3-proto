/**
 * d3-proto - /grid
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import _ from 'lodash';
import classnames from 'classnames';

import random from '../core/random';

// Styles
import './grid.scss';

// Defaults
let defaults = {
  /*grid: false,*/
  classes: {
    svg: {
      'vis__grid': true
    },
    g: { container: true },
  },
  cell: {
    size: [8, 8, 4]
  },
  data: _.range(1, 2040, 0),
  scale: false
};

defaults.cell.size = Math.floor((window.outerWidth / defaults.cols)) - defaults.cell.gutter;

const setSize = ({ width, height, scale, ...rest }) => {
  width = (scale || width > window.outerWidth) ? window.outerWidth : width || 500;
  height = (scale || height > window.outerHeight) ? window.outerHeight : height || 500;

  return _.merge({ width, height, scale }, rest);
};

const setGrid = ({ data, grid, ...rest }) => {
  let side = Math.sqrt(data.length);
  side = side > 1 ? Math.floor(side) : 1;
  grid = [side, side];

  return _.merge({ data, grid }, rest);
};

const setCell = ({ width, height, grid, cell, ...rest }) => {
  let cellWidth = Math.floor((width / grid[0]) * 0.9);
  let cellHeight = Math.floor((height / grid[1]) * 0.9);
  let cellGutter = Math.ceil(cellWidth * 0.1);
  cell = [cellWidth, cellHeight, cellGutter];

  return _.merge({ width, height, grid, cell }, rest);
};

// CSS Classes
const setClasses = ({ scale, classes, ...rest }) => {
  classes.svg['vix__max'] = !!scale;

  return _.merge({ scale, classes }, rest);
};

// SVG builder
const build = (el, { data, width, height, grid, cell, classes }) => {
  let cols = grid[0];
  let rows = grid[1];

  el.svg.attr('class', classnames(classes.svg))
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);

  el.g.attr('class', classnames(classes.g))
    .attr('width', width)
    .attr('height', height);

  // Grid
  el.g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', (_d, i) => {
      const item = i + 1;
      const col = item > cols ? item - (cols * (Math.ceil(item / cols - 1))) : item;
      return (cell[0] + cell[2]) * (col - 1);
    })
    .attr('y', (_d, i) => (cell[1] + cell[2]) * (Math.ceil((i + 1) / cols) - 1))
    .attr('width', cell[0])
    .attr('height', cell[1])
    .style("fill", random.colour);
};

const grid = (opts) => {
  // Basic elements
  let el = {};
  el.svg = d3.select('body').append('svg');
  el.g = el.svg.append('g');

  // Options
  opts = _.merge(defaults, opts);

  let { grid, cell } = opts;

  // Set any missing dimensions
  opts = setSize(opts);

  if (!grid || grid && grid.length !== 2) {
    opts = setGrid(opts);
  }

  if (!cell || cell && cell.length !== 3) {
    opts = setCell(opts);
  }

  opts = setClasses(opts);

  console.log('build opts', opts);

  build(el, opts);
};

export default grid;
