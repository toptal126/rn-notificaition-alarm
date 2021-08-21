import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Animated, StyleSheet, Image} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '../../../../components/Button';

import {useTheme} from '@react-navigation/native';

const FlashCard = ({route, navigation}) => {
  const {colors} = useTheme();
  const {flashCardFront, flashCardBack} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: 'Card',
    });
  }, [navigation]);

  const animate = useRef(new Animated.Value(0)).current;

  const [frontCard, setFrontCard] = useState(true);

  const handleFront = () => {
    setTimeout(() => {
      setFrontCard(true);
    }, 460);
    Animated.timing(animate, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const frontCardView = () => {};

  const handleBack = () => {
    setTimeout(() => {
      setFrontCard(false);
    }, 460);
    Animated.timing(animate, {
      toValue: 3,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View
        style={{
          height: '90%',
          width: '90%',
          backgroundColor: colors.forms,
          borderRadius: 50,
          transform: [{rotateY: animate}],
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <Image
          style={{
            width: '80%',
            height: '25%',
            resizeMode: 'cover',
            position: 'absolute',
            top: '20%',
            borderRadius: 20,
          }}
          source={{
            uri:
              'https://images.mapsofworld.com/wp-content/uploads/2011/09/World-Map-US-continent.jpg',
          }}
        />
        {frontCard ? (
          <Text style={{color: colors.text}}>{flashCardFront}</Text>
        ) : (
          <Animated.Text
            style={{
              transform: [{rotateY: animate}],
              color: colors.text,
              textAlign: 'center',
            }}>
            {flashCardBack}
          </Animated.Text>
        )}
        <View
          style={{
            backgroundColor: null,
            alignSelf: 'center',
            position: 'absolute',
            top: '89%',
            justifyContent: 'flex-end',
          }}>
          {frontCard ? (
            <View style={{alignItems: 'center'}}>
              <Button
                onPress={() => handleBack()}
                content={
                  <MaterialIcons
                    name="next-plan"
                    size={50}
                    color={colors.text}
                  />
                }
              />
              <Text style={{color: colors.text}}>GO BACK</Text>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Button
                onPress={() => handleFront()}
                content={
                  <MaterialIcons
                    name="next-plan"
                    size={50}
                    color={colors.text}
                  />
                }
              />
              <Animated.Text
                style={{transform: [{rotateY: animate}], color: colors.text}}>
                GO FRONT
              </Animated.Text>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default FlashCard;
