import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  FlatList,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import I18n from '../../../services/translation';
import getRealm from '../../../services/realm';

import axios from 'axios';

import {BASE_URL} from '@env';

import Button from '../../../components/Button';
import AddButton from '../../../components/AddButton';
import BottomModal from '../../../components/BottomModal';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import LinearGradient from 'react-native-linear-gradient';

import {useTheme, useNavigation} from '@react-navigation/native';

import {Typography} from '../../../styles';

import {
  courseColors,
  showAlert,
  responsive,
  getSettingsEncryptedData,
  showAyncStorageData,
} from '../../../utils';

import jwt_decode from 'jwt-decode';

const size = responsive();

const Routines = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [userRoutines, setUserRoutines] = useState([]);

  const [routineId, setRoutineId] = useState('');
  const [routineNameInput, setRoutineNameInput] = useState('');
  const [routineDescriptionInput, setRoutineDescriptionInput] = useState('');
  const [selectedColorPosition, setSelectedColorPosition] = useState(0);
  const [privateRoutineSwitch, setPrivateRoutineSwitch] = useState(false);

  const [editRoutine, setEditRoutine] = useState(false);

  const inputredBottomModal = useRef();
  const editRoutineBottomModal = useRef();
  const deleteOrEditRoutineBottomModal = useRef();

  useEffect(() => {
    const handleGetUserRoutines = async () => {
      showAyncStorageData();
      console.log('backend base url', BASE_URL);
      getSettingsEncryptedData('userToken', async (value) => {
        console.log('el tokensito:', value);
        var decoded = jwt_decode(value);
        console.log(decoded.id);

        const GET_USER_ROUTINES_URI = `${BASE_URL}/api/users/${decoded.id}/routines`;
        try {
          const userRes = await axios.get(GET_USER_ROUTINES_URI, {
            headers: {Authorization: `Bearer ${value}`},
          });

          setUserRoutines(userRes.data);
          console.log('data:', userRes.data);
          return userRes;
        } catch (error) {
          console.log('ERR GET USER ROUTINES', error);
        }
      });
    };
    handleGetUserRoutines();
  }, []);

  const handleCreateAndSeveNewRoutine = async (
    name,
    des,
    color,
    publicRoutine,
  ) => {
    const data = {
      id: uuidv4(),
      name: name,
      description: des,
      colorPosition: color,
      public: publicRoutine,
    };

    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('Routine', data);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserRoutines(realm.objects('Routine'));

    inputredBottomModal.current.close();
  };

  const hanldeEditAndSaveRoutine = async (name, des, color, publicRoutine) => {
    const realm = await getRealm();

    const data = {
      id: routineId,
      name: name,
      description: des,
      colorPosition: color,
      public: publicRoutine,
    };
    try {
      realm.write(() => {
        realm.create('Routine', data, 'modified');
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserRoutines(realm.objects('Routine'));

    editRoutineBottomModal.current.close();
  };

  const handleDeleteRoutine = async () => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const foundRoutine = realm.objectForPrimaryKey('Routine', routineId);

        realm.delete(foundRoutine);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setUserRoutines(realm.objects('Routine'));

    deleteOrEditRoutineBottomModal.current.close();
  };

  const newRoutineModalKeyBoard = () => {
    return (
      <BottomModal
        openModal={inputredBottomModal}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={215}
        borderRadiusTop={10}
        closeDragDown={false}
        content={
          <View>
            <TextInput
              autoFocus
              value={routineNameInput}
              onChangeText={(value) => setRoutineNameInput(value)}
              placeholderTextColor="#ADADAF"
              placeholder="Routine Name Ex; For the Weekends"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => inputredBottomModal.current.close()}
              style={{
                backgroundColor: null,
                paddingHorizontal: 25,
                paddingVertical: 20,
                color: colors.text,
              }}
            />
            <TextInput
              autoFocus
              value={routineDescriptionInput}
              onChangeText={(value) => setRoutineDescriptionInput(value)}
              placeholderTextColor="#ADADAF"
              placeholder="Routine Description Ex; This Routine is when weekends.."
              enablesReturnKeyAutomatically
              onSubmitEditing={() => inputredBottomModal.current.close()}
              style={{
                backgroundColor: null,
                paddingHorizontal: 25,
                paddingVertical: 20,
                color: colors.text,
              }}
            />
            <FlatList
              data={courseColors}
              keyExtractor={(item) => item.color1}
              horizontal
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) =>
                item.position === selectedColorPosition ? (
                  <Button
                    onPress={() => {
                      setSelectedColorPosition(item.position);
                    }}
                    content={
                      <LinearGradient
                        colors={[item.color1, item.color2]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          height: 40,
                          borderRadius: 8,
                          borderWidth: 2.5,
                          borderColor: colors.text,
                        }}
                      />
                    }
                    styleBtn={{
                      backgroundColor: 'red',
                      width: 60,
                      marginHorizontal: 5,
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <Button
                    onPress={() => {
                      setSelectedColorPosition(item.position);
                    }}
                    content={
                      <LinearGradient
                        colors={[item.color1, item.color2]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          height: 40,
                          borderRadius: 8,
                          borderWidth: 2.5,
                          borderColor: colors.background,
                        }}
                      />
                    }
                    styleBtn={{
                      backgroundColor: 'red',
                      width: 60,
                      marginHorizontal: 5,
                      borderRadius: 8,
                    }}
                  />
                )
              }
            />
            <View
              style={{
                flexDirection: 'row',
                // alignSelf: editRoutine ? null : 'flex-end',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: null,
              }}>
              {editRoutine ? (
                <Button
                  onPress={() =>
                    showAlert(
                      'Eiminar Rutina',
                      '¿Deseas eliminar permanentemente tu Rutina y su contenido?',
                      () => {
                        console.log('cancelado');
                      },
                      () => {
                        console.log('eliminado');
                        handleDeleteRoutine();
                      },
                    )
                  }
                  content={
                    <MaterialCommunityIcons
                      name="delete-circle"
                      size={35}
                      color="red"
                    />
                  }
                />
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '40%',
                  justifyContent: 'space-between',
                }}>
                <Text>Private Routine</Text>
                <Switch
                  value={privateRoutineSwitch}
                  onValueChange={() =>
                    setPrivateRoutineSwitch(!privateRoutineSwitch)
                  }
                />
              </View>
              <Button
                onPress={() =>
                  routineNameInput.length > 0
                    ? editRoutine
                      ? hanldeEditAndSaveRoutine(
                          routineNameInput,
                          routineDescriptionInput,
                          selectedColorPosition,
                          privateRoutineSwitch,
                        )
                      : handleCreateAndSeveNewRoutine(
                          routineNameInput,
                          routineDescriptionInput,
                          selectedColorPosition,
                          privateRoutineSwitch,
                        )
                    : Alert.alert('Introduce nombre')
                }
                content={
                  editRoutine ? (
                    <MaterialCommunityIcons
                      name="circle-edit-outline"
                      size={34}
                      color="lightblue"
                    />
                  ) : (
                    <Ionicons
                      name="md-arrow-up-circle"
                      size={35}
                      color="lightblue"
                    />
                  )
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const editRoutineModalKeyBoard = () => {
    return (
      <BottomModal
        openModal={editRoutineBottomModal}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={215}
        borderRadiusTop={10}
        closeDragDown={false}
        content={
          <View>
            <TextInput
              autoFocus
              value={routineNameInput}
              onChangeText={(value) => setRoutineNameInput(value)}
              placeholderTextColor="#ADADAF"
              placeholder="Routine Name Ex; For the Weekends"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => editRoutineBottomModal.current.close()}
              style={{
                backgroundColor: null,
                paddingHorizontal: 25,
                paddingVertical: 20,
                color: colors.text,
              }}
            />
            <TextInput
              autoFocus
              value={routineDescriptionInput}
              onChangeText={(value) => setRoutineDescriptionInput(value)}
              placeholderTextColor="#ADADAF"
              placeholder="Routine Description Ex; This Routine is when weekends.."
              enablesReturnKeyAutomatically
              onSubmitEditing={() => editRoutineBottomModal.current.close()}
              style={{
                backgroundColor: null,
                paddingHorizontal: 25,
                paddingVertical: 20,
                color: colors.text,
              }}
            />
            <FlatList
              data={courseColors}
              keyExtractor={(item) => item.color1}
              horizontal
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) =>
                item.position === selectedColorPosition ? (
                  <Button
                    onPress={() => {
                      setSelectedColorPosition(item.position);
                    }}
                    content={
                      <LinearGradient
                        colors={[item.color1, item.color2]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          height: 40,
                          borderRadius: 8,
                          borderWidth: 2.5,
                          borderColor: colors.text,
                        }}
                      />
                    }
                    styleBtn={{
                      backgroundColor: 'red',
                      width: 60,
                      marginHorizontal: 5,
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <Button
                    onPress={() => {
                      setSelectedColorPosition(item.position);
                    }}
                    content={
                      <LinearGradient
                        colors={[item.color1, item.color2]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          height: 40,
                          borderRadius: 8,
                          borderWidth: 2.5,
                          borderColor: colors.background,
                        }}
                      />
                    }
                    styleBtn={{
                      backgroundColor: 'red',
                      width: 60,
                      marginHorizontal: 5,
                      borderRadius: 8,
                    }}
                  />
                )
              }
            />
            <View
              style={{
                flexDirection: 'row',
                // alignSelf: editRoutine ? null : 'flex-end',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: null,
              }}>
              {/* {editRoutine ? (
                <Button
                  onPress={() =>
                    showAlert(
                      'Eiminar Rutina',
                      '¿Deseas eliminar permanentemente tu Rutina y su contenido?',
                      () => {
                        console.log('cancelado');
                      },
                      () => {
                        console.log('eliminado');
                        handleDeleteRoutine();
                      },
                    )
                  }
                  content={
                    <MaterialCommunityIcons
                      name="delete-circle"
                      size={35}
                      color="red"
                    />
                  }
                />
              ) : null} */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '40%',
                  justifyContent: 'space-between',
                }}>
                <Text>Private Routine</Text>
                <Switch
                  value={privateRoutineSwitch}
                  onValueChange={() =>
                    setPrivateRoutineSwitch(!privateRoutineSwitch)
                  }
                />
              </View>
              <Button
                onPress={() =>
                  routineNameInput.length > 0
                    ? hanldeEditAndSaveRoutine(
                        routineNameInput,
                        routineDescriptionInput,
                        selectedColorPosition,
                        privateRoutineSwitch,
                      )
                    : Alert.alert('Introduce nombre')
                }
                content={
                  <MaterialCommunityIcons
                    name="circle-edit-outline"
                    size={34}
                    color="lightblue"
                  />
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const deleteOrEditRoutineModal = () => {
    let paddingVerticalContainer;
    let paddingHorizontalPlusIconContainer;
    let icons;
    let fontSize;
    if (size === 'small') {
      paddingVerticalContainer = 15;
      paddingHorizontalPlusIconContainer = 20;
      icons = 35;
      fontSize = 10;
    } else if (size === 'medium') {
      paddingVerticalContainer = 22;
      paddingHorizontalPlusIconContainer = 28;
      icons = 45;
      fontSize = 12;
    } else {
      //large screen
      paddingVerticalContainer = 25;
      paddingHorizontalPlusIconContainer = 30;
      icons = 48;
      fontSize = 15;
    }
    return (
      <BottomModal
        openModal={deleteOrEditRoutineBottomModal}
        wrapperColor={colors.modalWrapper}
        muchContent={false}
        borderRadiusTop={40}
        closeDragDown={true}
        content={
          <View
            style={
              {
                // backgroundColor: 'yellow',
              }
            }>
            <Button
              onPress={() => {
                setEditRoutine(false);
                showAlert(
                  'Eiminar Rutina',
                  '¿Deseas eliminar permanentemente tu Rutina y su contenido?',
                  () => {
                    console.log('cancelado');
                  },
                  () => {
                    console.log('eliminado');
                    handleDeleteRoutine();
                  },
                );
              }}
              content={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.forms,
                      marginRight: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 13,
                      borderRadius: 13,
                    }}>
                    <FontAwesome
                      name="trash"
                      color={colors.text}
                      size={30}
                      style={{}}
                    />
                  </View>
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Delete Routine
                  </Text>
                </View>
              }
              styleBtn={{
                paddingHorizontal: 25,
                paddingVertical: 15,
                // backgroundColor: 'orange',
              }}
            />
            <Button
              onPress={() => {
                setEditRoutine(true);
                editRoutineBottomModal.current.open();
              }}
              content={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.forms,
                      marginRight: 15,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 13,
                    }}>
                    <MaterialCommunityIcons
                      name="circle-edit-outline"
                      color={colors.text}
                      size={30}
                      style={{}}
                    />
                  </View>
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Edit Routine
                  </Text>
                  {/* {createNotificationModal()} */}
                </View>
              }
              styleBtn={{
                paddingHorizontal: 25,
                paddingVertical: 15,
                // backgroundColor: 'orange',
              }}
            />
            {editRoutineModalKeyBoard()}
          </View>
        }
      />
    );
  };

  useEffect(() => {
    const handleGetRoutines = async () => {
      const realm = await getRealm();

      const routines = realm.objects('Routine');

      setUserRoutines(routines);
    };
    handleGetRoutines();
  }, []);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            // backgroundColor: 'red',
            // padding: 8,
            // paddingTop: 35,
            height: '100%',
            alignItems: 'center',
          }}>
          <Button
            onPress={() => navigation.navigate('Community')}
            styleBtn={{
              width: '100%',
              height: 120,
              // borderRadius: 25,
              backgroundColor: 'blue',
              padding: 25,
            }}
            content={
              <Text>
                Discover and use the routines of students around the world
              </Text>
            }
          />
          {userRoutines.length > 0 ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'green',
                // paddingBottom: '5%',
              }}>
              <View
                style={{
                  // backgroundColor: 'orange',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontFamily: Typography.RoutineProperties,
                    fontSize: 20,
                  }}>
                  Your Routines
                </Text>
                <AddButton
                  onPress={() => {
                    setEditRoutine(false);
                    setRoutineNameInput('');
                    setRoutineDescriptionInput('');
                    setPrivateRoutineSwitch(false);
                    setSelectedColorPosition(0);
                    inputredBottomModal.current.open();
                  }}
                  iconSize={40}
                />
              </View>
              <FlatList
                data={userRoutines}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false}
                style={
                  {
                    // backgroundColor: 'gray',
                    // height: '100%',
                    // paddingBottom: '25%',
                  }
                }
                renderItem={({item}) => (
                  <Button
                    onPress={() =>
                      navigation.navigate('RoutineId', {
                        routineName: item.name,
                        routineDescription: item.description,
                        color_position: item.color_position,
                        idRoutine: item.id,
                        routineTasks: item.routine_tasks,
                        otherUserRoutine: false,
                      })
                    }
                    // longPress={() => {
                    //   setRoutineId(item.id);
                    //   setRoutineNameInput(item.name);
                    //   setRoutineDescriptionInput(item.description);
                    //   setPrivateRoutineSwitch(item.public);
                    //   setSelectedColorPosition(Number(item.color_position));
                    //   deleteOrEditRoutineBottomModal.current.open();
                    // }}
                    content={
                      <LinearGradient
                        colors={[
                          courseColors[item.color_position].color1,
                          courseColors[item.color_position].color2,
                        ]}
                        style={{borderRadius: 30}}>
                        <View
                          style={{
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 190,
                            width: 190,
                            padding: 20,
                          }}>
                          <View style={{backgroundColor: null}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // backgroundColor: 'red',
                              }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: 'white',
                                  fontFamily: Typography.RoutineName,
                                }}>
                                {item.name}
                              </Text>
                              <Button
                                onPress={() => {
                                  setRoutineId(item.id);
                                  setRoutineNameInput(item.name);
                                  setRoutineDescriptionInput(item.description);
                                  setPrivateRoutineSwitch(item.public);
                                  setSelectedColorPosition(
                                    Number(item.color_position),
                                  );
                                  deleteOrEditRoutineBottomModal.current.open();
                                }}
                                content={
                                  <SimpleLineIcons
                                    name="options-vertical"
                                    color="white"
                                    size={25}
                                  />
                                }
                              />
                            </View>
                            <Text
                              style={{
                                fontSize: 15,
                                color: 'white',
                                fontFamily: Typography.RoutineDescription,
                              }}>
                              {item.description}
                            </Text>
                          </View>
                          <View
                            style={{
                              // backgroundColor: 'brown',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: Typography.RoutineProperties,
                                  fontSize: 14,
                                  color: 'white',
                                }}>
                                Start
                              </Text>
                              <Text
                                style={{
                                  fontFamily: Typography.RoutineProperties,
                                  fontSize: 14,
                                  color: 'white',
                                }}>
                                00:00
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: Typography.RoutineProperties,
                                  fontSize: 14,
                                  color: 'white',
                                }}>
                                0
                              </Text>
                              <Text
                                style={{
                                  fontFamily: Typography.RoutineProperties,
                                  fontSize: 14,
                                  color: 'white',
                                }}>
                                Tasks
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: Typography.RoutineProperties,
                                  fontSize: 14,
                                  color: 'white',
                                }}>
                                Finish
                              </Text>
                              <Text
                                style={{
                                  fontFamily: Typography.RoutineProperties,
                                  fontSize: 14,
                                  color: 'white',
                                }}>
                                00:00
                              </Text>
                            </View>
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
          ) : (
            <View
              style={{
                backgroundColor: 'green',
                padding: 11,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Add Routine</Text>
              <AddButton
                onPress={() => {
                  setEditRoutine(false);
                  setRoutineNameInput('');
                  setRoutineDescriptionInput('');
                  setPrivateRoutineSwitch(false);
                  setSelectedColorPosition(0);
                  inputredBottomModal.current.open();
                }}
                iconSize={64}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {deleteOrEditRoutineModal()}
      {newRoutineModalKeyBoard()}
    </>
  );
};

export default Routines;
