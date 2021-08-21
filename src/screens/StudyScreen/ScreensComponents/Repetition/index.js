/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//¡¡¡¡TODOO!!!! aggregar las configuraciones de notifs aqui como configuracion general como, entre que hora a que hora recibir notis y cuando alertar de que ya son muchas notis que por mayor orden o algo asi apagar algunas y y en cada noti aparte las veces que queres que te lleguen
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient';

import StudyModuleContainer from '../../../../components/StudyModulesContainer';
import CoursesList from '../../../../components/CoursesList';

//¡¡TODO!! en el modulo de curso mostrar las notificaciones que estan activadas y tambien arriba como el los tasks y si se activan mas de unas 3-4 notis mostrar modal que diga que recomendamos no exeder las 3 por dia para enfocarse en unas solas
//¡¡TODOOO22!!! hacer la tipografia en un solo lugar y si la edito se edita en globalmente
const RepetitionMethod = () => {
  return (
    <View style={{alignItems: 'center', backgroundColor: null, height: '100%'}}>
      <StudyModuleContainer
        fixed={true}
        backgroundFigures={
          <LinearGradient
            colors={['#F05468', '#E8207A']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '92%',
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
      <CoursesList screen="Course Notifications" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RepetitionMethod;
