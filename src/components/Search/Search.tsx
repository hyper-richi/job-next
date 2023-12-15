"use client";
import styles from "./Search.module.scss";
import SearchIcon from "../../../public/images/svg/searchIcon.svg";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, FormEventHandler } from "react";

interface FormElements extends HTMLFormControlsCollection {
    term: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function Search({ total }: { total: number }) {
   // console.log("Search: ");
    const searchParams = useSearchParams(); // хуки только на клиентский компонент
    const pathname = usePathname();
    const { replace } = useRouter();

    const onFormSubmit = (e: React.FormEvent<YourFormElement>) => {
        const params = new URLSearchParams(searchParams);
        e.preventDefault();
        const term = e.currentTarget.elements.term.value;
        if (term) {
            params.set("text", term);
        } else {
            params.delete("text");
        }
        replace(`?${params.toString()}`);
    };

    return (
        <div className={styles.search}>
            <h1 className={styles.search__title}>Поиск по вакансиям</h1>
            <form className={styles.search__form} onSubmit={onFormSubmit}>
                <div className={styles.search__block}>
                    <SearchIcon className={styles.search__icon} />
                    <input
                        className={styles.search__input}
                        defaultValue={searchParams.get("text")?.toString()}
                        placeholder="Введите название должности"
                        type="text"
                        name="term"
                    />
                    <div className={styles.search__count}>{total} вакансий</div>
                    <button className={styles.search__button} type="submit">
                        <span className=""> Поиск </span>
                    </button>
                </div>
            </form>
        </div>
    );
}
