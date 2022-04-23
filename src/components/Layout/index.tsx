import type { FC } from "react";
import Head from "next/head";
import Script from "next/script";
import Util from "@util";
import Header from "@components/Layout/Header";
import type { HeaderMenuItems } from "@types";

const menuItems: HeaderMenuItems = [
    {
        label: "Test",
        link: "/test",
        links: []
    }
];

const Layout: FC = ({ children }) => {
    //Page info states
    const { title, header, description, scripts, meta } = Util.StateManagement.useSelector(state => state.layout);
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
                <main>
                    {/*ADDITIONAL SCRIPTS*/}
                    {scripts ? scripts.map((scriptSRC, index) => (
                        <Script key={index} type="text/javascript" src={scriptSRC} crossOrigin="anonymous" />
                    )) : undefined}
                    <div className="py-12 bg-transparent min-h-screen">
                        <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-base text-primary font-semibold tracking-wide uppercase">{process.env.APPLICATION_NAME}</h2>
                                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-lightmodeprimary dark:text-darkmodeprimary sm:text-4xl">
                                    {header ? header : title}
                                </p>
                                <p className="mt-4 text-3xl text-gray-700 lg:mx-auto font-coc-description">
                                    {description}
                                </p>
                            </div>
                            <div className="mt-10 z-0 mb-0 mx-auto"> {children} </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Layout;