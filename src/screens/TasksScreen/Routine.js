/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableHighlight,
} from 'react-native';

import getRealm from '../../services/realm';
import I18n from '../../services/translation';
import {useTheme} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {v4 as uuidv4} from 'uuid';

import MyText from '../../components/BottomModal/textModal';

import Swipeable from 'react-native-swipeable';

import BottomModal from '../../components/BottomModal';
import CreateEditTask from '../../components/BottomModal/CreateEditContent';

import CUSTOMCALENDARTEST from '../../components/Calendar';

import {handleReadableDate} from '../../utils';

import {responsive} from '../../utils';

const size = responsive();

const Routine = ({route, navigation}) => {
  const [routine, setRoutine] = useState();

  const [taskToUpdate, setTaskToUpdate] = useState('');

  //MODAL CREATE & UPDATE TASK STATES
  const [inputNameTask, setInputNameTask] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2ED27C');
  const [alarm, setAlarm] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');

  //STATES CON VALOR DE LA HORA EN LA QUE SONARA EL TASK Y LA MOSTRARAN POR DEFECTO EN EL DATETIMEPICKER
  const [taskHour, setTaskHour] = useState(0);
  const [taskMinute, setTaskMinute] = useState(0);

  //TEST
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  //TEST

  const [routineEdit, setRoutineEdit] = useState(false);

  const {routineId, nameRoutine, tasksRoutineArr} = route.params;
  useEffect(() => {
    const handleShowUserRoutines = async () => {
      try {
        const realm = await getRealm();
        setRoutine(realm.objectForPrimaryKey('Routine', routineId));
      } catch (error) {
        console.log('ERRR', error);
      }
    };
    handleShowUserRoutines();
  }, [routineId, tasksRoutineArr, routineEdit]);

  const {colors} = useTheme();

  const [routineName, setRoutineName] = useState(nameRoutine);

  const createTaskrefBottomModalTEST = useRef();
  const editTaskrefBottomModalTEST = useRef();
  const newTaskOrHabitrefBottomModalTEST = useRef();

  const handleCreateNewTask = async (t, c, an, hr, mn, i) => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const routineToAddTask = realm.objectForPrimaryKey(
          'Routine',
          routineId,
        );
        routineToAddTask.tasks.push({
          id: uuidv4(),
          name: t,
          color: c,
          done: false,
          notification: an === 0 ? true : false,
          alarm: an === 1 ? true : false,
          icon: i,
          soundHour: hr,
          soundMinute: mn,
        });
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setRoutineEdit(!routineEdit);
    createTaskrefBottomModalTEST.current.close();
    newTaskOrHabitrefBottomModalTEST.current.close();
  };

  const handleUpdateAndSaveRoutineAndTasks = async () => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const uptadeRoutine = realm.objectForPrimaryKey('Routine', routineId);
        uptadeRoutine.name =
          routineName.length <= 0 ? nameRoutine : routineName;
      });
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const handleUpdateAndSaveTask = async (t, c, an, hr, mn, i) => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const task = realm.objectForPrimaryKey('Task', taskToUpdate);
        task.name = t;
        task.color = c;
        task.done = false;
        task.notification = an === 0 ? true : false;
        task.alarm = an === 1 ? true : false;
        task.icon = i;
        task.soundHour = hr;
        task.soundMinute = mn;
        setRoutineEdit(!routineEdit);
        editTaskrefBottomModalTEST.current.close();
      });
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const taskOrRoutineModal = () => {
    let paddingVerticalContainer;
    let paddingHorizontalPlusIconContainer;
    let iconsSize;
    let fontSize;
    if (size === 'small') {
      paddingVerticalContainer = 15;
      paddingHorizontalPlusIconContainer = 20;
      iconsSize = 35;
      fontSize = 10;
    } else if (size === 'medium') {
      paddingVerticalContainer = 22;
      paddingHorizontalPlusIconContainer = 26;
      iconsSize = 45;
      fontSize = 12;
    } else {
      //large screen
      paddingVerticalContainer = 25;
      paddingHorizontalPlusIconContainer = 30;
      iconsSize = 55;
      fontSize = 15;
    }
    return (
      <BottomModal
        openModal={newTaskOrHabitrefBottomModalTEST}
        wrapperColor={colors.modalWrapper}
        muchContent={false}
        borderRadiusTop={40}
        closeDragDown={true}
        content={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              // backgroundColor: 'red',
              height: '90%',
            }}>
            <TouchableOpacity
              onPress={() => createTaskrefBottomModalTEST.current.open()}>
              <View
                style={{
                  backgroundColor: colors.forms,
                  paddingVertical: paddingVerticalContainer,
                  paddingHorizontal: paddingHorizontalPlusIconContainer,
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <AntDesign name="plus" color={colors.text} size={iconsSize} />
                <Text style={{color: colors.text, fontSize: fontSize}}>
                  {I18n.t('newTask')}
                </Text>
              </View>
              {createTaskModal()}
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: colors.forms,
                  padding: paddingVerticalContainer,
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  color={colors.text}
                  size={iconsSize}
                />
                <Text style={{color: colors.text, fontSize: fontSize}}>
                  {I18n.t('addHabits')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    );
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
        content={
          <CreateEditTask
            modalTitle={I18n.t('new')}
            buttonSubmitText={I18n.t('create')}
            placeHolder={I18n.t('title')}
            passAllData={(txt, color, almNot, h, m, icn) =>
              handleCreateNewTask(txt, color, almNot, h, m, icn)
            }
            editModal={false}
          />
        }
      />
    );
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
        content={
          <CreateEditTask
            modalTitle={I18n.t('editTask')}
            buttonSubmitText={I18n.t('update')}
            placeHolder={I18n.t('title')}
            passAllData={(txt, color, almNot, h, m, icn) =>
              handleUpdateAndSaveTask(txt, color, almNot, h, m, icn)
            }
            editModal={true}
            currentTaskName={inputNameTask}
            currentTaskColor={selectedColor}
            currentTaskAlarmOrNotification={alarm}
            currentTaskHour={taskHour}
            currentTaskMinute={taskMinute}
            currentTaskIcon={selectedIcon}
            currentSubtasks={[]}
          />
        }
      />
    );
  };

  const handleDeleteTask = (task) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Deseas eliminar la tarea permanentemente?',
      [
        {
          text: 'Eliminar',
          onPress: async () => {
            const realm = await getRealm();
            realm.write(() => {
              const taskToDelete = realm.objectForPrimaryKey('Tasks', task);
              realm.delete(taskToDelete);
              setRoutineEdit(!routineEdit);
            });
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {},
        },
      ],
    );
  };

  return (
    <View style={{backgroundColor: '#F6F6F7'}}>
      <View
        style={{
          height: '50%',
          backgroundColor: '#F6F6F7',
        }}>
        <Text style={{paddingHorizontal: 45, paddingTop: 10}}>Febrero</Text>

        <CUSTOMCALENDARTEST
          passDay={(d) => setDay(d)}
          passMonth={(m) => setMonth(m)}
          passYear={(y) => setYear(y)}
        />
      </View>
      <View
        style={{
          height: '50%',
          backgroundColor: 'white',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          paddingTop: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 45,
          }}>
          <TextInput
            value={routineName}
            placeholderTextColor="#ADADAF"
            placeholder={'MI RUTINA'}
            onChangeText={(inputValue) => {
              setRoutineName(inputValue);
            }}
            onEndEditing={() => handleUpdateAndSaveRoutineAndTasks()}
            style={{
              fontSize: 20,
              // paddingVertical: 5,
              // paddingHorizontal: 7,
              // backgroundColor: colors.forms,
              width: '85%',
            }}
          />
          <TouchableOpacity
            onPress={() => newTaskOrHabitrefBottomModalTEST.current.open()}>
            {taskOrRoutineModal()}
            <AntDesign name="pluscircle" size={25} color="#59EEFF" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasksRoutineArr}
          keyExtractor={(item) => item.id}
          numColumns={1}
          // style={style}
          scrollEnabled
          renderItem={({item}) => (
            <Swipeable
              rightActionActivationDistance={150}
              onRightActionRelease={() => handleDeleteTask(item.id)}
              rightContent={
                <TouchableHighlight
                  style={{
                    backgroundColor: '#FE354B',
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    borderRadius: 190,
                    marginTop: 20,
                    // marginLeft: 1,
                  }}>
                  <MaterialCommunityIcons
                    name="delete-circle"
                    color="white"
                    size={48}
                  />
                </TouchableHighlight>
              }>
              <TouchableOpacity
                onPress={() => {
                  setTaskToUpdate(item.id);
                  setInputNameTask(item.name);
                  setSelectedColor(item.color);
                  setAlarm(item.alarm);
                  setTaskHour(item.soundHour);
                  setTaskMinute(item.soundMinute);
                  setSelectedIcon(item.icon);
                  editTaskrefBottomModalTEST.current.open();
                }}>
                <View
                  style={{
                    backgroundColor: item.color,
                    paddingVertical: 10,
                    paddingHorizontal: 40,
                    borderRadius: 100,
                    marginTop: 20,
                    marginBottom: 10,
                    width: '87%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                  }}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={50}
                    color="white"
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <Text style={styles.dayWeek}>{item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name={item.alarm ? 'alarm-sharp' : 'notifications'}
                        color="white"
                        size={16}
                      />
                      <Text style={styles.dayWeek}>
                        {handleReadableDate(item.soundHour, item.soundMinute)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {editTaskModalTEST()}
            </Swipeable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalInput: {
    paddingVertical: 14,
    paddingHorizontal: 13,
    // borderWidth: 1,
    backgroundColor: 'black',
    borderRadius: 14,
    marginBottom: 20,
    color: 'white',
    // shadowColor: 'rgba(48, 48, 48, 10)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  dayWeek: {
    color: 'white',
    fontSize: 14,
  },
});

export default Routine;
