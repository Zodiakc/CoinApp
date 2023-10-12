"use client";
import { createContext, useContext, useState } from "react";

export const CoinsContext = createContext(null);
const PageContext = createContext(0);

export default function CoinsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [coinsData, setCoinsData] = useState([]);
    const [page, setPage] = useState(0);
    const [filterValue, setFilterValue] = useState("");
    return (
        <CoinsContext.Provider
            value={{
                coinsData,
                setCoinsData,
                page,
                setPage,
                filterValue,
                setFilterValue,
            }}
        >
            {children}
        </CoinsContext.Provider>
    );
}

export function useCoinsContext() {
    const context = useContext(CoinsContext);
    if (!context) {
        console.log("error");
    }
    return context;
}
