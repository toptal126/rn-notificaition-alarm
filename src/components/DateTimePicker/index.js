/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import CustomButton from '../Button';

// import Responsive from '../../utils';

import {useTheme} from '@react-navigation/native';

// const size = Responsive();

// let paddingVerticalButtton;
// let paddingHorizontalButtton;

// if (size === 'small') {
//   paddingVerticalButtton = 7;
//   paddingHorizontalButtton = 18;
// } else if (size === 'medium') {
//   paddingVerticalButtton = 8;
//   paddingHorizontalButtton = 18;
// } else {
//   paddingVerticalButtton = 10;
//   paddingHorizontalButtton = 18;
// }

import {handleReadableDate} from '../../utils';

const DateTimePicker = ({
  passAll,
  passHourAndMinutes,
  passHour,
  passMinutes,
  isEditModal,
  year,
  month,
  day,
  hour,
  minute,
  buttonStyle,
  fontSizeButton,
}) => {
  const {colors} = useTheme();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    isEditModal ? handleReadableDate(hour, minute) : 'Select time',
  );

  const [currentYear, setCurrentYear] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentDay, setCurrentDay] = useState();

  useEffect(() => {
    const curretnDate = new Date();
    setCurrentYear(curretnDate.getFullYear());
    setCurrentMonth(curretnDate.getMonth());
    setCurrentDay(curretnDate.getDate());
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    if (passAll) {
      passHourAndMinutes(date.getHours(), date.getMinutes());
    } else {
      passHour(date.getHours());
      passMinutes(date.getMinutes());
    }

    var dt = date;
    var h = dt.getHours(),
      m = dt.getMinutes();
    var time;
    if (h === 12) {
      time = m >= 0 && m <= 9 ? h + ':' + '0' + m + ' PM' : h + ':' + m + ' PM';
    } else {
      time =
        m >= 0 && m <= 9
          ? h > 12
            ? h - 12 + ':' + '0' + m + ' PM'
            : h + ':' + '0' + m + ' AM'
          : h > 12
          ? h - 12 + ':' + m + ' PM'
          : h + ':' + m + ' AM';
    }
    setSelectedTime(time);
    console.log(time);
    hideDatePicker();
  };

  return (
    <View>
      <CustomButton
        onPress={showDatePicker}
        content={
          <Text style={{color: colors.text, fontSize: fontSizeButton}}>
            {selectedTime}
          </Text>
        }
        styleBtn={buttonStyle}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={
          isEditModal
            ? passAll
              ? new Date(currentYear, currentMonth, currentDay, hour, minute)
              : new Date(year, month, day, hour, minute)
            : new Date(Date.now())
        }
        mode="time"
        format="kk:mm"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePicker;
