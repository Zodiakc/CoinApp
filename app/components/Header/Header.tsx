"use client";
import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import { useCoinsContext } from "@/app/providers/CoinsContextProvider";
import { useState } from "react";
const Header = () => {
    const { coinsData }: any = useCoinsContext();

    const [headerData, setHeaderData] = useState(
        coinsData.filter((item: any, index: any) => index < 3)
    );
    useEffect(() => {
        setHeaderData(coinsData.filter((item: any, index: any) => index < 3));
    }, [coinsData]);
    return (
        <header
            className={styles.header}
            onClick={() => {
                console.log(headerData);
            }}
        >
            {headerData.map((item: any) => (
                <div className={styles.header__item}>
                    <span className={styles.text}>{item.name}</span>
                    <span className={styles.text}>
                        {Number(item.priceUsd).toLocaleString("en-us", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </span>
                </div>
            ))}
        </header>
    );
};

export default Header;
