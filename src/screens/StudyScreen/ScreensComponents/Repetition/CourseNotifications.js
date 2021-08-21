/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, FlatList, Alert, Switch} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import getRealm from '../../../../services/realm';

import AddButton from '../../../../components/AddButton';
import BottomModal from '../../../../components/BottomModal';
import TextModal from '../../../../components/BottomModal/textModal';
import Button from '../../../../components/Button';
import SwitchSelector from '../../../../components/SwitchSelector';
import DateTimePickerModal from '../../../../components/DateTimePicker';
// import Modal from '../../../../components/Modal';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '@react-navigation/native';

import {
  courseColors,
  notificationsRepetition,
  responsive,
  showAlert,
  handleReadableDate,
} from '../../../../utils';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
  handleScheduleLocalNotification,
  showNotification,
} from '../../../../notification';

const size = responsive();

const CourseNotifications = ({route, navigation}) => {
  const {colors} = useTheme();

  const {courseTitle, color, courseId, courseNotificationsArr} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: `${courseTitle}`,
    });
  }, [navigation, courseTitle, courseNotificationsArr, courseNotifications]);

  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  }, []);

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
      console.log('clisk');
    } else {
      // Do something else with push notification
      console.log('nel');
    }
  };

  const [editNotification, setEditNotification] = useState(false);

  const [notificationActive, setNotificationActive] = useState(true);

  const [notificationId, setNotificationId] = useState('');
  const [notificationStudyTitle, setNotificationStudyTitle] = useState('');
  const [notificationStudyBody, setNotificationStudyBody] = useState('');
  const [notificationRepetitionInt, setNotificationRepetitionInt] = useState(1);

  const [
    notificationRepetitionsTimeArr,
    setNotificationRepetitionsTimeArr,
  ] = useState([]);

  const [courseNotifications, setCourseNotifications] = useState(false);

  const createNotificationrefBottomModal = useRef();
  const editNotificationrefBottomModal = useRef();
  const deleteOrEditNotificationBottomModal = useRef();

  const notificationTimeStructure = (notiHour, notiMinute) => {
    class repetitionTimeStructure {
      constructor(id, soundYear, soundMonth, soundDay, soundHour, soundMinute) {
        this.id = id;
        this.soundYear = soundYear;
        this.soundMonth = soundMonth;
        this.soundDay = soundDay;
        this.soundHour = soundHour;
        this.soundMinute = soundMinute;
      }
    }

    setNotificationRepetitionsTimeArr(
      notificationRepetitionsTimeArr.concat(
        new repetitionTimeStructure(uuidv4(), 2021, 6, 6, notiHour, notiMinute),
      ),
    );
  };

  console.log('el Arr', notificationRepetitionsTimeArr);

  const handleCreateAndSeveNewNotification = async function (
    notificationtitle,
    body,
    switchValue,
    repeating,
  ) {
    const realm = await getRealm();

    // notificationTimeStructure(notihr, notimn);

    try {
      realm.write(() => {
        const courseToAddNotification = realm.objectForPrimaryKey(
          'Course',
          courseId,
        );
        courseToAddNotification.notificationsStudy.push({
          id: uuidv4(),
          title: notificationtitle,
          body: body,
          active: switchValue,
          repeat: repeating,
          repetition_time: notificationRepetitionsTimeArr,
        });
        // notificationRepetitionsTimeArr.map((item) =>
        //   courseToAddNotification.notificationsStudy.repetition_time.push(item),
        // );
      });
      setCourseNotifications(!courseNotifications);
      createNotificationrefBottomModal.current.close();
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const handleDeleteNotification = async (notiId) => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const foundRoutine = realm.objectForPrimaryKey(
          'notificationStudy',
          notiId,
        );

        realm.delete(foundRoutine);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setCourseNotifications(!courseNotifications);

    deleteOrEditNotificationBottomModal.current.close();
  };

  const handleOnOffNotification = async (notiId, activeValue) => {
    const realm = await getRealm();

    const data = {
      id: notiId,
      active: !activeValue,
    };
    try {
      realm.write(() => {
        realm.create('notificationStudy', data, 'modified');
      });
    } catch (error) {
      console.log('ERR', error);
    }
    setCourseNotifications(!courseNotifications);
  };

  const notificationsTimeuiStructure = () => {
    let paddingHorizontalContainer;

    let inputHeight;
    let placeHolderFontSize;

    let paddingVerticalButtton;
    let paddingHorizontalButtton;
    let fontSizeButton;

    let switchSelectorFontSize;

    if (size === 'small') {
      paddingHorizontalContainer = 45;

      inputHeight = 25;
      placeHolderFontSize = 10;

      paddingVerticalButtton = 7;
      paddingHorizontalButtton = 18;
      fontSizeButton = 9;

      switchSelectorFontSize = 9;
    } else if (size === 'medium') {
      paddingHorizontalContainer = 40;

      inputHeight = 30;
      placeHolderFontSize = 12;

      paddingVerticalButtton = 8;
      paddingHorizontalButtton = 18;
      fontSizeButton = 13;

      switchSelectorFontSize = 10;
    } else {
      paddingHorizontalContainer = 35;
      inputHeight = 35;
      placeHolderFontSize = 14;

      paddingVerticalButtton = 10;
      paddingHorizontalButtton = 18;
      fontSizeButton = 14;

      switchSelectorFontSize = 12;
    }
    if (notificationRepetitionInt === 1) {
      return (
        <View
          style={{
            // backgroundColor: 'green',
            flexDirection: 'row',
            // justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              width: '3%',
            }}>
            <Text style={{color: colors.text}}>1:</Text>
          </View>
          <View
            style={{
              width: '97%',
            }}>
            <DateTimePickerModal
              passAll={true}
              passHourAndMinutes={(hour, minutes) =>
                notificationTimeStructure(hour, minutes)
              }
              isEditModal={editNotification}
              hour={
                editNotification
                  ? notificationRepetitionsTimeArr[0].soundHour
                  : null
              }
              minute={
                editNotification
                  ? notificationRepetitionsTimeArr[0].soundMinute
                  : null
              }
              buttonStyle={{
                paddingVertical: paddingVerticalButtton,
                paddingHorizontal: paddingHorizontalButtton,
                backgroundColor: colors.forms,
                borderRadius: 8,
                width: '100%',
              }}
              fontSizeButton={fontSizeButton}
            />
          </View>
        </View>
      );
    } else if (notificationRepetitionInt === 2) {
      return (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              // backgroundColor: 'green',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.text}}>1:</Text>
            <DateTimePickerModal
              passAll={true}
              passHourAndMinutes={(hour, minutes) =>
                notificationTimeStructure(hour, minutes)
              }
              isEditModal={editNotification}
              hour={
                editNotification
                  ? notificationRepetitionsTimeArr[0].soundHour
                  : null
              }
              minute={
                editNotification
                  ? notificationRepetitionsTimeArr[0].soundMinute
                  : null
              }
              buttonStyle={{
                paddingVertical: paddingVerticalButtton,
                paddingHorizontal: paddingHorizontalButtton,
                backgroundColor: colors.forms,
                borderRadius: 8,
              }}
              fontSizeButton={fontSizeButton}
            />
          </View>
          <View
            style={{
              // backgroundColor: 'green',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.text}}>2:</Text>
            <DateTimePickerModal
              passAll={true}
              passHourAndMinutes={(hour, minutes) =>
                notificationTimeStructure(hour, minutes)
              }
              isEditModal={editNotification}
              hour={
                editNotification
                  ? notificationRepetitionsTimeArr[1].soundHour
                  : null
              }
              minute={
                editNotification
                  ? notificationRepetitionsTimeArr[1].soundMinute
                  : null
              }
              buttonStyle={{
                paddingVertical: paddingVerticalButtton,
                paddingHorizontal: paddingHorizontalButtton,
                backgroundColor: colors.forms,
                borderRadius: 8,
              }}
              fontSizeButton={fontSizeButton}
            />
          </View>
        </View>
      );
    } else if (notificationRepetitionInt === 3) {
      return (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              // backgroundColor: 'green',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.text}}>1:</Text>
            <DateTimePickerModal
              passAll={true}
              passHourAndMinutes={(hour, minutes) =>
                notificationTimeStructure(hour, minutes)
              }
              isEditModal={editNotification}
              hour={
                editNotification
                  ? notificationRepetitionsTimeArr[0].soundHour
                  : null
              }
              minute={
                editNotification
                  ? notificationRepetitionsTimeArr[0].soundMinute
                  : null
              }
              buttonStyle={{
                paddingVertical: paddingVerticalButtton,
                paddingHorizontal: paddingHorizontalButtton,
                backgroundColor: colors.forms,
                borderRadius: 8,
              }}
              fontSizeButton={fontSizeButton}
            />
          </View>
          <View
            style={{
              // backgroundColor: 'green',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.text}}>2:</Text>
            <DateTimePickerModal
              passAll={true}
              passHourAndMinutes={(hour, minutes) =>
                notificationTimeStructure(hour, minutes)
              }
              isEditModal={editNotification}
              hour={
                editNotification
                  ? notificationRepetitionsTimeArr[1].soundHour
                  : null
              }
              minute={
                editNotification
                  ? notificationRepetitionsTimeArr[1].soundMinute
                  : null
              }
              buttonStyle={{
                paddingVertical: paddingVerticalButtton,
                paddingHorizontal: paddingHorizontalButtton,
                backgroundColor: colors.forms,
                borderRadius: 8,
              }}
              fontSizeButton={fontSizeButton}
            />
          </View>
          <View
            style={{
              // backgroundColor: 'green',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.text}}>3:</Text>
            <DateTimePickerModal
              passAll={true}
              passHourAndMinutes={(hour, minutes) =>
                notificationTimeStructure(hour, minutes)
              }
              isEditModal={editNotification}
              buttonStyle={{
                paddingVertical: paddingVerticalButtton,
                paddingHorizontal: paddingHorizontalButtton,
                backgroundColor: colors.forms,
                borderRadius: 8,
              }}
              fontSizeButton={fontSizeButton}
            />
          </View>
        </View>
      );
    }
  };

  const createNotificationModal = () => {
    return (
      <BottomModal
        openModal={createNotificationrefBottomModal}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={660}
        borderRadiusTop={40}
        closeDragDown={true}
        customPaddingHorizontal={true}
        content={
          <View
            style={{
              // paddingHorizontal: 20,
              backgroundColor: null,
              height: '94%',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextModal
                text="Create new repeating notification"
                textTitle={true}
              />
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={[
                  courseColors[color].color1,
                  courseColors[color].color2,
                ]}
                style={{
                  marginVertical: 10,
                  backgroundColor: null,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 14,
                }}>
                <Text style={{color: 'white', fontSize: 13}}>
                  {courseTitle}
                </Text>
              </LinearGradient>
              <TextModal text="Title or Question" textTitle={false} />
              <TextInput
                value={notificationStudyTitle}
                onChangeText={(value) => setNotificationStudyTitle(value)}
                placeholder="Ej. ¿Cuando fue x Acontecimiento?, significado de x palabra, estudia lo que quieras"
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingVertical: 20,
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <TextModal
                text="Answer, information or meaning"
                textTitle={false}
              />
              <TextInput
                value={notificationStudyBody}
                onChangeText={(value) => setNotificationStudyBody(value)}
                placeholder="Ej. Respuesta o significado de tu titlulo"
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingTop: 20,
                  paddingBottom: 50,
                  borderRadius: 20,
                  marginBottom: 5,
                }}
              />
              <TextModal text="Repetitions in the day" textTitle={false} />
              <Text
                style={{fontSize: 10, textAlign: 'center', color: '#8D8D8D'}}>
                number of notifications that will reach you in one day
              </Text>
              <SwitchSelector
                passOptions={notificationsRepetition}
                passValueSelected={(value) =>
                  setNotificationRepetitionInt(value)
                }
                passFontSize={12}
                passHeight={40}
                // isEditModal={editNotification}
                currentValue={1}
                backgroundColor={colors.forms}
                textColor={colors.text}
                passCustomBtnColor={colors.primary}
                passSelectedTxtColor={colors.forms}
              />
              <TextModal text="Notifictions time" textTitle={false} />
              {notificationsTimeuiStructure()}
            </View>
            <View
              style={{
                backgroundColor: null,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={() => createNotificationrefBottomModal.current.close()}
                content={
                  <View
                    style={{
                      borderColor: '#3F3F3F',
                      borderWidth: 1,
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: '#3F3F3F'}}>Cancelar</Text>
                  </View>
                }
              />
              <Button
                onPress={() =>
                  notificationStudyTitle.length === 0 &&
                  notificationStudyBody.length === 0
                    ? Alert.alert('Rellena los campos')
                    : handleCreateAndSeveNewNotification(
                        notificationStudyTitle,
                        notificationStudyBody,
                        notificationActive,
                        notificationRepetitionInt,
                      )
                }
                content={
                  <View
                    style={{
                      backgroundColor: '#0B6DF6',
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white'}}>Crear</Text>
                  </View>
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const editNotificationModal = () => {
    return (
      <BottomModal
        openModal={editNotificationrefBottomModal}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={660}
        borderRadiusTop={40}
        closeDragDown={true}
        content={
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: null,
              height: '94%',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextModal text="Edit repeating notification" textTitle={true} />
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={[
                  courseColors[color].color1,
                  courseColors[color].color2,
                ]}
                style={{
                  marginVertical: 10,
                  backgroundColor: null,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 14,
                }}>
                <Text style={{color: 'white', fontSize: 13}}>
                  {courseTitle}
                </Text>
              </LinearGradient>
              <TextModal text="Title or Question" textTitle={false} />
              <TextInput
                //   autoFocus
                value={notificationStudyTitle}
                onChangeText={(value) => setNotificationStudyTitle(value)}
                placeholder="Ej. ¿Cuando fue x Acontecimiento?, significado de x palabra, estudia lo que quieras"
                //   enablesReturnKeyAutomatically
                //   onSubmitEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                //   onEndEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingVertical: 20,
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <TextModal
                text="Answer, information or meaning"
                textTitle={false}
              />
              <TextInput
                //   autoFocus
                value={notificationStudyBody}
                onChangeText={(value) => setNotificationStudyBody(value)}
                placeholder="Ej. Respuesta o significado de tu titlulo"
                //   enablesReturnKeyAutomatically
                //   onSubmitEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                // onEndEditing={() => addCourserefBottomModal.current.close()}
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingTop: 20,
                  paddingBottom: 50,
                  borderRadius: 20,
                  marginBottom: 5,
                }}
              />
              <TextModal text="Repetitions in the day" textTitle={false} />
              <Text
                style={{fontSize: 10, textAlign: 'center', color: '#8D8D8D'}}>
                number of notifications that will reach you in one day
              </Text>
              <SwitchSelector
                passOptions={notificationsRepetition}
                passValueSelected={(value) =>
                  setNotificationRepetitionInt(value)
                }
                passFontSize={12}
                passHeight={40}
                isEditModal={editNotification}
                currentValue={notificationRepetitionInt - 1}
                backgroundColor={colors.forms}
                textColor={colors.text}
                passCustomBtnColor={colors.primary}
                passSelectedTxtColor={colors.forms}
              />
              <TextModal text="Notifictions time" textTitle={false} />
              {notificationsTimeuiStructure()}
            </View>
            <View
              style={{
                backgroundColor: null,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={() => editNotificationrefBottomModal.current.close()}
                content={
                  <View
                    style={{
                      borderColor: '#3F3F3F',
                      borderWidth: 1,
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: '#3F3F3F'}}>Cancelar</Text>
                  </View>
                }
              />
              <Button
                onPress={() =>
                  notificationStudyTitle.length === 0 &&
                  notificationStudyBody.length === 0
                    ? Alert.alert('Nada que actualizar')
                    : handleCreateAndSeveNewNotification(
                        notificationStudyTitle,
                        notificationStudyBody,
                        notificationActive,
                        notificationRepetitionInt,
                      )
                }
                content={
                  <View
                    style={{
                      backgroundColor: '#0B3FF6',
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white'}}>Editar</Text>
                  </View>
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const deleteOrEditRoutineModal = () => {
    let paddingVerticalContainer;
    let paddingHorizontalPlusIconContainer;
    let icons;
    let fontSize;
    if (size === 'small') {
      paddingVerticalContainer = 15;
      paddingHorizontalPlusIconContainer = 20;
      icons = 35;
      fontSize = 10;
    } else if (size === 'medium') {
      paddingVerticalContainer = 22;
      paddingHorizontalPlusIconContainer = 28;
      icons = 45;
      fontSize = 12;
    } else {
      //large screen
      paddingVerticalContainer = 25;
      paddingHorizontalPlusIconContainer = 30;
      icons = 48;
      fontSize = 15;
    }
    return (
      <BottomModal
        openModal={deleteOrEditNotificationBottomModal}
        wrapperColor={colors.modalWrapper}
        muchContent={false}
        borderRadiusTop={40}
        closeDragDown={true}
        content={
          <View
            style={
              {
                // backgroundColor: 'yellow',
              }
            }>
            <Button
              onPress={() => {
                setEditNotification(false);
                showAlert(
                  'Eiminar Notificacion',
                  '¿Deseas Eliminar permanentemente la notificacion?',
                  () => {
                    console.log('cancelado');
                  },
                  () => {
                    console.log('eliminado');
                    handleDeleteNotification(notificationId);
                  },
                );
              }}
              content={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <FontAwesome
                    name="trash"
                    color={colors.text}
                    size={35}
                    style={{marginRight: 20}}
                  />
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Delete Notification
                  </Text>
                </View>
              }
              styleBtn={{
                paddingHorizontal: 25,
                paddingVertical: 15,
                // backgroundColor: 'orange',
              }}
            />
            <Button
              onPress={() => {
                setEditNotification(true);
                editNotificationrefBottomModal.current.open();
              }}
              content={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <FontAwesome
                    name="edit"
                    color={colors.text}
                    size={35}
                    style={{marginRight: 15}}
                  />
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Edit Notification
                  </Text>
                  {/* {createNotificationModal()} */}
                </View>
              }
              styleBtn={{
                paddingHorizontal: 25,
                paddingVertical: 15,
                // backgroundColor: 'orange',
              }}
            />
            {editNotificationModal()}
          </View>
        }
      />
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: null,
      }}>
      {courseNotificationsArr.length > 0 ? (
        <View style={{width: '100%', height: '100%'}}>
          <FlatList
            data={courseNotificationsArr}
            keyExtractor={(item) => item.id}
            style={{backgroundColor: null, padding: 13}}
            numColumns={1}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: colors.forms,
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  padding: 20,
                  marginVertical: 15,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <LinearGradient
                    start={{x: 0.0, y: 0.25}}
                    end={{x: 0.5, y: 1.0}}
                    colors={
                      item.active
                        ? [
                            courseColors[color].color1,
                            courseColors[color].color2,
                          ]
                        : [
                            colors.linearNotificationBoxDesactivate,
                            colors.linearNotificationBoxDesactivate,
                          ]
                    }
                    style={{
                      backgroundColor: null,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      paddingVertical: 6,
                      paddingHorizontal: 14,
                    }}>
                    <Text
                      style={{
                        color: item.active
                          ? 'white'
                          : colors.textNotificationLinearBoxDesactivate,
                        fontSize: 13,
                      }}>
                      {courseTitle}
                    </Text>
                  </LinearGradient>
                  <Button
                    onPress={() => {
                      setNotificationId(item.id);
                      setNotificationStudyTitle(item.title);
                      setNotificationStudyBody(item.body);
                      setNotificationRepetitionInt(item.repeat);
                      setNotificationRepetitionsTimeArr(item.repetition_time);
                      deleteOrEditNotificationBottomModal.current.open();
                    }}
                    content={
                      <SimpleLineIcons
                        name="options"
                        color={colors.text}
                        size={25}
                      />
                    }
                  />
                </View>
                <View
                  style={{
                    // backgroundColor: 'orange',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: item.active
                        ? colors.text
                        : colors.textNotificationDesactivate,
                      marginTop: 20,
                      marginBottom: 10,
                      fontSize: 18,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      // backgroundColor: 'blue',
                      paddingVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // width: '100%',
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'pink',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '15%',
                      }}>
                      <FontAwesome
                        name="repeat"
                        color={
                          item.active
                            ? colors.text
                            : colors.textNotificationDesactivate
                        }
                        size={22}
                      />
                      <Text
                        style={{
                          color: item.active
                            ? colors.text
                            : colors.textNotificationDesactivate,
                          fontSize: 15,
                          marginLeft: 2,
                        }}>
                        {item.repeat}
                      </Text>
                    </View>
                    <View
                      style={{
                        // backgroundColor: 'yellow',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '85%',
                      }}>
                      {item.repetition_time.map((item2) => (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <MaterialCommunityIcons
                            name="bell-ring"
                            color={
                              item.active
                                ? colors.text
                                : colors.textNotificationDesactivate
                            }
                            size={18}
                            style={{
                              marginRight: 2,
                            }}
                          />
                          <Text
                            style={{
                              color: item.active
                                ? colors.text
                                : colors.textNotificationDesactivate,
                            }}>
                            {handleReadableDate(
                              item2.soundHour,
                              item2.soundMinute,
                            )}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Switch
                    value={item.active}
                    style={{marginTop: 10}}
                    onValueChange={
                      () => handleOnOffNotification(item.id, item.active)
                      // setNotificationActive(!notificationActive)
                    }
                  />
                </View>
              </View>
            )}
          />
          <View
            style={{
              position: 'absolute',
              left: '80%',
              top: '90%',
              backgroundColor: 'green',
            }}>
            <AddButton
              onPress={() => {
                setEditNotification(false);
                setNotificationId('');
                setNotificationStudyTitle('');
                setNotificationStudyBody('');
                setNotificationRepetitionInt(1);
                setNotificationRepetitionsTimeArr([]);
                createNotificationrefBottomModal.current.open();
              }}
              iconSize={60}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
          }}>
          <Text>No tienes notificacines crea una</Text>
          <Text style={{marginBottom: 20, marginTop: 8}}>crear</Text>
          <AddButton
            onPress={() => {
              setEditNotification(false);
              setNotificationId('');
              setNotificationStudyTitle('');
              setNotificationStudyBody('');
              setNotificationRepetitionInt(1);
              setNotificationRepetitionsTimeArr([]);
              createNotificationrefBottomModal.current.open();
            }}
            iconSize={55}
          />
        </View>
      )}
      {createNotificationModal()}
      {deleteOrEditRoutineModal()}
    </View>
  );
};

export default CourseNotifications;
