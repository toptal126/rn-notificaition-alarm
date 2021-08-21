import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const Button = ({
  content,
  styleBtn,
  containerStyle,
  onPress,
  customDisable,
  longPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styleBtn}
      disabled={customDisable}
      onLongPress={longPress}>
      <View style={containerStyle}>{content}</View>
    </TouchableOpacity>
  );
};

export default Button;
