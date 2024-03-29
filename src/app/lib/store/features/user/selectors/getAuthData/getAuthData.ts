import { StateSchema } from "@/app/lib/provider/StateSchema";

export const getAuthData = (state: StateSchema) => state.user.authData;
