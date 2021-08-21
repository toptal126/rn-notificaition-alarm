import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {useTheme} from '@react-navigation/native';

import jwt_decode from 'jwt-decode';

import SettingsOptionsContext from '../../../contexts/SettingsOptionsContext';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import SettingsContainer from '../../../components/SettingsContainer';

import {
  removeSettingsEncryptedData,
  getSettingsEncryptedData,
} from '../../../utils';

const Account = ({navigation}) => {
  const {colors} = useTheme();

  const [userName, setUserName] = useState('Carlos V');
  const [email, setEmail] = useState('');

  const {auth, setAuth} = useContext(SettingsOptionsContext);

  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    getSettingsEncryptedData('userToken', (value) => {
      value ? setAuth(true) : setAuth(false);
      console.log('token en account:', value);
      var decoded = jwt_decode(value);
      console.log(decoded);
      setEmail(decoded.email);
    });
  }, [auth, setAuth]);

  const handleOut = () => {
    setAuthLoading(true);

    setTimeout(() => {
      removeSettingsEncryptedData('userToken');
      setAuthLoading(false);
      setAuth(false);
      navigation.navigate('Settings');
    }, 4000);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={90}
            color="#B0B0B0"
          />
        </View>
        <View
          style={{
            //   backgroundColor: 'green',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{alignSelf: 'flex-start', marginLeft: 19, color: '#B0B0B0'}}>
            Name
          </Text>
          <SettingsContainer
            disablePress={false}
            textInput={true}
            inputVerticalPadding={15}
            inputHorizontalPadding={25}
            mainContent={
              <TextInput
                value={userName}
                onChangeText={(value) => setUserName(value)}
                style={{height: 25, backgroundColor: 'transparent'}}
              />
            }
            customMargin={true}
            marginTop={5}
            marginBottom={30}
          />
          <Text
            style={{alignSelf: 'flex-start', marginLeft: 19, color: '#B0B0B0'}}>
            Email
          </Text>
          <SettingsContainer
            disablePress={true}
            inputVerticalPadding={15}
            inputHorizontalPadding={25}
            mainContent={<Text>{email}</Text>}
            customMargin={true}
            marginTop={5}
            marginBottom={30}
          />
        </View>
        {/* <SettingsContainer
          leftContent={<Entypo name="log-out" color={colors.text} size={18} />}
          mainContent={<Text>Log Out</Text>}
          onPress={() => removeSettingsData('userToken')}
        /> */}
        <SettingsContainer
          leftContent={
            <MaterialCommunityIcons
              name="delete-alert-outline"
              color={colors.text}
              size={20}
            />
          }
          mainContent={<Text>Delete Account</Text>}
          onPress={() => Alert.alert('you sure?')}
        />
        {auth ? (
          <SettingsContainer
            leftContent={
              <Entypo name="log-out" color={colors.text} size={18} />
            }
            mainContent={
              auth ? (
                authLoading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={{color: colors.text}}>Log Out</Text>
                )
              ) : (
                <Ionicons name="checkmark-outline" color="white" size={30} />
              )
            }
            onPress={handleOut}
            customMargin={true}
            marginTop={40}
            marginBottom={15}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'red',
    height: '100%',
    paddingVertical: 80,
  },
});

export default Account;
