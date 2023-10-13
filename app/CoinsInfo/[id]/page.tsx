"use client";
import React from "react";
import Button from "@/app/ui/Button/Button";
import Link from "next/link";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import MyChart from "@/app/components/Chart/Chart";
import "../coinsInfo.scss";

const fetchCoins = (id: any) => {
    return fetch(`https://api.coincap.io/v2/assets/${id}`).then((res) => {
        const result = res.json();

        return result;
    });
};
interface CoinData {
    name: string;
    symbol: string;
    supply: number;
    priceUsd: number;
    marketCapUsd: number;
    maxSupply: number;
}
const page = ({ params: { id } }: any) => {
    const [coinData, setCoinData] = useState<CoinData | null>(null);
    const { data, isLoading, isSuccess, isError } = useQuery(
        ["coinInfo"],
        () => fetchCoins(id),
        {
            keepPreviousData: true,
        }
    );
    useEffect(() => {
        if (isSuccess) {
            setCoinData(data.data);
        }
    }, [data, isSuccess]);
    if (isLoading) {
        return <h1>...Loading</h1>;
    }
    if (isError) {
        console.log("error");
    }

    return (
        <div>
            {coinData ? (
                <div className="infoBlock">
                    <div className="infoCoinById">
                        <h2>{coinData.name}</h2>
                        <ul>
                            <li>{coinData.symbol}</li>
                            <li>
                                Supply:
                                {Number(coinData.supply).toLocaleString(
                                    "en-us",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                            </li>
                            <li>
                                Price:
                                {Number(coinData.priceUsd).toLocaleString(
                                    "en-us",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                            </li>
                            <li>
                                MarketCapUsd:
                                {Number(coinData.marketCapUsd).toLocaleString(
                                    "en-us",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                            </li>
                            <li>
                                MaxSupply:
                                {Number(coinData.maxSupply).toLocaleString(
                                    "en-us",
                                    {
                                        style: "currency",
                                        currency: "USD",
                                    }
                                )}
                            </li>
                        </ul>
                    </div>
                    <MyChart id={id} />
                    <Button childname="Add"></Button>
                    <Link href="/">
                        <Button childname="Back"></Button>
                    </Link>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default page;
