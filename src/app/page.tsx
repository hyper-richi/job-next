import styles from './page.module.scss';
import ListStack from '@/components/ListStack/ListStack';
import HeroImagePng from '../../public/images/hero.png';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Найдите работу вашей мечты в любой точке России</h1>
          <p>Свежие вакансии, ответы на отклики и доступ к резюме — всегда у вас под рукой.</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.stackList}>
          <h2 className={styles.stack}>Stack на проекте:</h2>
          <ListStack />
        </div>
        <div>
          <Image
            src={HeroImagePng}
            style={{
              maxWidth: '693px',
              width: '100%',
              maxHeight: '528px',
              height: 'auto',
            }}
            width={693}
            height={528}
            alt='picture'
          />
        </div>
      </div>
    </>
  );
}
