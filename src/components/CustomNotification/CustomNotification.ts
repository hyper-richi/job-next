import { NotificationData, notifications } from '@mantine/notifications';
import classes from './CustomNotification.module.scss';

function CustomNotification(props: NotificationData) {
  return notifications.show({
    ...props,
    id: 'hello-there',
    withCloseButton: true,
    autoClose: 3000,
    classNames: classes,
    loading: false,
  });
}

export default CustomNotification;
