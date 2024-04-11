package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Entity.Grade;
import SpringbootLab.Lab.Entity.Subject;
import SpringbootLab.Lab.Entity.SubjectGrade;
import SpringbootLab.Lab.Entity.User;
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
    @Autowired
    UserService userService;
    Grade grade = new Grade(5);
    Grade grade1 = new Grade(3);
    Subject subject = new Subject("MATH");
    User user = new User("Hans", "hansiPeter", false);

    @BeforeEach
    public void addBasicThings() {
        gradeService.add(grade);
        gradeService.add(grade1);
        subjectService.add(subject);
        userService.add(user);
    }

    @DirtiesContext
    @Transactional
    @Test
    void edit() {
        SubjectGrade subjectGrades = new SubjectGrade(subject, grade1,user);
        subjectGradeService.add(subjectGrades);
        subjectGradeService.edit(1, new Grade(5));
        assertEquals(5, subjectGradeService.getAVG(subject.getId(), user.getId()));
    }

    @DirtiesContext
    @Transactional
    @Test
    void delete() {
        subjectGradeService.add(new SubjectGrade(subject, grade,user));
        assertEquals(5, subjectGradeService.getAVG(subject.getId(), user.getId()));
        subjectGradeService.delete(1);
        assertEquals(0, subjectGradeService.getAVG(subject.getId(), user.getId()));
    }



    @DirtiesContext
    @Transactional
    @Test
    void getAVG() {
        subjectGradeService.add(new SubjectGrade(subject, grade,user));
        subjectGradeService.add(new SubjectGrade(subject, grade1,user));
        assertEquals(4, subjectGradeService.getAVG(subject.getId(), user.getId()));
    }

    @DirtiesContext
    @Transactional
    @Test
    void report() {
        subjectGradeService.add(new SubjectGrade(subject, grade,user));
        assertEquals("[MATH:      5.0]", subjectGradeService.report(user.getId()).toString());
    }
    @DirtiesContext
    @Transactional
    @Test
    void get(){
        SubjectGrade subject_grade = new SubjectGrade(subject,grade,user);
        subjectGradeService.add(subject_grade);
        assertEquals(subject_grade.getGrade(), subjectGradeService.get(1).getGrade());
        assertEquals(subject_grade.getSubject(), subjectGradeService.get(1).getSubject());

    }
    @DirtiesContext
    @Transactional
    @Test
    void getAVGReturns0(){
        assertEquals(0,subjectGradeService.getAVG(new Subject("12345").getId(),user.getId()));
    }
}