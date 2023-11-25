import styles from "./page.module.scss";
import SearchIcon from "../../public/images/svg/searchIcon.svg";
import { Vacancy } from "@/components/Vacancy/Vacancy";

export default function Home() {
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
                    <Vacancy />
                </div>
            </div>
        </main>
    );
}
