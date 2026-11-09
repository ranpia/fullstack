"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function LoginComponent() {

  const [loginForm, setLoginForm] = useState({ memberId: "", password: "" });
  const { setMemberId, setJwt } = useContext(AuthContext);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const handleLogin = (event) => {
    event.preventDefault();

    if (!loginForm.memberId.trim() || !loginForm.password.trim()) {
      alert("회원 아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    // 서버 인증 연동 전, 전역 상태 갱신을 확인하는 학습용 로그인입니다.
    setMemberId(loginForm.memberId.trim());
    setJwt("JWT_TOKEN_EXAMPLE");
    router.push("/");
  };

  return (
    <section className="w-full rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="rounded-t-lg border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="font-semibold">LoginComponent</h2>
      </header>
      <div className="rounded-b-lg bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10 sm:px-8 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <div className="mx-auto max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
                <rect x="5" y="10" width="14" height="11" rx="3" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">반가워요!</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">회원 아이디와 비밀번호로 로그인해 주세요.</p>
          </div>
          <form onSubmit={handleLogin} onReset={() => setLoginForm({ memberId: "", password: "" })} className="space-y-5">
            <div>
              <label htmlFor="memberId" className="mb-2 block text-sm font-semibold">회원 아이디</label>
              <input
                id="memberId"
                value={loginForm.memberId}
                onChange={(e) => handleInputChange(e)}
                name="memberId"
                type="text"
                autoComplete="username"
                placeholder="아이디를 입력해 주세요"
                required
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">비밀번호</label>
              <input
                id="password"
                value={loginForm.password}
                onChange={(e) => handleInputChange(e)}
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력해 주세요"
                required
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div className="flex gap-3 pt-3">
              <button type="reset" className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                취소
              </button>
              <button type="submit" className="flex-[2] rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
