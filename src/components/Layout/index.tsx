import type { FC } from "react";
import Head from "next/head";
import Script from "next/script";
import Util from "@util";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { Container, Text, Title, useMantineTheme } from "@mantine/core";
import type { MenuItems } from "@types";

const menuItems: MenuItems = [
    {
        label: "Authentication",
        link: "/auth",
        links: [
            {
                label: "Sign in",
                link: "/auth"
            },
            {
                label: "Sign Up",
                link: "/auth"
            }
        ]
    }
];

const Layout: FC = ({ children }) => {
    //Page info states
    const { title, header, description, scripts, meta } = Util.StateManagement.useSelector(state => state.layout);
    const theme = useMantineTheme();
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content={title} />
                <title> {title} - {process.env.APPLICATION_NAME} </title>
                <meta charSet="UTF-8" />
                <meta name="description" content={description ? description : `${process.env.APPLICATION_NAME} ${process.env.APPLICATION_DESCRIPTION}`} />
                <meta name="keywords" content={`${meta?.keywords ? `${meta?.keywords}, ` : ""}coc, cr, bs, bb, clash of clans, clash royale, brawl stars, boom beach, tracker, stats, nightclash, supercell web, night clash`} />
                <meta name="author" content={process.env.APPLICATION_NAME} />
            </Head>
            <div>
                <Header menuItems={menuItems} />
                <main className="min-h-screen">
                    {/*ADDITIONAL SCRIPTS*/}
                    {scripts ? scripts.map((scriptSRC, index) => (
                        <Script key={index} type="text/javascript" src={scriptSRC} crossOrigin="anonymous" />
                    )) : undefined}
                    <Container>
                        <Text className="text-center uppercase font-extrabold text-sm">{process.env.APPLICATION_NAME}</Text>
                        <Title sx={{ marginTop: theme.spacing.xl }} className="text-center text-4xl" order={2}>
                            {header ? header : title}
                        </Title>
                        <Container size={660} p={0}>
                            <Text sx={{ marginTop: theme.spacing.xs }} color="dimmed" className="text-center text-xl">
                                {description ? description : `${process.env.APPLICATION_NAME} ${process.env.APPLICATION_DESCRIPTION}`}
                            </Text>
                        </Container>
                        <div className="mt-10 z-0 mb-0 mx-auto"> {children} </div>
                    </Container>
                </main>
                <Footer menuItems={menuItems} />
            </div>
        </>
    );
};

export default Layout;