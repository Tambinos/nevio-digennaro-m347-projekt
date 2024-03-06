package AngularexamBackend.AngularexamBackend.Services;

import AngularexamBackend.AngularexamBackend.Entities.Member;
import AngularexamBackend.AngularexamBackend.Entities.Superior;
import AngularexamBackend.AngularexamBackend.Repositories.MemberRepository;
import AngularexamBackend.AngularexamBackend.Repositories.SuperiorRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SuperiorService {
    MemberRepository memberRepository;
    SuperiorRepository superiorRepository;

    public SuperiorService(MemberRepository memberRepository, SuperiorRepository superiorService) {
        this.memberRepository = memberRepository;
        this.superiorRepository = superiorService;
    }
    public void setSuperiors(Superior[] superiors) {
        superiorRepository.deleteAllInBatch();
        superiorRepository.saveAll(Arrays.stream(superiors).toList());
    }
    public List<Superior> getSuperiors() {
        return superiorRepository.findAll();
    }
}
