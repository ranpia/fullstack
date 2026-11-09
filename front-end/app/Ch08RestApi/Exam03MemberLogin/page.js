"use client";

import { login } from "@/apis/memberApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClass = "w-full rounded-lg border border-zinc-300 bg-background px-3 py-2 focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-zinc-700";
const buttonClass = "rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-medium hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-zinc-700 dark:hover:bg-zinc-800";



export default function Exam03MemberLogin() {
  const [loginform, setLoginform] = useState({ memberId: "", password: "" });
  const [errors, setErrors] = useState({});


  function validateMemberId(memberId) {
    return memberId.trim() ? "" : "회원 아이디를 입력해 주세요.";
  }

  function validatePassword(password) {
    return password.length > 0 ? "" : "비밀번호를 입력해 주세요.";
  }


  const handleChange = (event) => {
    setLoginform({ ...loginform, [event.target.name]: event.target.value });
    setErrors((prev) => ({ ...prev, [event.target.name]: "" }));
  };

  const validateForm = () => {
    const validationErrors = {
      memberId: validateMemberId(loginform.memberId),
      password: validatePassword(loginform.password),
    };
    setErrors(validationErrors);
    if (Object.values(validationErrors).some((message) => message)) {
      const firstError = Object.keys(validationErrors).find((name) => validationErrors[name]);
      document.getElementById(firstError)?.focus();
      return true;
    }
    return false;
  };

  const router = useRouter();

  const handleLogin = async () => {
    if (validateForm()) return;

    // 로그인 벡엔드 통신
    try {
      const response = await login(loginform);
      console.log(response.data);
      router.push("/Ch08RestApi")
    } catch (error) {
      console.error("로그인 요청 실패:", error.response?.status, error.message);
    }
  };

  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="mx-auto max-w-lg overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Exam03MemberLogin · 로그인</h1>
        </header>
        <div className="p-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="memberId" className="block text-sm font-medium">회원 아이디</label>
              <input id="memberId" aria-invalid={Boolean(errors.memberId)} aria-describedby={errors.memberId ? "memberId-error" : undefined} name="memberId" value={loginform.memberId} onChange={handleChange} type="text" autoComplete="username" placeholder="아이디를 입력하세요" className={inputClass} />
              {errors.memberId && <p id="memberId-error" role="alert" className="text-sm text-red-600 dark:text-red-400">{errors.memberId}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">비밀번호</label>
              <input id="password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} name="password" value={loginform.password} onChange={handleChange} type="password" autoComplete="current-password" placeholder="비밀번호를 입력하세요" className={inputClass} />
              {errors.password && <p id="password-error" role="alert" className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={handleLogin} className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">로그인</button>
              <Link href="/Ch08RestApi/Exam02MemberJoin" className={buttonClass}>회원가입</Link>
              <Link href="/Ch08RestApi" className={buttonClass}>목록(홈)</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
