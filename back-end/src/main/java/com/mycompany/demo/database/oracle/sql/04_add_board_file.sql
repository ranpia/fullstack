-- 기존 board 데이터는 유지하며 첨부 파일 컬럼을 추가한다. 기존 DB에서 한 번 실행한다.
WHENEVER SQLERROR EXIT FAILURE ROLLBACK
ALTER TABLE board ADD (
    file_name VARCHAR2(255 CHAR),
    file_type VARCHAR2(255 CHAR),
    file_data BLOB
);
COMMENT ON COLUMN board.file_name IS '첨부 파일 이름';
COMMENT ON COLUMN board.file_type IS '첨부 파일 MIME 타입';
COMMENT ON COLUMN board.file_data IS '첨부 파일 바이너리 데이터';