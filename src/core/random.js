/**
 * d3-proto - /random
 *
 * Created by nijk on 14/09/2016.
 */

'use strict';

import * as d3 from 'd3';

const randomColour = () => {
  const colours = d3.schemeCategory20c;
  const colour = Math.floor(Math.random() * colours.length);

  return colours[colour];
};

const random = {
  colour: randomColour
};

export default random;
