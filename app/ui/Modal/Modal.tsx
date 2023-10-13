import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { useProfileContext } from "@/app/providers/ProfileContext";
import Button from "../Button/Button";
import Counter from "../Counter/Counter";
const Modal = ({ isClicked, setClicked }: any) => {
    const { modalInfo, profileInfo, setProfileInfo }: any = useProfileContext();

    const [counterState, setCounterState] = useState(1);
    const filteredModalInfoPrice =
        modalInfo.price &&
        Number(modalInfo.price.substring(1).replace(",", ""));
    const sumOfCoins = modalInfo.price
        ? (filteredModalInfoPrice * counterState).toFixed(2)
        : 0;
    useEffect(() => {
        if (!isClicked) {
            setCounterState(1);
        }
    }, [isClicked]);

    const handleProfileInfo = () => {
        const sameObj = profileInfo.find(
            (item: any) => item.name === modalInfo.name
        );
        if (sameObj) {
            sameObj.coinPrice += filteredModalInfoPrice * counterState;
            setProfileInfo([...profileInfo]);
        } else {
            profileInfo.push({
                name: modalInfo.name,
                coinPrice: filteredModalInfoPrice * counterState,
            });
            setProfileInfo([...profileInfo]);
        }
        localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
    };
    return (
        <>
            <div
                className={styles.modal}
                style={isClicked ? { display: "block" } : { display: "none" }}
            >
                <div className={styles.closeBlock}>
                    <h2>{modalInfo.name}</h2>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setClicked(!isClicked)}
                    >
                        ✕
                    </button>
                </div>
                <span>{sumOfCoins}</span>
                <Counter
                    num={counterState}
                    setNum={setCounterState}
                    price={modalInfo.price}
                />
                <Button childname="Add" childFunc={handleProfileInfo}></Button>
            </div>
        </>
    );
};

export default Modal;
