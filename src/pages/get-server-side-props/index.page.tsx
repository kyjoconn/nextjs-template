import React from "react";
import commonStyle from "@shared/styles/common.module.scss";
import style from "./index.module.scss"
import MessageBox from "@shared/components/MessageBox/MessageBox";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import { getUser, User } from "@shared/utils/Auth";
import useAppContext from "@src/shared/hooks/useAppContext";
import ExampleList from "@src/shared/components/ExampleList"


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    // can read cookies and headers off of the context object
    // for auth purposes etc
    
    const user = await getUser("123asdf");

    // subtle point:
    // returned page page props will also be available in _app.page.tsx
    // so they can be piped into AppContext or other context if needed
    return {
        props: {
            user
        }
    }
};

interface GetSspPageProps {
    user: User
}

const GetSspPage = ({user}: GetSspPageProps) => {
    // user is a prop to this page, but it also could be pulled from AppContext
    // since if you look at app.tsx, we pass <AppContext> the pageProps
    // const {user: userFromContext} = useAppContext()
    return (
        <main className={`${commonStyle.pageContainer} ${style.mainContainer}`}>
            <MessageBox title="getServerSideProps">
                <p>
                    getServerSideProps allows you to fetch data, before rendering the page. This comes at a tradeoff.
                    The page load will be blocked entirely while fetching, but there will be no loading states/content shift/etc.
                    Pages that use this cannot be fully cached by a CDN.
                </p>
                <p>
                    Here we fetch a user before loading the page, and pass it to the page as a prop.
                    We can also pass the user to global AppContext.
                </p>
            </MessageBox>
            <div className={commonStyle.listContainer}>
            <h2>Current User: {`${user.name}`}</h2>
            <ExampleList />
            </div>
            {/* <h2>Hello good sir, {`${userFromContext?.name}`}</h2> */}
            
        </main>
    );
}


export default GetSspPage;