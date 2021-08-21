import PushNotificationIOS from '@react-native-community/push-notification-ios';

const showNotification = function (title, msg) {
  PushNotificationIOS.addNotificationRequest({
    alertBody: msg,
    alertTitle: title,
    id: new Date().toString(),
  });
};

const handleScheduleLocalNotification = (
  title,
  msg,
  year,
  month,
  day,
  hour,
  minute,
  second,
) => {
  const date = new Date(year, month, day, hour, minute, second).getTime();
  PushNotificationIOS.addNotificationRequest({
    alertTitle: title,
    alertBody: msg,
    fireDate: date,
    id: new Date().toString(),
  });
};

const handleCancel = () => {
  PushNotificationIOS.removeAllDeliveredNotifications();
};

export {showNotification, handleScheduleLocalNotification, handleCancel};
