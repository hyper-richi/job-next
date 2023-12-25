import { action, observable, computed, runInAction, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { useStaticRendering } from "mobx-react";
import { getVacancies } from "@/app/lib/data";

const isServer = typeof window === "undefined";
//enableStaticRendering(typeof window === "undefined");

useStaticRendering(isServer);

export class Store {
    counter: number = 0;
    isLoading: boolean = false;

    constructor() {
        makeObservable(this, {
            counter: observable,
            isLoading: observable,

            increment: action,
            decrement: action,
            setLoading: action,

            // hydrate: action,
        });
    }

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }

    setLoading(value: boolean) {
        this.isLoading = value;
    }

    getVacancies = async () => {
        const { results, meta } = await getVacancies();
    };

    /* hydrate = (data) => {
        if (!data) return;
    }; */
}
