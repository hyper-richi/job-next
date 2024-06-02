'use client';

import clsx from 'clsx';
import Navbar from '../Navbar/Navbar';
import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.props';
import PointIcon from '../../../public/images/svg/PointIcon';
import RegionName from '../RegionName/RegionName';
import { CloseButton } from '@mantine/core';

const Sidebar = ({ regions, showSidebar, onCloseSidebar, onCloseMobileRegionsModal }: SidebarProps) => {
  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={clsx(styles.mobile__sidebar, showSidebar ? styles.show : styles.hide)} onClick={onCloseSidebar}>
      <div className={styles.sidebar__content} onClick={onContentClick}>
        <CloseButton className={styles.sidebar__closebutton} onClick={onCloseSidebar}/>
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
  );
};

export default Sidebar;
