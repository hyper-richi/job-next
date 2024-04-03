import { NotificationData, notifications } from '@mantine/notifications';
import classes from './CustomNotification.module.scss';
import clsx from 'clsx';

interface CustomNotificationProps extends NotificationData {
  variant?: 'error' | 'succes';
  additionalMessage?: string;
}

export type Mods = Record<string, boolean | string | undefined>;

function CustomNotification(props: CustomNotificationProps) {
  const { variant, additionalMessage, message } = props;

  const mods = {
    red: variant === 'error',
    green: variant === 'succes',
  };

  const note = (
    <div className={classes.additionalMessage}>
      <span>{`${message}`}</span>
      <span>{`${additionalMessage}`}</span>
    </div>
  );

  return notifications.show({
    ...props,
    color: clsx(mods),
    message: additionalMessage ? note : message,
    id: 'hello-there',
    withCloseButton: true,
    autoClose: 5000,
    classNames: classes,
    loading: false,
  });
}

export default CustomNotification;
