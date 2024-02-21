package AngularexamBackend.AngularexamBackend.Services;

import AngularexamBackend.AngularexamBackend.Entities.Member;
import AngularexamBackend.AngularexamBackend.Repositories.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    public List<Member> getAll() {
        return memberRepository.findAll();
    }
}
