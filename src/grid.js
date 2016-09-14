/**
 * d3-proto - /grid
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import _ from 'lodash';

// Basic elements
const svg = d3.select('svg');
const g = svg.append('g');

const grid = ({ cols = 20, rows = 10, data = _.range(1, 200, 0), cellWidth = 2, cellHeight = 2, cellGutter = 1 }) => {
  const width = (cols * (cellWidth + cellGutter)) - cellGutter;
  const height = (rows * (cellHeight + cellGutter)) - cellGutter;

  const gridData = _.map(data, (v, i) => i);

  console.log(data, gridData, gridData.length);

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', (_d, i) => {
      const cell = i + 1;
      const col = cell > cols ? cell - (cols * (Math.ceil(cell / cols - 1))) : cell;
      return (cellWidth + cellGutter) * (col - 1);
    })
    .attr('y', (_d, i) => (cellHeight + cellGutter) * (Math.ceil((i + 1) / cols) - 1))
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .style("fill", (d, i) => d3.schemeCategory20c[Math.ceil(Math.random() * 20)]);

  svg.attr('width', width).attr('height', height);
};

export default grid;
