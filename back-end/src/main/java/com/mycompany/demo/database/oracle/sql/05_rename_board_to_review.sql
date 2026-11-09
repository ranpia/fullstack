-- 기존 데이터를 유지하면서 테이블, PK 컬럼 및 제약조건 이름을 변경한다. 한 번만 실행한다.
WHENEVER SQLERROR EXIT FAILURE ROLLBACK
ALTER TABLE board RENAME TO review;
ALTER TABLE review RENAME COLUMN board_id TO review_id;
ALTER TABLE review RENAME CONSTRAINT pk_board TO pk_review;
ALTER TABLE review RENAME CONSTRAINT fk_board_member TO fk_review_member;
ALTER TABLE review RENAME CONSTRAINT fk_board_product TO fk_review_product;