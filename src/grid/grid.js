/**
 * d3-proto - /grid
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import _ from 'lodash';

import random from '../core/random';

// Styles
require('./grid.scss');

// Defaults
let defaults = {
  data: _.range(1, 200, 0),
  cell: { gutter: 2 },
  cols: 100
};

defaults.cell.size = Math.floor((window.outerWidth / defaults.cols)) - defaults.cell.gutter;

const grid = (opts) => {
  // Basic elements
  const svg = d3.select('body').append('svg');
  const g = svg.append('g');

  // Options
  const { cols, data, cell } = _.merge(defaults, opts);
  let { width, height, rows } = opts;

  // Auto rows
  if (!rows) {
    rows = data.length / cols;
  }

  // Auto width & height
  if (!width) {
    width = Math.floor(window.outerWidth);
  }

  if (!height) {
    height = (rows * (cell.size  + cell.gutter)) - cell.gutter;
  }

  console.log(width, height, cols, rows);

  // SVG
  svg.attr('class', 'vis__max vis__grid')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);

  g.attr('class', 'container');

  // Grid
  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', (_d, i) => {
      const item = i + 1;
      const col = item > cols ? item - (cols * (Math.ceil(item / cols - 1))) : item;
      return (cell.size + cell.gutter) * (col - 1);
    })
    .attr('y', (_d, i) => (cell.size + cell.gutter) * (Math.ceil((i + 1) / cols) - 1))
    .attr('width', cell.size)
    .attr('height', cell.size)
    .style("fill", random.colour);

};

export default grid;
