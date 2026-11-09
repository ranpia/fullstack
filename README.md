# fullstack

Spring Boot 백엔드와 Next.js 프론트엔드 학습 프로젝트입니다.

- `back-end/`: Java 21, Spring Boot, MyBatis, Oracle
- `front-end/`: Next.js, React, Tailwind CSS

## 실행

백엔드는 `back-end` 폴더에서 `./gradlew bootRun` (Windows: `.\gradlew.bat bootRun`)으로 실행합니다.
환경 변수 `OPENAI_API_KEY`, `JWT_SECRET_KEY`를 설정하고, Oracle 접속 정보는 `ORACLE_DB_URL`, `ORACLE_DB_USERNAME`, `ORACLE_DB_PASSWORD`로 지정합니다.
기본 서버 포트는 80입니다. DB 스키마와 SQL은 `back-end/src/main/java/com/mycompany/demo/database/oracle/`에 있습니다.

프론트엔드는 `front-end` 폴더에서 `npm ci` 후 `npm run dev`로 실행합니다.
브라우저에서 http://localhost:3000 으로 접속합니다.

비밀 값과 로컬 환경 파일, 빌드 결과물은 커밋하지 않습니다.
