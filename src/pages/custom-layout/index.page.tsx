import React from "react";
import commonStyle from "@shared/styles/common.module.scss";
import style from "./index.module.scss"
import MessageBox from "@shared/components/MessageBox/MessageBox";

const NoLayoutPage = () => {
    return (
        <main className={`${commonStyle.pageContainer} ${style.mainContainer}`}>
            <MessageBox title="Custom Page Layout">
                <p>
                    This page has no header. Each page can declare which layout it would like use
                    by implementing getLayout. In this case, no layout was used. The default layout is
                    defined in _app.page.tsx
                </p>
            </MessageBox>
            
        </main>
    );
}

const getNoLayout = (page: React.ReactNode) => page;

NoLayoutPage.getLayout = getNoLayout;

export default NoLayoutPage;