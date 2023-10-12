"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProfileInfo.module.scss";
import { useProfileContext } from "@/app/providers/ProfileContext";
import Button from "@/app/ui/Button/Button";
import { useQuery } from "react-query";
import Loader from "@/app/ui/Loader/Loader";
const fetchCoins = (ids: any) => {
    return fetch(`https://api.coincap.io/v2/assets?ids=bitcoin,ethereum`).then(
        (res) => {
            const result = res.json();

            return result;
        }
    );
};

const ProfileInfo = () => {
    const { profileInfo, setProfileInfo }: any = useProfileContext();
    let [coinsSum, setCoinsSum] = useState(0);
    const [openProfile, setOpenProfile] = useState(false);
    const [profileData, setProfileData] = useState([]);
    const [dataCoinsSum, setDataCoinsSum] = useState(0);
    const bit = "bitcoin";

    useEffect(() => {
        const sumOfPrices = profileInfo.reduce(
            (acc: number, curr: any) => acc + curr.coinPrice,
            0
        );
        setCoinsSum(sumOfPrices);
    }, [profileInfo]);
    const handledeleteCoin = (name: string) => {
        const filteredCoins = profileInfo.filter(
            (item: any, thisId: any) => item.name !== name
        );
        setProfileInfo(filteredCoins);
    };
    useEffect(() => {
        fetchCoins(bit)
            .then((res) => {
                const numArr: any = [];
                res.data.map((item: any) => numArr.push(Number(item.priceUsd)));
                return numArr;
            })
            .then((res: any) => {
                const sumArr = res.reduce(
                    (acc: number, curr: any) => acc + curr,
                    0
                );
                setDataCoinsSum(sumArr);
            });
    }, []);

    return (
        <aside
            className={`${
                !openProfile ? styles.profileBlock : styles.openedProfile
            }`}
        >
            <h2>User profile</h2>
            <span>{coinsSum}</span>
            <button
                onClick={() =>
                    console.log((coinsSum / dataCoinsSum) * 100 - 100)
                }
            >
                Click
            </button>
            <span>{`${((coinsSum / dataCoinsSum) * 100 - 100).toFixed(
                2
            )}%`}</span>
            <button
                className={styles.arrow}
                onClick={() => setOpenProfile(!openProfile)}
            >
                ←
            </button>
            {openProfile && (
                <div>
                    {profileInfo.map((item: any) =>
                        item.coinPrice ? (
                            <div className={styles.coinItem}>
                                <h4>{item.name}</h4>
                                <span>{item.coinPrice}</span>
                                <Button
                                    childname={"delete"}
                                    childFunc={() =>
                                        handledeleteCoin(item.name)
                                    }
                                ></Button>
                            </div>
                        ) : (
                            <div style={{ display: "none" }}></div>
                        )
                    )}
                </div>
            )}
        </aside>
    );
};

export default ProfileInfo;
