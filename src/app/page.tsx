import styles from './page.module.scss';
import ListStack from '@/components/ListStack/ListStack';
import HeroImageWebp from '../../public/images/hero.webp';
import LighthouseWebp from '../../public/images/lighthouse.webp';
import Image from 'next/image';
import { Counter } from '@/components/Counter/Counter';

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
        <Counter />
        <div className={styles.lighthouse}>
          <h2 className={styles.lighthouse__title}>Lighthouse</h2>
          <div>
            <Image
              src={LighthouseWebp}
              style={{
                maxWidth: '400px',
                width: '100%',
                maxHeight: '250px',
                height: 'auto',
              }}
              alt='Lighthouse'
              priority
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.stackList}>
          <h2 className={styles.stack}>Stack на проекте:</h2>
          <ListStack />
        </div>
        <div>
          <Image
            src={HeroImageWebp}
            style={{
              maxWidth: '693px',
              width: '100%',
              maxHeight: '528px',
              height: 'auto',
            }}
            alt='picture'
            priority
          />
        </div>
      </div>
    </>
  );
}
