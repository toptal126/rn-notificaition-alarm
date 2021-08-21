import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'myakcoxle', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const showNotification = (title, msg) => {
  PushNotification.localNotification({
    title: title,
    message: msg,
    channelId: 'myakcoxle',
  });
};

const handleScheduleLocalNotification = (title, msg) => {
  const date = new Date(2021, 0, 13, 15, 33, 0);
  PushNotification.localNotificationSchedule({
    title: title,
    message: msg,
    date: date,
    channelId: 'myakcoxle',
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, handleScheduleLocalNotification, handleCancel};
