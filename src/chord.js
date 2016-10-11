/**
 * d3-proto - /chord
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from "d3";
import * as _ from 'lodash';

// From http://mkweb.bcgsc.ca/circos/guide/tables/
const matrix = [
  [0.0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0.0, 0, 0, 0, 0, 0, 0, 700, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0.0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0.0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0.0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0.0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0.0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0.0, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 700, 52, 24, 4, 8, 6, 150, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0]
];

const matrixGroups = [
  { title: 'Group 1'/*, start: 0, end: 9*/},
  { title: 'Group 2'/*, start: 10, end: 19*/},
  { title: 'Group 3'/*, start: 20, end: 29*/},
  { title: 'Group 4'/*, start: 30, end: 39*/}
];

/*
 * Utils
 */

// Returns an array of text angles and values for a given group and step.
function nodeNumbers (d) {
  const start = d.startAngle / 2;
  const end = d.endAngle / 2;
  const item = parseInt(d.index, 10) + 1;
  const k = (end - start) / item;
  return [{ value: item, angle: item * k + d.startAngle }];
}

// Returns n as a float between lower and upper values
const permittedValue = (n, lower = 1, upper = 100) => Math.min(parseFloat(upper), Math.max(parseFloat(lower), parseFloat(n)));

// Process a chord to have equal arc size & distribution, via startAngle/endAngle
const processChordAngle = (options, chord, percentage = 100, debug = false) => {
  const startAngle = chord.index * (options.nodeRad + options.arcPadding);
  const endAngle = startAngle + ((options.nodeRad / 100) * percentage);
  debug && console.debug('processChordAngle', startAngle, endAngle);
  return { ...chord, startAngle, endAngle, extra: parseFloat((Math.random() * 100).toFixed(1)), extra2: parseFloat((Math.random() * 100).toFixed(1)) };
};

// Return value in Radians for number of degrees in a circle
const getTotalRadians = (deg = 360) => {
  const value = permittedValue(deg, 0, 360);
  return value / ((value / 2) / Math.PI);
};

// Return value in Radians for each arc of a circle
const getArcRadian = (arcs = 1, arcPadding = 0) => (getTotalRadians() - arcPadding) / arcs;

// Process a chord's array-like object to have equal arc size & distribution
const processChords = (chords, { arcPadding }) => {
  const options = {
    arcPadding,
    arcs: chords['groups'].length,
    totalRads: getTotalRadians(),
  };
  options.totalarcPadding = options.arcs * arcPadding;
  options.nodeRad = getArcRadian(options.arcs, options.totalarcPadding);

  _.each(chords, (chord, key) => {
    chords[key].source = processChordAngle(options, chord.source, permittedValue(chord.source.value, 15, 50));
    chords[key].target = processChordAngle(options, chord.target);
  });

  // Handle groups
  chords.groups = _.map(chords.groups, (chord) => processChordAngle(options, chord));
  return chords;
};

// D3 functions
const generateArc = ({ inner, outer/*, size*/ }) => d3.arc().innerRadius(inner).outerRadius(outer);

const generateArcValue = (radius, value, d) => generateArc({
  inner: radius.inner,
  outer: radius.inner + ((radius.size / 100) * permittedValue(value, 10, 100))/*,
   size: radius.size*/
})(d);

// Colours
const color = (i) => d3.scaleOrdinal().domain(d3.range(1)).range(["#4c5e6c"])(i);

// Chord Element
const chord = ({ diameter = 500 }) => {
  const arcPadding = 0.01; // Space between arcs in Radians, for conversion to px see arcSpacing
  const arcSize = 15; // Depth of the arcs in pixels
  const outerRadius = diameter * 0.5;
  const arcSpacing = Math.max(1, outerRadius * arcPadding);
  const innerRadius = outerRadius - ((arcSize * 3) + (arcSpacing * 2) + 10);

  console.info('arcSpacing', arcSpacing, outerRadius * arcPadding);

  // SVG
  const svg = d3.select('body').append('svg');
  svg.attr('width', diameter)
    .attr('height', diameter);

  // Chord data
  let chords = d3.chord().padAngle(arcPadding).sortSubgroups(d3.descending)(matrix);
  chords = processChords(chords, { arcPadding });

  // Arcs
  const arcInnerRadius = { inner: innerRadius, outer: innerRadius + arcSize };

  const arcMiddleRadius = { inner: arcInnerRadius.outer + arcSpacing };
  arcMiddleRadius.outer = arcMiddleRadius.inner + arcSize;

  const arcOuterRadius = { inner: arcMiddleRadius.outer + arcSpacing };
  arcOuterRadius.outer = arcOuterRadius.inner + arcSize;

  // All Chord data
  let g = svg.append("g")
    .attr("transform", `translate(${outerRadius}, ${outerRadius})`)
    .datum(chords);

  // Groups
  let groups = g.append("g")
    .attr("class", "groups")
    .selectAll("g")
    .data(chords => chords.groups)
    .enter().append("g");

  // Group Arc inner
  groups.append("path")
    .style("fill", d => color(d.index))
    .attr("d", generateArc(arcInnerRadius))
    .attr("class", "group-arc-inner");

  // Group Text
  let groupText = groups.selectAll(".group-text")
    .data(nodeNumbers)
    .enter().append("g")
    .attr("class", "group-text")
    .attr("transform", d => `rotate(${(d.angle) * 180 / Math.PI - 90}) translate(${arcInnerRadius.inner + (arcSize / 2)},0)`);

  groupText.append('text')
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", ".35em")
    .attr("transform", d => `rotate(${90 - (d.angle * 180 / Math.PI)})`)
    .style("text-anchor", "middle")
    .text(d => _.padStart(d.value, 2, 0));

  // Group Arc middle
  let groupMiddle = groups.append("g")
    .attr("class", "group-arc-middle");

  // Arc Middle background
  groupMiddle.append('path')
    .attr("d", generateArc(arcMiddleRadius))
    .style("fill", d => color(d.index))
    .attr("class", "group__arc-middle__bg");

  // Arc Middle value
  groupMiddle.append('path')
    .attr("d", d => generateArcValue(Object.assign(arcMiddleRadius, { size: arcSize }), d.extra, d))
    .style("fill", "green")
    .attr("class", "group__arc-middle__value");

  // Group Arc outer
  let groupOuter = groups.append("g")
    .attr("class", "group-arc-outer");

  // Arc Outer background
  groupOuter.append('path')
    .attr("d", generateArc(arcOuterRadius))
    .style("fill", d => color(d.index))
    .attr("class", "group__arc-outer__bg");

  // Arc Outer value
  groupOuter.append('path')
    .attr("d", d => generateArcValue(Object.assign(arcOuterRadius, { size: arcSize }), d.extra2, d))
    .style("fill", "green")
    .attr("class", "group__arc-middle__usage");

  // Enclosures
  let groupMatrixGroups = g.append("g")
    .attr("class", "group__matrix-groups");

  groupMatrixGroups.selectAll(".group__matrix-groups")
    .data(matrixGroups)
    .enter().append("path")
    .attr("id", (_d, i) => `group-${i + 1}`)
    .attr("d", (d, i, coll) => {
      //console.info('groupMatrixGroups', d);
      const arc = (getTotalRadians() / coll.length);
      const startAngle = (arc * i);
      const endAngle = (startAngle + arc) - arcPadding;
      const data = {
        innerRadius: outerRadius - 2,
        outerRadius: outerRadius,
        startAngle,
        endAngle
      };

      //console.log('groupMatrixGroups', data);

      return d3.arc()(data);
    })
    .style("fill", d => "#fff");

  //Append the month names within the arcs
  svg.selectAll(".group__matrix-groups-text")
    .data(matrixGroups)
    .enter().append("text")
    .attr("class", "group__matrix-groups-text")
    .attr("x", 5)   //Move the text from the start angle of the arc
    .attr("dy", 0) //Move the text down
    .attr("transform", "rotate(-90)")
    .append("textPath")
    .attr("xlink:href", (_d, i) => `#group-${i}`)
    .text(d =>  d.title);


  // Ribbons
  g.append("g")
    .attr("class", "ribbons")
    .selectAll("path")
    .data(chords => chords)
    .enter().append("path")
    .attr("d", d3.ribbon().radius(innerRadius - arcSpacing))
    .style("fill", d => color(d.target.index))/*
    .style("stroke", d => d3.rgb(color(d.target.index)).darker())*/;
};

export default chord;
