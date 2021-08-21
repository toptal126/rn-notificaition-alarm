import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';

import StudyModuleContainer from '../../../../components/StudyModulesContainer';
import CoursesList from '../../../../components/CoursesList';

const FlashCards = () => {
  return (
    <View style={{alignItems: 'center', backgroundColor: null, height: '100%'}}>
      <StudyModuleContainer
        fixed={true}
        backgroundFigures={
          <>
            <LinearGradient
              colors={['#02BAEF', '#006EE5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: 100,
                height: 100,
                position: 'absolute',
                top: 30,
                left: 300,
                borderRadius: 100,
                transform: [{rotate: '200deg'}],
              }}
            />
            <LinearGradient
              colors={['#02BAEF', '#006EE5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: 100,
                height: 100,
                position: 'absolute',
                top: 100,
                left: -40,
                borderRadius: 100,
                transform: [{rotate: '240deg'}],
              }}
            />
            <LinearGradient
              colors={['#02BAEF', '#006EE5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: 100,
                height: 100,
                position: 'absolute',
                top: 270,
                left: 180,
                borderRadius: 100,
                transform: [{rotate: '180deg'}],
              }}
            />
          </>
        }
        leftContent={
          <>
            <Text
              style={{
                marginVertical: 40,
                color: 'white',
                fontWeight: 'bold',
                fontSize: 45,
              }}>
              Titulo
            </Text>
            <Text style={{color: 'white'}}>
              Estudia lo que quieras via notificacines con el metodo de
              repeticion constante
            </Text>
          </>
        }
        rightContentTop={
          <>
            <MaterialCommunityIcons
              name="file-check"
              size={50}
              color="white"
              style={{
                transform: [{rotate: '30deg'}],
                marginRight: 40,
                backgroundColor: 'transparent',
                left: 45,
              }}
            />
            <MaterialCommunityIcons
              name="file-question"
              size={75}
              color="white"
              style={{
                transform: [{rotate: '-10deg'}],
                bottom: 20,
              }}
            />
          </>
        }
        gradientColorsArray={['#02BAEF', '#006EE5']}
      />
      <CoursesList screen="Course Flash Cards" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FlashCards;
