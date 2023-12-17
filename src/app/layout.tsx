import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import localFont from "next/font/local";
import styles from "./layout.module.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./globals.css";

const GTEestiProText = localFont({
    src: [
        {
            path: "../../public/fonts/GTEestiProText/gteestiprotext_regular.otf",
            weight: "400",
            style: "regular",
        },
        {
            path: "../../public/fonts/GTEestiProText/gteestiprotext_medium.otf",
            weight: "500",
            style: "medium",
        },
        {
            path: "../../public/fonts/GTEestiProText/gteestiprotext_bold.otf",
            weight: "700",
            style: "text_bold",
        },
    ],
    variable: "--gteestiprotext",
});
const GTEestiProDisplay = localFont({
    src: [
        {
            path: "../../public/fonts/GTEestiProDisplay/gteestiprodisplay_light.otf",
            weight: "300",
            style: "light",
        },
        {
            path: "../../public/fonts/GTEestiProDisplay/gteestiprodisplay_regular.otf",
            weight: "400",
            style: "regular",
        },
        {
            path: "../../public/fonts/GTEestiProDisplay/gteestiprodisplay_medium.otf",
            weight: "500",
            style: "medium",
        },
        {
            path: "../../public/fonts/GTEestiProDisplay/gteestiprodisplay_bold.otf",
            weight: "700",
            style: "bold",
        },
    ],
    variable: "--gteestiprodisplay",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Работа в России, поиск персонала и публикация вакансий",
        default: "Работа в России, поиск персонала и публикация вакансий",
    },
    icons: {
        icon: [{ url: "/icon.svg" }, new URL("/icon.svg", "https://example.com")],
        shortcut: ["/icon.svg"],
        apple: [{ url: "/icon.svg" }, { url: "/icon.svg", sizes: "180x180", type: "image/svg" }],
    },
    description: `Сервис, который помогает найти работу и подобрать персонал в России!
    Создавайте резюме и откликайтесь на вакансии. Набирайте сотрудников и публикуйте вакансии.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <ColorSchemeScript />
            </head>

            <body className={`${GTEestiProDisplay.className} ${GTEestiProText.variable} `}>
                <MantineProvider>
                    <Header />
                    <main className={styles.container}>{children}</main>
                    <Footer />
                </MantineProvider>
            </body>
        </html>
    );
}
