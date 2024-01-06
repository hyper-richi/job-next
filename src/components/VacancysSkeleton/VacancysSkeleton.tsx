import { Skeleton } from "../Skeleton/Skeleton";
import styles from "./VacancysSkeleton.module.scss";

export function VacancySkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.hr}></div>
            <div className={styles.container}>
                <Skeleton width={"100%"} height={28} borderRadius="6px" paddingTop={"0"} />
                <div className={styles.wrapp}>
                    <Skeleton minWidth={18} height={22} borderRadius="6px" paddingTop={"0"} />
                    <Skeleton minWidth={175} height={22} borderRadius="6px" paddingTop={"0"} />
                    <Skeleton minWidth={115} height={22} borderRadius="6px" paddingTop={"0"} />
                    <Skeleton width={"100%"} height={22} borderRadius="6px" paddingTop={"0"} />
                </div>
            </div>
        </div>
    );
}

export function VacancysSkeleton() {
    return (
        <>
            <VacancySkeleton />
            <VacancySkeleton />
            <VacancySkeleton />
            <VacancySkeleton />
            <VacancySkeleton />
            <VacancySkeleton />
        </>
    );
}
