import Header from "./components/Header/Header";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import "./globals.scss";
import CoinsContextProvider from "./providers/CoinsContextProvider";
import ProfileContextProvider from "./providers/ProfileContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";

export const metadata = {
    title: "CoinsApp",
    description: "Test coins app",
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ReactQueryProvider>
                    <CoinsContextProvider>
                        <ProfileContextProvider>
                            <Header />
                            <ProfileInfo />
                            {children}
                        </ProfileContextProvider>
                    </CoinsContextProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
