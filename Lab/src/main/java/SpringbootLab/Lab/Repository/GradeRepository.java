package SpringbootLab.Lab.Repository;

import SpringbootLab.Lab.Databases.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grade,Integer> {

}
