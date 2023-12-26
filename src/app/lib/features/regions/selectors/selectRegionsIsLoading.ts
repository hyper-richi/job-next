import { StateSchema } from "@/app/lib/StateSchema";

export const selectRegionsIsLoading = (state: StateSchema) => state.regions?.isLoading;
