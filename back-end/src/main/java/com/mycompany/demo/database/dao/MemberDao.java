package com.mycompany.demo.database.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.entity.Member;

/**
 * 회원 정보에 접근하는 MyBatis DAO.
 * 각 메서드의 SQL은 Mapper XML에 정의한다.
 */
@Mapper
public interface MemberDao {
    int insert(Member member);

    Member selectByMemberId(@Param("memberId") String memberId);

    int selectCount(@Param("where") Map<String, Object> where);

    List<Member> selectByPage(@Param("pager") Pager pager, @Param("where") Map<String, Object> where);

    int update(Member member);

    int deleteByMemberId(@Param("memberId") String memberId);
}
