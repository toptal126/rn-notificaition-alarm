import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {responsive} from '../../utils';

import {Typography} from '../../styles';

const size = responsive();

const TextModal = ({text, textTitle, alarmActivate, alarmActivateStyle}) => {
  const {colors} = useTheme();

  let fontSizeTitle;
  let fontSizeNoTitle;

  if (size === 'small') {
    fontSizeTitle = 14;
    fontSizeNoTitle = 10;
  } else if (size === 'medium') {
    fontSizeTitle = 15;
    fontSizeNoTitle = 12;
  } else {
    fontSizeTitle = 14;
    fontSizeNoTitle = 13;
  }
  return (
    <Text
      style={
        alarmActivate
          ? alarmActivateStyle
          : textTitle
          ? {
              ...styles.modalTextTitle,
              color: colors.text,
              fontSize: fontSizeTitle,
            }
          : {
              ...styles.modalTextNoTitle,
              color: colors.text,
              fontSize: fontSizeNoTitle,
            }
      }>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  modalTextTitle: {
    fontSize: 18,
    alignSelf: 'center',
    // marginBottom: 5,
    fontFamily: Typography.RobotoBlack,
  },
  modalTextNoTitle: {
    marginTop: 20,
    marginBottom: 6,
  },
});

export default TextModal;
