/**
 * d3-proto - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import _ from 'lodash';

import chord from "./chord";
//import circle from "./circle";
/*import wheel from "./wheel/wheel";
import grid from "./grid/grid";*/


// Styles
import './style/styles';

chord({ size: 800 });

//circle(500);

//wheel({ size: 500, ringWidth: 40, gap: 10, segments: 4 });

/*
grid({
  /*width: 540,
  height: 450,*/
  //grid: [60, 50],
  cells: 1200,
  cellSize: [12, 12, 4],
  type: 'squares',
  scale: false
});
*/
