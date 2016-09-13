/**
 * d3-proto - /circle
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from "d3";
import _ from "lodash";

const svg = d3.select("svg");

const circleWithRing = ({ size = 100, ringWidth = 10, gap = 5, segments = 1 }) => {
    const circleSize = size - (ringWidth * 2) - (gap * 2);
    const circleRadius = circleSize / 2;
    const circleX = size / 2;
    const circleY = size / 2;

    const arc = d3.arc()
        .innerRadius((circleSize + gap) / 2)
        .outerRadius(size / 2)
        .padAngle(0.01);

    const pie = d3.pie().padAngle(0.2);
    const arcSegments = _.range(1, segments, 0);
    const g = svg.append('g');

    svg.attr('width', size).attr('height', size);

    g.append('circle')
        .attr("cx", circleX)
        .attr("cy", circleY)
        .attr("r", circleRadius);

    g.selectAll('path')
        .data(pie(arcSegments))
        .enter().append("path")
        .style("fill", (d, i) => d3.schemeCategory20[i])
        .attr("transform", `translate(${size/2}, ${size/2})`)
        .attr("d", arc);
};

export default circleWithRing;
