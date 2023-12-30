import { StateSchema } from "@/app/lib/store/StateSchema";

export const selectRegionsData = (state: StateSchema) => state.regions?.data;
