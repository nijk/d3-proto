/**
 * d3-proto - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import chord from "./chord";
import circle from "./circle";
import circleWithRing from "./circleWithRing";

//chord();

//circle(500);

circleWithRing({ size: 500, ringWidth: 40, gap: 10, segments: 20 });
