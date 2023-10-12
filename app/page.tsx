"use client";
import styles from "./page.module.scss";
import Table from "./components/Table/Table";
import { useQuery } from "react-query";
import { useState } from "react";
import { useCoinsContext } from "./providers/CoinsContextProvider";
import Loader from "./ui/Loader/Loader";

const fetchCoins = (skip: number, value: any, sort: string) => {
    return fetch(
        `https://api.coincap.io/v2/assets?limit=${10}&offset=${skip}&search=${value}`
    )
        .then((res) => {
            const result = res.json();

            return result;
        })
        .then((res) => {
            const sortedData = res.data.sort((a: any, b: any) => {
                return b[sort] - a[sort];
            });

            return sortedData;
        });
};

export default function Home() {
    const {
        setCoinsData,
        page,
        setPage,
        coinsData,
        filterValue,
        sortData,
    }: any = useCoinsContext();

    const { data, isLoading, isSuccess, isError } = useQuery(
        ["coins", page, filterValue, sortData],
        () => fetchCoins(page, filterValue, sortData),
        {
            keepPreviousData: true,
        }
    );

    if (isLoading) {
        return <Loader></Loader>;
    }
    if (isError) {
        console.log("error");
    }
    if (isSuccess) {
        setCoinsData(data);
    }

    return (
        <main className={styles.main}>
            {isSuccess && (
                <>
                    <Table isSuccess={isSuccess} />
                    <button onClick={() => console.log(coinsData)}>
                        Click
                    </button>
                </>
            )}
        </main>
    );
}
