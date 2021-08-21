/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import I18n from '../../services/translation';

import Task from '../Task';

import {CalendarStyles, Colors} from '../../styles';

import Swipeable from 'react-native-swipeable';

import getRealm from '../../services/realm';

import {useTheme} from '@react-navigation/native';

import SettingsOptionsContext from '../../contexts/SettingsOptionsContext';

const Calendar = ({
  navigation,
  passYear,
  passMonth,
  passDay,
  passMonthName,
}) => {
  const {colors} = useTheme();
  //Año y mes modificables/cambiantes con la interacción de las flechas del calendario 'prev, next'
  const [
    modifiableCurrentYearNumber,
    setModifiableCurrentYearNumber,
  ] = useState(0);
  const [
    modifiableCurrentMonthNumber,
    setModifiableCurrentMonthNumber,
  ] = useState(0);
  const [modifiableCurrentDayNumber, setModifiableCurrentDayNumber] = useState(
    0,
  );

  const [currentYear, setCurrentYear] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [days, setDays] = useState([]);

  const [pressDay, setPressDay] = useState(false);

  const [dayTasks, setDayTasks] = useState([]);

  useEffect(() => {
    const date = new Date();
    setModifiableCurrentYearNumber(date.getFullYear());
    setModifiableCurrentMonthNumber(date.getMonth());
    setModifiableCurrentDayNumber(date.getDate());
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
    setCurrentDay(date.getDate());
    handleShowTasks();
  }, []);

  useEffect(() => {
    switch (modifiableCurrentMonthNumber) {
      case 0:
        setMonthName(I18n.t('month0'));
        break;
      case 1:
        setMonthName(I18n.t('month1'));
        break;
      case 2:
        setMonthName(I18n.t('month2'));
        break;
      case 3:
        setMonthName(I18n.t('month3'));
        break;
      case 4:
        setMonthName(I18n.t('month4'));
        break;
      case 5:
        setMonthName(I18n.t('month5'));
        break;
      case 6:
        setMonthName(I18n.t('month6'));
        break;
      case 7:
        setMonthName(I18n.t('month7'));
        break;
      case 8:
        setMonthName(I18n.t('month8'));
        break;
      case 9:
        setMonthName(I18n.t('month9'));
        break;
      case 10:
        setMonthName(I18n.t('month10'));
        break;
      case 11:
        setMonthName(I18n.t('month11'));
        break;
      default:
        setMonthName('0000');
        break;
    }

    const handleLeapYear = () => {
      // eslint-disable-next-line prettier/prettier
      return ((modifiableCurrentYearNumber % 100 !== 0) && (modifiableCurrentYearNumber % 4 === 0) || (modifiableCurrentYearNumber % 400 === 0));
    };

    const handleMonthDays = () => {
      if (
        modifiableCurrentMonthNumber === 0 ||
        modifiableCurrentMonthNumber === 2 ||
        modifiableCurrentMonthNumber === 4 ||
        modifiableCurrentMonthNumber === 6 ||
        modifiableCurrentMonthNumber === 7 ||
        modifiableCurrentMonthNumber === 9 ||
        modifiableCurrentMonthNumber === 11
      ) {
        return 31;
      } else if (
        modifiableCurrentMonthNumber === 3 ||
        modifiableCurrentMonthNumber === 5 ||
        modifiableCurrentMonthNumber === 8 ||
        modifiableCurrentMonthNumber === 10
      ) {
        return 30;
      } else {
        return handleLeapYear() ? 29 : 28;
      }
    };

    class dayobj {
      constructor(day, month, year, id, otherdaysmonth, dayWithTasks) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.id = id;
        this.otherdaysmonth = otherdaysmonth;
        this.dayWithTasks = dayWithTasks;
      }
    }

    const handleWriteMonth = () => {
      const prevLastDay = new Date(
        modifiableCurrentYearNumber,
        modifiableCurrentMonthNumber,
        0,
      ).getDate();

      const handleStartDayWeek = new Date(
        modifiableCurrentYearNumber,
        modifiableCurrentMonthNumber,
        1,
      ).getDay();

      const lastDayIndex = new Date(
        modifiableCurrentYearNumber,
        modifiableCurrentMonthNumber + 1,
        0,
      ).getDay();

      const nextDays = 7 - lastDayIndex - 1;

      const totaldays = [];
      for (let i = handleStartDayWeek; i > 0; i--) {
        totaldays.push(
          new dayobj(
            prevLastDay - i + 1,
            modifiableCurrentMonthNumber - 1,
            modifiableCurrentYearNumber,
            prevLastDay - i + 1,
            true,
          ),
        );
      }

      for (let i = 1; i <= handleMonthDays(); i++) {
        totaldays.push(
          new dayobj(
            i,
            modifiableCurrentMonthNumber,
            modifiableCurrentYearNumber,
            i,
            false,
            dayTasks.find(
              (day) =>
                day.soundDay === i &&
                day.soundMonth === currentMonth &&
                day.soundYear === currentYear,
            ) === undefined
              ? false
              : true,
          ),
        );
      }

      for (let i = 1; i <= nextDays; i++) {
        totaldays.push(
          new dayobj(
            i,
            modifiableCurrentMonthNumber + 1,
            modifiableCurrentYearNumber,
            i,
            true,
          ),
        );
      }
      setDays(totaldays);
    };
    handleWriteMonth();
    navigation.setOptions({
      title: `${monthName} ${modifiableCurrentYearNumber}`,
    });
  }, [
    modifiableCurrentMonthNumber,
    modifiableCurrentYearNumber,
    dayTasks,
    currentYear,
    currentMonth,
    navigation,
    monthName,
    passYear,
    passMonth,
    passDay,
    passMonthName,
    modifiableCurrentDayNumber,
  ]);

  const handleLastMonth = () => {
    if (modifiableCurrentMonthNumber !== 0) {
      setModifiableCurrentMonthNumber(modifiableCurrentMonthNumber - 1);
    } else {
      setModifiableCurrentMonthNumber(11);
      setModifiableCurrentYearNumber(modifiableCurrentYearNumber - 1);
    }
  };

  const handleNextMonth = () => {
    if (modifiableCurrentMonthNumber !== 11) {
      setModifiableCurrentMonthNumber(modifiableCurrentMonthNumber + 1);
    } else {
      setModifiableCurrentMonthNumber(0);
      setModifiableCurrentYearNumber(modifiableCurrentYearNumber + 1);
    }
  };

  const daysWeek = [
    {day: I18n.t('1'), id: 1},
    {day: I18n.t('2'), id: 2},
    {day: I18n.t('3'), id: 3},
    {day: I18n.t('4'), id: 4},
    {day: I18n.t('5'), id: 5},
    {day: I18n.t('6'), id: 6},
    {day: I18n.t('7'), id: 7},
  ];

  const {deleteExpired} = useContext(SettingsOptionsContext);

  const handleShowTasks = async () => {
    const realm = await getRealm();
    const data = realm.objects('Task');

    setDayTasks(data);
  };

  const handlePressDay = (day) => {
    setPressDay(true);
    setModifiableCurrentDayNumber(day);
    handleShowTasks();
  };

  useEffect(() => {
    deleteExpired ? handleShowTasks() : null;
    console.log(deleteExpired);
  }, [deleteExpired]);
  console.log('el expired en calendar', deleteExpired);

  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.container}>
        <View style={styles.calendar}>
          <View style={styles.calendarWeekContainer}>
            <FlatList
              data={daysWeek}
              keyExtractor={(item) => item.id}
              numColumns={7}
              scrollEnabled={false}
              renderItem={({item}) => (
                <Text style={{...styles.calendarWeekDays, color: colors.text}}>
                  {item.day}
                </Text>
              )}
            />
          </View>

          <Swipeable
            leftActionActivationDistance={150}
            onLeftActionRelease={() => handleLastMonth()}
            leftContent={
              <FlatList
                data={days}
                keyExtractor={(item) => item.id}
                style={styles.calendarMonthDaysContainer}
                numColumns={7}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <Text
                      style={{
                        ...styles.calendarPastAndNextMonthDays,
                        color: colors.otherDays,
                      }}>
                      {item.day}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            }
            rightActionActivationDistance={150}
            onRightActionRelease={() => handleNextMonth()}
            rightContent={
              <FlatList
                data={days}
                keyExtractor={(item) => item.id}
                style={styles.calendarMonthDaysContainer}
                numColumns={7}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <Text
                      style={{
                        ...styles.calendarPastAndNextMonthDays,
                        color: colors.otherDays,
                      }}>
                      {item.day}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            }>
            <View style={styles.calendarWeekContainer}>
              <FlatList
                data={days}
                keyExtractor={(item) => item.id}
                style={styles.calendarMonthDaysContainer}
                numColumns={7}
                renderItem={({item}) =>
                  pressDay &&
                  item.day === modifiableCurrentDayNumber &&
                  modifiableCurrentDayNumber !== currentDay &&
                  item.otherdaysmonth === false ? (
                    <TouchableOpacity onPress={() => handlePressDay(item.day)}>
                      <Text
                        style={{
                          ...styles.calendarMonthDays,
                          color: Colors.currentDay,
                        }}>
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  ) : item.day === currentDay &&
                    item.month === currentMonth &&
                    item.year === currentYear &&
                    item.otherdaysmonth === false ? (
                    <TouchableOpacity onPress={() => handlePressDay(item.day)}>
                      <Text style={styles.currentDayMonth}>{item.day}</Text>
                    </TouchableOpacity>
                  ) : item.otherdaysmonth ? (
                    <TouchableOpacity onPress={() => handlePressDay(item.day)}>
                      <Text
                        style={{
                          ...styles.calendarPastAndNextMonthDays,
                          color: colors.otherDays,
                        }}>
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  ) : item.dayWithTasks && item.month === currentMonth ? (
                    <TouchableOpacity onPress={() => handlePressDay(item.day)}>
                      <View>
                        <Text
                          style={{
                            ...styles.calendarMonthDays,
                            color: colors.text,
                            paddingTop: 14,
                            paddingBottom: 1,
                          }}>
                          {item.day}
                        </Text>
                        <View
                          style={{
                            backgroundColor: item.dayWithTasks
                              ? Colors.currentDay
                              : 'transparent',
                            padding: 2,
                            borderRadius: 50,
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => handlePressDay(item.day)}>
                      <View>
                        <Text
                          style={{
                            ...styles.calendarMonthDays,
                            color: colors.text,
                            paddingTop: 14,
                            paddingBottom: 1,
                          }}>
                          {item.day}
                        </Text>
                        <View
                          style={{
                            backgroundColor: item.dayWithTasks
                              ? 'transparent'
                              : 'transparent',
                            padding: 2,
                            marginBottom: 11,
                            borderRadius: 50,
                            alignSelf: 'center',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )
                }
              />
            </View>
          </Swipeable>
        </View>
      </View>
      <View style={styles.taskContainer}>
        <Task
          year={modifiableCurrentYearNumber}
          month={modifiableCurrentMonthNumber}
          day={modifiableCurrentDayNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '94%',
  },
  calendar: {
    width: '100%',
  },
  calendarWeekContainer: {
    flexDirection: 'row',
  },
  calendarWeekDays: {
    ...CalendarStyles.daysWeekTxt,
  },
  calendarMonthDaysContainer: {
    width: '100%',
  },
  calendarMonthDays: {
    ...CalendarStyles.daysMonthInts,
    // backgroundColor: '#121212',
  },
  calendarPastAndNextMonthDays: {
    ...CalendarStyles.daysMonthInts,
    color: Colors.pastAndNextDays,
    // backgroundColor: '#121212',
  },
  currentDayMonth: {
    ...CalendarStyles.daysMonthInts,
    backgroundColor: Colors.currentDay,
  },
  taskContainer: {
    // marginTop: '15%',
    width: '100%',
    // backgroundColor: 'red',
  },
});

export default Calendar;
