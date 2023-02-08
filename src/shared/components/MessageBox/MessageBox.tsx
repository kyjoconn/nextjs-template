import styles from "./MessageBox.module.scss";

export interface MessageBoxProps {
    title: string;
    children: React.ReactNode;
}

const MessageBox = ({title, children}: MessageBoxProps) => {
    return (
        <div className={`${styles.msgBoxContainer}`}>
            <div className={`${styles.titleBar}`}>
                <div className={`${styles.titleText}`}>
                {title}
                </div>
            </div>
            <div className={`${styles.msgContent}`}>
                {children}
            </div>
        </div>
    )
}

export default MessageBox;
