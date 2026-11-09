package com.mycompany.demo.database.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.List;
import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.dto.member.MemberSearchCriteria;

import com.mycompany.demo.database.dao.MemberDao;
import com.mycompany.demo.database.entity.Member;
import com.mycompany.demo.jwt.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service("databaseMemberService")
@RequiredArgsConstructor
public class MemberService {
    private final MemberDao memberDao;
    private final JwtService jwtService;

    public Member getMember(String memberId) {
        return memberDao.selectByMemberId(memberId);
    }

    @Transactional
    public int updateMember(Member request) {
        Member member = getMember(request.getMemberId());
        if (member == null) {
            return 0;
        }
        member.setEmail(request.getEmail());
        member.setPassword(request.getPassword());
        return memberDao.update(member);
    }

    public int deleteMember(String memberId) {
        return memberDao.deleteByMemberId(memberId);
    }

    public Pager getMemberPager(MemberSearchCriteria request) {
        int totalRows = memberDao.selectCount(memberFilter(request));
        return new Pager(10, 5, totalRows, request.getPageNo());
    }

    public List<Member> listMember(MemberSearchCriteria request, Pager pager) {
        return memberDao.selectByPage(pager, memberFilter(request));
    }

    private Map<String, Object> memberFilter(MemberSearchCriteria request) {
        String left = request.getLeft();
        String right = request.getRight();
        return left.isBlank() || right.isBlank()
                ? Map.of()
                : Map.of(left, right);
    }

    @Transactional
    public Member joinMember(Member member) {
        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        if (memberDao.insert(member) != 1) {
            return null;
        }
        return getMember(member.getMemberId());
    }

    public void unjoin(Member member) {

    }

    public String login(Member member) {
        Member dbMember = memberDao.selectByMemberId(member.getMemberId());
        if (dbMember == null) {
            return "wrongMemberId";
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(member.getPassword(), dbMember.getPassword())) {
            return "success";
        } else {
            return "wrongPassword";
        }
    }

    public void modifyMemberInfo() {

    }

}
