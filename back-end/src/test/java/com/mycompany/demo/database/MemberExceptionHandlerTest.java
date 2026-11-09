package com.mycompany.demo.database;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.mycompany.demo.database.controller.MemberController;
import com.mycompany.demo.database.service.MemberService;
import com.mycompany.demo.database.entity.Member;

class MemberExceptionHandlerTest {
    @Test
    void mapsServiceFailuresToExistingHttpStatuses() throws Exception {
        MemberService service = mock(MemberService.class);
        when(service.getMember("member1")).thenReturn(new Member());
        when(service.updateMember(any())).thenReturn(0);
        var mvc = MockMvcBuilders.standaloneSetup(new MemberController(service))
                .build();

        mvc.perform(get("/database/get-member").param("memberId", "missing"))
                .andExpect(status().isNotFound());
        mvc.perform(get("/database/list-member").param("pageNo", "0"))
                .andExpect(status().isBadRequest());
        mvc.perform(put("/database/update-member").contentType(MediaType.APPLICATION_JSON)
                .content("{\"memberId\":\"member1\",\"email\":\"test@example.com\",\"password\":\"test\"}"))
                .andExpect(status().isConflict());
    }
}
