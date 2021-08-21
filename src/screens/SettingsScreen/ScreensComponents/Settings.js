/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  AppState,
  ScrollView,
  Switch,
  Linking,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
  FlatList,
} from 'react-native';

//¡¡TODOOOO!!!! REFACTORIZAR FUNCIONES Y COMPONENTES FUNCIONALES EN SUS PROPIOS ARCHIVOS Y ASI CON GO ETC
import I18n from '../../../services/translation';

import {checkNotifications, openSettings} from 'react-native-permissions';

import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

import axios from 'axios';

import Button from '../../../components/Button';
import BottomModal from '../../../components/BottomModal';
import SettingsContainer from '../../../components/SettingsContainer';

import SettingsOptionsContext from '../../../contexts/SettingsOptionsContext';

import {
  storeSettingsData,
  getSettingsData,
  removeSettingsData,
  getSettingsEncryptedData,
  storeSettingsEncryptedData,
  showAyncStorageData,
} from '../../../utils';
import PushNotification from 'react-native-push-notification';

const SettingsContent = ({navigation}) => {
  const {colors} = useTheme();

  const [notifications, setNotifications] = useState(null);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [reload, setReload] = useState(false);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      setReload(true);
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
    setReload(false);
  };

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [viewPassword, setViewPassword] = useState(false);

  const [authLoading, setAuthLoading] = useState(false);

  const handleAuth = async () => {
    const SIGNIN_URI = 'https://pro-serv-test.herokuapp.com/api/login';

    const data = {
      email: email,
      password: password,
    };

    try {
      setAuthLoading(true);
      const signinRes = await axios.post(SIGNIN_URI, data);

      if (signinRes.data) {
        setAuthLoading(false);
        console.log(signinRes.data);
        storeSettingsEncryptedData('userToken', signinRes.data.pass);
        console.log('el token bro:', signinRes.data.pass);
        console.log('simon');
        setAuth(true);
        loginrefBottomModal.current.close();
      }
    } catch (error) {
      // if (error.response.data) {
      //   setAuthLoading(false);
      //   console.log('ERR REGISTER', error.response.data);
      // } else {
      //   Alert.alert(error.response.data);
      // }
      setAuthLoading(false);
      console.log('ERR REGISTER', error.response.data.message);
      Alert.alert(error.response.data.message);
    }
  };

  // const handleOut = () => {
  //   setAuthLoading(true);
  //   removeSettingsEncryptedData('userToken');

  //   setTimeout(() => {
  //     setAuthLoading(false);
  //     setAuth(false);
  //     setUserToken(false);
  //   }, 4000);
  // };

  const loginrefBottomModal = useRef();
  const signinrefBottomModal = useRef();

  const loginModal = () => {
    return (
      <BottomModal
        openModal={loginrefBottomModal}
        wrapperColor={colors.subModalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={840}
        borderRadiusTop={10}
        keyBoardPushContent={false}
        closeDragDown={false}
        content={
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                // backgroundColor: 'red',
                padding: 15,
              }}>
              <AntDesign
                onPress={() => loginrefBottomModal.current.close()}
                name="close"
                color={colors.text}
                size={30}
              />
            </View>
            <View
              style={{
                // backgroundColor: 'blue',
                height: '87%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <View
                  style={{
                    marginBottom: 50,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons name="school" color={colors.text} size={45} />
                  <Text
                    style={{
                      fontSize: 38,
                      marginLeft: 4,
                      fontWeight: 'bold',
                      color: colors.text,
                    }}>
                    Skool
                  </Text>
                </View>

                <View>
                  <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Email"
                    placeholderTextColor="#ADADAF"
                    style={{
                      backgroundColor: colors.forms,
                      color: colors.text,
                      paddingVertical: 15,
                      paddingHorizontal: 25,
                      width: 370,
                      height: 65,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                  <TextInput
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder="Password"
                    placeholderTextColor="#ADADAF"
                    secureTextEntry={viewPassword ? false : true}
                    style={{
                      backgroundColor: colors.forms,
                      color: colors.text,
                      paddingVertical: 15,
                      paddingHorizontal: 25,
                      width: 370,
                      height: 65,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />

                  {viewPassword ? (
                    <Ionicons
                      name="eye-off-outline"
                      color="#ADADAF"
                      size={15}
                      style={{bottom: 50, left: 330}}
                      onPress={() => setViewPassword(!viewPassword)}
                    />
                  ) : (
                    <Ionicons
                      name="eye-outline"
                      color="#ADADAF"
                      size={15}
                      style={{bottom: 50, left: 330}}
                      onPress={() => setViewPassword(!viewPassword)}
                    />
                  )}

                  <Button
                    onPress={() => {}}
                    content={
                      <Text style={{alignSelf: 'flex-end', color: colors.text}}>
                        Forgot Password ?
                      </Text>
                    }
                  />

                  <Button
                    onPress={() => {
                      email.length && password.length > 0
                        ? handleAuth()
                        : Alert.alert(
                            'Introduce un Correo y Contraseña Validos',
                          );
                    }}
                    content={
                      auth ? (
                        <Ionicons
                          name="checkmark-outline"
                          color="white"
                          size={30}
                        />
                      ) : authLoading ? (
                        <ActivityIndicator size="small" />
                      ) : (
                        <Text>Log in</Text>
                      )
                    }
                    styleBtn={{
                      backgroundColor: 'lightblue',
                      alignItems: 'center',
                      alignSelf: 'center',
                      paddingVertical: 20,
                      borderRadius: 10,
                      width: '95%',
                      marginTop: 30,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // backgroundColor: 'yellow',
                      marginTop: 40,
                    }}>
                    <Text style={{color: colors.text, marginRight: 4}}>
                      Don't have an account?
                    </Text>
                    <Button
                      onPress={() => {
                        signinrefBottomModal.current.open();
                      }}
                      content={<Text style={{color: 'purple'}}>Sign In</Text>}
                    />
                  </View>
                </View>
              </View>
            </View>
            {signinModal()}
          </View>
        }
      />
    );
  };

  const signinModal = () => {
    return (
      <BottomModal
        openModal={signinrefBottomModal}
        wrapperColor={colors.subModalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={840}
        borderRadiusTop={10}
        keyBoardPushContent={false}
        closeDragDown={false}
        content={
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                // backgroundColor: 'red',
                padding: 15,
              }}>
              <AntDesign
                onPress={() => signinrefBottomModal.current.close()}
                name="close"
                color={colors.text}
                size={30}
              />
            </View>
            <View
              style={{
                // backgroundColor: 'blue',
                height: '87%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <View
                  style={{
                    marginBottom: 50,
                    // backgroundColor: 'pink',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons name="school" color={colors.text} size={45} />
                  <Text
                    style={{fontSize: 38, marginLeft: 4, fontWeight: 'bold'}}>
                    Skool
                  </Text>
                </View>

                <View>
                  <TextInput
                    value={userName}
                    onChangeText={(value) => setUserName(value)}
                    placeholder="Name"
                    style={{
                      backgroundColor: colors.forms,
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      width: 370,
                      height: 65,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                  <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Email"
                    style={{
                      backgroundColor: colors.forms,
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      width: 370,
                      height: 65,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />
                  <TextInput
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder="Password"
                    secureTextEntry={viewPassword ? false : true}
                    style={{
                      backgroundColor: colors.forms,
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      width: 370,
                      height: 65,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                  />

                  {viewPassword ? (
                    <Ionicons
                      name="eye-off-outline"
                      color="gray"
                      size={15}
                      style={{bottom: 50, left: 300}}
                      onPress={() => setViewPassword(!viewPassword)}
                    />
                  ) : (
                    <Ionicons
                      name="eye-outline"
                      color="gray"
                      size={15}
                      style={{bottom: 50, left: 300}}
                      onPress={() => setViewPassword(!viewPassword)}
                    />
                  )}

                  <Button
                    onPress={() => {}}
                    content={
                      <Text style={{alignSelf: 'flex-end'}}>
                        Forgot Password ?
                      </Text>
                    }
                  />

                  <Button
                    onPress={() => {
                      handleAuth();
                    }}
                    content={
                      auth ? (
                        <AntDesign name="checkcircle" color="white" size={30} />
                      ) : authLoading ? (
                        <ActivityIndicator size="small" />
                      ) : (
                        <Text>Sign in</Text>
                      )
                    }
                    styleBtn={{
                      backgroundColor: 'lightblue',
                      alignItems: 'center',
                      alignSelf: 'center',
                      paddingVertical: 20,
                      borderRadius: 10,
                      width: '95%',
                      marginTop: 30,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      // backgroundColor: 'yellow',
                      marginTop: 40,
                    }}>
                    <Text style={{marginRight: 4}}>Have an account?</Text>
                    <Button
                      onPress={() => signinrefBottomModal.current.close()}
                      content={<Text style={{color: 'purple'}}>Sign In</Text>}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        }
      />
    );
  };

  const {issues, setIssues, dark, setDark, auth, setAuth} = useContext(
    SettingsOptionsContext,
  );

  const [switchTheme, setSwitchTheme] = useState(null);

  // useEffect(() => {
  //   userToken ? getSettingsData('userToken') : console.log('CERRASTE SESION');
  // }, [userToken]);

  useEffect(() => {
    getSettingsEncryptedData('userToken', (value) => {
      value ? setAuth(true) : setAuth(false);
    });
    showAyncStorageData();
  }, [auth, setAuth]);

  useEffect(() => {
    getSettingsData('darkTheme', (value) => {
      console.log('el dark', value);
      if (value === 'true') {
        setSwitchTheme(true);
        setDark(true);
      } else {
        setSwitchTheme(false);
        setDark(false);
      }
    });
  }, [dark, setDark]);

  useEffect(() => {
    checkNotifications().then(({status, settings}) => {
      if (status === 'granted') {
        setNotifications(true);
      } else {
        setNotifications(false);
      }
    });
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [reload, issues, setIssues]);

  useEffect(() => {
    const handleIssues = () => {
      if (notifications && auth) {
        setIssues(false);
        removeSettingsData('issues'); //esto para el async de notis
      } else {
        setIssues(true);
        storeSettingsData('issues', 'true');
      }
    };
    handleIssues();
  }, [notifications, auth, setIssues]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        {/* <SettingsContainer
          leftContent={<AntDesign name="user" color={colors.text} size={20} />}
          mainContent={
            auth ? (
              <Text style={{color: colors.text}}>My Account</Text>
            ) : (
              <Text style={{color: colors.text}}>{I18n.t('login')}</Text>
            )
          }
          rightContent={
            auth ? (
              <Entypo
                name="chevron-small-right"
                color={colors.text}
                size={20}
              />
            ) : (
              <MaterialIcons name="error" color="red" size={20} />
            )
          }
          onPress={() => {
            if (auth) {
              navigation.navigate('Account');
            } else {
              setEmail('');
              setPassword('');
              loginrefBottomModal.current.open();
            }
          }}
        />
        {loginModal()} */}

        {/* <SettingsContainer
          leftContent={
            <MaterialIcons name="bar-chart" color={colors.text} size={20} />
          }
          mainContent={<Text style={{color: colors.text}}>Your Advance</Text>}
          rightContent={
            <Entypo name="chevron-small-right" color={colors.text} size={20} />
          }
          onPress={() => Alert.alert('advance')}
        /> */}

        <SettingsContainer
          mainContent={
            notifications ? (
              <Text style={{color: colors.text}}>Notifications settings</Text>
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: colors.text}}>Activate Notifications</Text>
                <MaterialIcons name="error" color="red" size={20} />
              </View>
            )
          }
          rightContent={
            notifications ? (
              <Entypo
                name="chevron-small-right"
                color={colors.text}
                size={20}
              />
            ) : (
              <FontAwesome name="external-link" color={colors.text} size={18} />
            )
          }
          onPress={() =>
            notifications ? Alert.alert('settings') : openSettings()
          }
        />

        <SettingsContainer
          mainContent={<Text style={{color: colors.text}}>Dark Theme</Text>}
          rightContent={
            <Switch
              value={switchTheme}
              onValueChange={(value) => {
                setDark(!dark);
                value
                  ? storeSettingsData('darkTheme', 'true')
                  : removeSettingsData('darkTheme');
              }}
            />
          }
          disablePress={true}
        />

        <SettingsContainer
          mainContent={<Text style={{color: colors.text}}>Tasks Settings</Text>}
          rightContent={
            <Entypo name="chevron-small-right" color={colors.text} size={20} />
          }
          onPress={() => navigation.navigate('Tasks Settings')}
        />

        <SettingsContainer
          leftContent={<FontAwesome name="star" color="orange" size={18} />}
          mainContent={
            Platform.OS === 'ios' ? (
              <Text style={{color: 'green'}}>Rate us On App Store</Text>
            ) : (
              <Text style={{color: colors.text}}>Rate us On PlayStore</Text>
            )
          }
          rightContent={
            <FontAwesome name="external-link" color={colors.text} size={18} />
          }
          onPress={() =>
            Linking.openURL('https://reactnative.dev/docs/linking')
          }
          settingsGroup={true}
          borderRadiusTop={10}
          customMargin={true}
          marginTop={20}
          marginBottom={0}
        />

        <SettingsContainer
          leftContent={
            <FontAwesome name="instagram" color={colors.text} size={20} />
          }
          mainContent={<Text style={{color: colors.text}}>Instagram</Text>}
          rightContent={
            <FontAwesome name="external-link" color={colors.text} size={18} />
          }
          onPress={() => Alert.alert('insta')}
          settingsGroup={true}
          borderRadiusBottom={10}
          customMargin={true}
          marginTop={0}
          marginBottom={20}
        />

        <SettingsContainer
          leftContent={
            <Ionicons
              name="help-circle-outline"
              color={colors.text}
              size={20}
            />
          }
          mainContent={<Text style={{color: colors.text}}>Help</Text>}
          rightContent={
            <Entypo name="chevron-small-right" color={colors.text} size={20} />
          }
          onPress={() => Alert.alert('help')}
        />

        <SettingsContainer
          leftContent={
            <AntDesign name="question" color={colors.text} size={20} />
          }
          mainContent={
            <Text style={{color: colors.text}}>Questions and Answers</Text>
          }
          rightContent={
            <Entypo name="chevron-small-right" color={colors.text} size={20} />
          }
          onPress={() => Alert.alert('Q/A')}
        />

        <SettingsContainer
          leftContent={
            <MaterialIcons name="privacy-tip" color={colors.text} size={20} />
          }
          mainContent={<Text style={{color: colors.text}}>Privacy</Text>}
          rightContent={
            <Entypo name="chevron-small-right" color={colors.text} size={20} />
          }
          onPress={() => Alert.alert('ols')}
        />
        {/*
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
        ) : null} */}
      </View>
    </ScrollView>
  );
};

export default SettingsContent;
