import axios from "axios";

// 백엔드 기본 포트는 80입니다. 환경별 주소는 환경 변수로 변경할 수 있습니다.
const apiClient = axios.create({
  baseURL: "http://localhost",
  timeout: 10000,
});

export default apiClient;
