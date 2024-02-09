import type {Metadata} from "next";
import "./globals.css";
import {inter} from "@/app/ui/fonts";
import {PrimeReactProvider} from "primereact/api";
import 'primereact/resources/primereact.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

export const metadata: Metadata = {
    title: "BotCrew Test",
    description: "Test assigment",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <PrimeReactProvider>
            <body className={inter.className}>{children}</body>
        </PrimeReactProvider>
        </html>
    );
}
