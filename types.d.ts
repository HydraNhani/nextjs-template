//File exports (if you need any types in this whole project, import it with @types)
/* import type { SomeType } from "@types"; */
export type * from "react-dom";
export type * from "@mantine/core";
export type * from "@apollo/client";
export type * from "firebase/auth";
export type * from "react-redux";

//Add all TypeScript types to this file and export it to make it accessable to the rest of the app

import type { PrismaClient } from "@prisma/client";

//Global delclarations for type checking
declare global {
    var prisma: PrismaClient;
    namespace NodeJS {
        //Add the types of your enviroment variable names here
        interface ProcessEnv {
            APPLICATION_NAME: string;
            APPLICATION_DESCRIPTION: string;
            APOLLO_CLIENT_URL: string;
            DATABASE_URL: string;
        };
    };
};

/* Redux */
// Infer the `RootState` and `AppDispatch` types from the store itself
import { store } from "@actions/index";
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
//Mode type
export type Mode = "dark" | "light";
//Layout type
export type LayoutProps = {
    title: string;
    header?: string;
    description: string;
    scripts?: Array<string>;
    meta?: MetaProps;
};
export type MetaProps = {
    keywords?: string;
};

/* NextJS */
/**
 * Extra utility configurations for Next pages
 */
export interface ComponentConfiguration {
    /**
     * Whether authentication is required to view the content of the website or not
     */
    authenticationRequired?: boolean;
    /**
     * Don't use this! 
     * 
     * Just for `./pages/login.tsx` and `./pages/register.tsx`
     */
    noAuthenticationRequired?: boolean;
    /**
     * Just allows admins to view the page
     */
    adminRoleRequired?: boolean;
    /**
     * A function that will be called after authentication
     */
    afterAuthentication?: (router: NextRouter, user?: User) => void;
};

export type CustomComponentType<InitialProps = {}, Props = {}> = NextComponentType<NextPageContext, InitialProps, Props> & ComponentConfiguration;

/**
 * A component with configuration
 * 
 * Almost same as {@link NextPage}, so update if needed
 */
export type NextPageWithConfiguration<Props = {}, InitialProps = Props> = CustomComponentType<InitialProps, Props> & {
    getInitialProps?(context: NextPageContext): InitialProps | Promise<InitialProps>;
};

/**
 * Almost same as {@link AppProps}, so update if needed
*/
export type ComponentWithConfigurationProps<Props = {}> = AppInitialProps & {
    Component: CustomComponentType<any, Props>,
    router: NextRouter;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    __N_RSC?: boolean;
};

//GraphQL Context Type
export type Context = {
    prisma: PrismaClient;
};

//Apollo Client
export type QueryResultType<DataProps> = Record<string, DataProps>;

//Framer Motion
export interface MotionProps {
    disablemotion?: boolean;
    disablehovermotion?: boolean;
};

//Component Types
import type { PropsWithChildren } from "react";
import type { TextProps } from "@mantine/core";
export type LinkProps = PropsWithChildren<TextProps<"a">> & MotionProps & {
    href?: string;
};
export interface MenuItem {
    link: string;
    label: string;
    links?: Array<Omit<MenuItem, "links">>;
};
export type MenuItems = Array<MenuItem>;