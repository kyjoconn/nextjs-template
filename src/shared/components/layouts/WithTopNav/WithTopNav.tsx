import React, {ReactElement} from "react";
import Link from "next/link";


import style from "./WithTopNav.module.scss";
import Head from "next/head";

export interface WithTopNavProps {
    children: ReactElement;
}

const WithTopNav = ({children}: WithTopNavProps) => {
    return (
        <>
            <Head>
                <title>NextJS - Template</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className={style.topNavBar}>
                <div className={style.topNavBarItems}>
                    <Link href="/" className={style.noDecoration}>
                        NextJS - Template 🚀🚀🚀
                    </Link>
                </div>
                <div className={style.topNavBarDivider} />
            </nav>
            <div className={style.pageWrapper}>
                {children}
            </div>
        </>
    );
};

export default WithTopNav;
