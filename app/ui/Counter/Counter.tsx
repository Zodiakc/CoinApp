import React from "react";
import styles from "./Counter.module.scss";

const Counter = ({ num, setNum, price }: any) => {
    const increment = () => {
        if (num < 0) {
            return;
        }
        setNum(num + 1);
    };

    const decrement = () => {
        if (num === 1) {
            return;
        }
        setNum(num - 1);
    };

    return (
        <div>
            <button onClick={decrement} className={styles.btn}>
                -
            </button>
            <span>{num}</span>
            <button onClick={increment} className={styles.btn}>
                +
            </button>
        </div>
    );
};

export default Counter;
