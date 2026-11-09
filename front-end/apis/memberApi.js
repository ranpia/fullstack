import apiClient from "./axiosConfig";

// JoinMemberRequest: memberId, memberName, password, email
export async function joinMember(joinForm) {
  // 요청 본문에 raw 형식으로 json이 포함됨
  const response = await apiClient.post("/database/join-member", joinForm);
  return response.data;
}

// loginForm: { memberId : "xxx", password : "xxx" }
export async function login(loginForm) {
  // 요청 본문에 raw 형식으로 json이 포함됨
  const response = await apiClient.post("/database/login-member", loginForm);
  return response;
}
