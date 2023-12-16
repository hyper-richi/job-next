import Link from "next/link";
import Image from "next/image";
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
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import clsx from "clsx";

export const category: CategoryVacancy[] = [
    /*  {
        name: "Поиск по вакансиям",
        jobCategory: "/",
        icon: <SearchIcon />,
        title: "Поиск по вакансиям",
    }, */
    {
        name: "IT",
        jobCategory: "InformationTechnology",
        icon: <ItIcon />,
        title: "Информационные технологии",
    },
    {
        name: "Офис",
        jobCategory: "DeskWork",
        icon: <OfficeIcon />,
        title: "Административная работа, секретариат, АХО",
    },
    {
        name: "Финансы",
        jobCategory: "Finances",
        icon: <FinanceIcon />,
        title: "Банки, кредит, страхование, пенсионное обеспечение",
    },
    {
        name: "Безопасность",
        jobCategory: "Safety",
        icon: <SafetyIcon />,
        title: "Безопасность, службы охраны",
    },
    {
        name: "Бухучет",
        jobCategory: "AccountingTaxesManagement",
        icon: <AccountingIcon />,
        title: "Бухгалтерия, налоги, управленческий учет",
    },
    {
        name: "Управление",
        jobCategory: "Management",
        icon: <ManagementIcon />,
        title: "Высший менеджмент",
    },
    {
        name: "Логистика",
        jobCategory: "Transport",
        icon: <LogistickIcon />,
        title: "Транспорт, автобизнес, логистика, склад, ВЭД",
    },
    {
        name: "Медицина",
        jobCategory: "Medicine",
        icon: <MedicineIcon />,
        title: "Здравоохранение и социальное обеспечение",
    },
    {
        name: "Строительство",
        jobCategory: "BuldindRealty",
        icon: <ConstructionIcon />,
        title: "Строительство, ремонт, стройматериалы, недвижимость",
    },
];

type NavbarProps = {
    show: boolean;
};

const Navbar = ({ show }: NavbarProps) => {
    const pathname = usePathname();
    const { jobCategory } = useParams();

    return (
        <nav className={clsx(styles.navbar, show && "hidden")}>
            <div className={styles.wrapper}>
                <Link
                    className={clsx(styles.navbar__links, pathname === "/vacancies" && styles["navbar__links--active"])}
                    href={`/vacancies`}>
                    <SearchIcon />
                    <span className={styles["links-name"]}>{"Поиск по вакансиям"}</span>
                </Link>
                {category.map((item) => {
                    return (
                        <Link
                            key={item.jobCategory}
                            className={clsx(styles.navbar__links, jobCategory === item.jobCategory && styles["navbar__links--active"])}
                            href={`/vacancies/${item.jobCategory}`}>
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
