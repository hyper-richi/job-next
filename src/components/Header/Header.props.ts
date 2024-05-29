import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IRegion } from "../../..";

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    regions?: IRegion[];
}
