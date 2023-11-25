import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import styles from "./Navbar.module.scss";
import itIcon from "../../../public/images/svg/itIcon.svg";
import oficeIcon from "../../../public/images/svg/oficeIcon.svg";
import financeIcon from "../../../public/images/svg/financeIcon.svg";
import safetyIcon from "../../../public/images/svg/safetyIcon.svg";
import accountingIcon from "../../../public/images/svg/accountingIcon.svg";
import managementIcon from "../../../public/images/svg/managementIcon.svg";
import logistickIcon from "../../../public/images/svg/logistickIcon.svg";
import medicineIcon from "../../../public/images/svg/medicineIcon.svg";
import searchIcon from "../../../public/images/svg/searchIcon.svg";
import constructionIcon from "../../../public/images/svg/constructionIcon.svg";

const category = [
    {
        name: "Поиск по вакансиям",
        categoryName: "/",
        icon: searchIcon,
        title: "Поиск по вакансиям",
    },
    {
        name: "IT",
        categoryName: "InformationTechnology",
        icon: itIcon,
        title: "Информационные технологии",
    },
    {
        name: "Офис",
        categoryName: "DeskWork",
        icon: oficeIcon,
        title: "Административная работа, секретариат, АХО",
    },
    {
        name: "Финансы",
        categoryName: "Finances",
        icon: financeIcon,
        title: "Банки, кредит, страхование, пенсионное обеспечение",
    },
    {
        name: "Безопасность",
        categoryName: "Safety",
        icon: safetyIcon,
        title: "Безопасность, службы охраны",
    },
    {
        name: "Бухучет",
        categoryName: "AccountingTaxesManagement",
        icon: accountingIcon,
        title: "Бухгалтерия, налоги, управленческий учет",
    },
    {
        name: "Управление",
        categoryName: "Management",
        icon: managementIcon,
        title: "Высший менеджмент",
    },
    {
        name: "Логистика",
        categoryName: "Transport",
        icon: logistickIcon,
        title: "Транспорт, автобизнес, логистика, склад, ВЭД",
    },
    {
        name: "Медицина",
        categoryName: "Medicine",
        icon: medicineIcon,
        title: "Здравоохранение и социальное обеспечение",
    },
    {
        name: "Строительство",
        categoryName: "BuldindRealty",
        icon: constructionIcon,
        title: "Строительство, ремонт, стройматериалы, недвижимость",
    },
];

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            {category.map((item) => {
                return (
                    <Link className={styles.navbar__links} href={item.categoryName}>
                        <Image src={item.icon} width={30} height={24} alt="svg-icon" />
                        <span className={styles["links-name"]}>{item.name}</span>
                    </Link>
                );
            })}
            {/* className={cn("", { [styles.selected]: viewType.view === view })} */}
        </div>
    );
};

export default Navbar;
