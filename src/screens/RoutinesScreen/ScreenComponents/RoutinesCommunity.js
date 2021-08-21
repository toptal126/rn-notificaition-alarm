import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  FlatList,
  Keyboard,
} from 'react-native';

import Button from '../../../components/Button';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import LinearGradient from 'react-native-linear-gradient';

import {useTheme, useNavigation} from '@react-navigation/native';

import {
  courseColors,
  showAlert,
  responsive,
  routinesColors,
} from '../../../utils';

import axios from 'axios';

const RoutinesCommunity = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [userPressTextInput, setUserPressTextInput] = useState(false);
  const [userSearchTextInput, setUserSearchTextInput] = useState('');

  const [USERSTEST, setUSERSTEST] = useState([]);
  const [USEROVERGETTEST, setUSEROVERGETTEST] = useState(false);

  useEffect(() => {
    const getUsersTEST = async () => {
      const GETUSERSTEST_URI = 'https://randomuser.me/api/?results=80';
      try {
        const userRes = await axios.get(GETUSERSTEST_URI);
        setUSERSTEST(userRes.data.results);
        console.log('simon');
        return userRes;
      } catch (error) {
        console.log('ERR GET USER', error);
      }
    };
    getUsersTEST();
  }, [USEROVERGETTEST]);

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: 'lightblue',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: userPressTextInput ? 'space-evenly' : 'space-between',
          marginTop: 5,
        }}>
        {userPressTextInput ? null : (
          <Button
            onPress={() => {
              navigation.navigate('Routines');
            }}
            content={
              <Ionicons
                name="chevron-back-outline"
                size={35}
                color={colors.text}
              />
            }
            styleBtn={{
              backgroundColor: 'green',
            }}
          />
        )}
        <View
          style={{
            width: userPressTextInput ? '80%' : '90%',
          }}>
          <TextInput
            autoFocus={userPressTextInput ? true : false}
            placeholder="Search"
            value={userSearchTextInput}
            onChangeText={(value) => {
              setUserSearchTextInput(value);
            }}
            onFocus={() => setUserPressTextInput(true)}
            style={{
              backgroundColor: colors.forms,
              paddingVertical: 0,
              paddingHorizontal: 20,
              borderRadius: 100,
              width: '99%',
              height: 45,
            }}
          />
        </View>
        {userPressTextInput ? (
          <Button
            onPress={() => {
              setUserPressTextInput(false);
              setUserSearchTextInput('');
              Keyboard.dismiss();
            }}
            content={<Text>Cancel</Text>}
          />
        ) : null}
        {/* {searchIconPress ? (
        ) : null} */}
        {/* {searchIconPress ? null : (
          <Button
            onPress={() => setSearchIconPress(true)}
            content={
              <Entypo name="magnifying-glass" size={35} color={colors.text} />
            }
            styleBtn={{
              backgroundColor: 'red',
              marginRight: 5,
            }}
          />
        )} */}
      </View>
      {userPressTextInput ? (
        <View
          style={{
            backgroundColor: 'green',
            height: '100%',
            alignItems: 'center',
          }}>
          <Text>Busca personas</Text>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'lightgreen',
            height: '100%',
            paddingBottom: '20%',
          }}>
          <Button
            customDisable={true}
            // onPress={() => {}}
            styleBtn={{
              width: '100%',
              height: 100,
              backgroundColor: 'lightpink',
              padding: 25,
            }}
            content={
              <Text>
                Discover and use the routines of students around the world
              </Text>
            }
          />
          <FlatList
            data={USERSTEST}
            keyExtractor={(item) => item.login.uuid}
            numColumns={2}
            // scrollEnabled={true}
            refreshing={false}
            onRefresh={() => {
              console.log('iuiuh');
              setUSEROVERGETTEST(!USEROVERGETTEST);
            }}
            style={{
              backgroundColor: 'lightyellow',
              // height: '100%',
              // paddingBottom: 10,
            }}
            renderItem={({item}) => (
              <Button
                onPress={() =>
                  navigation.navigate('RoutineId', {
                    routineName: item.location.street.name,
                    routineDescription: item.location.timezone.description,
                    color_position: Number(String(item.dob.age).charAt(0)),
                    idRoutine: 'iuhy76y76f76',
                    otherUserRoutine: true,
                    userCreatorUserName: item.login.username,
                    userCreatorImgProfile: item.picture.large,
                    userCreatorFirstName: item.name.first,
                    userCreatorLastName: item.name.last,
                    imStudy: item.location.city,
                    routineTasks: [],
                  })
                }
                content={
                  <LinearGradient
                    colors={[
                      routinesColors[Number(String(item.dob.age).charAt(0))]
                        .color1,
                      routinesColors[Number(String(item.dob.age).charAt(0))]
                        .color2,
                    ]}
                    style={{borderRadius: 30}}>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        // alignItems: 'center',
                        height: 190,
                        width: 190,
                        // justifyContent: 'center',
                        padding: 20,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'lightblue',
                          width: '100%',
                        }}>
                        <View
                          style={{
                            backgroundColor: 'lightgray',
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: item.picture.large}}
                            style={{
                              width: 50,
                              height: 50,
                              // resizeMode: 'cover',
                              // position: 'absolute',
                              // top: '0%',
                              borderRadius: 100,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: 'white',
                            }}>
                            {item.name.first}
                          </Text>
                        </View>
                        <Text>{item.email}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                }
                styleBtn={{
                  marginLeft: 11,
                  marginTop: 15,
                }}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoutinesCommunity;
