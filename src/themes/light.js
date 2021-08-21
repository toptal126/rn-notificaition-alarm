import {DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: 'black',
    text: 'black',
    otherDays: '#CDCDCD',
    modalWrapper: 'rgba(225, 225, 225, 0.7)',
    subModalWrapper: 'rgba(225, 225, 225, 0.6)',
    forms: '#ECECEC',
    tabBar: '#222326',
    linearNotificationBoxDesactivate: '#DBDBDB',
    textNotificationLinearBoxDesactivate: '#E9E9E9',
    textNotificationDesactivate: '#D2D2D2',
  },
};
