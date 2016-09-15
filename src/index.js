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
  width: 1000,
  //height: 300,
  cols: 200,
  rows: 100,
  data: _.range(0, 2e4, 0),
  cell: {
    size: 3,
    gutter: 2
  }
});
