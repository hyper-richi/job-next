import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
    return (
        <div className={styles["not-found"]}>
            <div>
                <h1 className={styles["next-error-h1"]}>404</h1>
                <div className={styles.block}>
                    <h2 className={styles["next-error-msg"]}>This page could not be found.</h2>
                </div>
            </div>
            <Link href="/">Return Home</Link>
        </div>
    );
}
