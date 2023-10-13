"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProfileInfo.module.scss";
import { useProfileContext } from "@/app/providers/ProfileContext";
import Button from "@/app/ui/Button/Button";
import { useQuery } from "react-query";
import Loader from "@/app/ui/Loader/Loader";
import Profile from "../../images/profile.svg";
import Image from "next/image";
const fetchCoins = (ids: any) => {
    return fetch(`https://api.coincap.io/v2/assets?ids=${ids}`).then((res) => {
        const result = res.json();

        return result;
    });
};

const ProfileInfo = () => {
    const { profileInfo, setProfileInfo }: any = useProfileContext();
    const [coinsSum, setCoinsSum] = useState(0);
    const [openProfile, setOpenProfile] = useState(false);
    const [profileData, setProfileData] = useState([]);
    const [dataCoinsSum, setDataCoinsSum] = useState(0);
    const [fetchData, setFetchData] = useState("");

    const { data, isLoading, isSuccess, isError } = useQuery(
        ["coins", fetchData],
        () => fetchCoins(fetchData),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: true,
        }
    );

    const handledeleteCoin = (name: string) => {
        const filteredCoins = profileInfo.filter(
            (item: any, thisId: any) => item.name !== name
        );
        setProfileInfo(filteredCoins);
        localStorage.setItem("profileInfo", JSON.stringify(filteredCoins));
    };
    useEffect(() => {
        if (isSuccess) {
            const numArr: any = [];
            data.data.map((item: any) => numArr.push(Number(item.priceUsd)));
            const sumArr = numArr.reduce(
                (acc: number, curr: any) => acc + curr,
                0
            );
            setDataCoinsSum(sumArr);
        }
    }, [data, isSuccess]);
    useEffect(() => {
        if (isSuccess) {
            const dataName = profileInfo.map((item: any) =>
                item.name.toLowerCase()
            );
            dataName.shift();
            setFetchData(dataName.join(","));
        }
    }, [profileInfo]);

    useEffect(() => {
        const profileInfoFromStorage = JSON.parse(
            localStorage.getItem("profileInfo")
        );
        if (profileInfoFromStorage) {
            setProfileInfo(profileInfoFromStorage);
        }
    }, []);

    useEffect(() => {
        console.log(profileInfo);
        const sumOfPrices = profileInfo.reduce(
            (acc: number, curr: any) => acc + curr.coinPrice,
            0
        );

        setCoinsSum(sumOfPrices);
    }, [profileInfo]);

    return (
        <aside
            className={`${
                !openProfile ? styles.profileBlock : styles.openedProfile
            }`}
        >
            <div className={styles.logoBlock}>
                <Image
                    alt="img"
                    src={Profile}
                    className={styles.profileImg}
                    width={60}
                />
                <span>
                    Wallet:{" "}
                    {Number(coinsSum).toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                    })}
                </span>

                <span>{`Income: ${(
                    (coinsSum / dataCoinsSum) * 100 -
                    100
                ).toFixed(2)}%`}</span>
            </div>
            <button
                className={styles.arrow}
                onClick={() => setOpenProfile(!openProfile)}
            >
                ←
            </button>
            {openProfile && (
                <div className={styles.openProfile}>
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
