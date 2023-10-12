"use Client";
import React from "react";
import styles from "./Button.module.scss";
interface ButtonProps {
    childname: string;
    childFunc?: (param: any) => void;
    param?: any;
    info?: any;
}

const Button: React.FC<ButtonProps> = ({
    childname,
    childFunc,
    param,
    info,
}) => {
    const handleFunc = () => {
        if (childFunc) {
            childFunc(param);
        }
    };

    return (
        <button className={styles.button} onClick={handleFunc}>
            {childname}
        </button>
    );
};

export default Button;
