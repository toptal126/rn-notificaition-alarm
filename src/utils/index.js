import {Dimensions, Alert} from 'react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import PushNotification from 'react-native-push-notification';
import I18n from '../services/translation';

export const responsive = () => {
  const windowWidth = Dimensions.get('window').width;
  if (windowWidth === 320) {
    return 'small';
  } else if (windowWidth === 414) {
    return 'large';
  }
  return 'medium';
};

export const storeSettingsEncryptedData = async (storageKey, value) => {
  try {
    await EncryptedStorage.setItem(storageKey, value);
  } catch (error) {
    console.log('ERR', error);
  }
};

export const getSettingsEncryptedData = async (storageKey, callback) => {
  try {
    const foundValue = await EncryptedStorage.getItem(storageKey);
    console.log('valor encontrado:', foundValue);
    callback(foundValue);
  } catch (error) {
    console.log('ERR', error);
  }
};

export const removeSettingsEncryptedData = async (storageKey) => {
  try {
    const removed = await EncryptedStorage.removeItem(storageKey);

    if (removed) {
      console.log('eliminado');
    } else {
      console.log('auh no');
    }
  } catch (error) {
    console.log('ERR', error);
  }
};

export const storeSettingsData = async (storageKey, value) => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (error) {
    console.log('ERR', error);
  }
};

export const getSettingsData = async (storageKey, callback) => {
  try {
    const foundValue = await AsyncStorage.getItem(storageKey);
    console.log('valor encontrado:', foundValue);
    callback(foundValue);
  } catch (error) {
    console.log('ERR', error);
  }
};

export const removeSettingsData = async (storageKey) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    console.log('ERR', error);
  }
};

export const showAyncStorageData = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  console.log(keys);
};

// export const storeMultiData = async (storageKey, arrayKeys) => {
//   try {
//     await AsyncStorage.multiSet()
//   } catch (error) {
//   }
// }

export const handleSound = (sound) => {
  Sound.setCategory('Playback');
  var whoosh = new Sound(sound, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    whoosh.setVolume(2);
    whoosh.play();
  });
};

export const loopSound = (sound) => {
  Sound.setCategory('Playback');
  var whoosh = new Sound(sound, (error) => {
    if (error) {
      console.log('failed to loop the sound', error);
      return null;
    }
    whoosh.setNumberOfLoops(-1);
    whoosh.setVolume(2);
  });
  return whoosh;
};

export const handleReadableDate = (hour, minute) => {
  var h = hour,
    m = minute;
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
  return time;
};

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const courseColors = [
  {color1: '#007CE0', color2: '#00DAC2', position: 0},
  {color1: '#1907BC', color2: '#8013BD', position: 1},
  {color1: '#F8404C', color2: '#FD2E92', position: 2},
  {color1: '#F747E5', color2: '#7647FC', position: 3},
  {color1: '#0031E0', color2: '#021195', position: 4},
  {color1: '#BD00FF', color2: '#2C0057', position: 5},
  {color1: '#FF7532', color2: '#E8207A', position: 6},
  {color1: '#00FFC1', color2: '#02E3C5', position: 7},
];

export const routinesColors = [
  {color1: '#0B6DF6', color2: '#003BDC', position: 0},
  {color1: '#7A0DE5', color2: '#BE2DFD', position: 1},
  {color1: '#FF7D34', color2: '#FFAD80', position: 2},
  {color1: '#00FFC1', color2: '#1E95A8', position: 3},
  {color1: '#A1D8F7', color2: '#003BDC', position: 4},
  {color1: '#FF0085', color2: '#D55CFF', position: 5},
  {color1: '#FF7532', color2: '#E8207A', position: 6},
  {color1: '#00FFC1', color2: '#02E3C5', position: 7},
];

export const icons = [
  {iconCode: 'bus', name: 'bus'},
  {iconCode: 'cake', name: 'cake'},
  {iconCode: 'cards-heart', name: 'heart'},
  {iconCode: 'cart', name: 'cart'},
  {iconCode: 'carrot', name: 'carrot'},
  {iconCode: 'cash-multiple', name: 'cash'},
  {iconCode: 'cellphone', name: 'phone'},
  {iconCode: 'chat', name: 'chat'},
  {iconCode: 'chef-hat', name: 'chef'},
  {iconCode: 'church', name: 'church'},
  {iconCode: 'cigar-off', name: 'cigar'},
  {iconCode: 'console', name: 'console'},
];

export const tasksSortSelector = [
  {label: I18n.t('sortTime'), value: '0'},
  {label: I18n.t('sortImportance'), value: '1'},
];

export const sortOrder = ['#F22C50', '#FFD25F', '#14D378'];

export const alarmOrNotificationOptions = [
  {label: I18n.t('notification'), value: 0},
  {label: I18n.t('alarm'), value: 1},
];

export const importanceAndColorOptions = [
  {label: 'Low', value: '#14D378', activeColor: '#14D378'},
  {label: 'Half', value: '#FFD25F', activeColor: '#FFD25F'},
  {label: 'High', value: '#F22C50', activeColor: '#F22C50'},
];

export const notificationsRepetition = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  // {label: '4', value: 4},
  // {label: '5', value: 5},
];

export const handleNotification = (title, msm) => {
  PushNotification.localNotification({
    title: title,
    message: msm,
  });
};

export const handleFuturePushNotification = function (
  title,
  msm,
  year,
  month,
  day,
  hour,
  minute,
  second,
) {
  PushNotification.localNotificationSchedule({
    title: title,
    message: msm,
    date: new Date(year, month, day, hour, minute),
    playSound: true,
    // soundName: 'alarm_sound.mp3',
  });
};

export const handleFuturePushNotificationAndAsyncStorageSystem = function (
  title,
  msm,
  year,
  month,
  day,
  hour,
  minute,
  second,
  storageKeyTEST,
  valueTEST,
) {
  PushNotification.localNotificationSchedule({
    title: title,
    message: msm,
    date: new Date(year, month, day, hour, minute, second),
  });
  console.log('ALARMITA'); //con esto conpruebo que no pasa esto despues de que suene la alarma
  // storeSettingsData(storageKeyTEST, valueTEST);
  //asyncstorage('notifPendiente', 'id de task');, si al abir la aplicacion esta notifPendiente Y ES LA HORA ACTUAL DE LA ALARMA, entonces mira cual es el id, buscalo, traelo de la DB, abri el modal y mostra sus datos, tambein con la alarm si esta la alarma entonces navigation.navigate('apagarAlarma') igual con el pomoTask navigation.navigate('pomodoro');
};

export const showAlert = (
  alertTitle,
  alertBody,
  cancelFunction,
  destructiveFunction,
  customText,
  customTextValue,
) =>
  Alert.alert(alertTitle, alertBody, [
    {text: 'Cancelar', style: 'cancel', onPress: () => cancelFunction()},
    {
      text: customText ? customTextValue : 'Eliminar',
      style: customText ? 'default' : 'destructive',
      onPress: () => destructiveFunction(),
    },
  ]);

export const handleRealmSaveData = () => {};
