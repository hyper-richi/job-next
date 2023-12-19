import { Results } from "@/app/lib/types";

export interface FinderProps {
    query?: string;
    jobCategory?: string;
    results: Results;
}
