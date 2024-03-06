package AngularexamBackend.AngularexamBackend.Repositories;

import AngularexamBackend.AngularexamBackend.Entities.Superior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperiorRepository extends JpaRepository<Superior, Long> {
}
