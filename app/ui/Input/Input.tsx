import { useCoinsContext } from "@/app/providers/CoinsContextProvider";
import React, { useContext } from "react";

const Input = ({ childFunc }: any) => {
    return <input placeholder="Search..." onChange={childFunc}></input>;
};

export default Input;
