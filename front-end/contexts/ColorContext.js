"use client"

import { createContext, useState } from "react";

export const ColorContext = createContext();

export default function ColorContextProvider({ children }) {
    // 상태 정의
    const [color, setColor] = useState("black");

    // 전역 상태 객체 정의
    const value = {
        color,
        setColor
    }

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )

}