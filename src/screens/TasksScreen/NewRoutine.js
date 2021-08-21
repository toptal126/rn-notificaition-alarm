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
} from 'react-native';

//¡¡¡¡TODOOO!!! MEJOR EL CREAR UNA NUEVA RUTINA MEJOR UN MODAL O EL LA MERA PANTALLA DE LA RUTINA LA OTRA

import getRealm from '../../services/realm';
import I18n from '../../services/translation';
import {useTheme} from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {v4 as uuidv4} from 'uuid';

import MyText from '../../components/BottomModal/textModal';

import BottomModal from '../../components/BottomModal';
import CreateEditTask from '../../components/BottomModal/CreateEditContent';

const NewRoutine = () => {
  const {colors} = useTheme();

  const [input, setInput] = useState('');

  const [tasksRoutine, setTasksRoutine] = useState([]);

  const createTaskrefBottomModalTEST = useRef();
  const editTaskrefBottomModalTEST = useRef();

  const handleCreateNewTask = (t, c, an, hr, mn, i) => {
    class taskStructure {
      constructor(
        id,
        name,
        color,
        done,
        notification,
        alarm,
        icon,
        soundYear,
        soundMonth,
        soundDay,
        soundHour,
        soundMinute,
      ) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.done = done;
        this.notification = notification;
        this.alarm = alarm;
        this.icon = icon;
        this.soundYear = soundYear;
        this.soundMonth = soundMonth;
        this.soundDay = soundDay;
        this.soundHour = soundHour;
        this.soundMinute = soundMinute;
      }
    }

    setTasksRoutine(
      tasksRoutine.concat(
        new taskStructure(
          uuidv4(),
          t,
          c,
          false,
          an === 0 ? true : false,
          an === 1 ? true : false,
          i,
          33,
          33,
          33,
          hr,
          mn,
        ),
      ),
    );

    createTaskrefBottomModalTEST.current.close();
  };

  const handleCreateAndSaveRoutineAndTasks = async () => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        let newRoutine = realm.create('Routine', {
          id: uuidv4(),
          name: input,
        });
        tasksRoutine.map((item) => newRoutine.tasks.push(item));
      });
    } catch (error) {
      console.log('ERR', error);
    }
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

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{paddingHorizontal: 40, paddingVertical: 25}}>
      <MyText
        text={I18n.t('name')}
        textTitle={false}
        modalTxtStyle={{
          fontSize: 16,
          marginBottom: 20,
          color: colors.text,
        }}
      />
      <TextInput
        style={{
          ...styles.modalInput,
          backgroundColor: colors.forms,
          color: colors.text,
        }}
        placeholderTextColor="#ADADAF"
        placeholder={'Weekend Routine'}
        value={input}
        onChangeText={(text) => setInput(text)}
        autoFocus={true}
      />
      <TouchableOpacity
        onPress={() => createTaskrefBottomModalTEST.current.open()}
        style={{...styles.button, backgroundColor: colors.forms}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.text}}>add New Task</Text>
          <AntDesign name="plus" color={colors.text} size={17} />
        </View>
        {createTaskModal()}
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.forms}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.text}}>add Habits</Text>
          <AntDesign name="plus" color={colors.text} size={17} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.forms}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.text}}>Configurar fecha</Text>
          <AntDesign name="calendar" color={colors.text} size={17} />
        </View>
      </TouchableOpacity>
      <View>
        <FlatList
          data={tasksRoutine}
          keyExtractor={(item) => item.id}
          numColumns={1}
          style={{paddingBottom: '8%'}}
          scrollEnabled={true}
          renderItem={({item}) => (
            <Text style={{color: item.color}}>{item.name}</Text>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleCreateAndSaveRoutineAndTasks()}
        style={{...styles.button, backgroundColor: 'red'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.text}}>SAVE</Text>
          <AntDesign name="calendar" color={colors.text} size={17} />
        </View>
      </TouchableOpacity>
    </View>
    // </TouchableWithoutFeedback>
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
});

export default NewRoutine;
