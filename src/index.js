/**
 * d3-proto - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import _ from 'lodash';

//import chord from "./chord";
//import circle from "./circle";
import wheel from "./wheel/wheel";
import grid from "./grid/grid";


// Styles
require('./style/styles');

//chord();

//circle(500);

//wheel({ size: 500, ringWidth: 40, gap: 10, segments: 20 });

grid({
  width: 1100,
  height: 700,
  //grid: [200, 100],
  data: _.range(0, 5e3, 0),
  cell: [7, 7, 2],
  scale: false
});
