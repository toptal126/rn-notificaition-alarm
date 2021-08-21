/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

import StudyModuleContainer from '../../../components/StudyModulesContainer';

const Study = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{backgroundColor: 'transparent', alignItems: 'center'}}>
        <StudyModuleContainer
          onPress={() => navigation.navigate('Repetition')}
          backgroundFigures={
            <LinearGradient
              colors={['#F05468', '#E8207A']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '90%',
                height: '60%',
                position: 'absolute',
                top: 50,
                left: 200,
                transform: [{rotate: '50deg'}],
              }}
            />
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
                Titulo 1
              </Text>
              <Text style={{color: 'white'}}>
                Estudia lo que quieras via notificacines con el metodo de
                repeticion constante
              </Text>
            </>
          }
          rightContentTop={
            <>
              <MaterialIcons
                name="notifications-active"
                size={70}
                color="white"
                style={{
                  transform: [{rotate: '-15deg'}],
                }}
              />
              <MaterialCommunityIcons
                name="head-sync"
                size={50}
                color="white"
                style={{
                  transform: [{rotate: '20deg'}],
                  marginRight: 40,
                  backgroundColor: 'transparent',
                  left: 30,
                  bottom: 12,
                }}
              />
            </>
          }
          gradientColorsArray={['#E8207A', '#F05468']}
        />
        <StudyModuleContainer
          onPress={() => navigation.navigate('Flash Cards')}
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
                Titulo 2
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
        <StudyModuleContainer
          onPress={() => navigation.navigate('Pomodoros')}
          backgroundFigures={
            <LinearGradient
              colors={['#169587', '#A6CA63']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: 250,
                height: 250,
                position: 'absolute',
                top: 150,
                left: 10,
                borderRadius: 200,
                transform: [{rotate: '180deg'}],
              }}
            />
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
                Titulo 3
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
                name="head-flash"
                size={50}
                color="white"
                style={{
                  transform: [{rotate: '15deg'}],
                  left: 35,
                }}
              />
              <MaterialCommunityIcons
                name="progress-clock"
                size={70}
                color="white"
                style={{
                  transform: [{rotate: '-15deg'}],
                  backgroundColor: 'transparent',
                  bottom: 20,
                  right: 10,
                }}
              />
            </>
          }
          gradientColorsArray={['#169587', '#A6CA63']}
        />
        <StudyModuleContainer
          onPress={() => navigation.navigate('Exams')}
          backgroundFigures={
            <>
              <LinearGradient
                colors={['#791BF4', '#3880EC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: 250,
                  height: 250,
                  position: 'absolute',
                  top: 150,
                  left: -100,
                  borderRadius: 200,
                  transform: [{rotate: '230deg'}],
                }}
              />
              <LinearGradient
                colors={['#791BF4', '#3880EC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  width: 250,
                  height: 250,
                  position: 'absolute',
                  bottom: 150,
                  left: 230,
                  borderRadius: 200,
                  transform: [{rotate: '200deg'}],
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
                Titulo 4
              </Text>
              <Text style={{color: 'white'}}>
                Estudia lo que quieras via notificacines con el metodo de
                repeticion constante
              </Text>
            </>
          }
          rightContentTop={
            <>
              <Ionicons
                name="calendar"
                size={50}
                color="white"
                style={{
                  transform: [{rotate: '15deg'}],
                  left: 35,
                }}
              />
              <MaterialCommunityIcons
                name="file-clock"
                size={70}
                color="white"
                style={{
                  transform: [{rotate: '-15deg'}],
                  backgroundColor: 'transparent',
                  bottom: 20,
                  right: 10,
                }}
              />
            </>
          }
          gradientColorsArray={['#791BF4', '#3880EC']}
        />
        {/* <StudyModuleContainer
          backgroundFigures={
            <LinearGradient
              colors={['#F62452', '#EC6136']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: 350,
                height: 250,
                position: 'absolute',
                top: 150,
                left: -150,
                // borderRadius: 200,
                transform: [{rotate: '230deg'}],
              }}
            />
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
                name="account-clock"
                size={50}
                color="white"
                style={{
                  transform: [{rotate: '15deg'}],
                  left: 35,
                }}
              />
              <MaterialCommunityIcons
                name="timetable"
                size={70}
                color="white"
                style={{
                  transform: [{rotate: '-15deg'}],
                  backgroundColor: 'transparent',
                  bottom: 10,
                  right: 10,
                }}
              />
            </>
          }
          gradientColorsArray={['#F62452', '#EC6136']}
        /> */}
      </View>
    </ScrollView>
  );
};

export default Study;
