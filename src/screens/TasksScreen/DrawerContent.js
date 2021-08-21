/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {useTheme, useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';
import AddButton from '../../components/AddButton';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import I18n from '../../services/translation';
import getRealm from '../../services/realm';

import Dialog from 'react-native-dialog';

import {responsive, showAlert} from '../../utils';

const size = responsive();

export function CustomDrawerContent(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [filters, setFilters] = useState('');

  const [filterNameTextInput, setFilterNameTextInput] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const handleGetUsersFilters = async () => {
      const realm = await getRealm();

      const foundFilters = realm.objects('Filter');

      setFilters(foundFilters);
    };
    handleGetUsersFilters();
  }, []);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleCreateAndSaveNewFilter = async (name) => {
    const data = {
      id: uuidv4(),
      name: name,
    };

    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('Filter', data);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setFilters(realm.objects('Filter'));
    handleCancel();
  };

  const hanleDeleteFilter = async (filterId) => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const foundFilter = realm.objectForPrimaryKey('Filter', filterId);

        realm.delete(foundFilter);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setFilters(realm.objects('Filter'));
  };

  let drawerTitleFontSize;
  let newRoutineTextSize;
  let newRoutineIconSize;

  if (size === 'small') {
    drawerTitleFontSize = 12;
    newRoutineTextSize = 11;
    newRoutineIconSize = 15;
  } else if (size === 'medium') {
    drawerTitleFontSize = 14;
    newRoutineTextSize = 13;
    newRoutineIconSize = 17;
  } else {
    drawerTitleFontSize = 16;
    newRoutineTextSize = 15;
    newRoutineIconSize = 20;
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignSelf: 'center'}}>
        <Text style={{color: colors.text, fontSize: drawerTitleFontSize}}>
          {/* {I18n.t('yourRoutines')} */}
          Your Filters
        </Text>
      </View>
      <AddButton
        customButton={
          <View
            style={{
              marginTop: 9,
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
              backgroundColor: colors.forms,
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: newRoutineTextSize,
                marginRight: 5,
              }}>
              {/* {I18n.t('newRoutine')} */}
              New Filter
            </Text>
            <AntDesign
              name="pluscircleo"
              color={colors.text}
              size={newRoutineIconSize}
            />
          </View>
        }
        onPress={() => {
          showDialog();
          setFilterNameTextInput('');
        }}
      />

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>New Filter</Dialog.Title>
        <Dialog.Description>Filter Name</Dialog.Description>
        <Dialog.Input
          autoFocus
          placeholder="Filter Name Ex; Workout"
          value={filterNameTextInput}
          onChangeText={(text) => setFilterNameTextInput(text)}
        />
        <Dialog.Button color="gray" label="Cancel" onPress={handleCancel} />
        <Dialog.Button
          label="Create"
          onPress={() => {
            filterNameTextInput.length === 0
              ? Alert.alert('Escribre un nombre')
              : handleCreateAndSaveNewFilter(filterNameTextInput);
          }}
        />
      </Dialog.Container>
      {/* <DrawerItem
        label="Rutina Ejemplo"
        inactiveTintColor={colors.text}
        inactiveBackgroundColor={colors.forms}
      />
      <DrawerItem
        label="FIN DE SEMANA"
        inactiveTintColor={colors.text}
        inactiveBackgroundColor={colors.forms}
      /> */}
      <View style={{padding: 5}}>
        <FlatList
          data={filters}
          numColumns={1}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            // <DrawerItem
            //   label={item.name}
            //   inactiveTintColor={colors.text}
            //   inactiveBackgroundColor={colors.forms}
            // />
            <Button
              customDisable={true}
              content={
                <View
                  style={{
                    // backgroundColor: 'green',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'red',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="filter" color={colors.text} size={18} />
                    <Text style={{color: colors.text, marginLeft: 4}}>
                      {item.name}
                    </Text>
                  </View>
                  <Button
                    onPress={() =>
                      showAlert(
                        'Eiminar Filtro',
                        '¿Deseas eliminar permanentemente este Filtro?',
                        () => {
                          console.log('cancelado');
                        },
                        () => {
                          console.log('eliminado');
                          hanleDeleteFilter(item.id);
                        },
                      )
                    }
                    content={
                      <FontAwesome name="trash" color={colors.text} size={22} />
                    }
                  />
                </View>
              }
              styleBtn={{
                backgroundColor: colors.forms,
                marginVertical: 6,
                marginHorizontal: 8,
                paddingHorizontal: 9,
                paddingVertical: 13,
                borderRadius: 5,
              }}
            />
            // <TouchableOpacity
            //   onPress={() => {}}
            //   style={{
            //     backgroundColor: colors.forms,
            //     marginVertical: 6,
            //     marginHorizontal: 8,
            //     paddingHorizontal: 9,
            //     paddingVertical: 13,
            //     borderRadius: 5,
            //   }}>
            //   <Text style={{color: colors.text}}>{item.name}</Text>

            //   <Text style={{color: colors.text}}>
            //     {item.tasks.map((item2) =>
            //       handleReadableDate(item2.soundHour, item2.soundMinute),
            //     )}
            //   </Text>
            //   <Text style={{fontSize: 12, color: colors.text}}>
            //     Empieza a las
            //   </Text>
            // </TouchableOpacity>
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
}
