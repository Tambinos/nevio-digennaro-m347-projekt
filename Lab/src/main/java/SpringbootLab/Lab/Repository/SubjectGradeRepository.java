package SpringbootLab.Lab.Repository;

import SpringbootLab.Lab.Databases.SubjectGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectGradeRepository extends JpaRepository<SubjectGrade, Integer> {
    @Query("SELECT coalesce(AVG(grade.grade), 0) FROM SubjectGrade WHERE subject.id = :subjectId AND user.id = :userId")
    Double calculateAverageGradeBySubjectId(@Param("subjectId") Integer subjectId, @Param("userId") Long userId);

    List<SubjectGrade> findAllByUserId(Integer user_id);
}

