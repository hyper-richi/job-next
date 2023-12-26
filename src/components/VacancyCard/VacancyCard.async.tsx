import { FC, lazy } from "react";
import { VacancyCardProps } from "./VacancyCard.props";

export const VacancyCardAsync = lazy<FC<VacancyCardProps>>(() => import("./VacancyCard"));
// export const LoginFormAsync = lazy<FC<LoginModalContentProps>>(() => import("./LoginModalContent"));
