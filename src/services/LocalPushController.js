import PushNotification from 'react-native-push-notification';

export const setupPushNotification = (handleNotification) => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('LOCAL NOTIFICATION ==>', notification);
      handleNotification(notification);
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  return PushNotification;
};
/*
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    var whoosh = loopSound(DoneTaskSound);
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    channelId: 'qcwdc', // (required)
  });
};

export const ScheduledLocalNotification = (data) => {
  const nDate = new Date(
    data.soundYear,
    data.soundMonth,
    data.soundDay,
    data.soundHour,
    data.soundMinute,
    0,
    0,
  );
  console.log('notification nDate', nDate);
  PushNotification.localNotificationSchedule({
    autoCancel: true,
    bigText: 'Notification Text for ' + data.name,
    subText: 'Local Notification Demo',
    title: data.name,
    message: 'Scheduled Notification Message',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    date: nDate, //new Date(Date.now() + 3 * 1000), // in 3 secs
    channelId: 'qcwdc', // (required)
  });
};*/
