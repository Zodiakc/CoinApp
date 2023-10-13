"use client";
import { createContext, useContext, useState } from "react";

export const CoinsContext = createContext({});
const PageContext = createContext(0);

export default function CoinsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [coinsData, setCoinsData] = useState([]);
    const [page, setPage] = useState(0);
    const [filterValue, setFilterValue] = useState("");
    const [sortData, setSortData] = useState("priceUsd");

    // Проверка контекста на null
    const context = useContext(CoinsContext);
    if (context === null) {
        throw new Error("CoinsContext is not initialized");
    }

    return (
        <CoinsContext.Provider
            value={{
                coinsData,
                setCoinsData,
                page,
                setPage,
                filterValue,
                setFilterValue,
                sortData,
                setSortData,
            }}
        >
            {children}
        </CoinsContext.Provider>
    );
}

export function useCoinsContext() {
    const context = useContext(CoinsContext);

    // Проверка контекста на null
    if (context === null) {
        throw new Error("CoinsContext is not initialized");
    }

    return context;
}
