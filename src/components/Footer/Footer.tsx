import styles from "./Footer.module.scss";
import VKIcon from "../../../public/images/svg/vkIcon.svg";
import TelegramIcon from "../../../public/images/svg/telegramIcon.svg";
import { IRegion } from "@/app/lib/types";
import RegionName from "../RegionName/RegionName";
import PointIcon from "../../../public/images/svg/PointIcon";

export const Footer = ({ regions }: { regions: IRegion[] }): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <h3 className={styles.footer__title}>Буду рад с вами сотрудничать!</h3>
                <div className={styles.footer__contacts}>
                    <p className={styles.contacts__git}>
                        © 1998—2024, «Kamalov Eldar». Все права защищены.
                        <a href="https://github.com" target="_blank">
                            {"github"}
                        </a>
                    </p>
                    <div className={styles.contacts__links}>
                        <div className={styles.links__cities}>
                            <RegionName regions={regions} />
                            <div className={styles["city-logo"]}>
                                <PointIcon style={{ width: 24, height: 24, fill: "#002855" }} />
                            </div>
                        </div>
                        <div className={styles.links__socials}>
                            <svg width="1" height="46" viewBox="0 0 1 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#fff" d="M0 0h1v46H0z"></path>
                            </svg>
                            <VKIcon />
                            <TelegramIcon />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
