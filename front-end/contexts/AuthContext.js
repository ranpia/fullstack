"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [memberId, setMemberId] = useState("");
    const [jwt, setJwt] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    // 저장된 상태를 복원한 뒤에만 저장을 시작합니다.
    /* eslint-disable react-hooks/set-state-in-effect -- 최초 마운트 시 브라우저 저장 값을 React 상태로 복원합니다. */
    useEffect(() => {
      try {
        const savedAuth = localStorage.getItem("auth");

        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);

          if (
            typeof parsed?.memberId === "string" &&
            typeof parsed?.jwt === "string"
          ) {
            setMemberId(parsed.memberId);
            setJwt(parsed.jwt);
          }
        }
      } catch (error) {
        console.error("인증 상태 복원 실패:", error);
      }

      setIsLoaded(true);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    useEffect(() => {
      if (!isLoaded) return;

      try {
        if (memberId) {
          localStorage.setItem("auth", JSON.stringify({ memberId, jwt }));
        } else {
          localStorage.removeItem("auth");
        }
      } catch (error) {
        console.error("인증 상태 저장 실패:", error);
      }
    }, [memberId, jwt, isLoaded]);

    const value = {
        memberId,
        setMemberId,
        jwt,
        setJwt,
        isLoaded,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
