-- 3단계(선택): 02_insert.sql 실행 후 테스트 데이터를 수정하는 예제.
-- SQL Developer의 스크립트 실행(F5) 또는 SQL*Plus에서 실행한다.
WHENEVER SQLERROR EXIT FAILURE ROLLBACK
SET DEFINE OFF

-- 1. 회원 이름과 연락처 변경.
UPDATE member
SET member_name = '김민수',
    email = 'user1.updated@example.com'
WHERE member_id = 'user1';

-- 2. 판매자 연락처 변경.
UPDATE seller
SET phone = '010-0000-1001'
WHERE email = 'seller1@example.com';

-- 3. 상품 현재 가격 변경. 기존 주문의 unit_price는 구매 당시 가격을 유지한다.
UPDATE product
SET price = 42000
WHERE product_name = '테스트 키보드'
  AND seller_id IN (SELECT seller_id FROM seller WHERE email = 'seller1@example.com');

-- 4. user1의 테스트 마우스 주문 수량을 2개에서 3개로 변경.
UPDATE order_item
SET quantity = 3
WHERE order_id IN (SELECT order_id FROM orders WHERE member_id = 'user1')
  AND product_id IN (
      SELECT product_id FROM product
      WHERE product_name = '테스트 마우스'
        AND seller_id IN (SELECT seller_id FROM seller WHERE email = 'seller1@example.com')
  );

-- 5. 후기 내용 수정. 최초 작성 일시는 유지한다.
UPDATE review
SET title = '테스트 키보드 사용 후기 (수정)',
    content = '며칠 더 사용해 보니 키감과 소음 모두 만족스럽습니다.'
WHERE writer = 'user1'
  AND product_id IN (
      SELECT product_id FROM product
      WHERE product_name = '테스트 키보드'
        AND seller_id IN (SELECT seller_id FROM seller WHERE email = 'seller1@example.com')
  );

COMMIT;

SELECT member_id, member_name, email FROM member WHERE member_id = 'user1';
SELECT seller_id, seller_name, phone FROM seller WHERE email = 'seller1@example.com';
SELECT product_id, product_name, price FROM product WHERE product_name = '테스트 키보드';
SELECT oi.order_id, oi.product_id, oi.quantity, oi.unit_price
FROM order_item oi JOIN orders o ON o.order_id = oi.order_id
WHERE o.member_id = 'user1';
SELECT review_id, title, content, writer FROM review WHERE writer = 'user1';
