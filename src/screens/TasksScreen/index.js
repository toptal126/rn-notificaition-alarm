import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {useTheme} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CustomDrawerContent} from '../TasksScreen/DrawerContent';

import CalendarAndTasks from '../../components/Calendar';
import NewRoutine from './NewRoutine';
import Routine from './Routine';
import turnOffAlarm from './turnOffAlarm';
import taskPomodoro from './taskPomodoro';

// import CALYTAS from '../../components/Task/CalendarYTasks';

import I18n from '../../services/translation';

const TaskStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TaskStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <TaskStack.Navigator>
      <TaskStack.Screen
        name="Tasks"
        component={CalendarAndTasks}
        options={{
          headerLeft: () => (
            <MaterialCommunityIcons.Button
              name="menu"
              size={25}
              color={colors.text}
              onPress={() => navigation.toggleDrawer()}
              style={{backgroundColor: colors.background}}
            />
          ),
        }}
      />
      {/* <TaskStack.Screen
        name="NewRoutine"
        component={NewRoutine}
        options={{
          headerTitle: I18n.t('createRoutine'),
          headerBackTitleVisible: false,
        }}
      />
      <TaskStack.Screen
        name="Routine"
        component={Routine}
        options={{
          headerTitle: 'Update Routine',
          headerBackTitleVisible: false,
          // headerRight: () => (
          //   <AntDesign.Button
          //     name="edit"
          //     size={25}
          //     color={colors.text}
          //     onPress={() => alert('editar')}
          //     style={{backgroundColor: colors.background}}
          //   />
          // ),
          // headerStyle: {
          //   backgroundColor: 'blue',
          // },
          // headerTintColor: 'white',
        }}
      /> */}
      <TaskStack.Screen
        name="turnOffAlarm"
        component={turnOffAlarm}
        options={{
          headerTitle: 'TURN OFF ALARM!!!',
          headerBackTitleVisible: false,
        }}
      />
      <TaskStack.Screen
        name="taskPomodoro"
        component={taskPomodoro}
        options={{
          headerTitle: 'Pomodoro Task',
          headerBackTitleVisible: false,
        }}
      />
    </TaskStack.Navigator>
  );
};

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={{backgroundColor: 'red'}}>
//         <Text>MADREEEES</Text>
//       </View>
//     </DrawerContentScrollView>
//   );
// }

export const TaskDrawerScreen = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Test" component={TaskStackScreen} />
  </Drawer.Navigator>
);
