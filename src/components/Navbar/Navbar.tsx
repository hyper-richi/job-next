import styles from './Navbar.module.scss';
import ItIcon from '../../../public/images/svg/itIcon.svg';
import OfficeIcon from '../../../public/images/svg/officeIcon.svg';
import FinanceIcon from '../../../public/images/svg/financeIcon.svg';
import SafetyIcon from '../../../public/images/svg/safetyIcon.svg';
import AccountingIcon from '../../../public/images/svg/accountingIcon.svg';
import ManagementIcon from '../../../public/images/svg/managementIcon.svg';
import LogistickIcon from '../../../public/images/svg/logistickIcon.svg';
import MedicineIcon from '../../../public/images/svg/medicineIcon.svg';
import SearchIcon from '../../../public/images/svg/searchIcon.svg';
import ConstructionIcon from '../../../public/images/svg/constructionIcon.svg';
import clsx from 'clsx';
import NavbarItem from '../NavbarItem/NavbarItem';
import { useEffect, useRef, useState } from 'react';

export const category: CategoryVacancy[] = [
  {
    name: 'Поиск по вакансиям',
    jobCategory: '/vacancies',
    icon: <SearchIcon />,
    title: 'Все вакансии',
  },
  {
    name: 'IT',
    jobCategory: 'InformationTechnology',
    icon: <ItIcon />,
    title: 'Информационные технологии',
  },
  {
    name: 'Офис',
    jobCategory: 'DeskWork',
    icon: <OfficeIcon />,
    title: 'Административная работа, секретариат, АХО',
  },
  {
    name: 'Финансы',
    jobCategory: 'Finances',
    icon: <FinanceIcon />,
    title: 'Банки, кредит, страхование, пенсионное обеспечение',
  },
  {
    name: 'Безопасность',
    jobCategory: 'Safety',
    icon: <SafetyIcon />,
    title: 'Безопасность, службы охраны',
  },
  {
    name: 'Бухучет',
    jobCategory: 'AccountingTaxesManagement',
    icon: <AccountingIcon />,
    title: 'Бухгалтерия, налоги, управленческий учет',
  },
  {
    name: 'Управление',
    jobCategory: 'Management',
    icon: <ManagementIcon />,
    title: 'Высший менеджмент',
  },
  {
    name: 'Логистика',
    jobCategory: 'Transport',
    icon: <LogistickIcon />,
    title: 'Транспорт, автобизнес, логистика, склад, ВЭД',
  },
  {
    name: 'Медицина',
    jobCategory: 'Medicine',
    icon: <MedicineIcon />,
    title: 'Здравоохранение и социальное обеспечение',
  },
  {
    name: 'Строительство',
    jobCategory: 'BuldindRealty',
    icon: <ConstructionIcon />,
    title: 'Строительство, ремонт, стройматериалы, недвижимость',
  },
];

const Navbar = ({ isMobile }: { isMobile?: boolean }) => {
  // const regionCodeStorage = localStorage.getItem('regionCode') || 'all';
  // const encodeSearchText = encodeURIComponent(useSearchParams().get('text') || '');

  const [hidenNavbar, setHidenNavbar] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollRef.current) {
      if (window.scrollY > 150) {
        setHidenNavbar(true);
      }
    } else {
      setHidenNavbar(false);
    }
    lastScrollRef.current = window.scrollY;
  };

  const mods: Mods = {
    [styles.hidden]: hidenNavbar,
  };

  return (
    <nav className={clsx(styles.navbar, mods)}>
      <div className={styles.wrapper}>
        {category.map((item) => {
          if (!isMobile) {
            return <NavbarItem key={item.jobCategory} categoryVacancy={item} />;
          } else {
            return <NavbarItem key={item.jobCategory} categoryVacancy={item} isMobile />;
          }
        })}
      </div>
    </nav>
  );
};

export default Navbar;
