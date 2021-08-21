import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import CALENDAR from '../Calendar';
import TASKS from './index';

const CalendarYTasks = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${monthName} ${year}`,
    });
  }, [navigation, monthName, year, month]);

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [monthName, setMonthName] = useState('');

  console.log('año', year);
  console.log('mes', month);
  console.log('dia', day);
  console.log('mes N', monthName);
  return (
    <View>
      <CALENDAR
        passDay={(d) => {
          setDay(d);
          console.log(d);
        }}
        passMonth={(m) => setMonth(m)}
        passYear={(y) => setYear(y)}
        passMonthName={(name) => setMonthName(name)}
      />
      <Text>{monthName}</Text>
      <TASKS year={year} month={month} day={day} />
    </View>
  );
};

export default CalendarYTasks;
