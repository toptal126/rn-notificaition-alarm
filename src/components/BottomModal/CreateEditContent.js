/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';

import PropTypes from 'prop-types';

import TextModal from './textModal';
import SwitchSelector from '../SwitchSelector';
import DateTimePickerModal from '../DateTimePicker';
import CustomButton from '../Button';
import Button from '../Button';
import {
  IconsSwitchSelector,
  SoundImportanceSwitchSelector,
} from '../SwitchSelector/CustomSwitchSelector';
import BottomModal from '../BottomModal';

import Swipeable from 'react-native-swipeable';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import I18n from '../../services/translation';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {useTheme} from '@react-navigation/native';

import {
  importanceAndColorOptions,
  icons,
  alarmOrNotificationOptions,
} from '../../utils';

import {responsive} from '../../utils';

const size = responsive();

const CreateEditContent = function ({
  modalTitle,
  buttonSubmitText,
  placeHolder,
  passAllData,
  editModal,
  currentTaskName,
  currentTaskColor,
  currentTaskAlarmOrNotification,
  currentTaskYear,
  currentTaskMonth,
  currentTaskDay,
  currentTaskHour,
  currentTaskMinute,
  currentTaskIcon,
  currentTaskPomodoro,
  currentTaskFilter,
  currentSubtasks,
  passCloseModal,
}) {
  const {colors} = useTheme();
  const [input, setInput] = useState(editModal ? currentTaskName : '');
  const [selectedColor, setSelectedColor] = useState(
    editModal ? currentTaskColor : '#14D378',
  );

  const [alarmOrNotification, setalarmOrNotification] = useState(
    editModal ? currentTaskAlarmOrNotification : 0,
  );

  const [selectedHour, setSelectedHour] = useState(
    editModal ? currentTaskHour : 0,
  );
  const [selectedMinutes, setSelectedMinutes] = useState(
    editModal ? currentTaskMinute : 0,
  );
  const [icon, setIcon] = useState(editModal ? currentTaskIcon : 'access-time');

  const [pomodoro, setPomodoro] = useState(
    editModal ? currentTaskPomodoro : 'test',
  );

  const [filter, setFilter] = useState(editModal ? currentTaskFilter : '');

  const subTasksrefBottomModal = useRef();
  const inputredBottomModal = useRef();

  const [subtasks, setSubtasks] = useState(
    editModal ? [...currentSubtasks] : [],
  );
  const [subtaskInput, setSubtaskInput] = useState('');

  const [closeModal, setcloseModal] = useState(false);

  const importanceAndColorOptions2 = [
    {text: 'Low', activeColor: importanceAndColorOptions[0].activeColor},
    {text: 'Half', activeColor: importanceAndColorOptions[1].activeColor},
    {text: 'High', activeColor: importanceAndColorOptions[2].activeColor},
  ];

  const createSubtaskskView = () => {
    return (
      <View
        style={{
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{marginBottom: 10}}>No tienes Subtareas</Text>
        <Text style={{marginBottom: 5}}>Agregar</Text>
        <TouchableOpacity onPress={() => inputredBottomModal.current.open()}>
          <AntDesign name="pluscircle" size={50} color="#59EEFF" />
        </TouchableOpacity>
        {newSubtaskModalKeyBoard()}
      </View>
    );
  };

  const showSubtasksView = () => {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: 45,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4%',
          }}>
          <Text style={{fontSize: 25}}>Subtasks {subtasks.length}</Text>
          <TouchableOpacity onPress={() => inputredBottomModal.current.open()}>
            <AntDesign name="pluscircle" size={40} color="#59EEFF" />
          </TouchableOpacity>
          {newSubtaskModalKeyBoard()}
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={subtasks}
            keyExtractor={(item) => item.name}
            numColumns={1}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: '50%'}}
            renderItem={({item}) => (
              //EL SWIPEABLE ES EL DE ANIMATED REQUIERES SECOND ARGUMENT
              <Swipeable
                style={{borderBottomWidth: 1.4, borderColor: colors.forms}}
                leftActionActivationDistance={90}
                onLeftActionRelease={() => alert('hecho')}
                leftContent={
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0B6DF6',
                      paddingVertical: '2%',
                      paddingHorizontal: '4%',
                      alignItems: 'flex-end',
                    }}>
                    <Ionicons
                      name="checkmark-circle-sharp"
                      color="white"
                      size={35}
                    />
                  </TouchableOpacity>
                }
                rightActionActivationDistance={90}
                onRightActionRelease={() => alert('borrar')}
                rightContent={
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FE354B',
                      paddingVertical: '2%',
                      paddingHorizontal: '4%',
                    }}>
                    <MaterialCommunityIcons
                      name="delete-circle"
                      color="white"
                      size={37}
                    />
                  </TouchableOpacity>
                }>
                <Pressable>
                  <View
                    style={{
                      paddingVertical: '4%',
                      paddingHorizontal: '10%',
                    }}>
                    <Text>{item.name}</Text>
                  </View>
                </Pressable>
              </Swipeable>
            )}
          />
        </View>
      </View>
    );
  };

  const subTasksModal = () => {
    return (
      <BottomModal
        openModal={subTasksrefBottomModal}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={300}
        borderRadiusTop={40}
        keyBoardPushContent={false}
        closeDragDown={true}
        closeDragTopOnly={true}
        content={
          <View>
            {subtasks.length > 0 ? showSubtasksView() : createSubtaskskView()}
          </View>
        }
      />
    );
  };

  const newSubtaskModalKeyBoard = () => {
    return (
      <BottomModal
        openModal={inputredBottomModal}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={90}
        borderRadiusTop={10}
        keyBoardPushContent={true}
        closeDragDown={false}
        content={
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                paddingBottom: 5,
              }}>
              <TextInput
                value={subtaskInput}
                onChangeText={(text) => {
                  setSubtaskInput(text);
                }}
                style={{
                  flex: 1,
                  height: 36,
                  paddingTop: 10,
                  marginHorizontal: 10,
                }}
                autoFocus
                placeholder="Write a comment..."
                enablesReturnKeyAutomatically
                onSubmitEditing={() => inputredBottomModal.current.close()}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => alert('timer')}
                style={{opacity: subtaskInput.length > 0 ? 1 : 0.3}}
                disabled={subtaskInput.length > 0 ? false : true}>
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  color="#C4C4C4"
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleCreateSubtask(uuidv4(), subtaskInput, false);
                  inputredBottomModal.current.close();
                }}
                disabled={subtaskInput.length > 0 ? false : true}>
                <AntDesign
                  name="pluscircle"
                  color={
                    subtaskInput.length > 0
                      ? 'rgba(31, 242, 251, 1)'
                      : 'rgba(31, 242, 251, 0.3)'
                  }
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    );
  };

  const handleCreateSubtask = (i, n, d) => {
    class subtaskStructure {
      constructor(id, name, done) {
        this.id = id;
        this.name = name;
        // this.soundHour = soundHour;
        // this.soundMinute = soundMinute;
        this.done = done;
      }
    }
    setSubtasks(subtasks.concat(new subtaskStructure(i, n, d)));
  };

  const validationCreatTask = () => {
    if (input && selectedHour && selectedMinutes != null) {
      return true;
    }
  };

  const validationEditTask = () => {
    if (
      currentTaskName !== input ||
      currentTaskColor !== selectedColor ||
      currentTaskAlarmOrNotification !== alarmOrNotification ||
      currentTaskHour !== selectedHour ||
      currentTaskMinute !== selectedMinutes ||
      currentTaskIcon !== icon ||
      currentTaskPomodoro !== pomodoro ||
      currentTaskFilter !== filter ||
      currentSubtasks.length !== subtasks.length
    ) {
      return true;
    }
  };

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

  //EJ ALEATORIO EN PLACEHOLDER
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> con esto no puedo swipear el modal para cerrarlo, todo 'ponerlo-encerrar lo qur se ve arriba cuando el teclado este abieto'
    <View>
      <TextModal text={modalTitle} textTitle={true} />
      <View>
        <TextModal text={I18n.t('name')} textTitle={false} />
        <TextInput
          style={{
            ...styles.modalInput,
            backgroundColor: colors.forms,
            color: colors.text,
            height: inputHeight,
            fontSize: placeHolderFontSize,
          }}
          placeholderTextColor="#ADADAF"
          placeholder={placeHolder}
          value={input}
          onChangeText={(text) => setInput(text)}
          autoFocus={true}
        />
        {/* <TextModal text={I18n.t('colorI')} textTitle={false} /> */}
        <SwitchSelector
          passOptions={importanceAndColorOptions}
          passValueSelected={(color) => setSelectedColor(color)}
          passFontSize={switchSelectorFontSize}
          passHeight={40}
          isEditModal={editModal}
          currentValue={
            selectedColor === '#14D378'
              ? 0
              : selectedColor === '#FFD25F'
              ? 1
              : 2
          }
          backgroundColor={colors.forms}
          textColor={colors.text}
        />
        {/* <TextModal text={I18n.t('mode')} textTitle={false} /> */}
        <SwitchSelector
          passOptions={alarmOrNotificationOptions}
          passValueSelected={(value) => setalarmOrNotification(value)}
          passCustomBtnColor={colors.text}
          passFontSize={switchSelectorFontSize}
          passHeight={40}
          isEditModal={editModal}
          currentValue={currentTaskAlarmOrNotification}
          backgroundColor={colors.forms}
          textColor={colors.text}
        />
        {alarmOrNotification === 0 ? (
          <TextModal text={I18n.t('notification')} textTitle={false} />
        ) : (
          <TextModal text={I18n.t('alarm')} textTitle={false} />
        )}
        <DateTimePickerModal
          passHour={(hour) => setSelectedHour(hour)}
          passMinutes={(minutes) => setSelectedMinutes(minutes)}
          isEditModal={editModal}
          year={currentTaskYear}
          month={currentTaskMonth}
          day={currentTaskDay}
          hour={currentTaskHour}
          minute={currentTaskMinute}
          buttonStyle={{
            paddingVertical: paddingVerticalButtton,
            paddingHorizontal: paddingHorizontalButtton,
            backgroundColor: colors.forms,
            borderRadius: 8,
          }}
          fontSizeButton={fontSizeButton}
        />
        {/* <TextModal text={I18n.t('soundI')} textTitle={false} /> */}
        <SoundImportanceSwitchSelector
          dataOptions={importanceAndColorOptions2}
          horizontalOptions={false}
          numberColumns={3}
          // passSelectedValue={(value) => setIcon(value)}
          colorValue={selectedColor}
          isEditModal={editModal}
          currentValue={currentTaskIcon}
        />
        {/* <TextModal text={I18n.t('icons')} textTitle={false} /> */}
        <IconsSwitchSelector
          dataOptions={icons}
          horizontalOptions={true}
          passSelectedValue={(value) => setIcon(value)}
          isEditModal={editModal}
          currentValue={currentTaskIcon}
        />
        {/* <TextModal text={I18n.t('addPomodoro')} textTitle={false} /> */}
        <CustomButton
          onPress={() => Alert.alert('tempos')}
          content={
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.text,
                    marginRight: 2,
                    fontSize: fontSizeButton,
                  }}>
                  Add Pomodoro
                </Text>
                <MaterialCommunityIcons
                  name="progress-clock"
                  color={colors.text}
                  size={15}
                />
              </View>
            </View>
          }
          styleBtn={{
            paddingVertical: paddingVerticalButtton,
            paddingHorizontal: paddingHorizontalButtton,
            backgroundColor: colors.forms,
            marginTop: 20,
            borderRadius: 8,
          }}
        />
        {/* <TextModal text={I18n.t('addFilter')} textTitle={false} /> */}
        <CustomButton
          onPress={() => Alert.alert('filters')}
          content={
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.text,
                    marginRight: 2,
                    fontSize: fontSizeButton,
                  }}>
                  Add Filter
                </Text>
                <MaterialCommunityIcons
                  name="filter-outline"
                  color={colors.text}
                  size={15}
                />
              </View>
            </View>
          }
          styleBtn={{
            paddingVertical: paddingVerticalButtton,
            paddingHorizontal: paddingHorizontalButtton,
            backgroundColor: colors.forms,
            marginTop: 20,
            borderRadius: 8,
          }}
        />
        <CustomButton
          onPress={() => subTasksrefBottomModal.current.open()}
          content={
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.text,
                    marginRight: 2,
                    fontSize: fontSizeButton,
                  }}>
                  {I18n.t('sub')}
                </Text>
                <Entypo name="flow-cascade" color={colors.text} size={15} />
              </View>
              <Text style={{color: colors.text, marginRight: 2}}>
                {subtasks.length}
              </Text>
            </View>
          }
          styleBtn={{
            paddingVertical: paddingVerticalButtton,
            paddingHorizontal: paddingHorizontalButtton,
            backgroundColor: colors.forms,
            borderRadius: 8,
            marginTop: 20,
          }}
        />
        {subTasksModal()}
        {/* <View style={styles.containerCreateUpdateButton}> */}
        <View
          style={{
            backgroundColor: null,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 40,
          }}>
          <Button
            onPress={() => passCloseModal(true)}
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
              editModal
                ? validationEditTask()
                  ? passAllData(
                      input,
                      selectedColor,
                      alarmOrNotification,
                      selectedHour,
                      selectedMinutes,
                      icon,
                      pomodoro,
                      filter,
                      subtasks,
                    )
                  : Alert.alert('No hay nada por actualizar')
                : input.trim().length > 0 &&
                  selectedHour &&
                  selectedMinutes != null
                ? passAllData(
                    input,
                    selectedColor,
                    alarmOrNotification,
                    selectedHour,
                    selectedMinutes,
                    icon,
                    pomodoro,
                    filter,
                    subtasks,
                  )
                : Alert.alert('Introduce Nombre y Hora');
            }}
            content={
              <View
                style={{
                  backgroundColor: editModal
                    ? validationEditTask()
                      ? 'rgba(105, 37, 248, 1)'
                      : 'rgba(105, 37, 248, 0.4)'
                    : validationCreatTask()
                    ? 'rgba(31, 242, 251, 1)'
                    : 'rgba(31, 242, 251, 0.4)',
                  paddingHorizontal: 45,
                  paddingVertical: 15,
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    // fontSize: 16,
                    color: validationCreatTask()
                      ? 'white'
                      : 'rgba(250, 250, 250, 0.7)',
                  }}>
                  {buttonSubmitText}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
    // {/* </TouchableWithoutFeedback> */}
  );
};

const styles = StyleSheet.create({
  modalInput: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    // borderWidth: 1,
    borderRadius: 8,
    // shadowColor: 'rgba(48, 48, 48, 10)',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    elevation: 5,
  },
  // timeTxt: {
  //   fontSize: 14,
  //   color: '#ffffff',
  // },
  // timeTxtAndSwitchContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   // marginTop: 25,
  //   marginBottom: 20,
  // },
  // switchContainer: {
  //   width: 135,
  //   marginLeft: 15,
  // },
  // timeBtnTxt: {
  //   color: 'white',
  // },
  containerCreateUpdateButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: 'red',
    width: '100%',
    opacity: 1,
  },
});

export default CreateEditContent;
