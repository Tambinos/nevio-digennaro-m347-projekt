package SpringbootLab.Lab.Repository;

import SpringbootLab.Lab.Databases.SubjectGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectGradeRepository extends JpaRepository<SubjectGrade, Integer> {
    @Query("SELECT coalesce(AVG(grade.grade), 0) FROM SubjectGrade WHERE subject.id = :subjectId AND user.id = :userId")
    Double calculateAverageGradeBySubjectId(@Param("subjectId") Integer subjectId, @Param("userId") Long userId);

    @Query("select count(id) from Subject")
    Integer gradesSize();
    @Query("select subject from Subject where id = :subjectId")
    String subject(@Param("subjectId") Integer subjectId);
}

