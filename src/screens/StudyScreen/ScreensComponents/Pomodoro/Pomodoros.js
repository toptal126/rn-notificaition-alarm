import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  Switch,
  SafeAreaView,
  Animated,
  AppState,
  StatusBar,
} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import getRealm from '../../../../services/realm';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'react-native-gradient-icon';

import {LinearTextGradient} from 'react-native-text-gradient';

import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import DoneTaskSound from '../../../../../assets/audio/notification_test.mp3';

import LottieView from 'lottie-react-native';
import Confetti from '../../../../../assets/animations/confetti.json';

import StudyModuleContainer from '../../../../components/StudyModulesContainer';
import AddButton from '../../../../components/AddButton';
import BottomModal from '../../../../components/BottomModal';
import TextModal from '../../../../components/BottomModal/textModal';
import SubmitButtons from '../../../../components/BottomModal/submitButtons';
import Button from '../../../../components/Button';

import {useTheme} from '@react-navigation/native';

import {
  courseColors,
  responsive,
  showAlert,
  handleSound,
} from '../../../../utils';

import {Typography} from '../../../../styles';

const size = responsive();

const Pomodoros = ({navigation}) => {
  const {colors} = useTheme();

  const [shotAnimation, setShotAnimation] = useState(false);

  const [editPomodoro, setEditPomodoro] = useState(false);

  const [userPomodoros, setUserPomodoros] = useState([]);

  const [pomodoroId, setpomodoroId] = useState('');

  const [pomodoroNameTextInput, setpomodoroNameTextInput] = useState('');
  const [pomodoroConcentrationTime, setPomodoroConcentrationTime] = useState(
    300,
  );
  const [pomodoroBreakTime, setPomodoroBreakTime] = useState(300);
  const [pomodoroSessions, setPomodoroSessions] = useState(0);
  const [
    autoRepeatSessionPomodoroSwitch,
    setAutoRepeatSessionPomodoroSwitch,
  ] = useState(false);
  const [selectedColorPosition, setSelectedColorPosition] = useState(0);

  const newPomodoroRef = useRef();
  const editPomodoroRef = useRef();
  const deleteOrEditPomodoroBottomModal = useRef();

  const selectConcentrationTimePomodoroRef = useRef();
  const selectBreakTimePomodoroRef = useRef();
  const selectPomodoroSessionsRef = useRef();

  const openPomodoroScreenRef = useRef();
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [pomodoroOver, setPomodoroOver] = useState(false);

  const [key, setKey] = useState(0);

  const handleCreateAndSaveNewPomodoro = async (
    name,
    Ctime,
    Btime,
    ses,
    auto,
    color,
  ) => {
    const data = {
      id: uuidv4(),
      name: name,
      concentrationTime: Ctime,
      breakTime: Btime,
      sessions: ses,
      autoRepeatSession: auto,
      colorPosition: color,
    };

    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('Pomodoro', data);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserPomodoros(realm.objects('Pomodoro'));

    newPomodoroRef.current.close();
  };

  const hanldeEditAndSavePomodoro = async (
    name,
    Ctime,
    Btime,
    ses,
    auto,
    color,
  ) => {
    const realm = await getRealm();

    const data = {
      id: pomodoroId,
      name: name,
      concentrationTime: Ctime,
      breakTime: Btime,
      sessions: ses,
      autoRepeatSession: auto,
      colorPosition: color,
    };
    try {
      realm.write(() => {
        realm.create('Pomodoro', data, 'modified');
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserPomodoros(realm.objects('Pomodoro'));

    editPomodoroRef.current.close();
  };

  const handleDeletePomodoro = async () => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const foundPomodoro = realm.objectForPrimaryKey('Pomodoro', pomodoroId);

        realm.delete(foundPomodoro);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserPomodoros(realm.objects('Pomodoro'));

    deleteOrEditPomodoroBottomModal.current.close();
  };

  const selectPomodoroConcentrationTimeBottomModal = () => {
    return (
      <BottomModal
        openModal={selectConcentrationTimePomodoroRef}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={400}
        borderRadiusTop={5}
        closeDragDown={true}
        closeDragTopOnly={true}
        content={
          <View>
            <TextModal text="Pomodoro Concentration Time" textTitle={true} />
            <Picker
              style={{backgroundColor: null, marginTop: 5}}
              selectedValue={pomodoroConcentrationTime}
              onValueChange={(itemValue, itemIndex) => {
                setPomodoroConcentrationTime(itemValue);
              }}>
              <Picker.Item label="- -" value={0} />
              <Picker.Item label="5 minutes" value={300} />
              <Picker.Item label="10 minutes" value={600} />
              <Picker.Item label="15 minutes" value={900} />
              <Picker.Item label="20 minutes" value={1200} />
              <Picker.Item label="25 minutes" value={1500} />
              <Picker.Item label="30 minutes" value={1800} />
              <Picker.Item label="35 minutes" value={2100} />
              <Picker.Item label="40 minutes" value={2400} />
              <Picker.Item label="45 minutes" value={2700} />
              <Picker.Item label="50 minutes" value={3000} />
              <Picker.Item label="55 minutes" value={3300} />
              <Picker.Item label="60 minutes" value={3600} />
            </Picker>

            <SubmitButtons
              leftButtonFunction={() =>
                selectConcentrationTimePomodoroRef.current.close()
              }
              leftButtonText="Cancel"
              rightButtonFunction={() =>
                selectConcentrationTimePomodoroRef.current.close()
              }
              rightButtonText="Select"
            />
          </View>
        }
      />
    );
  };

  const selectPomodoroBreakTimeBottomModal = () => {
    return (
      <BottomModal
        openModal={selectBreakTimePomodoroRef}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={400}
        borderRadiusTop={5}
        closeDragDown={true}
        closeDragTopOnly={true}
        content={
          <View>
            <TextModal text="Pomodoro 'Break' Time" textTitle={true} />
            <Picker
              style={{backgroundColor: null, marginTop: 5}}
              selectedValue={pomodoroBreakTime}
              onValueChange={(itemValue, itemIndex) => {
                setPomodoroBreakTime(itemValue);
                console.log(itemValue);
              }}>
              <Picker.Item label="- -" value={0} />
              <Picker.Item label="5 minutes" value={300} />
              <Picker.Item label="10 minutes" value={600} />
              <Picker.Item label="15 minutes" value={900} />
              <Picker.Item label="20 minutes" value={1200} />
              <Picker.Item label="25 minutes" value={1500} />
              <Picker.Item label="30 minutes" value={1800} />
            </Picker>
            <SubmitButtons
              leftButtonFunction={() =>
                selectBreakTimePomodoroRef.current.close()
              }
              leftButtonText="Cancel"
              rightButtonFunction={() =>
                selectBreakTimePomodoroRef.current.close()
              }
              rightButtonText="Select"
            />
          </View>
        }
      />
    );
  };

  const selectPomodoroSessionsBottomModal = () => {
    return (
      <BottomModal
        openModal={selectPomodoroSessionsRef}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={400}
        borderRadiusTop={5}
        closeDragDown={true}
        closeDragTopOnly={true}
        content={
          <View>
            <TextModal text="Pomodoro Sessions" textTitle={true} />
            <Picker
              style={{backgroundColor: null, marginTop: 5}}
              selectedValue={pomodoroSessions}
              onValueChange={(itemValue, itemIndex) => {
                setPomodoroSessions(itemValue);
                console.log(itemValue);
              }}>
              <Picker.Item label="- -" value={0} />
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="7" value={7} />
            </Picker>
            <SubmitButtons
              leftButtonFunction={() =>
                selectPomodoroSessionsRef.current.close()
              }
              leftButtonText="Cancel"
              rightButtonFunction={() =>
                selectPomodoroSessionsRef.current.close()
              }
              rightButtonText="Select"
            />
          </View>
        }
      />
    );
  };

  const newPomodoroModal = () => {
    return (
      <BottomModal
        openModal={newPomodoroRef}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={740}
        borderRadiusTop={40}
        closeDragDown={true}
        customPaddingHorizontal={true}
        content={
          <View
            style={{
              // paddingHorizontal: 20,
              // backgroundColor: 'red',
              height: '95%',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextModal text="Create new Pomodoro" textTitle={true} />
              <TextModal text="Name" textTitle={false} />
              <TextInput
                value={pomodoroNameTextInput}
                onChangeText={(value) => setpomodoroNameTextInput(value)}
                placeholder="Pomodoro Name Ex; For MATH"
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingVertical: 20,
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <TextModal text="Concentration Time (min)" textTitle={false} />
              <Button
                onPress={() =>
                  selectConcentrationTimePomodoroRef.current.open()
                }
                content={
                  pomodoroConcentrationTime !== 0 ? (
                    <Text>
                      Focus: {Math.floor(pomodoroConcentrationTime / 60)}{' '}
                      Minutes
                    </Text>
                  ) : (
                    <Text>Select Concentration Time</Text>
                  )
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  borderRadius: 9,
                  paddingHorizontal: 25,
                  paddingVertical: 13,
                  marginBottom: 8,
                  alignItems: 'center',
                }}
              />

              <TextModal text="Break Time (min)" textTitle={false} />
              <Button
                onPress={() => selectBreakTimePomodoroRef.current.open()}
                content={
                  pomodoroBreakTime !== 0 ? (
                    <Text>
                      Break: {Math.floor(pomodoroBreakTime / 60)} Minutes
                    </Text>
                  ) : (
                    <Text>Select Relax Time</Text>
                  )
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  borderRadius: 9,
                  paddingHorizontal: 25,
                  paddingVertical: 13,
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              />

              <TextModal text="Sessions" textTitle={false} />
              <Button
                onPress={() => selectPomodoroSessionsRef.current.open()}
                content={
                  pomodoroSessions !== 0 ? (
                    <Text>{pomodoroSessions}</Text>
                  ) : (
                    <Text>Select Sessions</Text>
                  )
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  borderRadius: 9,
                  paddingHorizontal: 25,
                  paddingVertical: 13,
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              />
              <TextModal text="Auto Repeat Sessions" textTitle={false} />
              <Switch
                value={autoRepeatSessionPomodoroSwitch}
                onValueChange={() =>
                  setAutoRepeatSessionPomodoroSwitch(
                    !autoRepeatSessionPomodoroSwitch,
                  )
                }
              />
              <TextModal text="Color" textTitle={false} />
              <FlatList
                data={courseColors}
                keyExtractor={(item) => item.color1}
                horizontal
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) =>
                  item.position === selectedColorPosition ? (
                    <Button
                      onPress={() => {
                        setSelectedColorPosition(item.position);
                      }}
                      content={
                        <LinearGradient
                          colors={[item.color1, item.color2]}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            height: 40,
                            borderRadius: 8,
                            borderWidth: 2.5,
                            borderColor: colors.text,
                          }}
                        />
                      }
                      styleBtn={{
                        backgroundColor: 'red',
                        width: 60,
                        marginHorizontal: 5,
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <Button
                      onPress={() => {
                        setSelectedColorPosition(item.position);
                      }}
                      content={
                        <LinearGradient
                          colors={[item.color1, item.color2]}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            height: 40,
                            borderRadius: 8,
                            borderWidth: 2.5,
                            borderColor: colors.background,
                          }}
                        />
                      }
                      styleBtn={{
                        backgroundColor: 'red',
                        width: 60,
                        marginHorizontal: 5,
                        borderRadius: 8,
                      }}
                    />
                  )
                }
              />

              {selectPomodoroConcentrationTimeBottomModal()}
              {selectPomodoroBreakTimeBottomModal()}
              {selectPomodoroSessionsBottomModal()}
            </View>
            <SubmitButtons
              leftButtonFunction={() => newPomodoroRef.current.close()}
              leftButtonText="Cancel"
              rightButtonFunction={() => {
                pomodoroNameTextInput.length > 0
                  ? handleCreateAndSaveNewPomodoro(
                      pomodoroNameTextInput,
                      pomodoroConcentrationTime,
                      pomodoroBreakTime,
                      pomodoroSessions,
                      autoRepeatSessionPomodoroSwitch,
                      selectedColorPosition,
                    )
                  : Alert.alert('Introduce nombre');
              }}
              rightButtonText="Create"
            />
          </View>
        }
      />
    );
  };

  const editPomodoroModal = () => {
    return (
      <BottomModal
        openModal={editPomodoroRef}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={740}
        borderRadiusTop={40}
        closeDragDown={true}
        content={
          <View
            style={{
              paddingHorizontal: 20,
              // backgroundColor: 'red',
              height: '95%',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextModal text="Edit Pomodoro" textTitle={true} />
              <TextModal text="Name" textTitle={false} />
              <TextInput
                value={pomodoroNameTextInput}
                onChangeText={(value) => setpomodoroNameTextInput(value)}
                placeholder="Pomodoro Name Ex; For MATH"
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingVertical: 20,
                  borderRadius: 15,
                  marginBottom: 5,
                }}
              />
              <TextModal text="Concentration Time (min)" textTitle={false} />
              <Button
                onPress={() =>
                  selectConcentrationTimePomodoroRef.current.open()
                }
                content={
                  pomodoroConcentrationTime !== 0 ? (
                    <Text>
                      Focus: {Math.floor(pomodoroConcentrationTime / 60)}{' '}
                      Minutes
                    </Text>
                  ) : (
                    <Text>Select Concentration Time</Text>
                  )
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  borderRadius: 9,
                  paddingHorizontal: 25,
                  paddingVertical: 13,
                  marginBottom: 8,
                  alignItems: 'center',
                }}
              />

              <TextModal text="Break Time (min)" textTitle={false} />
              <Button
                onPress={() => selectBreakTimePomodoroRef.current.open()}
                content={
                  pomodoroBreakTime !== 0 ? (
                    <Text>
                      Break: {Math.floor(pomodoroBreakTime / 60)} Minutes
                    </Text>
                  ) : (
                    <Text>Select Relax Time</Text>
                  )
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  borderRadius: 9,
                  paddingHorizontal: 25,
                  paddingVertical: 13,
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              />

              <TextModal text="Sessions" textTitle={false} />
              <Button
                onPress={() => selectPomodoroSessionsRef.current.open()}
                content={
                  pomodoroSessions !== 0 ? (
                    <Text>{pomodoroSessions}</Text>
                  ) : (
                    <Text>Select Sessions</Text>
                  )
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  borderRadius: 9,
                  paddingHorizontal: 25,
                  paddingVertical: 13,
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              />
              <TextModal text="Auto Repeat Sessions" textTitle={false} />
              <Switch
                value={autoRepeatSessionPomodoroSwitch}
                onValueChange={() =>
                  setAutoRepeatSessionPomodoroSwitch(
                    !autoRepeatSessionPomodoroSwitch,
                  )
                }
              />
              <TextModal text="Color" textTitle={false} />
              <FlatList
                data={courseColors}
                keyExtractor={(item) => item.color1}
                horizontal
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) =>
                  item.position === selectedColorPosition ? (
                    <Button
                      onPress={() => {
                        setSelectedColorPosition(item.position);
                      }}
                      content={
                        <LinearGradient
                          colors={[item.color1, item.color2]}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            height: 40,
                            borderRadius: 8,
                            borderWidth: 2.5,
                            borderColor: colors.text,
                          }}
                        />
                      }
                      styleBtn={{
                        backgroundColor: 'red',
                        width: 60,
                        marginHorizontal: 5,
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <Button
                      onPress={() => {
                        setSelectedColorPosition(item.position);
                      }}
                      content={
                        <LinearGradient
                          colors={[item.color1, item.color2]}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={{
                            height: 40,
                            borderRadius: 8,
                            borderWidth: 2.5,
                            borderColor: colors.background,
                          }}
                        />
                      }
                      styleBtn={{
                        backgroundColor: 'red',
                        width: 60,
                        marginHorizontal: 5,
                        borderRadius: 8,
                      }}
                    />
                  )
                }
              />

              {selectPomodoroConcentrationTimeBottomModal()}
              {selectPomodoroBreakTimeBottomModal()}
              {selectPomodoroSessionsBottomModal()}
            </View>
            <View
              style={{
                backgroundColor: null,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={() => editPomodoroRef.current.close()}
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
                onPress={() => {
                  {
                    pomodoroNameTextInput.length > 0
                      ? hanldeEditAndSavePomodoro(
                          pomodoroNameTextInput,
                          pomodoroConcentrationTime,
                          pomodoroBreakTime,
                          pomodoroSessions,
                          autoRepeatSessionPomodoroSwitch,
                          selectedColorPosition,
                        )
                      : Alert.alert('Introduce nombre');
                  }
                }}
                content={
                  <View
                    style={{
                      backgroundColor: '#0B6DF6',
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white'}}>Edit</Text>
                  </View>
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const deleteOrEditPomodoroModal = () => {
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
        openModal={deleteOrEditPomodoroBottomModal}
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
                setEditPomodoro(false);
                showAlert(
                  'Eiminar Pomodoro',
                  '¿Deseas eliminarlo permanentemente?',
                  () => {
                    console.log('cancelado');
                  },
                  () => {
                    console.log('eliminado');
                    handleDeletePomodoro();
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
                  <View
                    style={{
                      backgroundColor: colors.forms,
                      marginRight: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 13,
                      borderRadius: 13,
                    }}>
                    <FontAwesome
                      name="trash"
                      color={colors.text}
                      size={30}
                      style={{}}
                    />
                  </View>
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Delete Pomodoro
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
                setEditPomodoro(true);
                editPomodoroRef.current.open();
              }}
              content={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.forms,
                      marginRight: 15,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 13,
                    }}>
                    <MaterialCommunityIcons
                      name="circle-edit-outline"
                      color={colors.text}
                      size={30}
                      style={{}}
                    />
                  </View>
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Edit Pomodoro
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
            {editPomodoroModal()}
          </View>
        }
      />
    );
  };

  const pomodoroScreenBottomModal = () => {
    const children = (remainingTime) => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      return `${minutes}:${seconds}`;
    };

    const handleAnimation = () => {
      setShotAnimation(true);
      handleSound(DoneTaskSound);
    };

    return (
      <BottomModal
        openModal={openPomodoroScreenRef}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={900}
        borderRadiusTop={0}
        closeDragDown={false}
        content={
          <LinearGradient
            colors={[
              courseColors[selectedColorPosition].color1,
              courseColors[selectedColorPosition].color2,
            ]}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
              <Button
                onPress={() => {
                  setPause(true);
                  start
                    ? pause && pomodoroOver
                      ? openPomodoroScreenRef.current.close()
                      : showAlert(
                          'Salir',
                          '¿Deseas Salir antes de terminar?',
                          () => {
                            console.log('cancelado');
                          },
                          () => {
                            console.log('eliminado');
                            openPomodoroScreenRef.current.close();
                          },
                          true,
                          'Salir',
                        )
                    : openPomodoroScreenRef.current.close();
                }}
                content={
                  <MaterialCommunityIcons
                    name="close"
                    color="white"
                    size={40}
                  />
                }
              />
              <View
                style={{
                  // backgroundColor: 'red',
                  height: '96%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    // backgroundColor: 'lightblue',
                    justifyContent: 'space-between',
                    height: '45%',
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontFamily: Typography.RoutineName,
                      color: 'white',
                    }}>
                    {pomodoroNameTextInput}
                  </Text>
                  {shotAnimation ? (
                    <LottieView
                      style={{
                        width: 300,
                        height: 300,
                        left: -5,
                        bottom: -10,
                        position: 'absolute',
                        // backgroundColor: 'red',
                      }}
                      source={Confetti}
                      autoPlay={true}
                      onAnimationFinish={() => setShotAnimation(false)}
                      loop={false}
                      speed={1}
                    />
                  ) : null}
                  <CountdownCircleTimer
                    isPlaying={start ? (pause ? false : true) : false}
                    size={270}
                    key={key}
                    onComplete={() => {
                      // do your stuff here
                      setPomodoroOver(true);
                      handleAnimation();
                      // return [true, 1500]; // repeat animation in 1.5 seconds
                    }}
                    duration={pomodoroConcentrationTime}
                    colors={[['#FFFFFF'], ['#FFFFFF']]}>
                    {({remainingTime, animatedColor}) => (
                      <Animated.Text
                        style={{
                          fontSize: 40,
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                        }}>
                        {pomodoroOver ? 'Finish' : children(remainingTime)}
                      </Animated.Text>
                    )}
                  </CountdownCircleTimer>
                </View>
                <View
                  style={{
                    // backgroundColor: 'green',
                    flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'space-evenly',
                  }}>
                  <Button
                    onPress={() => {
                      setStart(false);
                      setPause(false);
                      setPomodoroOver(false);
                      setKey((prevKey) => prevKey + 1);
                      // setPause(true);
                    }}
                    content={
                      <View
                        style={{
                          borderColor: 'white',
                          borderWidth: 1,
                          paddingHorizontal: 45,
                          paddingVertical: 15,
                          borderRadius: 50,
                        }}>
                        <Text style={{color: 'white'}}>Reiniciar</Text>
                      </View>
                    }
                  />
                  <Button
                    onPress={() => {
                      start ? setPause(!pause) : setStart(true);
                    }}
                    content={
                      <View
                        style={{
                          backgroundColor: 'white',
                          paddingHorizontal: 45,
                          paddingVertical: 15,
                          borderRadius: 50,
                        }}>
                        <Text style={{color: 'black'}}>
                          {start ? (pause ? 'Reanudar' : 'Pausa') : 'Start'}
                        </Text>
                      </View>
                    }
                  />
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>
        }
      />
    );
  };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    setPause(true);
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  useEffect(() => {
    const handleGetUserPomodoros = async () => {
      const realm = await getRealm();

      const foundPomodoros = realm.objects('Pomodoro');

      setUserPomodoros(foundPomodoros);
    };
    handleGetUserPomodoros();
  }, []);

  return (
    <View style={{alignItems: 'center', backgroundColor: null, height: '100%'}}>
      <StudyModuleContainer
        fixed={true}
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
      {userPomodoros.length > 0 ? (
        <View
          style={{
            width: '100%',
            height: '50%',
            paddingHorizontal: 15,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              // backgroundColor: 'blue',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text>Add Pomodoro</Text>
            <AddButton
              onPress={() => {
                newPomodoroRef.current.open();
                setpomodoroNameTextInput('');
                setPomodoroConcentrationTime(0);
                setPomodoroBreakTime(0);
                setPomodoroSessions(0);
                setAutoRepeatSessionPomodoroSwitch(false);
                setSelectedColorPosition(0);
              }}
              iconSize={40}
            />
          </View>
          <FlatList
            data={userPomodoros}
            keyExtractor={(item) => item.id}
            style={
              {
                // backgroundColor: 'gray',
                // height: '100%',
                // paddingBottom: '25%',
              }
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Button
                onPress={() => {
                  // navigation.navigate('Pomodoro')
                  setStart(false);
                  setPause(false);
                  setPomodoroOver(false);

                  setpomodoroNameTextInput(item.name);
                  setPomodoroConcentrationTime(item.concentrationTime);
                  setPomodoroBreakTime(item.breakTime);
                  setPomodoroSessions(item.sessions);
                  setAutoRepeatSessionPomodoroSwitch(false);
                  setSelectedColorPosition(item.colorPosition);
                  openPomodoroScreenRef.current.open();
                }}
                content={
                  <View
                    style={{
                      // backgroundColor: 'lightgreen',
                      height: 60,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'lightblue',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon
                        size={50}
                        colors={[
                          {
                            color: courseColors[item.colorPosition].color1,
                            offset: '0',
                            opacity: '1',
                          },
                          {
                            color: courseColors[item.colorPosition].color2,
                            offset: '1',
                            opacity: '1',
                          },
                        ]}
                        type="material-community"
                        name="progress-clock"
                      />
                      <View
                        style={{
                          // backgroundColor: 'orange',
                          marginLeft: 15,
                        }}>
                        <Text
                          style={{
                            marginLeft: 0,
                            fontSize: 18,
                            fontFamily: Typography.RoutineName,
                          }}>
                          {item.name}
                        </Text>
                        <View
                          style={{
                            // backgroundColor: 'brown',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              // backgroundColor: 'green',
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: 8,
                            }}>
                            <FontAwesome5
                              name="user-clock"
                              color={colors.text}
                              size={16}
                            />
                            <Text
                              style={{
                                marginLeft: 4,
                                fontFamily: Typography.RoutineDescription,
                              }}>
                              {item.concentrationTime}
                            </Text>
                          </View>
                          <View
                            style={{
                              // backgroundColor: 'yellow',
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: 10,
                            }}>
                            <MaterialCommunityIcons
                              name="yoga"
                              color={colors.text}
                              size={21}
                            />
                            <Text
                              style={{
                                marginLeft: 2,
                                fontFamily: Typography.RoutineDescription,
                              }}>
                              {item.breakTime}
                            </Text>
                          </View>
                          <View
                            style={{
                              // backgroundColor: 'pink',
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: 10,
                            }}>
                            <FontAwesome
                              name="repeat"
                              color={colors.text}
                              size={17}
                            />
                            <Text
                              style={{
                                marginLeft: 3,
                                fontFamily: Typography.RoutineDescription,
                              }}>
                              {item.sessions}
                            </Text>
                            {/* <LinearTextGradient
                              style={{fontWeight: 'bold', fontSize: 72}}
                              locations={[0, 1]}
                              colors={['red', 'blue']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}>
                              THIS IS TEXT GRADIENT
                            </LinearTextGradient> */}
                          </View>
                        </View>
                      </View>
                    </View>
                    <Button
                      onPress={() => {
                        setpomodoroId(item.id);
                        setpomodoroNameTextInput(item.name);
                        setPomodoroConcentrationTime(item.concentrationTime);
                        setPomodoroBreakTime(item.breakTime);
                        setPomodoroSessions(item.sessions);
                        setAutoRepeatSessionPomodoroSwitch(false);
                        setSelectedColorPosition(item.colorPosition);
                        deleteOrEditPomodoroBottomModal.current.open();
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
                }
                styleBtn={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 18,
                  paddingVertical: 15,
                  borderRadius: 17,
                  marginBottom: 25,
                  marginHorizontal: 5,
                }}
              />
            )}
          />
          {pomodoroScreenBottomModal()}
          {deleteOrEditPomodoroModal()}
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <Text style={{marginBottom: 15, fontSize: 20}}>Add Pomodoro</Text>
          <AddButton
            onPress={() => {
              newPomodoroRef.current.open();
              setpomodoroNameTextInput('');
              setPomodoroConcentrationTime(0);
              setPomodoroBreakTime(0);
              setPomodoroSessions(0);
              setAutoRepeatSessionPomodoroSwitch(false);
              setSelectedColorPosition(0);
            }}
            iconSize={60}
          />
        </View>
      )}
      {newPomodoroModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pomodoros;
