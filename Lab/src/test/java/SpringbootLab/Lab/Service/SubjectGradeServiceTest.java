package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.SubjectGrade;
import SpringbootLab.Lab.Repository.SubjectGradeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest()
class SubjectGradeServiceTest {

    @Autowired
    SubjectGradeService subjectGradeService;
    @Autowired
    SubjectGradeRepository subject_gradeRepository;
    @Autowired
    SubjectService subjectService;
    @Autowired
    GradeService gradeService;
    Grade grade = new Grade(5);
    Grade grade1 = new Grade(3);
    Subject subject = new Subject("MATH");

    @DirtiesContext
    @Transactional
    @Test
    void edit() {
        SubjectGrade subjectGrades = new SubjectGrade(subject, grade1);
        subjectGradeService.add(subjectGrades);
        subjectGradeService.edit(1, new Grade(5));
        assertEquals(5, subjectGradeService.getAVG(subject));
    }

    @DirtiesContext
    @Transactional
    @Test
    void delete() {
        subjectGradeService.add(new SubjectGrade(subject, grade));
        assertEquals(5, subjectGradeService.getAVG(subject));
        subjectGradeService.delete(1);
        assertEquals(0, subjectGradeService.getAVG(subject));
    }

    @DirtiesContext
    @BeforeEach
    public void addBasicThings() {
        gradeService.add(grade);
        gradeService.add(grade1);
        subjectService.add(subject);
    }

    @DirtiesContext
    @Transactional
    @Test
    void getAVG() {
        subjectGradeService.add(new SubjectGrade(subject, grade));
        subjectGradeService.add(new SubjectGrade(subject, grade1));
        assertEquals(4, subjectGradeService.getAVG(subject));
    }

    @DirtiesContext
    @Transactional
    @Test
    void report() {
        subjectGradeService.add(new SubjectGrade(subject, grade));
        assertEquals("[MATH:      5.0]", subjectGradeService.report().toString());
    }
    @DirtiesContext
    @Transactional
    @Test
    void get(){
        SubjectGrade subject_grade = new SubjectGrade(subject,grade);
        subjectGradeService.add(subject_grade);
        assertEquals(subject_grade.getGrade(), subjectGradeService.get(1).getGrade());
        assertEquals(subject_grade.getSubject(), subjectGradeService.get(1).getSubject());

    }
    @DirtiesContext
    @Transactional
    @Test
    void getAVGReturns0(){
        assertEquals(0,subjectGradeService.getAVG(new Subject("12345")));
    }
}