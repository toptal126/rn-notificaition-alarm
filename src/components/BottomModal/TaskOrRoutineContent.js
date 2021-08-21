/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

const TaskOrRoutineContent = ({
  secondOptionIcon,
  secondOptionText,
  onPressFirstOption,
  onPressSecondOption,
}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: '90%',
      }}>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.forms,
            paddingVertical: 25,
            paddingHorizontal: 30,
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <AntDesign name="plus" color={colors.text} size={55} />
          <Text style={{color: colors.text}}>New Task</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSecondOption}>
        <View
          style={{
            backgroundColor: colors.forms,
            padding: 25,
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <MaterialCommunityIcons
            name={secondOptionIcon}
            color={colors.text}
            size={55}
          />
          <Text style={{color: colors.text}}>{secondOptionText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskOrRoutineContent;
