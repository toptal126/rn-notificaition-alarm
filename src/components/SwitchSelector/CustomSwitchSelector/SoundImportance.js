/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {responsive} from '../../../utils';

const size = responsive();

let switchPaddingHorizontal;
let switchPaddingVertical;
let switchSelectorFontSize;

if (size === 'small') {
  switchPaddingHorizontal = 30;
  switchPaddingVertical = 10;
  switchSelectorFontSize = 8;
} else if (size === 'medium') {
  switchPaddingHorizontal = 36;
  switchPaddingVertical = 12;
  switchSelectorFontSize = 11;
} else {
  switchPaddingHorizontal = 43;
  switchPaddingVertical = 14;
  switchSelectorFontSize = 12;
}

const SoundImportance = ({
  dataOptions,
  horizontalOptions,
  numberColumns,
  passSelectedValue,
  isEditModal,
  currentValue,
  colorValue,
}) => {
  const {colors} = useTheme();

  const [press, setPress] = useState(true);
  const [selectedValue, setSelectedValue] = useState(
    isEditModal ? currentValue : colorValue,
  );

  useEffect(() => {
    setSelectedValue(colorValue);
  }, [colorValue]);

  return (
    <View
      style={{
        backgroundColor: colors.forms,
        width: '100%',
        paddingVertical: 5,
        // paddingHorizontal: 0,
        borderRadius: 50,
        alignItems: 'center',
      }}>
      <FlatList
        data={dataOptions}
        keyExtractor={(item) => item.name}
        horizontal={horizontalOptions}
        numColumns={numberColumns}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) =>
          press && item.activeColor === selectedValue ? (
            <TouchableOpacity onPress={() => alert('sound')}>
              <View
                style={{
                  backgroundColor: item.activeColor,
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    fontSize: switchSelectorFontSize,
                    paddingHorizontal: switchPaddingHorizontal,
                    paddingVertical: switchPaddingVertical,
                    color: 'white',
                  }}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => alert('sound')}>
              <Text
                style={{
                  fontSize: switchSelectorFontSize,
                  paddingHorizontal: switchPaddingHorizontal,
                  paddingVertical: switchPaddingVertical,
                  color: 'black',
                }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

export default SoundImportance;
