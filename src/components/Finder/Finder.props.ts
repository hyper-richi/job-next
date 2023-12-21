import { Results } from "@/app/lib/types";

export interface FinderProps {
    query?: string;
    offset?: string;
    jobCategory?: string;
    results: Results;
}
