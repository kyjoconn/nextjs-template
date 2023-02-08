// This is the only place you can import raw css
// Everywhere else must use css modules
import "@shared/styles/globals.scss";

import React, {ReactElement, ReactNode} from "react";
import type {AppProps} from "next/app";

import WithTopNav from "@shared/components/layouts/WithTopNav";
import { WithAppContext } from "@src/shared/context/AppContext";


type NextPageWithLayout = ReactNode & {
    getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const getDefaultLayout = (page: ReactElement) => {
    return <WithTopNav>{page}</WithTopNav>;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? getDefaultLayout;

    return (
        <WithAppContext {...pageProps}>
            {getLayout(<Component {...pageProps} />)}
        </WithAppContext>
    );
}
