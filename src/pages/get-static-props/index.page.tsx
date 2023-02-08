import commonStyle from "@shared/styles/common.module.scss";
import style from "./index.module.scss"
import MessageBox from "@shared/components/MessageBox/MessageBox";
import { GetStaticProps } from "next/types";
import { getAllUsers, User } from "@shared/utils/Auth";


export const getStaticProps: GetStaticProps = async () => {
    const users: User[] = await getAllUsers();

    return {
        props: {
            users
        },
        revalidate: 10, // regenerate this page every 10 seconds
    }
};

interface GetStaticPageExampleProps {
    users: User[]
}

const GetStaticPageExample = ({users}: GetStaticPageExampleProps) => {
    return (
        <main className={`${commonStyle.pageContainer} ${style.mainContainer}`}>
            <>
                {
                    users.map((u) => {
                        return (
                            <h2 key={u.id}>Hello good user, {`${u.name}`}</h2>
                        )
                    })
                }
                <MessageBox title="getStaticProps">
                    <p>
                        getStaticProps allows you to fetch data at build time, and construct an
                        entirely static, cacheable page. The revalidate property tells
                        Next to re-run the requests and regenerate the static page every X seconds.
                    </p>
                </MessageBox>
            </>
        </main>
    );
}


export default GetStaticPageExample;