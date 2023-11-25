import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import styles from "./Navbar.module.scss";
import ItIcon from "../../../public/images/svg/itIcon.svg";
import OfficeIcon from "../../../public/images/svg/officeIcon.svg";
import FinanceIcon from "../../../public/images/svg/financeIcon.svg";
import SafetyIcon from "../../../public/images/svg/safetyIcon.svg";
import AccountingIcon from "../../../public/images/svg/accountingIcon.svg";
import ManagementIcon from "../../../public/images/svg/managementIcon.svg";
import LogistickIcon from "../../../public/images/svg/logistickIcon.svg";
import MedicineIcon from "../../../public/images/svg/medicineIcon.svg";
import SearchIcon from "../../../public/images/svg/searchIcon.svg";
import ConstructionIcon from "../../../public/images/svg/constructionIcon.svg";

const category = [
    {
        name: "Поиск по вакансиям",
        categoryName: "/",
        icon: <SearchIcon />,
        title: "Поиск по вакансиям",
    },
    {
        name: "IT",
        categoryName: "InformationTechnology",
        icon: <ItIcon />,
        title: "Информационные технологии",
    },
    {
        name: "Офис",
        categoryName: "DeskWork",
        icon: <OfficeIcon />,
        title: "Административная работа, секретариат, АХО",
    },
    {
        name: "Финансы",
        categoryName: "Finances",
        icon: <FinanceIcon />,
        title: "Банки, кредит, страхование, пенсионное обеспечение",
    },
    {
        name: "Безопасность",
        categoryName: "Safety",
        icon: <SafetyIcon />,
        title: "Безопасность, службы охраны",
    },
    {
        name: "Бухучет",
        categoryName: "AccountingTaxesManagement",
        icon: <AccountingIcon />,
        title: "Бухгалтерия, налоги, управленческий учет",
    },
    {
        name: "Управление",
        categoryName: "Management",
        icon: <ManagementIcon />,
        title: "Высший менеджмент",
    },
    {
        name: "Логистика",
        categoryName: "Transport",
        icon: <LogistickIcon />,
        title: "Транспорт, автобизнес, логистика, склад, ВЭД",
    },
    {
        name: "Медицина",
        categoryName: "Medicine",
        icon: <MedicineIcon />,
        title: "Здравоохранение и социальное обеспечение",
    },
    {
        name: "Строительство",
        categoryName: "BuldindRealty",
        icon: <ConstructionIcon />,
        title: "Строительство, ремонт, стройматериалы, недвижимость",
    },
];

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.wrapper}>
                {category.map((item) => {
                    return (
                        <Link key={item.categoryName} className={styles.navbar__links} href={item.categoryName}>
                            {/* <Image src={item.icon} width={30} height={24} alt="svg-icon" /> */}
                            {item.icon}
                            <span className={styles["links-name"]}>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
