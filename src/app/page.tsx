import Link from "next/link";
import Image from "next/image";
import TelegramIcon from "../../public/images/svg/telegramIcon.svg";
import styles from "./page.module.scss";
import ListStack from "@/components/ListStack/ListStack";

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className="flex">
                    <h1 className={styles.title}>Привет всем!</h1>
                    <h2 className={styles.desc}>Я Эльдар и я Frontend-разработчик!</h2>
                    <Link href="https://t.me/eldarDev" className="button button-primary">
                        <TelegramIcon />
                    </Link>
                </div>
            </div>
            <div className={styles.container}>
                <div className="flex">
                    <h2 className={styles.stack}>Stack на проекте:</h2>
                    <ListStack />
                </div>
            </div>
        </>
    );
}
