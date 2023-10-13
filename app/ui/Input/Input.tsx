import React, { useContext } from "react";
import styles from "./Input.module.scss";

const Input = ({ childFunc }: any) => {
    return (
        <input
            placeholder="Search..."
            onChange={childFunc}
            className={styles.input}
        ></input>
    );
};

export default Input;
