"use client";
import styles from "./Search.module.scss";
import SearchIcon from "../../../public/images/svg/searchIcon.svg";
import SpinnerIcon from "../../../public/images/svg/spinnerIcon.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { plural } from "@/app/lib/helpers/plural";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { selectVacanciesIsLoading } from "@/app/lib/store/features/vacancies/selectors/selectVacanciesIsLoading";
import { vacanciesActions } from "@/app/lib/store/features/vacancies/vacanciesSlice";
import { useFormStatus } from "react-dom";

interface FormElements extends HTMLFormControlsCollection {
    text: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function Submit() {
    const isLoadingVacancies = useSelector(selectVacanciesIsLoading);

    const { pending } = useFormStatus();
    // console.log("pending || isLoadingVacancies: ", pending || isLoadingVacancies);
    // console.log("isLoadingVacancies: ", isLoadingVacancies);
    // console.log("pending: ", pending);

    return (
        <button disabled={pending} className={styles.search__button} type="submit">
            {pending || isLoadingVacancies ? <SpinnerIcon width={24} height={24} /> : "Поиск"}
        </button>
    );
}

function Search({ countVacancies }: { countVacancies: number }) {
    const dispatch = useAppDispatch();
    const [inpVal, setInpValue] = useState("");
    const [count, setCount] = useState(0);
    console.log("count: ", count);
    const isLoadingVacancies = useSelector(selectVacanciesIsLoading);

    /* const { pending, data, method, action } = useFormStatus();
    console.log("action: ", action);
    console.log("method: ", method);
    console.log("data: ", data);
    console.log("pending: ", pending); */

    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const jobCategory = searchParams.get("jobCategory");
    const searchTextParams = searchParams.get("text");
    const offset = searchParams.get("offset");
    const regionCode = searchParams.get("regionCode");

    useEffect(() => {
        setInpValue(searchTextParams || "");
    }, [searchTextParams]);

    const onFormSubmit = (e: React.FormEvent<YourFormElement>) => {
        const SearchParams = new URLSearchParams(searchParams);
        e.preventDefault();

        dispatch(vacanciesActions.startLoadingVacancies());

        const searchText = e.currentTarget.elements.text.value;

        setInpValue(searchText);
        if (jobCategory || regionCode || offset || searchText) {
            if (jobCategory) SearchParams.set("jobCategory", jobCategory);
            if (regionCode) SearchParams.set("regionCode", regionCode);
            if (offset) SearchParams.set("offset", offset || "0");
            if (searchText) SearchParams.set("text", decodeURIComponent(searchText));
        }
        if (!searchText) {
            SearchParams.delete("text");
            replace(`?${SearchParams.toString()}`);
        }
        replace(`?${SearchParams.toString()}`);
    };

    const getVacanciesSearch = (formData: FormData) => {
        const SearchParams = new URLSearchParams(searchParams);
        const searchText = formData.get("text") as string;
        console.log("searchText: ", searchText);

        if (!searchText && !count) {
            SearchParams.delete("text");
            replace(`?${SearchParams.toString()}`);
            dispatch(vacanciesActions.startLoadingVacancies());
            setCount(1);
            return;
        }

        if (searchText === searchTextParams || !searchText) {
            console.log("return: ");
            return;
        }
        setCount(0);
        dispatch(vacanciesActions.startLoadingVacancies());

        //const searchText = e.currentTarget.elements.text.value;
        setInpValue(searchText);

        if (jobCategory || regionCode || offset || searchText) {
            if (jobCategory) SearchParams.set("jobCategory", jobCategory);
            if (regionCode) SearchParams.set("regionCode", regionCode);
            if (offset) SearchParams.set("offset", offset || "0");
            if (searchText) SearchParams.set("text", decodeURIComponent(searchText));
        }

        replace(`?${SearchParams.toString()}`);
    };

    /* const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const { status } = await getVacancies({ jobCategory, offset, regionCode, searchText });
        // setLikes(updatedLikes);
    }; */

    const forms = ["вакансия", "вакансии", "вакансий"];

    return (
        <>
            <div className={clsx(styles.search, styles.desktop)}>
                <h1 className={styles.search__title}>Поиск по вакансиям</h1>
                <form className={styles.search__form} action={getVacanciesSearch} /* onSubmit={onFormSubmit} */>
                    <div className={styles.search__wrap}>
                        <SearchIcon className={styles.search__icon} />
                        <input
                            onChange={(e) => setInpValue(e.target.value)}
                            className={styles.search__input}
                            placeholder="Введите название должности"
                            type="text"
                            name="text"
                            value={inpVal}
                        />
                        <p className={styles.search__count}>{plural(forms, countVacancies)}</p>
                        {/*  <Submit /> */}
                        <button disabled={isLoadingVacancies} className={styles.search__button} type="submit">
                            {isLoadingVacancies ? <SpinnerIcon width={"24px"} height={24} /> : "Поиск"}
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
                        {/* <form className={styles.search__form} onSubmit={onFormSubmit}>
                            <input
                                onChange={(e) => setInpValue(e.target.value)}
                                className={styles.search__input}
                                // defaultValue={searchParams.get("text")?.toString() || ""}
                                placeholder="Введите название должности"
                                type="text"
                                name="text"
                                value={inpVal}
                            />
                        </form> */}
                    </div>
                </div>
                <p className={styles.search__count}>Найдено: {plural(forms, countVacancies)}</p>
            </div>
        </>
    );
}

export default Search;
