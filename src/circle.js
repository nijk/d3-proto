/**
 * d3-proto - /circle
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from "d3";

const svg = d3.select("svg");

const circle = (size) => {
    svg
        .attr('width', size)
        .attr('height', size)
        .append('circle')
        .attr("cx", size / 2)
        .attr("cy", size / 2)
        .attr("r", size / 2);
};

export default circle;

