import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Animated,
  Text,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from 'react-native';

import I18n from '../../services/translation';

import getRealm from '../../services/realm';

import {useTheme} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import BottomModal from '../BottomModal';
import CreateEditTask from '../BottomModal/CreateEditContent';

import Swipeable from 'react-native-swipeable';

import SettingsOptionsContext from '../../contexts/SettingsOptionsContext';

import DoneTaskSound from '../../../assets/audio/notification_test.mp3';

import {
  responsive,
  handleReadableDate,
  truncate,
  handleSound,
} from '../../utils';

const size = responsive();

const FlatlistTasks = ({
  flatlistData,
  flatlistDataChange,
  yearReceived,
  monthReceived,
  dayReceived,
  tasksInRoutines,
}) => {
  const {colors} = useTheme();

  const editTaskrefBottomModalTEST = useRef();

  const [taskToUpdate, setTaskToUpdate] = useState('');

  const [userSubtasks, setUserSubtasks] = useState([]);

  //MODAL CREATE & UPDATE TASK STATES
  const [inputNameTask, setInputNameTask] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2ED27C');
  const [alarm, setAlarm] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');

  //STATES CON VALOR DE LA HORA EN LA QUE SONARA EL TASK Y LA MOSTRARAN POR DEFECTO EN EL DATETIMEPICKER
  const [taskHour, setTaskHour] = useState(0);
  const [taskMinute, setTaskMinute] = useState(0);

  const [swipeableTasksOn, setSwipeableTasksOn] = useState(false);

  const [doneTask, setDoneTask] = useState(false);

  const [modalDoneTaskVisible, setModalDoneTaskVisible] = useState(false);
  const [shotAnimation, setShotAnimation] = useState(false);

  const {soundDone} = useContext(SettingsOptionsContext);

  const tasksOpacity = useRef(new Animated.Value(0)).current;

  const handleAnimation = () => {
    setShotAnimation(true);
    handleSound(DoneTaskSound);
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(tasksOpacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 0,
      }),
      Animated.timing(tasksOpacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400,
      }),
    ]).start();
    flatlistData.map((item) => console.log('iem en fldt', item));
    console.log(flatlistData);
  }, [tasksOpacity, flatlistData]);

  const handleUpdateAndSaveTask = async (
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
    const realm = await getRealm();

    try {
      realm.write(() => {
        let foundTaskToUpdate = realm.create(
          'Task',
          {
            id: taskToUpdate,
            name: t,
            color: c,
            mode: aOrn,
            done: false,
            icon: i,
            pomodoro: pom,
            filter: filt,
            soundYear: yearReceived,
            soundMonth: monthReceived,
            soundDay: dayReceived,
            soundHour: hr,
            soundMinute: mn,
          },
          'modified',
        );
        subtArr.map((item) => foundTaskToUpdate.subtasks.push(item));

        const data = realm
          .objects('Task')
          .filtered(
            `soundDay == ${dayReceived} AND soundMonth == ${monthReceived} AND soundYear == ${yearReceived}`,
          );
        flatlistDataChange(true);

        // setUserTasks(data);

        // const pendingAlarmsData = realm
        //   .objects('Task')
        //   .filtered('alarm == true');

        // const pendingAlarmsDataIds = pendingAlarmsData.map(
        //   (itemId) => itemId.id,
        // );

        // if (pendingAlarmsDataIds.length > 0) {
        //   storeSettingsData(
        //     'pendingAlarms',
        //     JSON.stringify(pendingAlarmsDataIds),
        //   );
        // } else {
        //   removeSettingsData('pendingAlarms');
        // }

        // setPendingAlarmsArr(pendingAlarmsDataIds);
        editTaskrefBottomModalTEST.current.close();
      });
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const editTaskModalTEST = () => {
    return (
      <BottomModal
        openModal={editTaskrefBottomModalTEST}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        borderRadiusTop={40}
        keyBoardPushContent={false}
        closeDragDown={true}
        customPaddingHorizontal={true}
        content={
          <CreateEditTask
            modalTitle={I18n.t('editTask')}
            buttonSubmitText={I18n.t('update')}
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
              handleUpdateAndSaveTask(
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
            }}
            editModal={true}
            currentTaskName={inputNameTask}
            currentTaskColor={selectedColor}
            currentTaskAlarmOrNotification={alarm}
            currentTaskYear={yearReceived}
            currentTaskMonth={monthReceived}
            currentTaskDay={dayReceived}
            currentTaskHour={taskHour}
            currentTaskMinute={taskMinute}
            currentTaskIcon={selectedIcon}
            currentSubtasks={userSubtasks}
            passCloseModal={(value) => {
              value ? editTaskrefBottomModalTEST.current.close() : null;
            }}
          />
        }
      />
    );
  };

  let paddingBottomFlatlist;

  let todayTextSize;

  let plusMenuIconsContainerWidth;
  let plusMenuIconsSize;
  let iconTaskSize;
  let nameTaskSize;
  let iconListTaskSize;
  let modeTaskIconSize;
  let timeTaskSize;

  let paddingHorizontalTask;
  let paddingVerticalTask;

  if (size === 'small') {
    paddingBottomFlatlist = '77%';
    todayTextSize = 12;
    plusMenuIconsSize = 20;
    plusMenuIconsContainerWidth = '21%';

    paddingHorizontalTask = 35;
    paddingVerticalTask = 10;
    iconTaskSize = 35;
    nameTaskSize = 11;
    iconListTaskSize = 20;
    modeTaskIconSize = 12;
    timeTaskSize = 11;
  } else if (size === 'medium') {
    paddingBottomFlatlist = '81%';

    todayTextSize = 14;
    plusMenuIconsSize = 27;
    plusMenuIconsContainerWidth = '22%';

    paddingHorizontalTask = 37;
    paddingVerticalTask = 14;
    iconTaskSize = 47;
    nameTaskSize = 13;
    iconListTaskSize = 22;
    modeTaskIconSize = 14;
    timeTaskSize = 13;
  } else {
    paddingBottomFlatlist = '84%';

    todayTextSize = 18;
    plusMenuIconsSize = 32;
    plusMenuIconsContainerWidth = '23%';

    paddingHorizontalTask = 40;
    paddingVerticalTask = 16;
    iconTaskSize = 54;
    nameTaskSize = 15;
    iconListTaskSize = 26;
    modeTaskIconSize = 16;
    timeTaskSize = 15;
  }

  return (
    <Animated.FlatList
      data={flatlistData}
      keyExtractor={(item) => item._id}
      numColumns={1}
      style={{
        paddingBottom: paddingBottomFlatlist,
        // backgroundColor: 'gray',
        opacity: tasksOpacity,
      }}
      scrollEnabled={swipeableTasksOn ? false : true}
      renderItem={({item}) => (
        <Swipeable
          onSwipeStart={() => setSwipeableTasksOn(true)}
          onSwipeRelease={() => setSwipeableTasksOn(false)}
          leftButtonWidth={item.pomodoro ? 95 : null}
          leftButtons={
            tasksInRoutines
              ? null
              : item.pomodoro
              ? [
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0B6DF6',
                      paddingVertical: paddingVerticalTask,
                      paddingHorizontal: 20,
                      borderRadius: 190,
                      marginTop: 20,
                      // marginRight: 15,
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="ios-checkmark-circle"
                        color="white"
                        size={iconTaskSize - 3}
                      />
                    </View>
                  </TouchableOpacity>,
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'lightblue',
                      paddingVertical: paddingVerticalTask,
                      paddingHorizontal: 20,
                      borderRadius: 190,
                      marginTop: 20,
                      // marginRight: 15,
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="progress-clock"
                        color="white"
                        size={iconTaskSize + 1}
                      />
                    </View>
                  </TouchableOpacity>,
                ]
              : null
          }
          leftActionActivationDistance={item.pomodoro ? null : 100}
          onLeftActionRelease={
            item.pomodoro
              ? () => {}
              : async () => {
                  item.done === false && soundDone ? handleAnimation() : null;
                  const realm = await getRealm();

                  if (item.done === false) {
                    setModalDoneTaskVisible(true);
                  }

                  setDoneTask(!doneTask);
                  realm.write(() => {
                    realm.create(
                      'Task',
                      {id: item.id, done: !item.done},
                      'modified',
                    );
                  });
                  flatlistDataChange(true);
                }
          }
          leftContent={
            tasksInRoutines ? null : item.pomodoro ? null : (
              <TouchableHighlight
                style={{
                  backgroundColor: '#0B6DF6',
                  paddingVertical: paddingVerticalTask,
                  paddingHorizontal: paddingHorizontalTask,
                  borderRadius: 190,
                  marginTop: 20,
                  // marginRight: 15,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="ios-checkmark-circle"
                    color="white"
                    size={iconTaskSize - 3}
                  />
                </View>
              </TouchableHighlight>
            )
          }
          rightActionActivationDistance={100}
          onRightActionRelease={() =>
            Alert.alert(
              I18n.t('deleteTask'),
              'Deseas eliminar la tarea permanentemente',
              [
                {
                  text: 'Eliminar',
                  onPress: async () => {
                    const realm = await getRealm();
                    realm.write(() => {
                      const foundTask = realm.objectForPrimaryKey(
                        'Task',
                        item.id,
                      );
                      realm.delete(foundTask.subtasks);
                      realm.delete(foundTask);
                    });
                    const data = realm
                      .objects('Task')
                      .filtered(
                        `soundDay == ${dayReceived} AND soundMonth == ${monthReceived} AND soundYear == ${yearReceived}`,
                      );
                    flatlistDataChange(true);

                    // setUserTasks(data);
                  },
                },
                {
                  text: 'Cancelar',
                  onPress: () => console.log('cancelado'),
                },
              ],
            )
          }
          rightContent={
            <TouchableHighlight
              style={{
                backgroundColor: '#FE354B',
                paddingVertical: paddingVerticalTask,
                paddingHorizontal: paddingHorizontalTask,
                borderRadius: 190,
                marginTop: 20,
                // marginLeft: 1,
              }}>
              <MaterialCommunityIcons
                name="delete-circle"
                color="white"
                size={iconTaskSize}
              />
            </TouchableHighlight>
          }>
          <TouchableOpacity
            onPress={() => {
              setTaskToUpdate(item.id);
              setInputNameTask(item.name);
              setSelectedColor(item.color);
              setAlarm(item.mode);
              setTaskHour(item.soundHour);
              setTaskMinute(item.soundMinute);
              setSelectedIcon(item.icon);
              setUserSubtasks(item.subtasks);
              editTaskrefBottomModalTEST.current.open();
            }}>
            <View
              style={{
                backgroundColor: item.done ? '#EDEBEA' : item.color,
                paddingVertical: paddingVerticalTask,
                paddingHorizontal: paddingHorizontalTask,
                borderRadius: 190,
                marginTop: 20,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '87%',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={iconTaskSize}
                  color="white"
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: nameTaskSize,
                    }}>
                    {item.subtasks.length > 0
                      ? truncate(item.name, 22)
                      : truncate(item.name, 30)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Ionicons
                      name={item.mode === 0 ? 'notifications' : 'alarm'}
                      color="white"
                      size={modeTaskIconSize}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: timeTaskSize,
                      }}>
                      {handleReadableDate(item.soundHour, item.soundMinute)}
                    </Text>
                  </View>
                </View>
              </View>
              {item.subtasks.length > 0 ? (
                <Entypo
                  name="flow-cascade"
                  color="white"
                  size={iconListTaskSize}
                />
              ) : item.pomodoro ? (
                <MaterialCommunityIcons
                  name="progress-clock"
                  color="white"
                  size={iconListTaskSize}
                />
              ) : null}
            </View>
          </TouchableOpacity>
          {editTaskModalTEST()}
        </Swipeable>
      )}
    />
  );
};

export default FlatlistTasks;
