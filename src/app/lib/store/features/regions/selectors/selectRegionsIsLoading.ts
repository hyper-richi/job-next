import { StateSchema } from "@/app/lib/store/StateSchema";

export const selectRegionsIsLoading = (state: StateSchema) => state.regions?.isLoading;
