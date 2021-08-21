import React from 'react';
import {View, Text} from 'react-native';

import Button from '../Button';

const SubmitButtons = ({
  leftButtonText,
  leftButtonFunction,
  rightButtonText,
  rightButtonFunction,
}) => {
  return (
    <View
      style={{
        backgroundColor: null,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 45,
      }}>
      <Button
        onPress={leftButtonFunction}
        content={
          <View
            style={{
              borderColor: '#3F3F3F',
              borderWidth: 1,
              paddingHorizontal: 45,
              paddingVertical: 15,
              borderRadius: 50,
            }}>
            <Text style={{color: '#3F3F3F'}}>{leftButtonText}</Text>
          </View>
        }
      />
      <Button
        onPress={rightButtonFunction}
        content={
          <View
            style={{
              backgroundColor: '#0B6DF6',
              paddingHorizontal: 45,
              paddingVertical: 15,
              borderRadius: 50,
            }}>
            <Text style={{color: 'white'}}>{rightButtonText}</Text>
          </View>
        }
      />
    </View>
  );
};

export default SubmitButtons;
