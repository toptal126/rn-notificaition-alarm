import React from 'react';
import {View} from 'react-native';
import MyBottomModal from 'react-native-raw-bottom-sheet';

import {useTheme} from '@react-navigation/native';

import {responsive} from '../../utils';

const size = responsive();

//LARGE
let bigHeight = 880;

let smallHeight = 200;

if (size === 'small') {
  bigHeight = 350;
  smallHeight = 250;
} else if (size === 'medium') {
  bigHeight = 670;
  smallHeight = 250;
}

const Modal = ({
  openModal,
  content,
  muchContent,
  wrapperColor,
  customSize,
  sizeModal,
  keyBoardPushContent,
  borderRadiusTop,
  closeDragDown,
  closeDragTopOnly,
  customBackgroundColor,
  background,
  customPaddingHorizontal,
}) => {
  const {colors} = useTheme();
  return (
    <MyBottomModal
      keyboardAvoidingViewEnabled={keyBoardPushContent}
      ref={openModal}
      closeOnDragDown={closeDragDown}
      closeOnPressMask={true}
      dragFromTopOnly={closeDragTopOnly}
      height={muchContent ? (customSize ? sizeModal : bigHeight) : smallHeight}
      animationType="fade"
      customStyles={{
        wrapper: {
          backgroundColor: wrapperColor,
        },
        container: {
          borderTopLeftRadius: borderRadiusTop,
          borderTopRightRadius: borderRadiusTop,
          backgroundColor: customBackgroundColor
            ? background
            : colors.background,
          paddingHorizontal: customPaddingHorizontal ? 20 : null,
        },
      }}>
      <View>{content}</View>
    </MyBottomModal>
  );
};

export default Modal;
