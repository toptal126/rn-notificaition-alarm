import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Routines from '././ScreenComponents/Routines';
import RoutineId from './ScreenComponents/RoutineId';
import RoutinesCommunity from './ScreenComponents/RoutinesCommunity';
import UserRoutinesProfile from './ScreenComponents/UserRoutinesProfile';

const RoutinesStack = createStackNavigator();

const RoutinesStackScreen = () => {
  return (
    <RoutinesStack.Navigator>
      <RoutinesStack.Screen name="Routines" component={Routines} />
      <RoutinesStack.Screen
        name="RoutineId"
        component={RoutineId}
        options={{headerShown: true}}
      />
      <RoutinesStack.Screen
        name="Community"
        component={RoutinesCommunity}
        options={{headerShown: false}}
      />
      <RoutinesStack.Screen
        name="UserRoutinesProfile"
        component={UserRoutinesProfile}
        options={{headerShown: false}}
      />
    </RoutinesStack.Navigator>
  );
};

export default RoutinesStackScreen;
