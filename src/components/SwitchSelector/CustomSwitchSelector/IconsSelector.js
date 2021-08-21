/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
//!!!!!TODO LO DE SUBTASKS BOTON, MODAL, ICONOS, REALM
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

import {responsive} from '../../../utils';

const size = responsive();

const CustomSwitchSelector = ({
  dataOptions,
  horizontalOptions,
  numberColumns,
  passSelectedValue,
  isEditModal,
  currentValue,
}) => {
  const {colors} = useTheme();

  const [press, setPress] = useState(true);
  const [selectedValue, setSelectedValue] = useState(
    isEditModal ? currentValue : 'bus',
  );

  const handlePressValue = (value) => {
    setPress(true);
    setSelectedValue(value.iconCode);
  };

  useEffect(() => {
    passSelectedValue(selectedValue);
  }, [passSelectedValue, selectedValue]);

  let iconsSize;

  if (size === 'small') {
    iconsSize = 18;
  } else if (size === 'medium') {
    iconsSize = 22;
  } else {
    iconsSize = 27;
  }

  return (
    <View
      style={{
        backgroundColor: colors.forms,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderRadius: 50,
      }}>
      <FlatList
        data={dataOptions}
        keyExtractor={(item) => item.name}
        horizontal={horizontalOptions}
        numColumns={numberColumns}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) =>
          press && item.iconCode === selectedValue ? (
            <TouchableOpacity
              onPress={() => {
                handlePressValue(item.iconCode);
                console.log(item.iconCode);
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name={item.iconCode}
                  color="black"
                  size={iconsSize}
                  style={{
                    alignSelf: 'center',
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handlePressValue(item)}>
              <MaterialCommunityIcons
                name={item.iconCode}
                color={colors.text}
                size={iconsSize}
                style={{
                  textAlign: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                }}
              />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

export default CustomSwitchSelector;
