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

  function titleNotificationWithType() {
    return variant === 'error' ? 'Ошибка' : 'Успешно';
  }

  const note = (
    <div className={classes.additionalMessage}>
      <span>{`${message}`}</span>
      <span>{`${additionalMessage}`}</span>
    </div>
  );

  return notifications.show({
    ...props,
    title: titleNotificationWithType(),
    color: clsx(mods),
    message: additionalMessage ? note : message,
    withCloseButton: true,
    autoClose: 5000,
    classNames: classes,
    loading: false,
    limit: 5,
  });
}

export default CustomNotification;
