package com.mycompany.demo.database.controller;

import com.mycompany.demo.jwt.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mycompany.demo.database.dto.common.Pager;
import com.mycompany.demo.database.dto.member.DeleteMemberResponse;
import com.mycompany.demo.database.dto.member.JoinMemberRequest;
import com.mycompany.demo.database.dto.member.ListMemberResponse;
import com.mycompany.demo.database.dto.member.MemberLoginRequest;
import com.mycompany.demo.database.dto.member.MemberLoginResponse;
import com.mycompany.demo.database.dto.member.MemberResponse;
import com.mycompany.demo.database.dto.member.MemberSearchCriteria;
import com.mycompany.demo.database.dto.member.UpdateMemberRequest;
import com.mycompany.demo.database.entity.Member;
import com.mycompany.demo.database.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/database")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final JwtService jwtService;
    private final MemberService memberService;

    @GetMapping("/get-member")
    public MemberResponse getMember(@RequestParam("memberId") String memberId) {
        Member member = memberService.getMember(memberId);
        if (member == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "회원을 찾을 수 없습니다.");
        }
        return MemberResponse.builder()
                .memberId(member.getMemberId())
                .memberName(member.getMemberName())
                .email(member.getEmail())
                .joinedAt(member.getJoinedAt())
                .build();
    }

    @PostMapping("/join-member")
    public MemberResponse joinMember(@RequestBody JoinMemberRequest request) {
        Member member = new Member();
        member.setMemberId(request.getMemberId());
        member.setMemberName(request.getMemberName());
        member.setPassword(request.getPassword());
        member.setEmail(request.getEmail());
        Member joinedMember = memberService.joinMember(member);
        if (joinedMember == null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "회원 가입에 실패했습니다.");
        }
        return MemberResponse.builder()
                .memberId(joinedMember.getMemberId())
                .memberName(joinedMember.getMemberName())
                .email(joinedMember.getEmail())
                .joinedAt(joinedMember.getJoinedAt())
                .build();
    }

    @PutMapping("/update-member")
    public MemberResponse updateMember(@RequestBody UpdateMemberRequest request) {
        if (memberService.getMember(request.getMemberId()) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다.");
        }
        Member member = new Member();
        member.setMemberId(request.getMemberId());
        member.setEmail(request.getEmail());
        member.setPassword(request.getPassword());
        if (memberService.updateMember(member) != 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "회원 수정에 실패했습니다.");
        }
        Member updatedMember = memberService.getMember(member.getMemberId());
        if (updatedMember == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다.");
        }
        return MemberResponse.builder()
                .memberId(updatedMember.getMemberId())
                .memberName(updatedMember.getMemberName())
                .email(updatedMember.getEmail())
                .joinedAt(updatedMember.getJoinedAt())
                .build();
    }

    @DeleteMapping("/delete-member")
    public DeleteMemberResponse deleteMember(@RequestParam("memberId") String memberId) {
        int rows = memberService.deleteMember(memberId);
        return DeleteMemberResponse.builder()
                .success(rows == 1)
                .deletedRows(rows)
                .message(rows == 1 ? "회원 삭제 성공" : "회원 삭제 실패")
                .build();
    }

    @GetMapping("/list-member")
    public ListMemberResponse listMember(@RequestParam("pageNo") int pageNo,
            @RequestParam(value = "left", defaultValue = "") String left,
            @RequestParam(value = "right", defaultValue = "") String right) {
        if (pageNo < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "페이지 번호는 1 이상이어야 합니다.");
        }
        MemberSearchCriteria request = new MemberSearchCriteria();
        request.setPageNo(pageNo);
        request.setLeft(left);
        request.setRight(right);
        Pager pager = memberService.getMemberPager(request);
        return ListMemberResponse.builder()
                .pager(pager)
                .list(memberService.listMember(request, pager).stream()
                        .map(member -> MemberResponse.builder()
                                .memberId(member.getMemberId())
                                .memberName(member.getMemberName())
                                .email(member.getEmail())
                                .joinedAt(member.getJoinedAt())
                                .build())
                        .toList())
                .build();
    }

    @PostMapping("/login-member")
    public MemberLoginResponse login(@RequestBody MemberLoginRequest request) {
        log.info(request.toString());
        Member loginMember = new Member();
        loginMember.setMemberId(request.getMemberId());
        loginMember.setPassword(request.getPassword());

        MemberLoginResponse res = new MemberLoginResponse();
        res.setStatus("fail");
        String result = memberService.login(loginMember);
        if (result.equals("success")) {
            res.setStatus("success");
            Member dbMember = memberService.getMember(loginMember.getMemberId());
            res.setMemberId(dbMember.getMemberId());
            res.setJwt(jwtService.createJwt(dbMember));

        } else if (result.equals("wrongMemberId")) {
            res.setMessage("아이디가 존재하지 않음");

        } else if (result.equals("wrongPassword")) {
            res.setMessage("비밀번호가 틀림");
        }
        return res;
    }

}
