import { StateSchema } from "@/app/lib/provider/StateSchema";

export const getLoginState = (state: StateSchema) => state?.loginForm;
