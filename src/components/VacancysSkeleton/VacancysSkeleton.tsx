import { Skeleton } from "../Skeleton/Skeleton";
import styles from "./VacancysSkeleton.module.scss";

function VacancySkeleton() {
    return (
        <div className={styles.skeleton}>
            <Skeleton width={"100%"} height={30} borderRadius="6px" paddingTop={"0"} />
            <div className={styles.wrapp}>
                <Skeleton width={300} height={19} borderRadius="6px" paddingTop={"0"} />
                <Skeleton width={300} height={19} borderRadius="6px" paddingTop={"0"} />
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
