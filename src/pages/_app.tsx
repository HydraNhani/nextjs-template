//CSS imports
import "@styles/fonts.scss";
import "@styles/globals.scss";
//Imports
import Layout from "@components/Layout";
import LoadingScreen from "@components/Layout/LoadingScreen";
import Util from "@util";
import FirebaseAuthProvider from "@components/AuthProvider";
import { StrictMode as ReactStrictMode, useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@actions/index";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useAuth } from "@lib/hooks";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@lib/apolloClient";
//Type imports
import type { FC } from "react";
import type { ComponentWithConfigurationProps, CustomComponentType } from "@types";

const CustomComponent: FC<{
    Component: CustomComponentType;
    pageProps: any;
}> = ({ Component, pageProps }) => {
    //Router
    const router = useRouter();
    //Dispatcher
    const dispatch = Util.StateManagement.useDispatch();
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
    useEffect(() => {
        let mode = Util.getCookie("mode"); //Get mode from cookie
        if (!mode || mode == "") {
            //If mode is not set, set it to default
            Util.setCookie(
                "mode",
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light",
                730,
                "/"
            ); //Set mode cookie to default
            mode = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"; //Set mode state to default
        }
        dispatch(Util.StateManagement.loadMode(mode as "light" | "dark")); //Load mode
        if (mode == "dark") document.documentElement.classList.add("dark"); //Add dark mode class for Tailwind CSS
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
            <Layout>
                <Component {...pageProps} />
            </Layout>
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
        <ReactStrictMode>
            {/*Provider which adds Strict Mode to our React application*/}
            <ReduxProvider store={store}>
                {/*Provider which adds React Query, a data fetching/caching service*/}
                <MantineProvider
                    theme={{
                        fontFamily: "SOME_FONT_FAMILY_HERE"
                    }}>
                    <NotificationsProvider> 
                        {/*Provider which adds Mantine, a CSS components/React hooks utility library*/}
                        <FirebaseAuthProvider>
                            {/*Provider which adds Firebase Authentication, a service for managing user accounts*/}
                            <ApolloProvider client={apolloClient}>
                                {/*Provider which adds Apollo, a GraphQL client*/}
                                <CustomComponent
                                    Component={Component}
                                    pageProps={pageProps}
                                />
                                {/*Component which handles authentication and loading screen*/}
                            </ApolloProvider>
                        </FirebaseAuthProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ReduxProvider>
        </ReactStrictMode>
    );
}

export default MyApp;