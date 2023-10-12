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
            <button onClick={decrement}>-</button>
            <span>{num}</span>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Counter;
