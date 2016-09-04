/**
 * d3-proto - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import * as d3 from "d3";

// From http://mkweb.bcgsc.ca/circos/guide/tables/
const matrix = [
    [ 1e4,  6e3, 9e3, 3e3],
    [ 2e3, 5e3, 2e3, 6e3]/*,
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]*/
];

const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

const formatValue = d3.formatPrefix(",.0", 1e3);

const chord = d3.chord()
    .padAngle(0.15)
    .sortSubgroups(d3.descending);

const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

const ribbon = d3.ribbon()
    .radius(innerRadius);

const color = d3.scaleOrdinal()
    .domain(d3.range(4))
    .range(["#efefef", "#FFDD89", "#957244", "#F26223"]);

let g = svg.append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`)
    .datum(chord(matrix));

let group = g.append("g")
    .attr("class", "groups")
    .selectAll("g")
    .data(chords => chords.groups)
    .enter().append("g");

group.append("path")
    .style("fill", d => color(d.index))
    .style("stroke", d => d3.rgb(color(d.index)).darker())
    .attr("d", arc);

const groupTick = group.selectAll(".group-tick")
    .data(d => groupTicks(d, 1e3))
    .enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

groupTick.append("line")
    .attr("x2", 6);

groupTick
    .filter(d => d.value % 5e3 === 0)
    .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
    .style("text-anchor", d => d.angle > Math.PI ? "end" : null)
    .text(d => formatValue(d.value));

g.append("g")
    .attr("class", "ribbons")
    .selectAll("path")
    .data((chords) => chords)
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", d => color(d.target.index))
    .style("stroke", d => d3.rgb(color(d.target.index)).darker());

// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
    const k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(
        value => ({
            value: value,
            angle: value * k + d.startAngle
        })
    );
}
