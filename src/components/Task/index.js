/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Alert,
  StyleSheet,
  Animated,
} from 'react-native';

import FlatListTasks from './flatlistTasks';

import I18n from '../../services/translation';
import getRealm from '../../services/realm';
import {setupPushNotification} from '../../services/LocalPushController';

import ReactNativeAN from 'react-native-alarm-notification';

const alarmNotifData = {
  title: 'My Notification Title',
  message: 'My Notification Message',
  channel: 'qcwdc',
  small_icon: 'ic_launcher',
};

//  LIMPIAR Y AUTOMATIZAR TODO!!!!!!!!
// TODO!!!! LAS FUENTES EN IOS Y FUENTES E ICONS EN ANDROID ARREGLAR LO SE ORDENAR POR TIEMPO
//'¡¡TODOOO!! si agregar lo de traer los tasks del dia actual por que a lo mejor alguien no quiere borrar tasks expirados entonces si nesecito eso
import Swipeable from 'react-native-swipeable';
import SwitchSelector from 'react-native-switch-selector';
import Modal from 'react-native-modal';
// import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import DoneTaskSound from '../../../assets/audio/notification_test.mp3';

import BottomModal from '../BottomModal';
import CreateEditTask from '../BottomModal/CreateEditContent';
import AddButton from '../AddButton';
import Button from '../Button';

import {useTheme, useNavigation} from '@react-navigation/native';

import LottieView from 'lottie-react-native';
import Done from '../../../assets/animations/done.json';

import SettingsOptionsContext from '../../contexts/SettingsOptionsContext';

import {
  responsive,
  handleSound,
  loopSound,
  storeSettingsData,
  getSettingsData,
  removeSettingsData,
  handleReadableDate,
  truncate,
  tasksSortSelector,
  sortOrder,
} from '../../utils';

const size = responsive();

//const soundManager = loopSound(DoneTaskSound);
//console.log('soundManager', soundManager);

const Task = (props) => {
  // useEffect(() => {
  //   const timer = BackgroundTimer.setTimeout(() => {
  //     BackgroundTimer.setInterval(() => {
  //       console.log('cce');
  //     }, 3000);
  //   }, 5000);

  // BackgroundTimer.clearTimeout(timer);
  // }, []);
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [alarmMessage, setAlarmMessage] = useState('');
  const [showAlarm, setShowAlarm] = useState(false);

  const [userTasks, setUserTasks] = useState([]);
  const [changeDataFlatlistTasks, setChangeDataFlatlistTasks] = useState(false);

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

  const [selectedSort, setSelectorSort] = useState();

  // const [pendingAlarmsArr, setPendingAlarmsArr] = useState([]);
  // const [turnOnAlarm, setTurnOnAlarm] = useState(true);
  // const [turnOffAlarm, setTurnOffAlarm] = useState(false);

  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [doneTask, setDoneTask] = useState(false);

  const [modalDoneTaskVisible, setModalDoneTaskVisible] = useState(false);

  const [shotAnimation, setShotAnimation] = useState(false);

  const [swipeableTasksOn, setSwipeableTasksOn] = useState(false);

  const createTaskrefBottomModalTEST = useRef();
  const editTaskrefBottomModalTEST = useRef();
  const taskOrRoutineBottomModalTEST = useRef();
  const alarmBottomModalTEST = useRef();

  const tasksOpacity = useRef(new Animated.Value(0)).current;

  const {deleteExpired, soundDone} = useContext(SettingsOptionsContext);

  getSettingsData('sortSelected', (value) => {
    setSelectorSort(value);
  });

  const handleAnimation = () => {
    setShotAnimation(true);
    handleSound(DoneTaskSound);
  };

  const handleCreateTaskView = () => {
    const currentDate = new Date();
    return (
      <View>
        {(deleteExpired && currentDate.getDate() > props.day) ||
        currentDate.getMonth() > props.month ? (
          <View style={styles.conatiner}>
            <Text
              style={{
                ...styles.questionTxt,
                color: colors.text,
                fontSize: 20,
              }}>
              Aun no se puede viajar en el tiempo 😓
            </Text>
          </View>
        ) : (
          <View style={styles.conatiner}>
            <Text style={{...styles.questionTxt, color: colors.text}}>
              {I18n.t('question')}
            </Text>
            <Text style={{...styles.addTxt, color: colors.text}}>
              {I18n.t('add')}
            </Text>
            <AddButton
              iconSize={60}
              onPress={() => {
                (deleteExpired && currentDate.getDate() > props.day) ||
                currentDate.getMonth() > props.month
                  ? Alert.alert('Aun no podemos viajar en el tiempo :(')
                  : taskOrRoutineBottomModalTEST.current.open();
              }}
            />

            {taskOrRoutineModal()}
          </View>
        )}
      </View>
    );
  };

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
      soundYear: props.year,
      soundMonth: props.month,
      soundDay: props.day,
      soundHour: hr,
      soundMinute: mn,
    };

    const realm = await getRealm();

    try {
      realm.write(async () => {
        let newTask = realm.create('Task', data);
        subtArr.map((item) => newTask.subtasks.push(item));
        let date = new Date();
        date.setDate(date.getDate());
        date.setHours(data.soundHour, data.soundMinute, 0);
        if (data.mode == 1) {
          console.log('DATAMODE ', data.mode);
          pushNotification.localNotificationSchedule({
            message: data.name,
            date: date, // to schedule it in 10 secs in my case
            channelId: 'qcwdc', // (required)
          });
          setAlarmMessage(data.name);
        } else {
          console.log('DATAMODE ', data.mode);
          pushNotification.localNotificationSchedule({
            message: data.name,
            date: date, // to schedule it in 10 secs in my case
            channelId: 'qcwdc', // (required)
          });
          setAlarmMessage('');
          setShowAlarm(false);
        }
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserTasks(
      realm
        .objects('Task')
        .filtered(
          `soundDay == ${props.day} AND soundMonth == ${props.month} AND soundYear == ${props.year}`,
        ),
    );

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
            soundYear: props.year,
            soundMonth: props.month,
            soundDay: props.day,
            soundHour: hr,
            soundMinute: mn,
          },
          'modified',
        );
        subtArr.map((item) => foundTaskToUpdate.subtasks.push(item));

        const data = realm
          .objects('Task')
          .filtered(
            `soundDay == ${props.day} AND soundMonth == ${props.month} AND soundYear == ${props.year}`,
          );

        setUserTasks(data);

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

  const alarmPopupModal = () => {
    let icons;
    let fontSize;
    if (size === 'small') {
      icons = 35;
      fontSize = 30;
    } else if (size === 'medium') {
      icons = 45;
      fontSize = 36;
    } else {
      icons = 55;
      fontSize = 45;
    }
    //return <Text>{'AAA'}</Text>;
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize,
            marginVertical: '6%',
          }}>
          {alarmMessage}
        </Text>
        <Button
          onPress={() => {
            setShowAlarm(false);
            //soundManager.stop();
          }}
          content={
            <Ionicons
              name="volume-mute-outline"
              color={colors.text}
              size={icons}
              style={{
                width: 300,
                backgroundColor: '#2196f3',
                textAlign: 'center',
                borderRadius: 30,
              }}
            />
          }
        />
      </View>
    );
  };
  const taskOrRoutineModal = () => {
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
      icons = 55;
      fontSize = 15;
    }
    // popup with task and routine add buttons
    return (
      <BottomModal
        openModal={taskOrRoutineBottomModalTEST}
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
                <AntDesign name="plus" color={colors.text} size={icons} />
                <Text style={{color: colors.text, fontSize: fontSize}}>
                  {I18n.t('newTask')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: colors.forms,
                  padding: paddingVerticalContainer,
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <AntDesign name="bars" color={colors.text} size={icons} />
                <Text style={{color: colors.text, fontSize: fontSize}}>
                  {I18n.t('addRoutine')}
                </Text>
              </View>
            </TouchableOpacity>
            {createTaskModal()}
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
            currentTaskYear={props.year}
            currentTaskMonth={props.month}
            currentTaskDay={props.day}
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

  useEffect(() => {
    const handleShowTasks = async () => {
      const realm = await getRealm();
      console.log('AQIIIII', realm.path);
      const data = realm
        .objects('Task')
        .filtered(
          `soundDay == ${props.day} AND soundMonth == ${props.month} AND soundYear == ${props.year}`,
        );

      setUserTasks(data);

      // const pendingAlarmsData = realm.objects('Task').filtered('alarm == true');

      // const pendingAlarmsDataIds = pendingAlarmsData.map((itemId) => itemId.id);

      // if (pendingAlarmsDataIds.length > 0) {
      //   storeSettingsData(
      //     'pendingAlarms',
      //     JSON.stringify(pendingAlarmsDataIds),
      //   );
      // } else {
      //   removeSettingsData('pendingAlarms');
      // }

      // setPendingAlarmsArr(pendingAlarmsDataIds);
    };
    handleShowTasks();

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
    console.log('USEEFECT REALM DATA TASKS');
  }, [
    props.day,
    props.month,
    props.year,
    tasksOpacity,
    changeDataFlatlistTasks,
  ]);

  const handleDeleteExpiredTasks = async () => {
    const realm = await getRealm();

    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();

    const expiredTasks = realm
      .objects('Task')
      .filtered(`soundDay < ${currentDay} || soundMonth < ${currentMonth}`);

    expiredTasks.length > 0
      ? realm.write(() => {
          realm.delete(expiredTasks);
        })
      : console.log('no hay');
  };
  const _handleNotificationOpen = (notification) => {
    handleSound(DoneTaskSound);
    console.log(alarmMessage + '  ==> ', notification);
    if (alarmMessage == '') return;
    setShowAlarm(true);
    // soundManager.play();
    // taskOrRoutineBottomModalTEST.current.open();
  };
  const pushNotification = setupPushNotification(_handleNotificationOpen);
  useEffect(() => {
    console.log('D EXP T:', deleteExpired);
    deleteExpired ? handleDeleteExpiredTasks() : null;
  }, [deleteExpired, soundDone]);

  const handleShowTasksView = () => {
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
      <View style={styles.conatiner}>
        <View style={styles.conatiner15}>
          <View style={styles.conatiner2}>
            <View
              style={{
                flexDirection: 'row',
                width: '20%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...styles.dayWeek,
                  color: colors.text,
                  fontSize: todayTextSize,
                }}>
                {I18n.t('today')}
              </Text>
              <View style={{}}>
                <Text
                  style={{
                    color: '#6925F8',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {userTasks.length}
                </Text>
              </View>
              {shotAnimation ? (
                <LottieView
                  style={{
                    width: 100,
                    height: 100,
                    left: 40,
                    position: 'absolute',
                  }}
                  source={Done}
                  autoPlay={true}
                  onAnimationFinish={() => setShotAnimation(false)}
                  loop={false}
                  speed={2.5}
                />
              ) : null}
            </View>
            <View
              style={{
                ...styles.conatiner3,
                width: plusMenuIconsContainerWidth,
              }}>
              <Button
                onPress={() => setMenuModalVisible(true)}
                content={
                  <Ionicons
                    name="ios-ellipsis-horizontal-circle-outline"
                    color={colors.text}
                    size={plusMenuIconsSize}
                  />
                }
              />
              <AddButton
                onPress={() => {
                  createTaskrefBottomModalTEST.current.open();
                }}
                iconSize={32}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            {selectedSort === '1' ? (
              <FlatListTasks
                flatlistData={userTasks
                  .map((item) => item)
                  .sort(
                    (a, b) =>
                      sortOrder.indexOf(a.color) - sortOrder.indexOf(b.color) ||
                      a.soundHour - b.soundHour ||
                      a.soundMinute - b.soundMinute,
                  )}
                yearReceived={props.year}
                monthReceived={props.month}
                dayReceived={props.day}
                flatlistDataChange={() =>
                  setChangeDataFlatlistTasks(!changeDataFlatlistTasks)
                }
              />
            ) : (
              <FlatListTasks
                flatlistData={userTasks
                  .map((item) => item)
                  .sort(
                    (a, b) =>
                      a.soundHour - b.soundHour ||
                      a.soundMinute - b.soundMinute,
                  )}
                yearReceived={props.year}
                monthReceived={props.month}
                dayReceived={props.day}
                flatlistDataChange={() =>
                  setChangeDataFlatlistTasks(!changeDataFlatlistTasks)
                }
              />
            )}
          </View>
        </View>
        {createTaskModal()}
        {editTaskModalTEST()}
        {/* <Modal
          isVisible={modalDoneTaskVisible}
          animationIn="slideInLeft"
          animationOut="flash"
          swipeDirection="left"
          onSwipeComplete={() => setModalDoneTaskVisible(false)}
          onBackdropPress={() => setModalDoneTaskVisible(false)}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 22,
              borderRadius: 25,
              width: '75%',
              height: '20%',
            }}>
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={[
                ['#004777', 0.4],
                ['#F7B801', 0.4],
                ['#A30000', 0.2],
              ]}>
              {({remainingTime, animatedColor}) => (
                <Animated.Text style={{color: animatedColor}}>
                  {remainingTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          </View>
        </Modal> */}
        <Modal
          isVisible={isMenuModalVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={200}
          animationOutTiming={200}
          backdropTransitionInTiming={200}
          backdropTransitionOutTiming={200}
          swipeDirection="down"
          onSwipeComplete={() => setMenuModalVisible(false)}
          onBackdropPress={() => setMenuModalVisible(false)}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 22,
              borderRadius: 25,
              width: '75%',
              height: '20%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            {/* ACA TAMBIAN AGREGAR MAS CONFIGURACIONES COMO ELIMINAR TODOS LOS TASK O ELIMINAR LA RUTINA ETC */}
            <Text>{I18n.t('sortBy')}</Text>
            <SwitchSelector
              options={tasksSortSelector}
              initial={Number(selectedSort)}
              hasPadding
              borderColor="gray"
              selectedColor="black"
              textColor="white"
              buttonColor="white"
              buttonMargin={3}
              backgroundColor="black"
              fontSize={12}
              height={40}
              onPress={(value) => {
                storeSettingsData('sortSelected', value);
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View>
      {showAlarm && alarmPopupModal()}
      {userTasks <= 0 ? handleCreateTaskView() : handleShowTasksView()}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginTop: '6%',
    // marginTop: '15%', en la pregunta
    // alignItems: 'center',
    height: '100%',
    alignItems: 'center',
  },
  conatiner15: {
    // width: '91%',
    width: '100%',
  },
  conatiner2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    width: '85%',
    alignSelf: 'center',
  },
  conatiner3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    // backgroundColor: 'green',
  },
  dayWeek: {
    color: 'white',
  },
  questionTxt: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  addTxt: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 13,
    color: '#FFFFFF',
    marginBottom: 13,
  },
  btn: {
    backgroundColor: '#59EEFF',
    borderRadius: 150,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  modalContainer: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    height: '100%',
    flexDirection: 'column-reverse',
  },
  modalContentView: {
    paddingTop: 25,
    paddingLeft: 35,
    paddingRight: 35,
  },
  modalTxt: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  nameModalTxt: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ffffff',
  },
  modalInput: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderWidth: 1,
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 20,
    color: 'white',
    shadowColor: 'rgba(48, 48, 48, 10)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modalBtnColorsTxt: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ffffff',
  },
  timeTxt: {
    fontSize: 16,
    color: '#ffffff',
  },
  timeBtn: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 8,
    // shadowColor: 'rgba(25, 25, 25, 0.9)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 5,
    marginBottom: 20,
  },
  timeTxtAndSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  timeBtnTxt: {
    color: 'white',
  },
  switchContainer: {
    width: 135,
    marginLeft: 15,
  },
  iconsTxt: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ffffff',
  },
  createContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    opacity: 1,
  },
  createBtn: {
    backgroundColor: 'rgba(31, 242, 251, 1)',
    paddingHorizontal: '8%',
    paddingVertical: '3%',
    borderRadius: 55,
  },
  createTxt: {
    fontSize: 16,
    color: 'white',
  },
});

export default Task;
