"use client";

import React from "react";
import styles from "./TitleCategory.module.scss";
import { category } from "../Navbar/Navbar";

export default function TitleCategory(props: { jobCategory: string }) {
    const { jobCategory } = props;
    const title = category.find((item) => item.jobCategory === jobCategory)?.title;

    return <h1 className={styles.title}>{title}</h1>;
}
