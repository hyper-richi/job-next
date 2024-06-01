'use client'; // Error components must be Client Components
import styles from './page.module.scss';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={styles.error__container}>
      <h2 className={styles.error__title}>Произошла ошибка на серверер!</h2>
      <p className={styles.error__title}>{error.message}</p>
      <button onClick={() => reset()}>Перезагрузить</button>
    </div>
  );
}
