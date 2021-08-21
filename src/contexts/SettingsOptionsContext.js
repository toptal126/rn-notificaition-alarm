import {createContext} from 'react';

const SettingsOptionsContext = createContext({
  deleteExpired: true,
  setDeleteExpired: (value) => {},
  soundDone: true,
  setSoundDone: (value) => {},
  soundDelete: true,
  setSoundDelete: (value) => {},
  animationDone: true,
  setAnimationDone: (value) => {},
  issues: null,
  setIssues: (value) => {},
  dark: false,
  setDark: (value) => {},
  auth: false,
  setAuth: (value) => {},
});

export default SettingsOptionsContext;
