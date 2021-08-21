/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

import I18n from '../../../services/translation';
import getRealm from '../../../services/realm';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import Button from '../../../components/Button';
import AddButton from '../../../components/AddButton';
import BottomModal from '../../../components/BottomModal';
import CreateEditTask from '../../../components/BottomModal/CreateEditContent';
import FlatListTasks from '../../../components/Task/flatlistTasks';

import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '@react-navigation/native';

import {responsive, routinesColors, courseColors} from '../../../utils';

import {Typography} from '../../../styles';

const size = responsive();

const RoutineId = ({route, navigation}) => {
  const {
    routineName,
    routineDescription,
    color_position,
    routineTasks,
    idRoutine,
    otherUserRoutine,
    userCreatorUserName,
    userCreatorImgProfile,
    userCreatorFirstName,
    userCreatorLastName,
    imStudy,
  } = route.params;
  const {colors} = useTheme();

  const [routineId, setRoutineId] = useState('');
  const [routineNameInput, setRoutineNameInput] = useState('');
  const [routineDescriptionInput, setRoutineDescriptionInput] = useState('');
  const [selectedColorPosition, setSelectedColorPosition] = useState(0);
  const [privateRoutineSwitch, setPrivateRoutineSwitch] = useState(false);

  const [editRoutine, setEditRoutine] = useState(false);

  const createTaskrefBottomModalTEST = useRef();

  const [routinesTASKSTEST, setroutinesTASKSTEST] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: `${routineName}`,
    });
    setroutinesTASKSTEST(routineTasks);
  }, [navigation, routineName, routineTasks]);

  const currentDate = new Date();

  const handleCreateAndSeveNewTask = async (
    t,
    c,
    aOrn,
    hr,
    mn,
    i,
    pom,
    filt,
    subtArr,
  ) => {
    const data = {
      id: uuidv4(),
      name: t,
      color: c,
      mode: aOrn,
      done: false,
      icon: i,
      pomodoro: pom,
      filter: {
        id: uuidv4(),
        name: 'ewfwe',
      },
      soundYear: currentDate.getFullYear(),
      soundMonth: currentDate.getMonth(),
      soundDay: currentDate.getDate(),
      soundHour: hr,
      soundMinute: mn,
    };

    const realm = await getRealm();

    try {
      realm.write(() => {
        let newTask = realm.create('Task', data);
        subtArr.map((item) => newTask.subtasks.push(item));
      });
    } catch (error) {
      console.log('ERR', error);
    }

    // setUserTasks(
    //   realm
    //     .objects('Task')
    //     .filtered(
    //       `soundDay == ${props.day} AND soundMonth == ${props.month} AND soundYear == ${props.year}`,
    //     ),
    // );

    // const pendingAlarmsData = realm.objects('Task').filtered('alarm == true');

    // const pendingAlarmsDataIds = pendingAlarmsData.map((itemId) => itemId.id);

    // if (pendingAlarmsDataIds.length > 0) {
    //   storeSettingsData('pendingAlarms', JSON.stringify(pendingAlarmsDataIds));
    // } else {
    //   removeSettingsData('pendingAlarms');
    // }

    // setPendingAlarmsArr(pendingAlarmsDataIds);
    createTaskrefBottomModalTEST.current.close();
  };

  const createTaskModal = () => {
    return (
      <BottomModal
        openModal={createTaskrefBottomModalTEST}
        wrapperColor={colors.subModalWrapper}
        muchContent={true}
        borderRadiusTop={40}
        keyBoardPushContent={false}
        closeDragDown={true}
        customPaddingHorizontal={true}
        content={
          <CreateEditTask
            modalTitle={I18n.t('new')}
            buttonSubmitText={I18n.t('create')}
            placeHolder={I18n.t('title')}
            passAllData={(
              txt,
              color,
              aOrn,
              h,
              m,
              icn,
              pom,
              filt,
              subtasksArr,
            ) => {
              handleCreateAndSeveNewTask(
                txt,
                color,
                aOrn,
                h,
                m,
                icn,
                pom,
                filt,
                subtasksArr,
              );
              console.log('m', m);
              console.log('icno', icn);
              console.log('syb', subtasksArr);
            }}
            editModal={false}
            passCloseModal={(value) => {
              value ? createTaskrefBottomModalTEST.current.close() : null;
            }}
          />
        }
      />
    );
  };

  return (
    <View>
      <View
        style={{
          padding: 8,
        }}>
        <LinearGradient
          colors={[
            courseColors[color_position].color1,
            courseColors[color_position].color2,
          ]}
          style={{borderRadius: 30, width: '100%'}}>
          <Button
            customDisable={true}
            onPress={() => Alert.alert('pressed')}
            styleBtn={{
              width: '100%',
              height: otherUserRoutine ? 225 : 220,
              //   borderRadius: 25,
              //   backgroundColor: 'blue',
              padding: 25,
            }}
            content={
              <View
                style={{
                  // backgroundColor: 'purple',
                  height: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    // backgroundColor: 'orange',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'orange',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                      <Text style={styles.routineNameTextStyle}>
                        {routineName}
                      </Text>
                      {otherUserRoutine ? (
                        <Button
                          content={
                            <View>
                              <Text>Add 'My Routines'</Text>
                            </View>
                          }
                          styleBtn={{
                            backgroundColor: 'white',
                            paddingHorizontal: 15,
                            paddingVertical: 8,
                            borderRadius: 100,
                          }}
                        />
                      ) : null}
                    </View>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineDescription,
                        color: 'white',
                        fontSize: 14,
                      }}>
                      {routineDescription}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    // backgroundColor: 'brown',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineProperties,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      Start
                    </Text>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineProperties,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      00:00
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineProperties,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      0
                    </Text>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineProperties,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      Tasks
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineProperties,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      Finish
                    </Text>
                    <Text
                      style={{
                        fontFamily: Typography.RoutineProperties,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      00:00
                    </Text>
                  </View>
                  {otherUserRoutine ? (
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        In Use
                      </Text>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        1,233
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            }
          />
          {otherUserRoutine ? (
            <Button
              onPress={() =>
                navigation.navigate('UserRoutinesProfile', {
                  // routineName: item.location.street.name,
                  // routineDescription: item.location.timezone.description,
                  // color: Number(String(item.dob.age).charAt(0)),
                  // idRoutine: 'iuhy76y76f76',
                  // otherUserRoutine: true,
                  userImgProfile: userCreatorImgProfile,
                  userName: userCreatorUserName,
                  userFirstName: userCreatorFirstName,
                  userLastName: userCreatorLastName,
                  userStudy: imStudy,
                  // name:
                })
              }
              content={
                <View
                  style={{
                    // backgroundColor: 'orange',
                    flexDirection: 'column',
                    paddingHorizontal: 30,
                    marginTop: -4,
                  }}>
                  <Text
                    style={{
                      fontFamily: Typography.RoutineProperties,
                      fontSize: 15,
                      marginBottom: 8,
                      color: 'white',
                    }}>
                    Created by:
                  </Text>
                  <View
                    style={{
                      // backgroundColor: 'brown',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: userCreatorImgProfile}}
                        style={{
                          width: 50,
                          height: 50,
                          // resizeMode: 'cover',
                          // position: 'absolute',
                          // top: '0%',
                          borderRadius: 100,
                          marginRight: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Typography.RoutineDescription,
                          fontSize: 15,
                          paddingVertical: 2,
                          color: 'white',
                        }}>
                        {userCreatorUserName}
                      </Text>
                    </View>
                    <Text style={{color: '#006BFF'}}>View Profile</Text>
                  </View>
                </View>
              }
              styleBtn={{
                // backgroundColor: 'yellow',
                marginBottom: 20,
              }}
            />
          ) : null}
        </LinearGradient>
      </View>
      {routineTasks.length > 0 ? (
        <FlatListTasks
          tasksInRoutines={true}
          flatlistData={routineTasks
            .map((item) => item)
            .sort(
              (a, b) =>
                a.soundHour - b.soundHour || a.soundMinute - b.soundMinute,
            )}
          yearReceived={currentDate.getFullYear()}
          monthReceived={currentDate.getMonth()}
          dayReceived={currentDate.getDate()}
          // flatlistDataChange={() =>
          //   setChangeDataFlatlistTasks(!changeDataFlatlistTasks)
          // }
        />
      ) : (
        <View
          style={{
            // backgroundColor: 'green',
            padding: 11,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Add Tasks</Text>
          <AddButton
            onPress={() => {
              setEditRoutine(false);
              setRoutineNameInput('');
              setRoutineDescriptionInput('');
              setPrivateRoutineSwitch(false);
              setSelectedColorPosition(0);
              createTaskrefBottomModalTEST.current.open();
            }}
            iconSize={64}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  routineNameTextStyle: {
    fontFamily: Typography.RoutineName,
    fontSize: 20,
    color: 'white',
  },
});

export default RoutineId;
{
  /* <>
      <ScrollView>
        <View
          style={{
            // backgroundColor: 'red',
            padding: 8,
            height: '100%',
            alignItems: 'center',
          }}>
          {otherUserRoutine ? (
            <Button
              onPress={() =>
                navigation.navigate('UserRoutinesProfile', {
                  // routineName: item.location.street.name,
                  // routineDescription: item.location.timezone.description,
                  // color: Number(String(item.dob.age).charAt(0)),
                  // idRoutine: 'iuhy76y76f76',
                  // otherUserRoutine: true,
                  userImgProfile: userCreatorImgProfile,
                  userName: userCreatorUserName,
                  userFirstName: userCreatorFirstName,
                  userLastName: userCreatorLastName,
                  userStudy: imStudy,
                  // name:
                })
              }
              content={
                <View
                  style={{
                    // backgroundColor: 'brown',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: userCreatorImgProfile}}
                    style={{
                      width: 50,
                      height: 50,
                      // resizeMode: 'cover',
                      // position: 'absolute',
                      // top: '0%',
                      borderRadius: 100,
                    }}
                  />
                  <Text>PROFILE</Text>
                </View>
              }
              styleBtn={{
                // backgroundColor: 'yellow',
                width: '90%',
                marginBottom: 10,
              }}
            />
          ) : null}
          <LinearGradient
            colors={[
              courseColors[color_position].color1,
              courseColors[color_position].color2,
            ]}
            style={{borderRadius: 30, width: '100%'}}>
            <Button
              customDisable={true}
              onPress={() => Alert.alert('pressed')}
              styleBtn={{
                width: '100%',
                height: 220,
                //   borderRadius: 25,
                //   backgroundColor: 'blue',
                padding: 25,
              }}
              content={
                <View
                  style={{
                    // backgroundColor: 'purple',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'orange',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.routineNameTextStyle}>
                        {routineName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineDescription,
                          color: 'white',
                          fontSize: 14,
                        }}>
                        {routineDescription}
                      </Text>
                    </View>
                    {otherUserRoutine ? (
                      <Button
                        content={
                          <View>
                            <Text>Add 'My Routines'</Text>
                          </View>
                        }
                        styleBtn={{
                          // backgroundColor: 'blue',
                          paddingHorizontal: 15,
                          paddingVertical: 8,
                          borderRadius: 100,
                        }}
                      />
                    ) : null}
                  </View>

                  <View
                    style={{
                      // backgroundColor: 'brown',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        Start
                      </Text>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        00:00
                      </Text>
                    </View>
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        0
                      </Text>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        Tasks
                      </Text>
                    </View>
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        Finish
                      </Text>
                      <Text
                        style={{
                          fontFamily: Typography.RoutineProperties,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        00:00
                      </Text>
                    </View>
                    {otherUserRoutine ? (
                      <View
                        style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text>In Use</Text>
                        <Text>1,233</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              }
            />
          </LinearGradient>
          <View style={{flex: 1}}>
            {routineTasks.length > 0 ? (
              <FlatListTasks
                flatlistData={routineTasks
                  .map((item) => item)
                  .sort(
                    (a, b) =>
                      a.soundHour - b.soundHour ||
                      a.soundMinute - b.soundMinute,
                  )}
                yearReceived={currentDate.getFullYear()}
                monthReceived={currentDate.getMonth()}
                dayReceived={currentDate.getDate()}
                // flatlistDataChange={() =>
                //   setChangeDataFlatlistTasks(!changeDataFlatlistTasks)
                // }
              />
            ) : (
              <View
                style={{
                  // backgroundColor: 'green',
                  padding: 11,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Add Tasks</Text>
                <AddButton
                  onPress={() => {
                    setEditRoutine(false);
                    setRoutineNameInput('');
                    setRoutineDescriptionInput('');
                    setPrivateRoutineSwitch(false);
                    setSelectedColorPosition(0);
                    createTaskrefBottomModalTEST.current.open();
                  }}
                  iconSize={64}
                />
              </View>
            )}
          </View>
          {createTaskModal()}
        </View>
      </ScrollView>
    </> */
}
