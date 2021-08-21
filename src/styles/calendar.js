import {Dimensions} from 'react-native';
import {Typography, Colors} from '../styles';

import {responsive} from '../utils';

const windowWidth = Dimensions.get('window').width - 26;
const itemWidth = windowWidth / 7;

const size = responsive();
let responsiveFontSizeDateAndIcons = 22;
let responsiveFontSizeDaysInt = 17;
let responsiveFontSizeDaysTxt = 13;
let responsiveBorderRadius = 28;
let responsivePaddingVertical = 16.5;
let responsiveMarginBottom = '0.3%';

if (size === 'small') {
  responsiveFontSizeDateAndIcons = 18;
  responsiveFontSizeDaysInt = 14;
  responsiveFontSizeDaysTxt = 11;
  responsiveBorderRadius = 20;
  responsivePaddingVertical = 11;
  responsiveMarginBottom = '0.1%';
} else if (size === 'medium') {
  responsiveFontSizeDateAndIcons = 20;
  responsiveFontSizeDaysInt = 14; //cambio
  responsiveFontSizeDaysTxt = 11; //cambio
  responsiveBorderRadius = 25;
  responsivePaddingVertical = 15;
  responsiveMarginBottom = '0.2%';
}

export const dateAndIcons = {
  fontSize: responsiveFontSizeDateAndIcons,
  color: Colors.white,
};

export const txtAlignColor = {
  textAlign: 'center',
  color: Colors.white,
};

export const daysWeekTxt = {
  fontSize: responsiveFontSizeDaysTxt,
  ...txtAlignColor,
  width: itemWidth,
  marginBottom: responsiveMarginBottom,
  paddingVertical: responsivePaddingVertical,
};

export const daysMonthInts = {
  fontSize: responsiveFontSizeDaysInt,
  // fontFamily:
  ...txtAlignColor,
  width: itemWidth,
  paddingVertical: responsivePaddingVertical,
  borderRadius: responsiveBorderRadius,
  overflow: 'hidden',
};
