import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {useTheme} from '@react-navigation/native';

const Input = ({
  formInput,
  inputValue,
  inputValueOnChange,
  placeHolder,
  customHeight,
  customWidth,
  customBorderRadius,
  customSecureTextEntry,
}) => {
  const {colors} = useTheme();

  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: colors.forms,
        color: colors.text,
        borderRadius: formInput
          ? 10
          : customBorderRadius
          ? customBorderRadius
          : 8,
        paddingVertical: formInput ? 25 : null,
        paddingHorizontal: formInput ? 25 : 20,
        height: formInput ? 65 : customHeight,
        width: formInput ? 370 : customWidth,
        marginVertical: formInput ? 10 : 0,
        // fontSize: placeHolderFontSize,
      }}
      placeholderTextColor="#ADADAF"
      placeholder={placeHolder}
      value={inputValue}
      onChangeText={inputValueOnChange}
      autoFocus={true}
      secureTextEntry={customSecureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    // borderWidth: 1,
    borderRadius: 8,
    // shadowColor: 'rgba(48, 48, 48, 10)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Input;
