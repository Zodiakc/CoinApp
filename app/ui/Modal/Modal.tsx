import React, { useState } from "react";
import styles from "./Modal.module.scss";
import { useProfileContext } from "@/app/providers/ProfileContext";
import Counter from "../Counter/Counter";
const Modal = ({ isClicked }: any) => {
    const { modalInfo } = useProfileContext();
    const [counterState, setCounterState] = useState(1);
    return (
        <div
            className={styles.modal}
            style={isClicked ? { display: "block" } : { display: "none" }}
        >
            <h2>{modalInfo.name}</h2>
            <span>{Number(modalInfo.price) * counterState}</span>
            <Counter
                num={counterState}
                setNum={setCounterState}
                price={modalInfo.price}
            />
        </div>
    );
};

export default Modal;
