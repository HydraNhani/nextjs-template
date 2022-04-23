import type { FC } from "react";
import Util from "@util";
import styles from "@components/Layout/LoadingScreen.module.scss";

/**
 * [Documentation](https://codepen.io/aaroniker/pen/MWgRBdV)
 */
const LoadingScreen: FC = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
    return (
        <div className="flex items-center justify-center bg-lightmodebackground dark:bg-darkmodebackground min-h-[100vh]">
            <div className={Util.classNames(styles.loader, "before:bg-lightmodebackground before:dark:bg-darkmodebackground after:bg-lightmodebackground after:dark:bg-darkmodebackground")}>
                {numbers.map((number) => (
                    <div key={number} className={Util.classNames(styles.box, styles[`box${number}`])}><div/></div>
                ))}
                <div className={styles.ground}><div/></div>
            </div>
            <small className="block absolute bottom-45 text-2xl sm:text-5xl text-lightmodetext dark:text-darkmodetext text-center"> {process.env.APPLICATION_NAME} </small>
        </div>
    );
};

export default LoadingScreen;