import React from "react";
import style from "./ExampleList.module.scss";
import Link from "next/link"

interface ExampleListProps {}

const ExampleList = ({}: ExampleListProps) => {
    return (
        <div className="disp-flex align-start">
            <h3>Examples: </h3>
            <ul className="pt1">
                <Link href="/get-server-side-props">
                    <li className="mb4">getServerSideProps</li>
                </Link>
                <Link href="/get-static-props">
                    <li className="mb4">getStaticProps</li>
                </Link>
                <Link href="/custom-layout">
                    <li className="mb4">Custom Layout</li>
                </Link>
            </ul>
        </div>
    )
};

export default ExampleList;