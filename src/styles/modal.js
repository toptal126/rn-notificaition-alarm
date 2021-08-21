import {responsive} from '../utils';

const size = responsive();

//LARGE
let bigHeight = 630;

let smallHeight = 450;

if (size === 'small') {
  bigHeight = 390;
  smallHeight = 200;
} else if (size === 'medium') {
  bigHeight = 600;
  smallHeight = 350;
}

export {bigHeight, smallHeight};
