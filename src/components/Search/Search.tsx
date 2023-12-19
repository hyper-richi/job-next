"use client";
import styles from "./Search.module.scss";
import SearchIcon from "../../../public/images/svg/searchIcon.svg";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import clsx from "clsx";
import { plural } from "@/helpers/plural";

interface FormElements extends HTMLFormControlsCollection {
    term: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function Search({ total }: { total: number }) {
    const [inpVal, setInpValue] = useState("");
    // console.log("inpVal: ", inpVal);
    const searchParams = useSearchParams();
    const offset = searchParams.get("offset");
    const text = searchParams.get("text");
    // console.log("text: ", text);

    const { replace } = useRouter();

    useEffect(() => {
        setInpValue(text || "");
    }, [text]);

    const onFormSubmit = (e: React.FormEvent<YourFormElement>) => {
        // console.log("onFormSubmit: ");
        const params = new URLSearchParams(searchParams);
        e.preventDefault();
        const term = e.currentTarget.elements.term.value;
        setInpValue(term);
        if (term) {
            params.set("text", term);
            params.set("offset", term ? "0" : offset || "0");
        } else {
            params.delete("text");
        }
        replace(`?${params.toString()}`);
    };

    const forms = ["вакансия", "вакансии", "вакансий"];

    return (
        <>
            <div className={clsx(styles.search, styles.desktop)}>
                <h1 className={styles.search__title}>Поиск по вакансиям</h1>
                <form className={styles.search__form} onSubmit={onFormSubmit}>
                    <div className={styles.search__block}>
                        <SearchIcon className={styles.search__icon} />
                        <input
                            onChange={(e) => setInpValue(e.target.value)}
                            className={styles.search__input}
                            // defaultValue={searchParams.get("text")?.toString() || ""}
                            placeholder="Введите название должности"
                            type="text"
                            name="term"
                            value={inpVal}
                        />
                        <p className={styles.search__count}>{plural(forms, total)}</p>
                        <button className={styles.search__button} type="submit">
                            Поиск
                        </button>
                    </div>
                </form>
            </div>
            <div className={clsx(styles.searchbar, styles.mobile)}>
                <div className={styles.searchbar__wrapper}>
                    <div className={styles.searchbar__search}>
                        <div className={styles.searchbar__icon}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="#808D9A" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.663 11.994a5.33 5.33 0 115.33-5.33.667.667 0 01-1.332 0A3.997 3.997 0 109.49 9.49l.471-.471 4.743 4.743a.667.667 0 01-.942.943l-3.83-3.83a5.311 5.311 0 01-3.269 1.12z"></path>
                            </svg>
                        </div>
                        <form className={styles.search__form} onSubmit={onFormSubmit}>
                            <input
                                onChange={(e) => setInpValue(e.target.value)}
                                className={styles.search__input}
                                // defaultValue={searchParams.get("text")?.toString() || ""}
                                placeholder="Введите название должности"
                                type="text"
                                name="term"
                                value={inpVal}
                            />
                        </form>
                    </div>
                </div>
                <p className={styles.search__count}>Найдено: {plural(forms, total)}</p>
            </div>
        </>
    );
}
