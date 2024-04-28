import { NotificationData, notifications } from '@mantine/notifications';
import classes from './CustomNotification.module.scss';
import clsx from 'clsx';

interface CustomNotificationProps extends NotificationData {
  variant?: 'error' | 'success';
  additionalMessage?: string;
  statusCode?: number;
}

export type Mods = Record<string, boolean | string | undefined>;

function CustomNotification(props: CustomNotificationProps) {
  const { variant, additionalMessage, message, statusCode } = props;

  const mods = {
    red: variant === 'error',
    green: variant === 'success',
  };

  function titleNotificationWithType() {
    return variant === 'error' ? 'Ошибка' : 'Успешно';
  }

  const note = (
    <div className={classes.additionalMessage}>
      <span>{message}</span>
      {additionalMessage && <span>{additionalMessage}</span>}
      {statusCode && <span>Status Code: {statusCode}</span>}
    </div>
  );

  return notifications.show({
    ...props,
    title: titleNotificationWithType(),
    color: clsx(mods),
    message: note,
    withCloseButton: true,
    autoClose: false, //5000,
    classNames: classes,
    loading: false,
    limit: 5,
  });
}

export default CustomNotification;
