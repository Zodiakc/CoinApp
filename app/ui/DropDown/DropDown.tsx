import { useCoinsContext } from "@/app/providers/CoinsContextProvider";
import React, { useState } from "react";
import styles from "./DropDown.module.scss";
const DropDown = () => {
    const { sortData, setSortData }: any = useCoinsContext();

    const options = [
        {
            value: "priceUsd",
            label: "По цене",
        },
        {
            value: "marketCapUsd",
            label: "По рыночной капитализации",
        },
        {
            value: "changePercent24Hr",
            label: "По изменению за 24 часа",
        },
    ];

    const handleChange = (e: any) => {
        setSortData(e.target.value);
        console.log(sortData);
    };

    return (
        <select
            onChange={handleChange}
            value={sortData}
            className={styles.dropDown}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default DropDown;
