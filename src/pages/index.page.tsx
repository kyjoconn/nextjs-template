import React from "react";
import commonStyle from "@shared/styles/common.module.scss";
import style from "./index.module.scss"
import MessageBox from "@shared/components/MessageBox/MessageBox";

const Home = () => {
    return (
        <main className={`${commonStyle.pageContainer} ${style.mainContainer}`}>
            <MessageBox title="Automatic Page Optimization">
                <p>
                    This is a page that does not implement getServerSideProps, and does not make any requests.
                    It will automatically be built statically and can be cached by a CDN 🎉. 
                </p>
            </MessageBox>
            
        </main>
    );
}

export default Home;
