/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';

import Button from '../Button';

const StudyModulesContainer = ({
  leftContent,
  rightContentTop,
  backgroundFigures,
  gradientColorsArray,
  onPress,
  fixed,
}) => {
  return (
    <Button
      onPress={onPress}
      customDisable={fixed}
      content={
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={gradientColorsArray}
          style={{
            height: fixed ? 360 : 320,
            borderRadius: 10,
          }}>
          <View
            style={{
              padding: 25,
              backgroundColor: 'transparent',
              height: '100%',
              flexDirection: 'row',
            }}>
            {backgroundFigures}
            <View style={{backgroundColor: 'transparent', width: '70%'}}>
              {leftContent}
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                width: '30%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>{rightContentTop}</View>
              {fixed ? null : (
                <AntDesign name="arrowright" size={40} color="white" />
              )}
            </View>
          </View>
        </LinearGradient>
      }
      styleBtn={{
        width: fixed ? '97%' : '90%',
        marginVertical: fixed ? 10 : 20,
      }}
    />
  );
};

export default StudyModulesContainer;
