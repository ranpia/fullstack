-- 2단계: 01_create_tables.sql의 테이블에 테스트 데이터 총 50건을 넣는다.
-- 기존 6개 테이블의 데이터는 모두 삭제한다. 실패하면 삭제와 삽입을 함께 롤백한다.
-- 회원 이름을 포함해 schema.dbml의 컬럼을 사용하며 후기에는 상품 FK를 저장한다.
-- 회원 10 + 판매자 5 + 상품 10 + 주문 8 + 주문 항목 12 + 후기 5 = 50건.
-- SQL Developer F5 또는 SQL*Plus로 실행한다. 다른 미커밋 작업이 없는 세션에서 실행한다.
-- 숫자 ID는 초기화하지 않으며 RETURNING으로 실제 생성된 ID를 참조한다.
-- 비밀번호 해시는 데이터 예제용이며 실제 로그인에는 사용하지 않는다.
WHENEVER SQLERROR EXIT FAILURE ROLLBACK
SET DEFINE OFF

DECLARE
    v_seller1 seller.seller_id%TYPE;
    v_seller2 seller.seller_id%TYPE;
    v_seller3 seller.seller_id%TYPE;
    v_seller4 seller.seller_id%TYPE;
    v_seller5 seller.seller_id%TYPE;
    v_product1 product.product_id%TYPE;
    v_product2 product.product_id%TYPE;
    v_product3 product.product_id%TYPE;
    v_product4 product.product_id%TYPE;
    v_product5 product.product_id%TYPE;
    v_product6 product.product_id%TYPE;
    v_product7 product.product_id%TYPE;
    v_product8 product.product_id%TYPE;
    v_product9 product.product_id%TYPE;
    v_product10 product.product_id%TYPE;
    v_order1 orders.order_id%TYPE;
    v_order2 orders.order_id%TYPE;
    v_order3 orders.order_id%TYPE;
    v_order4 orders.order_id%TYPE;
    v_order5 orders.order_id%TYPE;
    v_order6 orders.order_id%TYPE;
    v_order7 orders.order_id%TYPE;
    v_order8 orders.order_id%TYPE;
    v_total PLS_INTEGER;
BEGIN
    -- 자식 테이블부터 삭제한다.
    DELETE FROM review;
    DELETE FROM order_item;
    DELETE FROM orders;
    DELETE FROM product;
    DELETE FROM seller;
    DELETE FROM member;

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user1', '김민수', LOWER(RAWTOHEX(STANDARD_HASH('demo-user1-password', 'SHA256'))), 'user1@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user2', '이서연', LOWER(RAWTOHEX(STANDARD_HASH('demo-user2-password', 'SHA256'))), 'user2@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user3', '박지훈', LOWER(RAWTOHEX(STANDARD_HASH('demo-user3-password', 'SHA256'))), 'user3@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user4', '최수빈', LOWER(RAWTOHEX(STANDARD_HASH('demo-user4-password', 'SHA256'))), 'user4@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user5', '정하준', LOWER(RAWTOHEX(STANDARD_HASH('demo-user5-password', 'SHA256'))), 'user5@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user6', '강지우', LOWER(RAWTOHEX(STANDARD_HASH('demo-user6-password', 'SHA256'))), 'user6@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user7', '조서준', LOWER(RAWTOHEX(STANDARD_HASH('demo-user7-password', 'SHA256'))), 'user7@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user8', '윤하린', LOWER(RAWTOHEX(STANDARD_HASH('demo-user8-password', 'SHA256'))), 'user8@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user9', '장도윤', LOWER(RAWTOHEX(STANDARD_HASH('demo-user9-password', 'SHA256'))), 'user9@example.com');

    INSERT INTO member (member_id, member_name, password, email)
    VALUES ('user10', '임예린', LOWER(RAWTOHEX(STANDARD_HASH('demo-user10-password', 'SHA256'))), 'user10@example.com');

    INSERT INTO seller (seller_name, email, phone)
    VALUES ('테스트 상점 1', 'seller1@example.com', '010-0000-0001')
    RETURNING seller_id INTO v_seller1;

    INSERT INTO seller (seller_name, email, phone)
    VALUES ('테스트 상점 2', 'seller2@example.com', '010-0000-0002')
    RETURNING seller_id INTO v_seller2;

    INSERT INTO seller (seller_name, email, phone)
    VALUES ('테스트 상점 3', 'seller3@example.com', '010-0000-0003')
    RETURNING seller_id INTO v_seller3;

    INSERT INTO seller (seller_name, email, phone)
    VALUES ('테스트 상점 4', 'seller4@example.com', '010-0000-0004')
    RETURNING seller_id INTO v_seller4;

    INSERT INTO seller (seller_name, email, phone)
    VALUES ('테스트 상점 5', 'seller5@example.com', '010-0000-0005')
    RETURNING seller_id INTO v_seller5;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 키보드', 45000, v_seller1)
    RETURNING product_id INTO v_product1;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 마우스', 25000, v_seller1)
    RETURNING product_id INTO v_product2;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 노트', 3000, v_seller2)
    RETURNING product_id INTO v_product3;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 모니터', 220000, v_seller2)
    RETURNING product_id INTO v_product4;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 헤드셋', 65000, v_seller3)
    RETURNING product_id INTO v_product5;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 볼펜', 1500, v_seller3)
    RETURNING product_id INTO v_product6;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 책상', 150000, v_seller4)
    RETURNING product_id INTO v_product7;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 의자', 99000, v_seller4)
    RETURNING product_id INTO v_product8;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 스탠드', 32000, v_seller5)
    RETURNING product_id INTO v_product9;

    INSERT INTO product (product_name, price, seller_id)
    VALUES ('테스트 텀블러', 18000, v_seller5)
    RETURNING product_id INTO v_product10;

    INSERT INTO orders (member_id)
    VALUES ('user1')
    RETURNING order_id INTO v_order1;

    INSERT INTO orders (member_id)
    VALUES ('user2')
    RETURNING order_id INTO v_order2;

    INSERT INTO orders (member_id)
    VALUES ('user3')
    RETURNING order_id INTO v_order3;

    INSERT INTO orders (member_id)
    VALUES ('user4')
    RETURNING order_id INTO v_order4;

    INSERT INTO orders (member_id)
    VALUES ('user5')
    RETURNING order_id INTO v_order5;

    INSERT INTO orders (member_id)
    VALUES ('user6')
    RETURNING order_id INTO v_order6;

    INSERT INTO orders (member_id)
    VALUES ('user7')
    RETURNING order_id INTO v_order7;

    INSERT INTO orders (member_id)
    VALUES ('user8')
    RETURNING order_id INTO v_order8;

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order1, v_product1, 2, 45000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order2, v_product2, 3, 25000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order3, v_product3, 1, 3000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order4, v_product4, 2, 220000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order5, v_product5, 3, 65000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order6, v_product6, 1, 1500);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order7, v_product7, 2, 150000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order8, v_product8, 3, 99000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order1, v_product2, 2, 25000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order2, v_product3, 2, 3000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order3, v_product4, 2, 220000);

    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES (v_order4, v_product5, 2, 65000);

    INSERT INTO review (title, content, writer, product_id)
    VALUES ('테스트 키보드 사용 후기', '배송이 빠르고 품질이 만족스럽습니다.', 'user1', v_product1);

    INSERT INTO review (title, content, writer, product_id)
    VALUES ('테스트 마우스 사용 후기', '배송이 빠르고 품질이 만족스럽습니다.', 'user2', v_product2);

    INSERT INTO review (title, content, writer, product_id)
    VALUES ('테스트 노트 사용 후기', '배송이 빠르고 품질이 만족스럽습니다.', 'user3', v_product3);

    INSERT INTO review (title, content, writer, product_id)
    VALUES ('테스트 모니터 사용 후기', '배송이 빠르고 품질이 만족스럽습니다.', 'user4', v_product4);

    INSERT INTO review (title, content, writer, product_id)
    VALUES ('테스트 헤드셋 사용 후기', '배송이 빠르고 품질이 만족스럽습니다.', 'user5', v_product5);

    SELECT (SELECT COUNT(*) FROM member)
         + (SELECT COUNT(*) FROM seller)
         + (SELECT COUNT(*) FROM product)
         + (SELECT COUNT(*) FROM orders)
         + (SELECT COUNT(*) FROM order_item)
         + (SELECT COUNT(*) FROM review)
    INTO v_total FROM dual;
    IF v_total <> 50 THEN
        RAISE_APPLICATION_ERROR(-20001, '테스트 데이터 합계가 50건이 아닙니다.');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

COMMIT;

SELECT 'member' AS table_name, COUNT(*) AS row_count FROM member
UNION ALL SELECT 'seller', COUNT(*) FROM seller
UNION ALL SELECT 'product', COUNT(*) FROM product
UNION ALL SELECT 'orders', COUNT(*) FROM orders
UNION ALL SELECT 'order_item', COUNT(*) FROM order_item
UNION ALL SELECT 'review', COUNT(*) FROM review;
