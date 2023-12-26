import { VacancyCardProps as VacancyCardProps } from "./VacancyCard.props";
import styles from "./VacancyCard.module.scss";
import Link from "next/link";

export default function VacancyCard({ regionCode, vacancy, offset, searchText, jobCategory }: VacancyCardProps) {
    // await new Promise((resolve) => setTimeout(resolve, 0));
    const { "job-name": vacancyName, salary_min, salary_max, category, company, id: vacancyId } = vacancy.vacancy;

    let url = `/vacancies/vacancy/${company.companycode}/${vacancyId}?`;
    if (jobCategory) {
        url = url + `jobCategory=${jobCategory}&`;
    }
    if (regionCode) {
        url = url + `regionCode=${regionCode}&`;
    }
    if (offset) {
        url = url + `offset=${offset}&`;
    }

    if (searchText) {
        url = url + `text=${searchText}`;
    }

    const urlDecode = decodeURIComponent(url);

    return (
        <div className={styles.vacancy}>
            <div className={styles.vacancy__hr}></div>
            <Link className={styles.vacancy__link} href={urlDecode} target="_blank">
                <h6 className={styles.vacancy__title}>{vacancyName.charAt(0).toUpperCase() + vacancyName.slice(1)}</h6>
                <div className={styles.vacancy__info}>
                    <div className={styles.vacancy__info__location}>
                        <svg
                            width="18"
                            height="22"
                            viewBox="0 0 18 22"
                            fill="#4c6888"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.location__icon}>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.764 16.834a1 1 0 00-1.414.024A59.4 59.4 0 019 19.143C4.142 14.64 2.5 12.043 2.5 9a6.5 6.5 0 0113 0c0 1.472-.36 2.76-1.179 4.149a1 1 0 001.723 1.015C17.042 12.471 17.5 10.834 17.5 9a8.5 8.5 0 00-17 0c0 3.904 2.065 7.003 7.827 12.24l.673.611.673-.611a67.185 67.185 0 003.116-2.992 1 1 0 00-.025-1.414zM9 13.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                        </svg>
                        .
                    </div>
                    <span className="">{vacancy.vacancy.region?.name}</span>
                    <span className={styles.vacancy__salary}>
                        {salary_min}-{salary_max} ₽
                    </span>
                    <span className={styles.vacancy__info__specialisation}>{category.specialisation}</span>
                </div>
                <svg
                    className={styles.vacancy__arrow}
                    width="9"
                    height="16"
                    viewBox="0 0 9 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.847 15.674l6.934-7.13a.783.783 0 000-1.087L1.847.326a1.062 1.062 0 00-1.53 0 1.137 1.137 0 000 1.573L6.248 8 .317 14.1a1.138 1.138 0 000 1.574 1.062 1.062 0 001.53 0z"
                        fill="#4C6888"></path>
                </svg>
            </Link>
        </div>
    );
}
