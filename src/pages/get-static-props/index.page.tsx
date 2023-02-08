import commonStyle from "@shared/styles/common.module.scss";
import style from "./index.module.scss"
import MessageBox from "@shared/components/MessageBox/MessageBox";
import { GetStaticProps } from "next/types";
import { getAllUsers, User } from "@shared/utils/Auth";
import ExampleList from "@shared/components/ExampleList"


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
                <MessageBox title="getStaticProps">
                    <p>
                        getStaticProps allows you to fetch data at build time, and construct an
                        entirely static, cacheable page. The revalidate property tells
                        Next to re-run the requests and regenerate the static page every X seconds.
                    </p>
                    <p>
                        Here a list of users is fetched once at build-time, and then again regenerated
                        every 10 seconds. Note: when running in dev mode (npm run dev) it will regenerate each
                        time for ease of development.
                    </p>
                </MessageBox>
                <div className={commonStyle.listContainer}>
                    <div className="disp-flex align-start">
                        <h3>All Users:</h3>
                        <ul className="pt1">
                            {
                                users.map((u) => {
                                    return (
                                        <li className="mb4" key={u.id}>{`${u.name}`}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <ExampleList />
                </div>
                
            </>
        </main>
    );
}


export default GetStaticPageExample;