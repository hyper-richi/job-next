import { getVacancy } from "@/app/lib/data";
import parse, { DOMNode, HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import styles from "./page.module.scss";
import { notFound, useRouter } from "next/navigation";
import CountVacancyIcon from "../../../../../../public/images/svg/countVacancy.svg";
import Link from "next/link";
import VacancyShare from "@/components/VacancyShare/VacancyShare";

export default async function Vacancy({ params }: { params: { companyId: string; vacancyId: string } }) {
    //  const router = useRouter();
    const companyId = params.companyId;
    const vacancyId = params.vacancyId;
    const { results, meta } = await getVacancy(companyId, vacancyId);
    const vacancy = Object.keys(results).length ? results.vacancies[0].vacancy : null;
    console.log("vacancy: ", vacancy?.salary);

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

    const duty = vacancy ? parse(vacancy?.duty) : null;
    const qualification = vacancy?.requirement.qualification ? parse(vacancy.requirement.qualification) : null;

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
        <div className={styles.vacancy}>
            <div className={styles.vacancy__info}>
                <div className={styles.vacancy__info__title}>
                    <a href="/vacancy/city-moskva/" className={styles.vacancy__info__title__city}>
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
                    </a>
                    <div className={styles.vacancy__info__title__department}>
                        <div className={styles.dot}></div>
                        <span>{vacancy.company.name}</span>
                    </div>
                </div>
                <h1 className={styles.vacancy__info__name}>{vacancy["job-name"]}</h1>
                <p className={styles.vacancy__info__salary}>
                    {vacancy?.salary ? `${vacancy.salary_min}-${vacancy.salary_max} ₽` : "«з/п по договоренности»"}
                </p>
                <div className={styles.vacancy__info__workplaces}>
                    <CountVacancyIcon width="18" height="22" />
                    <span>Количество рабочих мест: {vacancy.work_places}</span>
                </div>
                <div className={styles.vacancy__info__body}>
                    <p>
                        <strong>Вам предстоит:</strong>
                    </p>
                    {/* {vacancy?.duty} */}
                    <ul>{duty}</ul>
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
            </div>
            <div className={styles.vacancy__actions}>
                <button /* onClick={handleClick} */ type="button" className={styles.vacancy__actions__apply}>
                    <Link href={vacancy.vac_url}>Откликнуться</Link>
                </button>
                <div className={styles.vacancy__actions__nominee}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.vacancy__actions__icon}>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.01 20.306c-5.105.585-9.51-3.37-9.51-8.443A8.507 8.507 0 018.788 3.99a5.453 5.453 0 005.288 4.123h.299a1 1 0 100-2h-.3a3.45 3.45 0 01-3.45-3.45v-1.29l-1.25.321A10.503 10.503 0 001.5 11.864c0 6.263 5.443 11.15 11.737 10.428 4.675-.536 8.503-4.26 9.156-8.912.505-3.6-.819-7.072-3.448-9.392a10.473 10.473 0 00-4.32-2.294 1 1 0 10-.5 1.937 8.473 8.473 0 013.496 1.857c2.132 1.88 3.202 4.687 2.791 7.614-.526 3.75-3.632 6.77-7.403 7.204zm-6.72-8.498c.19.181.45.292.71.292.26 0 .52-.11.71-.292.18-.19.29-.453.29-.714 0-.262-.11-.524-.29-.715a1.042 1.042 0 00-1.42 0c-.18.191-.29.453-.29.715 0 .261.11.523.29.714zm10 .002c.19.18.45.29.71.29.26 0 .52-.11.71-.29.09-.1.16-.21.21-.33.05-.121.08-.251.08-.382 0-.13-.03-.26-.08-.38s-.12-.23-.21-.33c-.1-.09-.2-.161-.33-.211-.37-.16-.81-.06-1.09.21-.09.1-.16.21-.21.33-.05.121-.08.251-.08.381s.03.26.08.381c.05.12.12.23.21.33zm-7.497 4.995a1 1 0 011.414-1.415c.99.99 2.596.99 3.586 0a1 1 0 011.414 1.415 4.537 4.537 0 01-6.414 0z"
                            fill="#005BFF"></path>
                    </svg>
                    <span className={styles.vacancy__actions__nominee__text}>Рекомендовать друга</span>
                </div>
                <VacancyShare />
            </div>
        </div>
    );
}
