package AngularexamBackend.AngularexamBackend.Repositories;

import AngularexamBackend.AngularexamBackend.Entities.GeneralData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralDataRepository extends JpaRepository<GeneralData, Long> {
}
