package AngularexamBackend.AngularexamBackend.Services;

import AngularexamBackend.AngularexamBackend.Entities.Member;
import AngularexamBackend.AngularexamBackend.Repositories.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    MemberRepository memberRepository;

    public AdminService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void addMember(Member member) {
        memberRepository.save(member);
    }

}
