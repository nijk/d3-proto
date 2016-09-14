/**
 * d3-proto - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import chord from "./chord";
import circle from "./circle";
import circleWithRing from "./circleWithRing";
import grid from "./grid";

//chord();

//circle(500);

//circleWithRing({ size: 500, ringWidth: 40, gap: 10, segments: 20 });

grid({ cols: 200, rows: 100, data: _.range(0, 2e4, 0), cellWidth: 2, cellHeight: 2, cellGutter: 1 });