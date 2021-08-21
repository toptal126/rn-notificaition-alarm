import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Settings, Account, TasksSettings} from './ScreensComponents';

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Account" component={Account} />
      <SettingsStack.Screen name="Tasks Settings" component={TasksSettings} />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackScreen;
