/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

import Button from '../../components/Button';

const SettingsContainer = ({
  leftContent,
  mainContent,
  rightContent,
  disablePress,
  onPress,
  settingsGroup,
  borderRadiusTop,
  borderRadiusBottom,
  customMargin,
  marginTop,
  marginBottom,
  textInput,
  inputHorizontalPadding,
  inputVerticalPadding,
}) => {
  const {colors} = useTheme();
  return (
    <Button
      content={
        textInput ? (
          mainContent
        ) : (
          <View style={styles.container}>
            <View style={{...styles.container}}>
              <View style={{marginRight: 9}}>{leftContent}</View>
              <View>{mainContent}</View>
            </View>
            <View>{rightContent}</View>
          </View>
        )
      }
      styleBtn={{
        ...styles.button,
        backgroundColor: colors.forms,
        borderTopLeftRadius: settingsGroup ? borderRadiusTop : 10,
        borderTopRightRadius: settingsGroup ? borderRadiusTop : 10,
        borderBottomLeftRadius: settingsGroup ? borderRadiusBottom : 10,
        borderBottomRightRadius: settingsGroup ? borderRadiusBottom : 10,
        marginTop: customMargin ? marginTop : 15,
        marginBottom: customMargin ? marginBottom : 15,
        paddingHorizontal: textInput ? inputHorizontalPadding : 20,
        paddingVertical: textInput ? inputVerticalPadding : 20,
      }}
      onPress={onPress}
      customDisable={disablePress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: '92%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SettingsContainer;
