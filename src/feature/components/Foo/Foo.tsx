import featureStyle from "@feature/styles/feature.module.scss";

const Foo = () => {
    return (
        <h1 className={`${featureStyle.commonClassInThisFeature}`}>A component only used within /Foo</h1>
    )
}

export default Foo;