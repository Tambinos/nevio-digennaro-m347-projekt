package AngularexamBackend.AngularexamBackend.Controller;

import AngularexamBackend.AngularexamBackend.Entities.Member;
import AngularexamBackend.AngularexamBackend.Services.MemberService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/members")
public class MemberController {
    MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/getAll")
    public List<Member> getAllPasswordAndUsername() {
        return memberService.getAll();
    }

}
