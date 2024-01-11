package SpringbootLab.Lab.Repository;

import SpringbootLab.Lab.Databases.Subject_Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface Subject_GradeRepository extends JpaRepository<Subject_Grade, Integer> {
    @Query("SELECT coalesce(AVG(grade.grade), 0) FROM Subject_Grade WHERE subject.id = :subjectId")
    Double calculateAverageGradeBySubjectId(@Param("subjectId") Integer subjectId);

    @Query("select count(id) from Subject")
    Integer gradesSize();
    @Query("select subject from Subject where id = :subjectId")
    String subject(@Param("subjectId") Integer subjectId);
}

