import React from "react";
import Loading from "../../images/Loading.svg";
import Image from "next/image";
import styles from "./Loader.module.scss";
const Loader = () => {
    return (
        <div>
            <Image src={Loading} className={styles.loader} alt="img" />
        </div>
    );
};

export default Loader;
