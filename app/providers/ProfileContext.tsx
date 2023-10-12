"use client";
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

export default function ProfileContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [modalState, setModalState] = useState(false);
    const [modalInfo, setModalInfo] = useState({});

    return (
        <ProfileContext.Provider
            value={{
                modalState,
                setModalState,
                modalInfo,
                setModalInfo,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfileContext() {
    const context = useContext(ProfileContext);
    if (!context) {
        console.log("error");
    }
    return context;
}
