"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function AppHeader() {
    const router = useRouter();
    const { memberId, setMemberId, setJwt, isLoaded } = useContext(AuthContext);
    const isLoggedIn = Boolean(memberId);

    const handleAuthClick = () => {
      if (isLoggedIn) {
        setMemberId("");
        setJwt("");
        router.push("/");
      } else {
        router.push("/Ch07GlobalState/Exam02AuthContext/LoginComponent");
      }
    };

    return (
        <div className="flex items-center gap-2 bg-black px-4 py-1 text-white">
          <Image src="/logo512.png" alt="React 로고" width={28} height={28} />
          React
          {isLoaded ? (
          <button
            type="button"
            onClick={handleAuthClick}
            className="ml-auto min-w-18 rounded bg-green-600 px-[0.7rem] py-[0.35rem] text-[0.7rem] leading-[1.05rem] text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </button>
          ) : (
            <span aria-hidden="true" className="ml-auto h-7 w-18 shrink-0" />
          )}
        </div>
    );
}
