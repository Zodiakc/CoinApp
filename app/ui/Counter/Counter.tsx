import React from "react";
import styles from "./Counter.module.scss";
const Counter = ({ num, setNum, price }: any) => {
    return (
        <div>
            <button onClick={() => setNum(num - 1)}>-</button>
            <span>{num}</span>
            <button
                onClick={() => {
                    setNum(num + 1);
                    console.log(price, num);
                }}
            >
                +
            </button>
        </div>
    );
};

export default Counter;
