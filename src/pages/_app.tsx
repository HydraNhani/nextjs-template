//CSS imports
import "@styles/fonts.scss";
import "@styles/globals.scss";
//Imports
import Layout from "@components/Layout";
import LoadingScreen from "@components/Layout/LoadingScreen";
import FirebaseAuthProvider from "@components/AuthProvider";
import { StrictMode as ReactStrictMode, useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@actions/index";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useAuth } from "@lib/hooks";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@lib/apolloClient";
import { useColorScheme } from "@mantine/hooks";
import { getCookie, setCookies } from "cookies-next";
//Type imports
import type { FC } from "react";
import type { ComponentWithConfigurationProps, CustomComponentType } from "@types";
import type { ColorScheme } from "@mantine/core";

const CustomComponent: FC<{
    Component: CustomComponentType;
    pageProps: any;
}> = ({ Component, pageProps }) => {
    //Router
    const router = useRouter();
    //Loading Screen
    const [done, setDone] = useState(
        !Component.authenticationRequired &&
            !Component.adminRoleRequired &&
            !Component.noAuthenticationRequired
    );
    //User
    const { user, loading } = useAuth();
    const isLoggedIn = !!user;
    //Mode
    // hook will return either 'dark' or 'light' on client
    // and always 'light' during ssr as window.matchMedia is not available
    const preferredColorScheme: ColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState(preferredColorScheme);
    useEffect(() => {
        const mode = getCookie("mode") as ColorScheme;
        if (!mode) setCookies("mode", preferredColorScheme, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 720),
            path: "/"
        });
        setColorScheme(mode);
        if (mode == "dark") document.documentElement.classList.add("dark");
    }, []);
    //Authentication
    useEffect(() => {
        if (loading) return; //If loading, don't do anything
        if (done) return; //If not loading, don't do anything
        if (Component.authenticationRequired) {
            //If login is required
            if (isLoggedIn)
                execute(); //If the user is logged in, grant access to the page
            else window.open("/auth", "_self"); //If not authenticated, force log in
        } else if (Component.noAuthenticationRequired) {
            //If the user wants to login or register
            if (isLoggedIn)
                window.open(
                    "/account",
                    "_self"
                ); //If the user is logged in, redirect to the account page
            else execute(); //If not authenticated, force log in
        }
    }, [loading]);
    //If the user is logged in, grant access to the page
    if (done)
        return (
            <ColorSchemeProvider toggleColorScheme={(value) => {
                setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
                setCookies("mode", value || (colorScheme === 'dark' ? 'light' : 'dark'), {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 720),
                    path: "/"
                });
                if (value || (colorScheme === 'dark' ? 'light' : 'dark') == "dark") document.documentElement.classList.add("dark");
                else document.documentElement.classList.remove("dark");
            }} colorScheme={colorScheme}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        fontFamily: "Titillium Web",
                        colorScheme: colorScheme
                    }}>
                    <NotificationsProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        );
    //If authentication is required, but the user is not logged in, show the loading screen
    return <LoadingScreen />;
    //Executing after authentication
    function execute() {
        if (Component.afterAuthentication)
            Component.afterAuthentication(router, user!); //Execute after authentication
        setDone(true); //If the user is logged in, grant access to the page
    }
};

function MyApp({ Component, pageProps }: ComponentWithConfigurationProps) {
    return (
        <ReactStrictMode> {/*Provider which adds Strict Mode to our React application*/}
            <ReduxProvider store={store}> {/*Provider which adds Redux to our React application*/}
                <FirebaseAuthProvider> {/*Provider which adds Firebase Authentication, a service for managing user accounts*/}
                    <ApolloProvider client={apolloClient}> {/*Provider which adds Apollo, a GraphQL client*/}
                        <CustomComponent Component={Component} pageProps={pageProps}/> {/*Component which handles authentication and loading screen*/}
                    </ApolloProvider>
                </FirebaseAuthProvider>
            </ReduxProvider>
        </ReactStrictMode>
    );
}

export default MyApp;