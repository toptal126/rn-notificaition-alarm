import React from 'react';
import SwitchSelectorX from 'react-native-switch-selector';

import {responsive} from '../../utils';

const size = responsive();

let switchHeight = 46;

if (size === 'small') {
  switchHeight = 30;
} else if (size === 'medium') {
  switchHeight = 40;
}

const SwitchSelector = ({
  passOptions,
  passValueSelected,
  passFontSize,
  passHeight,
  passCustomBtnColor,
  passSelectedTxtColor,
  isEditModal,
  currentValue,
  backgroundColor,
  textColor,
  customFunction,
}) => {
  return (
    <SwitchSelectorX
      options={passOptions}
      initial={isEditModal ? currentValue : 0}
      hasPadding
      buttonColor={passCustomBtnColor}
      selectedColor={passSelectedTxtColor}
      borderColor="transparent"
      color="white"
      textColor={textColor}
      buttonMargin={3}
      backgroundColor={backgroundColor}
      fontSize={passFontSize}
      height={switchHeight}
      style={{
        marginBottom: 0,
      }}
      onPress={(value) => {
        console.log(value);
        passValueSelected(value);
        customFunction;
      }}
    />
  );
};

export default SwitchSelector;
