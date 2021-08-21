import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import getRealm from '../../../../services/realm';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AddButton from '../../../../components/AddButton';
import Button from '../../../../components/Button';
import BottomModal from '../../../../components/BottomModal';
import TextModal from '../../../../components/BottomModal/textModal';

import LinearGradient from 'react-native-linear-gradient';

import {courseColors, responsive, showAlert} from '../../../../utils';

import {useTheme} from '@react-navigation/native';

const size = responsive();

const CourseFlashCards = ({route, navigation}) => {
  const {colors} = useTheme();
  const {courseTitle, color, courseId, courseFlashCardsArr} = route.params;

  const [editFlashCard, setEditFlashCard] = useState(false);

  const [flashCardId, setFlashCardId] = useState(false);

  const [courseFlashCards, setCourseFlashCards] = useState(false);

  const [flashCardFrontInput, setFlashCardFrontInput] = useState('');
  const [flashCardBackInput, setFlashCardBackInput] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: `${courseTitle} Cards`,
    });
  }, [navigation, courseTitle, courseFlashCards]);

  const createFlashCardRef = useRef();
  const editFlashCardRef = useRef();
  const deleteOrEditFlashCardBottomModal = useRef();

  const handleCreateAndSeveNewFlashCard = async (front, back) => {
    const data = {
      id: uuidv4(),
      name: courseTitle,
      question: front,
      answer: back,
    };

    const realm = await getRealm();

    try {
      realm.write(() => {
        const foundCourseToAddFlashCard = realm.objectForPrimaryKey(
          'Course',
          courseId,
        );

        foundCourseToAddFlashCard.flashCards.push(data);

        setCourseFlashCards(!courseFlashCards);
        createFlashCardRef.current.close();
      });
    } catch (error) {
      console.log('ERR', error);
    }
  };

  const handleUpdateAndSaveTask = async (cardId, front, back) => {
    const realm = await getRealm();

    const data = {
      id: cardId,
      question: front,
      answer: back,
    };
    try {
      realm.write(() => {
        realm.create('flashCard', data, 'modified');
      });
    } catch (error) {
      console.log('ERR', error);
    }
    setCourseFlashCards(!courseFlashCards);
    editFlashCardRef.current.close();
  };

  const handleDeleteFlashCard = async (cardId) => {
    const realm = await getRealm();

    try {
      realm.write(() => {
        const foundFlashCard = realm.objectForPrimaryKey('flashCard', cardId);

        realm.delete(foundFlashCard);
      });
    } catch (error) {
      console.log('ERR', error);
    }

    setCourseFlashCards(!courseFlashCards);

    deleteOrEditFlashCardBottomModal.current.close();
  };

  const createFlashCardModal = () => {
    return (
      <BottomModal
        openModal={createFlashCardRef}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={650}
        borderRadiusTop={40}
        closeDragDown={true}
        customPaddingHorizontal={true}
        content={
          <View
            style={{
              // paddingHorizontal: 20,
              backgroundColor: null,
              height: '94%',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextModal text="Create new Study Card" textTitle={true} />
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={[
                  courseColors[color].color1,
                  courseColors[color].color2,
                ]}
                style={{
                  marginVertical: 10,
                  backgroundColor: null,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  paddingVertical: 7,
                  paddingHorizontal: 18,
                }}>
                <Text style={{color: 'white'}}>{courseTitle}</Text>
              </LinearGradient>
              <TextModal text="Card Front" textTitle={false} />
              <TextInput
                autoFocus
                value={flashCardFrontInput}
                onChangeText={(value) => setFlashCardFrontInput(value)}
                placeholder="Ej. Titulo, Pregunta etc"
                //   enablesReturnKeyAutomatically
                //   onSubmitEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                //   onEndEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingVertical: 20,
                  borderRadius: 15,
                  marginVertical: 10,
                }}
              />

              <TextModal text="Card Back" textTitle={false} />
              <TextInput
                autoFocus
                value={flashCardBackInput}
                onChangeText={(value) => setFlashCardBackInput(value)}
                placeholder="Ej. Respuesta o significado de tu titlulo"
                //   enablesReturnKeyAutomatically
                //   onSubmitEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                // onEndEditing={() => addCourserefBottomModal.current.close()}
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingTop: 20,
                  paddingBottom: 50,
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: null,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={() => createFlashCardRef.current.close()}
                content={
                  <View
                    style={{
                      borderColor: '#3F3F3F',
                      borderWidth: 1,
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: '#3F3F3F'}}>Cancelar</Text>
                  </View>
                }
              />
              <Button
                onPress={() =>
                  flashCardFrontInput.length && flashCardBackInput.length > 0
                    ? handleCreateAndSeveNewFlashCard(
                        flashCardFrontInput,
                        flashCardBackInput,
                      )
                    : Alert.alert('debes llenar los campos')
                }
                content={
                  <View
                    style={{
                      backgroundColor: '#0B6DF6',
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white'}}>Crear</Text>
                  </View>
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const editFlashCardModal = () => {
    return (
      <BottomModal
        openModal={editFlashCardRef}
        keyBoardPushContent={false}
        wrapperColor={colors.modalWrapper}
        muchContent={true}
        customSize={true}
        sizeModal={650}
        borderRadiusTop={40}
        closeDragDown={true}
        content={
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: null,
              height: '94%',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextModal text="Edit Study Card" textTitle={true} />
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={[
                  courseColors[color].color1,
                  courseColors[color].color2,
                ]}
                style={{
                  marginVertical: 10,
                  backgroundColor: null,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  paddingVertical: 7,
                  paddingHorizontal: 18,
                }}>
                <Text style={{color: 'white'}}>{courseTitle}</Text>
              </LinearGradient>
              <TextModal text="Card Front" textTitle={false} />
              <TextInput
                autoFocus
                value={flashCardFrontInput}
                onChangeText={(value) => setFlashCardFrontInput(value)}
                placeholder="Ej. Titulo, Pregunta etc"
                //   enablesReturnKeyAutomatically
                //   onSubmitEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                //   onEndEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingVertical: 20,
                  borderRadius: 15,
                  marginVertical: 10,
                }}
              />

              <TextModal text="Card Back" textTitle={false} />
              <TextInput
                autoFocus
                value={flashCardBackInput}
                onChangeText={(value) => setFlashCardBackInput(value)}
                placeholder="Ej. Respuesta o significado de tu titlulo"
                //   enablesReturnKeyAutomatically
                //   onSubmitEditing={() =>
                //     createNotificationrefBottomModal.current.close()
                //   }
                // onEndEditing={() => addCourserefBottomModal.current.close()}
                style={{
                  backgroundColor: colors.forms,
                  paddingHorizontal: 25,
                  paddingTop: 20,
                  paddingBottom: 50,
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: null,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={() => editFlashCardRef.current.close()}
                content={
                  <View
                    style={{
                      borderColor: '#3F3F3F',
                      borderWidth: 1,
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: '#3F3F3F'}}>Cancelar</Text>
                  </View>
                }
              />
              <Button
                onPress={() =>
                  flashCardFrontInput.length && flashCardBackInput.length > 0
                    ? handleUpdateAndSaveTask(
                        flashCardId,
                        flashCardFrontInput,
                        flashCardBackInput,
                      )
                    : Alert.alert('Nada que actualizar')
                }
                content={
                  <View
                    style={{
                      backgroundColor: '#0B3FF6',
                      paddingHorizontal: 45,
                      paddingVertical: 15,
                      borderRadius: 50,
                    }}>
                    <Text style={{color: 'white'}}>Editar</Text>
                  </View>
                }
              />
            </View>
          </View>
        }
      />
    );
  };

  const deleteOrEditFlashCardModal = () => {
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
        openModal={deleteOrEditFlashCardBottomModal}
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
                setEditFlashCard(false);
                showAlert(
                  'Eiminar Notificacion',
                  '¿Deseas Eliminar permanentemente la notificacion?',
                  () => {
                    console.log('cancelado');
                  },
                  () => {
                    console.log('eliminado');
                    handleDeleteFlashCard(flashCardId);
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
                  <FontAwesome
                    name="trash"
                    color={colors.text}
                    size={35}
                    style={{marginRight: 20}}
                  />
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Delete Flash Card
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
                setEditFlashCard(true);
                editFlashCardRef.current.open();
              }}
              content={
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'pink',
                  }}>
                  <FontAwesome
                    name="edit"
                    color={colors.text}
                    size={35}
                    style={{marginRight: 15}}
                  />
                  <Text style={{fontSize: 16, color: colors.text}}>
                    Edit Flash Card
                  </Text>
                </View>
              }
              styleBtn={{
                paddingHorizontal: 25,
                paddingVertical: 15,
                // backgroundColor: 'orange',
              }}
            />
            {editFlashCardModal()}
          </View>
        }
      />
    );
  };

  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {courseFlashCardsArr.length > 0 ? (
        <View style={studyCardsStyles.flatlistFlashCardsContainer}>
          <FlatList
            data={courseFlashCardsArr}
            keyExtractor={(item) => item.id}
            style={{backgroundColor: null, padding: 13}}
            numColumns={1}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: colors.forms,
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  padding: 20,
                  marginVertical: 15,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingBottom: 15,
                  }}>
                  <LinearGradient
                    start={{x: 0.0, y: 0.25}}
                    end={{x: 0.5, y: 1.0}}
                    colors={[
                      courseColors[color].color1,
                      courseColors[color].color2,
                    ]}
                    style={{
                      backgroundColor: null,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      paddingVertical: 6,
                      paddingHorizontal: 14,
                    }}>
                    <Text style={{color: 'white', fontSize: 13}}>
                      {courseTitle}
                    </Text>
                  </LinearGradient>
                  <Button
                    onPress={() => {
                      setFlashCardId(item.id);
                      setFlashCardFrontInput(item.question);
                      setFlashCardBackInput(item.answer);
                      deleteOrEditFlashCardBottomModal.current.open();
                    }}
                    content={
                      <SimpleLineIcons
                        name="options"
                        color={colors.text}
                        size={25}
                      />
                    }
                  />
                </View>
                <Button
                  onPress={() =>
                    navigation.navigate('flashCard', {
                      flashCardFront: item.question,
                      flashCardBack: item.answer,
                    })
                  }
                  content={
                    <Text
                      style={{
                        textAlign: 'center',
                        color: colors.text,
                      }}>
                      {item.question}
                    </Text>
                  }
                  styleBtn={{
                    width: '100%',
                    backgroundColor: colors.forms,
                    paddingBottom: 30,
                  }}
                />
              </View>
            )}
          />
          <View style={studyCardsStyles.floatingButtonContainer}>
            <AddButton
              onPress={() => {
                setFlashCardFrontInput('');
                setFlashCardBackInput('');
                createFlashCardRef.current.open();
              }}
              iconSize={60}
            />
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text>Agregar Card</Text>
          <AddButton
            onPress={() => {
              setFlashCardFrontInput('');
              setFlashCardBackInput('');
              createFlashCardRef.current.open();
            }}
            iconSize={60}
          />
        </View>
      )}
      {createFlashCardModal()}
      {deleteOrEditFlashCardModal()}
    </View>
  );
};

const studyCardsStyles = StyleSheet.create({
  flatlistFlashCardsContainer: {
    backgroundColor: null,
    width: '100%',
    height: '100%',
  },
  flashCardItem: {
    width: '90%',
    paddingVertical: 40,
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 25,
  },
  floatingButtonContainer: {
    position: 'absolute',
    left: '80%',
    top: '90%',
    backgroundColor: null,
  },
});

export default CourseFlashCards;
