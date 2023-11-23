import React from "react";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";

import Logo from "../../helpers/icons/logo.svg";

import cn from "classnames";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <header className={cn(className, styles.header)} {...props}>
            <Link href={`/`}>Logo</Link>
            <Navbar />
        </header>
    );
};
