import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import getRealm from '../../../services/realm';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import DateTimePicker from '@react-native-community/datetimepicker';

import StudyModuleContainer from '../../../components/StudyModulesContainer';
import AddButton from '../../../components/AddButton';
import BottomModal from '../../../components/BottomModal';
import TextModal from '../../../components/BottomModal/textModal';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SubmitButtons from '../../../components/BottomModal/submitButtons';
import {IconsSwitchSelector} from '../../../components/SwitchSelector/CustomSwitchSelector';

import {icons, handleReadableDate} from '../../../utils';

import {useTheme} from '@react-navigation/native';

const Exams = () => {
  const {colors} = useTheme();

  const [userExams, setUserExams] = useState([]);

  const newExamRef = useRef();

  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);

  const [examName, setExamName] = useState('');
  const [examTopic, setExamTopic] = useState('');
  const [examDate, setexamDate] = useState(0);
  const [examTime, setexamTime] = useState(0);
  const [icon, setIcon] = useState('access-time');

  const selectConcentrationTimePomodoroRef = useRef();
  const selectBreakTimePomodoroRef = useRef();

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  //   console.log(selectedDate.getHours());
  //   console.log(selectedDate.getMinutes());
  //   console.log(selectedDate.getFullYear());
  // };

  const handleCreateAndSaveNewExam = async () => {
    const data = {
      id: uuidv4(),
      courseNme: examName,
      courseTopic: examTopic,
      soundYear: examDate.getFullYear(),
      soundMonth: examDate.getMonth(),
      soundDay: examDate.getDate(),
      soundHour: examTime.getHours(),
      soundMinute: examTime.getMinutes(),
      icon: icon,
    };

    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('Exams', data);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserExams(realm.objects('Exams'));

    newExamRef.current.close();
  };

  const selectexamDateBottomModal = () => {
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
            <TextModal text="Exam Date" textTitle={true} />
            <DateTimePicker
              testID="dateTimePicker"
              value={examDate === 0 ? new Date(Date.now()) : examDate}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={(event, selectedDate) => {
                setexamDate(selectedDate);
                console.log('LA DATE date year', selectedDate.getFullYear());
                console.log('LA DATE date month', selectedDate.getMonth());
                console.log('LA DATE date hour', selectedDate.getHours());
                console.log('LA DATE date minute', selectedDate.getMinutes());
                console.log(typeof selectedDate.getFullYear());
                console.log(selectedDate);
              }}
            />
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

  const selectexamTimeBottomModal = () => {
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
            <TextModal text="Exam Time" textTitle={true} />
            <DateTimePicker
              testID="dateTimePicker"
              value={examTime === 0 ? new Date(Date.now()) : examTime}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={(event, selectedDate) => {
                setexamTime(selectedDate);
                console.log('LA DATE', selectedDate.getFullYear());
              }}
            />
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

  const newExamModalView = () => {
    return (
      <BottomModal
        openModal={newExamRef}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={740}
        borderRadiusTop={40}
        closeDragDown={true}
        customPaddingHorizontal={true}
        content={
          <View>
            <TextModal text="Create new Exam" textTitle={true} />
            <TextModal text="Course" textTitle={false} />
            <Input
              inputValue={examName}
              inputValueOnChange={(value) => setExamName(value)}
              placeHolder="Math"
              customHeight={45}
              customBorderRadius={10}
            />
            <TextModal text="Name" textTitle={false} />
            <Input
              inputValue={examTopic}
              inputValueOnChange={(value) => setExamTopic(value)}
              placeHolder="Algebra"
              customHeight={45}
              customBorderRadius={10}
            />
            <TextModal text="Date" textTitle={false} />
            <Button
              onPress={() => selectConcentrationTimePomodoroRef.current.open()}
              content={
                examDate !== 0 ? (
                  <Text>
                    {`${examDate.getDate()} / ${examDate.getMonth()} / ${examDate.getFullYear()}`}
                  </Text>
                ) : (
                  <Text>Select Exam Date</Text>
                )
              }
              styleBtn={{
                backgroundColor: colors.forms,
                borderRadius: 9,
                paddingHorizontal: 25,
                paddingVertical: 13,
                // marginBottom: 8,
                alignItems: 'center',
              }}
            />

            <TextModal text="Time" textTitle={false} />
            <Button
              onPress={() => selectBreakTimePomodoroRef.current.open()}
              content={
                examTime !== 0 ? (
                  <Text>
                    {handleReadableDate(
                      examTime.getHours(),
                      examTime.getMinutes(),
                    )}
                  </Text>
                ) : (
                  <Text>Select Exam Time</Text>
                )
              }
              styleBtn={{
                backgroundColor: colors.forms,
                borderRadius: 9,
                paddingHorizontal: 25,
                paddingVertical: 13,
                // marginBottom: 8,
                alignItems: 'center',
              }}
            />
            <TextModal text="Icon" textTitle={false} />
            <IconsSwitchSelector
              dataOptions={icons}
              horizontalOptions={true}
              passSelectedValue={(value) => setIcon(value)}
            />
            <TextModal text="Notifications" textTitle={false} />
            <Button
              onPress={() => selectConcentrationTimePomodoroRef.current.open()}
              content={
                examDate !== 0 ? (
                  <Text>Focus: {Math.floor(examDate / 60)} Minutes</Text>
                ) : (
                  <Text>Select Notifications</Text>
                )
              }
              styleBtn={{
                backgroundColor: colors.forms,
                borderRadius: 9,
                paddingHorizontal: 25,
                paddingVertical: 13,
                // marginBottom: 8,
                alignItems: 'center',
              }}
            />
            {selectexamDateBottomModal()}
            {selectexamTimeBottomModal()}
            <SubmitButtons
              leftButtonFunction={() => newExamRef.current.close()}
              leftButtonText="Cancel"
              rightButtonFunction={handleCreateAndSaveNewExam}
              rightButtonText="Create"
            />
          </View>
        }
      />
    );
  };

  useEffect(() => {
    const handleGetUserExams = async () => {
      const realm = await getRealm();

      const foundExams = realm.objects('Exams');

      setUserExams(foundExams);
    };
    handleGetUserExams();
  }, []);

  return (
    <View style={{alignItems: 'center', backgroundColor: null, height: '100%'}}>
      <StudyModuleContainer
        fixed={true}
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
      {userExams.length > 0 ? (
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
            <Text>Add Exam</Text>
            <AddButton
              onPress={() => {
                newExamRef.current.open();
                // setpomodoroNameTextInput('');
                // setPomodoroConcentrationTime(0);
                // setPomodoroBreakTime(0);
                // setPomodoroSessions(0);
                // setAutoRepeatSessionPomodoroSwitch(false);
                // setSelectedColorPosition(0);
              }}
              iconSize={40}
            />
          </View>
          <FlatList
            data={userExams}
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
              <View>
                <View
                  style={{
                    // backgroundColor: 'lightgreen',
                    height: 90,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: colors.forms,
                    paddingHorizontal: 18,
                    paddingVertical: 15,
                    borderRadius: 17,
                    marginBottom: 25,
                    marginHorizontal: 5,
                  }}>
                  <Text>{item.courseNme}</Text>
                  <CountDown
                    size={18}
                    until={10000000}
                    onFinish={() => alert('Finished')}
                    digitStyle={
                      {
                        // backgroundColor: '#FFF',
                        // borderWidth: 2,
                        // borderColor: '#1CC625',
                      }
                    }
                    digitTxtStyle={{color: 'black'}}
                    // timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                    separatorStyle={{marginBottom: 15}}
                    timeToShow={['D', 'H', 'M', 'S']}
                    timeLabels={{
                      d: 'Days',
                      h: 'Hours',
                      m: 'Minutes',
                      s: 'Seconds',
                    }}
                    showSeparator
                  />
                </View>
                {/* <Button
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
                  /> */}
              </View>
            )}
          />
          {/* {deleteOrEditPomodoroModal()} */}
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <Text style={{marginBottom: 15, fontSize: 20}}>Add Exam</Text>
          <AddButton onPress={() => newExamRef.current.open()} iconSize={60} />
        </View>
      )}
      {newExamModalView()}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: null,
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Exams;
