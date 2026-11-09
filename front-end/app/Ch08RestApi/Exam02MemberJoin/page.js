"use client";

import { joinMember } from "@/apis/memberApi";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";


const initialForm = { memberId: "", memberName: "", password: "", email: "" };

function validateMemberId(memberId) {
  return memberId.trim() ? "" : "회원 아이디를 입력해 주세요.";
}

function validateMemberName(memberName) {
  return memberName.trim() ? "" : "이름을 입력해 주세요.";
}

function validatePassword(password) {
  return password.trim() ? "" : "비밀번호를 입력해 주세요.";
}

function validateEmail(email) {
  if (!email.trim()) return "이메일을 입력해 주세요.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "올바른 이메일 형식으로 입력해 주세요.";
  return "";
}
const fields = [
  { name: "memberId", label: "회원 아이디", type: "text", autoComplete: "username" },
  { name: "memberName", label: "이름", type: "text", autoComplete: "name" },
  { name: "password", label: "비밀번호", type: "password", autoComplete: "new-password" },
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
];

export default function Exam02MemberJoin() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialForm);
  const [isJoining, setIsJoining] = useState(false);
  const inputs = useRef({});
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleValidate = () => {
    if (isJoining) return;
    const nextErrors = {
      memberId: validateMemberId(form.memberId),
      memberName: validateMemberName(form.memberName),
      password: validatePassword(form.password),
      email: validateEmail(form.email),
    };
    const validatedForm = {
      memberId: form.memberId.trim(),
      memberName: form.memberName.trim(),
      password: form.password,
      email: form.email.trim(),
    };
    setErrors(nextErrors);
    const firstError = fields.find((field) => nextErrors[field.name]);
    if (firstError) { 
      inputs.current[firstError.name]?.focus(); 
      return;
    }
    else {
      submitMember(validatedForm);
    }
  };

  async function submitMember(validatedForm) {
    setIsJoining(true);
    try {
      await joinMember(validatedForm);
      alert("plz login");
      router.push("/Ch08RestApi/Exam03MemberLogin");
    }
    catch (error) {
      alert("joining failed");
      console.log(error.response?.data?.message ?? error.message);
    }
    finally {
      setIsJoining(false);
    }
  }

  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Exam02MemberJoin</h1>
        </header>
        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-bold">회원가입</h2>
            <p className="mt-2 text-sm text-zinc-500">가입에 필요한 회원 정보를 입력해 주세요.</p>
          </div>
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">회원가입 정보</legend>
            {fields.map((field) => (
              <label key={field.name} className="block space-y-2">
                <span className="text-sm font-semibold">{field.label}</span>
                <input
                  ref={(element) => { inputs.current[field.name] = element; }}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={`${field.label} 입력`}
                  className="w-full rounded-xl border border-zinc-200 bg-background px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 dark:border-zinc-700"
                />
                {errors[field.name] && <span id={`${field.name}-error`} role="alert" className="block text-sm text-red-600 dark:text-red-400">{errors[field.name]}</span>}
              </label>
            ))}
          </fieldset>
          <div className="flex justify-end gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setErrors(initialForm);
              }}
              disabled={isJoining}
              className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              초기화
            </button>
            <button type="button" onClick={handleValidate} disabled={isJoining} className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-50">
              회원가입
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
