"use client";

import { useState } from "react";
import { memberJoin } from "@/apis/reviewApi";
import { useRouter } from "next/navigation";

export default function Exam02MemberJoin() {
  // 각 양식별로 유효성 검사를 하는 함수 정의
  function validateMemberId(value) {
    return value.trim() ? "" : "아이디를 입력해 주세요.";
  }

  function validateMemberName(value) {
    return value.trim() ? "" : "이름을 입력해 주세요.";
  }

  function validatePassword(value) {
    return value.trim() ? "" : "비밀번호를 입력해 주세요.";
  }

  function validateEmail(value) {
    if (!value.trim()) return "이메일을 입력해 주세요.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "올바른 이메일 형식으로 입력해 주세요.";
  }

  // 양식의 일름을 속성으로, 값을 유효성 함수로 갖는 객체 생성
  const validators = {
    memberId: validateMemberId,
    memberName: validateMemberName,
    password: validatePassword,
    email: validateEmail,
  };

  // 각 양식별로 에러 메시지를 저장하는 상태 정의
  const [errors, setErrors] = useState({});
  const [isJoining, setIsJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");

  // 양식의 데이터를 바인딩하는 상태 정의
  const [joinForm, setJoinForm] = useState({
    memberId: "",
    memberName: "",
    password: "",
    email: "",
  });

  // 양식에 입력된 내용을 상태로 저장하는 함수 정의
  const handleChange = (event) => {
    const { name, value } = event.target;
    setJoinMessage("");
    setJoinForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: validators[name](value) }));
  };

  const router = useRouter();

  // 제출 버튼을 클릭했을 때 처리하는 함수 정의 
  const handleJoin = async () => {
    if (isJoining) return;
    setJoinMessage("");
    const nextErrors = {
      memberId: validateMemberId(joinForm.memberId),
      memberName: validateMemberName(joinForm.memberName),
      password: validatePassword(joinForm.password),
      email: validateEmail(joinForm.email),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some((message) => message)) return;

    setIsJoining(true);
    try {
      await memberJoin(joinForm);
      router.push("/Ch08RestApi/Exam03MemberLogin");
    } catch {
      setJoinMessage("회원가입에 실패했습니다. 입력 내용을 확인하고 다시 시도해 주세요.");
    } finally {
      setIsJoining(false);
    }
  };

  // 초기화 버튼을 클릭했을 때 처리하는 함수 정의
  const handleReset = () => {
    setJoinMessage("");
    setErrors({});
    setJoinForm({
      memberId: "",
      memberName: "",
      password: "",
      email: "",
    });
  };

  return (
    <section className="w-full rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="rounded-t-lg border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="font-semibold">Exam02MemberJoin</h2>
      </header>
      <div className="p-4">
        <fieldset disabled={isJoining} className="m-0 min-w-0 max-w-md space-y-4 border-0 p-0">
          <label className="block text-sm font-medium" htmlFor="memberId">
            아이디
            <input
              id="memberId"
              name="memberId"
              value={joinForm.memberId}
              aria-invalid={Boolean(errors.memberId)}
              aria-describedby={errors.memberId ? "memberId-error" : undefined}
              onChange={handleChange}
              type="text"
              autoComplete="username"
              required
              className="mt-1 block w-full rounded border border-zinc-300 px-3 py-2 focus:outline-2 focus:outline-orange-500 dark:border-zinc-600 dark:bg-zinc-800"
            />
            {errors.memberId && <span id="memberId-error" role="alert" className="mt-1 block text-sm text-red-600 dark:text-red-400">{errors.memberId}</span>}
          </label>
          <label className="block text-sm font-medium" htmlFor="memberName">
            이름
            <input
              id="memberName"
              name="memberName"
              value={joinForm.memberName}
              aria-invalid={Boolean(errors.memberName)}
              aria-describedby={errors.memberName ? "memberName-error" : undefined}
              onChange={handleChange}
              type="text"
              autoComplete="name"
              required
              className="mt-1 block w-full rounded border border-zinc-300 px-3 py-2 focus:outline-2 focus:outline-orange-500 dark:border-zinc-600 dark:bg-zinc-800"
            />
            {errors.memberName && <span id="memberName-error" role="alert" className="mt-1 block text-sm text-red-600 dark:text-red-400">{errors.memberName}</span>}
          </label>
          <label className="block text-sm font-medium" htmlFor="password">
            비밀번호
            <input
              id="password"
              name="password"
              value={joinForm.password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              onChange={handleChange}
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full rounded border border-zinc-300 px-3 py-2 focus:outline-2 focus:outline-orange-500 dark:border-zinc-600 dark:bg-zinc-800"
            />
            {errors.password && <span id="password-error" role="alert" className="mt-1 block text-sm text-red-600 dark:text-red-400">{errors.password}</span>}
          </label>
          <label className="block text-sm font-medium" htmlFor="email">
            이메일
            <input
              id="email"
              name="email"
              value={joinForm.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={handleChange}
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded border border-zinc-300 px-3 py-2 focus:outline-2 focus:outline-orange-500 dark:border-zinc-600 dark:bg-zinc-800"
            />
            {errors.email && <span id="email-error" role="alert" className="mt-1 block text-sm text-red-600 dark:text-red-400">{errors.email}</span>}
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={handleJoin} className="rounded bg-orange-500 px-3 py-1.5 text-sm text-white hover:bg-orange-600">
              {isJoining ? "가입 중..." : "회원가입"}
            </button>
            <button type="button" onClick={handleReset} className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800">
              초기화
            </button>
          </div>
          {joinMessage && <p role="status" className="text-sm">{joinMessage}</p>}
        </fieldset>
      </div>
    </section>
  );
}
