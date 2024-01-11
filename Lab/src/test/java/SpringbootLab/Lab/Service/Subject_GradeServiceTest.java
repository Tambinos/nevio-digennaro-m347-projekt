package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.Subject_Grade;
import SpringbootLab.Lab.Repository.Subject_GradeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest()
class Subject_GradeServiceTest {

    @Autowired
    Subject_GradeService subjectGradeServiceLegit;
    @Autowired
    Subject_GradeRepository subject_gradeRepository;
    @Autowired
    SubjectService subjectService;
    @Autowired
    GradeService gradeService;
    Grade grade = new Grade(5);
    Grade grade1 = new Grade(3);
    Subject subject = new Subject("MATH");

    @Transactional
    @Test
    void addReturnValueTest() {
        Subject_Grade subject_grade = new Subject_Grade(subject,grade);
        assertEquals(subject_grade.getGrade(), subjectGradeServiceLegit.add(subject_grade).getGrade());
        assertEquals(subject_grade.getSubject(),subjectGradeServiceLegit.add(subject_grade).getSubject());
    }

    @Test
    void delete() {
        subjectGradeServiceLegit.add(new Subject_Grade(subject, grade1));
        subjectGradeServiceLegit.delete(1);
    }

    @Transactional
    @Test
    void edit() {
        subjectGradeServiceLegit.add(new Subject_Grade(subject, grade1));
        subjectGradeServiceLegit.edit(1, new Grade(5));
        assertEquals(5, subjectGradeServiceLegit.getAVG(subject));
    }

    @BeforeEach
    public void addBasicThings() {
        gradeService.add(grade);
        gradeService.add(grade1);
        subjectService.add(subject);
    }


    @Transactional
    @Test
    void getAVG() {
        subjectGradeServiceLegit.add(new Subject_Grade(subject, grade));
        subjectGradeServiceLegit.add(new Subject_Grade(subject, grade1));
        assertEquals(4, subjectGradeServiceLegit.getAVG(subject));
    }

    @Transactional
    @Test
    void report() {
        subjectGradeServiceLegit.add(new Subject_Grade(subject, grade));
        assertEquals("[MATH:      5.0]", subjectGradeServiceLegit.report().toString());
    }
}