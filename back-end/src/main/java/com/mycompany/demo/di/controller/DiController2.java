package com.mycompany.demo.di.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.demo.di.service.AiService;
import com.mycompany.demo.di.service.BoardService;
import com.mycompany.demo.di.service.DiInterface;
import com.mycompany.demo.di.service.MemberService;

import lombok.extern.slf4j.Slf4j;


@RestController 
@RequestMapping("/di2")
@Slf4j 
public class DiController2 {

    //의존 주입 방법2: 생성자 주입
    private final MemberService memberService;
    private final BoardService boardService;
    private final AiService aiService;
    private final DiInterface diInterface;
    public DiController2(
        MemberService memberService, 
        BoardService boardService, 
        AiService aiService, 
        @Qualifier ("diInterfaceImplB") DiInterface diInterface) {
        this.memberService = memberService;
        this.boardService = boardService;
        this.aiService = aiService;
        this.diInterface = diInterface;
    }

    @PostMapping("/join")
    public String join() {
        memberService.join();
        return "회원 가입";
    }

    @PostMapping("/board-write")
    public String boardWrite() {
        boardService.write();
        return "게시물 저장";
    }

    @GetMapping("/chat")
    public String chat() {
        aiService.chat();
        return "답변 내용";
    }

    @GetMapping ("/qualifer")
    public String qualifer(){
        diInterface.method();
        return "실행 결과";
    }
    
}
