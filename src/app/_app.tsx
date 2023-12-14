import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "mobx-react";
import store from "../store/vacanciesStore";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
