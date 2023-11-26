import styles from "./page.module.scss";
import SearchIcon from "../../public/images/svg/searchIcon.svg";
import { Vacancy } from "@/components/Vacancy/Vacancy";
import { ResponseData } from "./lib/definitions";

const getData = async (): Promise<ResponseData> => {
    const res = await fetch("https://opendata.trudvsem.ru/api/v1/vacancies", {
        cache: "force-cache",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export default async function Home() {
    const { results } = await getData();
    // console.log("data: ", data);
    console.log("results: ", results);

    return (
        <main className={styles.main}>
            <div className={styles.search}>
                <h1 className={styles.search__title}>Поиск по вакансиям</h1>
                <form className={styles.search__form}>
                    <div className={styles.search__block}>
                        <SearchIcon className={styles.search__icon} />
                        <input className={styles.search__input} placeholder="Введите название должности" type="text" />
                        <div className={styles.search__count}>вакансий</div>
                        <button className={styles.search__button} type="submit">
                            <span className=""> Поиск </span>
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.finder}>
                <div className={styles.filters}>
                    <div className={styles.filters__header}>
                        <h6 className={styles.filters__title}>Фильтры</h6>
                    </div>
                    <div className={styles.filters__selects}>selects</div>
                </div>
                <div className={styles.content}>
                    {results.vacancies.map((item) => {
                        return <Vacancy key={item.vacancy.id} />;
                    })}
                </div>
            </div>
        </main>
    );
}
