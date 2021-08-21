import React from 'react';
import {View, Text} from 'react-native';
import ModalX from 'react-native-modal';

import {useTheme} from '@react-navigation/native';

const Modal = ({
  openModal,
  content,
  passCloseModal,
  title,
  heightModal,
  style,
}) => {
  const {colors} = useTheme();

  return (
    <ModalX
      isVisible={openModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      swipeDirection="down"
      onSwipeComplete={() => passCloseModal(false)}
      onBackdropPress={() => passCloseModal(false)}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}>
      <View
        style={{
          height: heightModal,
          backgroundColor: colors.background,
          borderRadius: 25,
          // paddingHorizontal: 25,
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            paddingVertical: 9,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#ccc',
              width: 40,
              height: 5,
              borderRadius: 100,
            }}
          />
        </View>
        <View>{content}</View>
      </View>
    </ModalX>
  );
};

export default Modal;
