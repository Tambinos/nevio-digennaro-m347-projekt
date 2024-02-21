package AngularexamBackend.AngularexamBackend.Repositories;

import AngularexamBackend.AngularexamBackend.Entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

}
