import React from "react";
import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
// import cn from "classnames";

export const Footer = ({ ...props }: FooterProps): JSX.Element => {
    return (
        <div className={styles.Footer} {...props}>
            Footer
        </div>
    );
};
