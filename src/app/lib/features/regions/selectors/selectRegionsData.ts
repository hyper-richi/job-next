import { StateSchema } from "@/app/lib/StateSchema";

export const selectRegionsData = (state: StateSchema) => state.regions?.data;
