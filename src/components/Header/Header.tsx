'use client';
import React, { useCallback, useState } from 'react';
import { HeaderProps } from './Header.props';
import Link from 'next/link';
import styles from './Header.module.scss';
import Navbar from '../Navbar/Navbar';
import clsx from 'clsx';
import VKIcon from '../../../public/images/svg/vkIcon.svg';
import TelegramIcon from '../../../public/images/svg/telegramIcon.svg';
import { useSearchParams } from 'next/navigation';
import RegionName from '../RegionName/RegionName';
import PointIcon from '../../../public/images/svg/PointIcon';
import dynamic from 'next/dynamic';

// import MobileRegionsModal from './MobileRegionsModal/MobileRegionsModal';
const MobileRegionsModal = dynamic(() => import('../MobileRegionsModal/MobileRegionsModal'), {
  ssr: false,
});

//import DesktopRegionsModal from '../DesktopRegionsModal/DesktopRegionsModal';
const DesktopRegionsModal = dynamic(() => import('../DesktopRegionsModal/DesktopRegionsModal'), {
  ssr: false,
});

const Header = ({ regions }: HeaderProps): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileRegionsModal, setMobileShowRegionsModal] = useState(false);
  const [showDesktopRegionsModal, setDesktopShowRegionsModal] = useState(false);

  const searchParams = useSearchParams();
  const regionCodeParams = searchParams.get('regionCode');

  const onToggle = () => {
    setShowSidebar((prev) => !prev);
  };

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const closeHandlerSidebar = useCallback(() => {
    if (!showSidebar) {
      setShowSidebar(true);
    }
  }, [showSidebar]);

  const onCloseMobileRegionsModal = useCallback(() => {
    setMobileShowRegionsModal((prev) => !prev);
  }, []);

  const onCloseDesktopRegionsModal = useCallback(() => {
    setDesktopShowRegionsModal((prev) => !prev);
  }, []);

  let url = `/`;

  if (regionCodeParams) {
    url = url + `?regionCode=${regionCodeParams}`;
  }

  return (
    <>
      <header className={clsx(styles.desktop)}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <Link className={styles.header__logo} href={url}>
              JOB
            </Link>
            <div className={styles.header__info}>
              <div className={styles.info__cities} onClick={onCloseDesktopRegionsModal}>
                <RegionName regions={regions} />
                <div className={styles['city-logo']}>
                  <PointIcon style={{ width: 24, height: 24, color: '#ffffff' }} />
                </div>
              </div>
              <div className={styles.info__socials}>
                <svg width='1' height='46' viewBox='0 0 1 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path fill='#fff' d='M0 0h1v46H0z'></path>
                </svg>
                <VKIcon />
                <TelegramIcon />
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </header>

      <div className={clsx(styles.mobile, styles.sticky)}>
        <div className={styles.mobile__main}>
          <button onClick={onToggle}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M14.222 17c.295 0 .578.105.786.293a.952.952 0 01.325.707c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.112c-.296 0-.578-.105-.787-.293A.952.952 0 012 18c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293h11.111zm6.667-6c.295 0 .577.105.786.293A.952.952 0 0122 12c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.11c-.295 0-.577-.105-.786-.293A.952.952 0 012 12c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293H20.89zm0-6c.295 0 .577.105.786.293A.952.952 0 0122 6c0 .265-.117.52-.325.707a1.177 1.177 0 01-.786.293H3.11c-.295 0-.577-.105-.786-.293A.952.952 0 012 6c0-.265.117-.52.325-.707.209-.188.491-.293.786-.293H20.89z'
                fill='#fff'
              ></path>
            </svg>
          </button>
          <Link className={styles.header__logo} href={`/`}>
            JOB
          </Link>
          <div></div>
        </div>
        <div className={clsx(styles.mobile__sidebar, showSidebar && styles.hidden)} onClick={closeHandlerSidebar}>
          <div className={styles.sidebar__content} onClick={onContentClick}>
            <div className={styles.sidebar__nav}>
              <div onClick={onCloseMobileRegionsModal} className={styles.sidebar__item__logo}>
                <div className={styles.sidebar__city__logo}>
                  <PointIcon style={{ width: 24, height: 24, fill: '#005bff' }} />
                </div>
                <div className={styles.sidebar__location}>
                  <RegionName regions={regions} />
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#location-right_svg__clip0)'>
                      <path fill='#fff' d='M0 16V0h16v16z'></path>
                      <path d='M5 13l5-5-5-5' stroke='#B2BAC2' strokeWidth='2' strokeLinecap='round'></path>
                    </g>
                    <defs>
                      <clipPath id='location-right_svg__clip0'>
                        <path fill='#fff' d='M0 0h16v16H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <Navbar isMobile />
            </div>
          </div>
        </div>
      </div>

      {showDesktopRegionsModal && (
        <DesktopRegionsModal
          showDesktopRegionsModal={showDesktopRegionsModal}
          regions={regions}
          onCloseDesktopRegionsModal={onCloseDesktopRegionsModal}
        />
      )}
      {showMobileRegionsModal && (
        <MobileRegionsModal
          showMobileRegionsModal={showMobileRegionsModal}
          regions={regions}
          onCloseMobileRegionsModal={onCloseMobileRegionsModal}
        />
      )}
    </>
  );
};

export default Header;
