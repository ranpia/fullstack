package com.mycompany.demo.database.dto.member;

import java.util.List;
import com.mycompany.demo.database.dto.common.Pager;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListMemberResponse {
    private Pager pager;
    private List<MemberResponse> list;
}
