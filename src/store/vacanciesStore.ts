import { getData, getDataJobCategory } from "@/app/lib/data";
import { action, makeObservable, observable, makeAutoObservable } from "mobx";
// import { fromPromise } from "mobx-utils";

class VacanciesStore {
    vacancies: null | Results = null;
    meta: null | Meta = null;

    constructor() {
        makeObservable(this, {
            vacancies: observable,
            meta: observable,
            getJobCategory: action,
            getVacanciesQuery: action,
        });
    }

    getJobCategory = async (category: string) => {
        try {
            const { results, meta } = await getDataJobCategory(category);
            this.vacancies = results;
            this.meta = meta;
        } catch (error) {
            console.error(`error ${error}`);
            this.vacancies = null;
            this.meta = null;
        }
    };
    getVacanciesQuery = async (query: string) => {
        try {
            const { results, meta } = await getData(query);
            this.vacancies = results;
            this.meta = meta;
        } catch (error) {
            console.error(`error ${error}`);
            this.vacancies = null;
            this.meta = null;
        }
    };
}

const vacanciesStore = new VacanciesStore();
export default vacanciesStore;
