import { getVacancy } from "@/app/lib/store/data";
import parse, { DOMNode, HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import styles from "./page.module.scss";
import { notFound, useRouter } from "next/navigation";
import CountVacancyIcon from "../../../../../../public/images/svg/countVacancy.svg";
import BackIcon from "../../../../../../public/images/svg/backIcon.svg";
import Link from "next/link";
import VacancyShare from "@/components/VacancyShare/VacancyShare";
import MapVacancy from "@/components/MapVacancy/MapVacancy";
import ButtonBack from "@/components/ButtonBack/ButtonBack";

interface Params {
    searchParams?: { text?: string; offset?: string; jobCategory?: string };
    params: { companyId: string; vacancyId: string };
}

export default async function Vacancy({ params }: Params) {
    const companyId = params.companyId;
    const vacancyId = params.vacancyId;

    const { results, meta } = await getVacancy(companyId, vacancyId);
    const vacancy = Object.keys(results).length ? results.vacancies[0].vacancy : null;
    console.log("vacancy.address: ", vacancy?.addresses.address);
    console.log("vacancy?.duty: ", vacancy?.duty);

    const lng = vacancy?.addresses?.address[0]?.lng;
    const lat = vacancy?.addresses?.address[0]?.lat;
    const location = vacancy?.addresses?.address[0]?.location; //.split(".")[0];

    const options = {
        replace(domNode: DOMNode) {
            if (domNode instanceof Element && domNode.name === "p") {
                return <li>{domToReact(domNode.children as DOMNode[], options)}</li>;
            }
            if (domNode instanceof Element && domNode.name === "ul") {
                return <>{domToReact(domNode.children as DOMNode[], options)}</>;
            }
            if (domNode instanceof Element && domNode.name === "br") {
                return <>{domToReact(domNode.children as DOMNode[], options)}</>;
            }
        },
    };

    const duty = vacancy ? parse(vacancy?.duty || "") : null;
    const qualification = vacancy?.requirement.qualification ? parse(vacancy.requirement.qualification || "") : null;

    const experience = function (experience: number) {
        switch (experience) {
            case 0:
                return "Без опыта";
            case 1:
                return `${experience}  год`;
            case 2:
            case 3:
            case 4:
                return `${experience} года`;
            default:
                return `${experience} лет`;
        }
    };

    if (!vacancy) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.vacancy}>
                <div className={styles.vacancy__info}>
                    <ButtonBack />
                    <div className={styles.vacancy__info__title}>
                        <div className={styles.vacancy__info__title__city}>
                            <svg
                                width="18"
                                height="22"
                                viewBox="0 0 18 22"
                                fill="#002855"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.vacancy__info__title__city__icon}>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.764 16.834a1 1 0 00-1.414.024A59.4 59.4 0 019 19.143C4.142 14.64 2.5 12.043 2.5 9a6.5 6.5 0 0113 0c0 1.472-.36 2.76-1.179 4.149a1 1 0 001.723 1.015C17.042 12.471 17.5 10.834 17.5 9a8.5 8.5 0 00-17 0c0 3.904 2.065 7.003 7.827 12.24l.673.611.673-.611a67.185 67.185 0 003.116-2.992 1 1 0 00-.025-1.414zM9 13.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                            </svg>
                            {vacancy.region.name}
                        </div>
                        <span>{vacancy.company.name}</span>
                    </div>
                    <h1 className={styles.vacancy__info__name}>
                        {vacancy["job-name"].charAt(0).toUpperCase() + vacancy["job-name"].slice(1)}
                    </h1>
                    <p className={styles.vacancy__info__salary}>
                        {vacancy?.salary && vacancy?.salary !== "от 0"
                            ? `${vacancy.salary_min}-${vacancy.salary_max} ₽`
                            : "«з/п по договоренности»"}
                    </p>
                    <div className={styles.vacancy__info__workplaces}>
                        <div className={styles.vacancy__info__count}>
                            <CountVacancyIcon width="18" height="22" />
                            <p className={styles.workplaces}>Количество рабочих мест: {vacancy.work_places}</p>
                        </div>
                        <p>Адресс: {location}</p>
                    </div>
                    <MapVacancy lng={lng || ""} lat={lat || ""} />
                    <div className={styles.vacancy__info__body}>
                        <div>
                            {duty}
                            <p>
                                <strong>Мы ожидаем: </strong>
                            </p>
                            <ul>
                                <li>Образование:{` ${vacancy.requirement.education}`};</li>
                                <li>Опыт работы:{` ${experience(vacancy.requirement.experience)}`};</li>
                            </ul>
                            <p>
                                <strong>Тип занятости:</strong>
                            </p>
                            <ul>
                                <li>{vacancy.employment}</li>
                                <li>{vacancy.schedule}</li>
                            </ul>
                            {qualification && (
                                <>
                                    <p>
                                        <strong>Мы предлагаем:</strong>
                                    </p>
                                    <ul>{qualification}</ul>
                                </>
                            )}
                        </div>
                        <div className={styles.vacancy__actions__desktop}>
                            <button type="button" className={styles.vacancy__actions__apply}>
                                <Link href={vacancy.vac_url}>Откликнуться</Link>
                            </button>
                            <VacancyShare textURL={vacancy.vac_url} />
                        </div>
                    </div>
                </div>
                <div className={styles.vacancy__actions__mobile}>
                    <button type="button" className={styles.vacancy__actions__apply}>
                        <Link href={vacancy.vac_url}>Откликнуться</Link>
                    </button>
                    <VacancyShare textURL={vacancy.vac_url} />
                </div>
            </div>
        </div>
    );
}
