/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Switch, ScrollView} from 'react-native';

import I18n from '../../../services/translation';

import {useTheme} from '@react-navigation/native';

import DoneTaskSound from '../../../../assets/audio/notification_test.mp3';

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsContainer from '../../../components/SettingsContainer';

import SettingsOptionsContext from '../../../contexts/SettingsOptionsContext';

import {
  storeSettingsData,
  getSettingsData,
  removeSettingsData,
  handleSound,
} from '../../../utils';

const TasksSettings = () => {
  const {colors} = useTheme();

  const [dropDownValue, setDropDownValue] = useState(DoneTaskSound);

  const [deleteExpiredTasksSwitch, setDeleteExpiredTasksSwitch] = useState(
    true,
  );
  const [doneTaskSoundSwitch, setDoneTaskSoundSwitch] = useState(true);
  const [deleteTaskSoundSwitch, setDeleteTaskSoundSwitch] = useState(true);
  const [doneTaskAnimationSwitch, setDoneTaskAnimationSwitch] = useState(true);

  const {
    deleteExpired,
    setDeleteExpired,
    soundDone,
    setSoundDone,
    soundDelete,
    setSoundDelete,
    animationDone,
    setAnimationDone,
  } = useContext(SettingsOptionsContext);

  useEffect(() => {
    console.log('sound Done', soundDone);

    if (soundDone) {
      storeSettingsData('soundDone', 'true');
      getSettingsData('soundDone', () => {
        setDoneTaskSoundSwitch(true);
        setSoundDone(true);
      });
    } else {
      removeSettingsData('soundDone');
      getSettingsData('soundDone', () => {
        setDoneTaskSoundSwitch(false);
        setSoundDone(false);
      });
    }
  }, [soundDone, setSoundDone]);

  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <SettingsContainer
          mainContent={<Text>{I18n.t('expiredTasks')}</Text>}
          rightContent={
            <Switch
              value={deleteExpiredTasksSwitch}
              onValueChange={() => {
                setDeleteExpired(!deleteExpired);
                setDeleteExpiredTasksSwitch(!deleteExpiredTasksSwitch);
              }}
            />
          }
          disablePress={true}
        />

        <SettingsContainer
          mainContent={<Text>{I18n.t('soundDoneTask')}</Text>}
          rightContent={
            <Switch
              value={doneTaskSoundSwitch}
              onValueChange={(value) => {
                setSoundDone(!soundDone);
                setDoneTaskSoundSwitch(!doneTaskSoundSwitch);
              }}
            />
          }
          disablePress={true}
          settingsGroup={true}
          borderRadiusTop={10}
          customMargin={true}
          marginTop={20}
          marginBottom={0}
        />

        <SettingsContainer
          mainContent={<Text>{I18n.t('soundDeleteTask')}</Text>}
          rightContent={
            <Switch
              value={deleteTaskSoundSwitch}
              onValueChange={() =>
                setDeleteTaskSoundSwitch(!deleteTaskSoundSwitch)
              }
            />
          }
          disablePress={true}
          settingsGroup={true}
          customMargin={true}
          marginTop={0}
          marginBottom={0}
        />
        <SettingsContainer
          mainContent={<Text>{I18n.t('doneTaskAnimation')}</Text>}
          rightContent={
            <Switch
              value={doneTaskAnimationSwitch}
              onValueChange={() =>
                setDoneTaskAnimationSwitch(!doneTaskAnimationSwitch)
              }
            />
          }
          disablePress={true}
          settingsGroup={true}
          borderRadiusBottom={10}
          customMargin={true}
          marginTop={0}
          marginBottom={20}
        />

        {soundDone ? (
          <Text
            style={{alignSelf: 'flex-start', marginLeft: 19, color: '#B0B0B0'}}>
            Done Task sound
          </Text>
        ) : null}
        {soundDone ? (
          <DropDownPicker
            defaultValue={dropDownValue}
            onChangeItem={(item) => {
              setDropDownValue(item.value);
              handleSound(item.value);
            }}
            items={[
              {
                label: I18n.t('doneTaskSound1'),
                value: DoneTaskSound,
              },
              {
                label: I18n.t('doneTaskSound2'),
                value: DoneTaskSound,
              },
              {
                label: I18n.t('doneTaskSound3'),
                value: DoneTaskSound,
              },
            ]}
            style={{
              borderWidth: 0,
              backgroundColor: colors.forms,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            containerStyle={{
              height: 64,
              alignSelf: 'center',
              width: '92%',
              marginTop: 5,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
              paddingVertical: 10,
            }}
            dropDownStyle={{
              backgroundColor: colors.forms,
              borderWidth: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            // activeLabelStyle={{color: 'red'}}
            // selectedLabelStyle={{
            //   color: '#39739d',
            //   backgroundColor: 'red',
            // }}
            // labelStyle={{
            //   fontSize: 14,
            //   textAlign: 'center',
            //   color: 'red',
            // }}
            arrowColor={colors.text}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default TasksSettings;
