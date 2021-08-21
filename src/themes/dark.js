import {DarkTheme} from '@react-navigation/native';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    primary: 'white',
    text: 'white',
    otherDays: '#383838',
    modalWrapper: 'rgba(1, 1, 1, 0.8)',
    subModalWrapper: 'rgba(1, 1, 1, 0.5)',
    forms: 'black',
    tabBar: '#222326',
    linearNotificationBoxDesactivate: '#262626',
    textNotificationLinearBoxDesactivate: '#404040',
    textNotificationDesactivate: '#424242',
  },
};
