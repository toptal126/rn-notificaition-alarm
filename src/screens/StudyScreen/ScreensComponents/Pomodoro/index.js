import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, ScrollView, Animated} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Button from '../../../../components/Button';

import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import {courseColors} from '../../../../utils';

const Pomodoro = () => {
  const [pause, setPause] = useState(false);

  const children = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  return (
    <LinearGradient colors={[courseColors[0].color1, courseColors[0].color2]}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: null,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>koij</Text>
          <CountdownCircleTimer
            isPlaying={pause ? false : true}
            size={270}
            duration={120}
            colors={[['#004777'], ['#F7B801'], ['#A30000']]}>
            {({remainingTime, animatedColor}) => (
              <Animated.Text style={{color: animatedColor}}>
                {children(remainingTime)}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
          <Button
            onPress={() => setPause(true)}
            content={
              <View>
                <Text>pause</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Pomodoro;
