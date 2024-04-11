package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Entity.Grade;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GradeServiceTest {

    @Autowired
    GradeService gradeService;

    @DirtiesContext
    @Transactional
    @Test
    void testAddReturn() {
        Grade grade = new Grade(5.5);
        assertEquals(grade.getGrade(), gradeService.add(grade).getGrade());
        assertEquals(grade.getId(), gradeService.add(grade).getId());
    }

    @DirtiesContext

    @Transactional
    @Test
    void testDelete() {
        gradeService.add(new Grade(5));
        gradeService.delete(1);
        assertThrows(NoSuchElementException.class, () -> {
            gradeService.get(1);
        });
    }
    @DirtiesContext
    @Transactional
    @Test
    void testEdit() {
        gradeService.add(new Grade(5));
        gradeService.edit(1, 3);
        assertEquals(3, gradeService.get(1).getGrade());
    }
    @DirtiesContext
    @Transactional
    @Test
    void testGetAll() {
        gradeService.add(new Grade(0));
        List<Grade> result = gradeService.getAll();
        assertEquals(List.of(new Grade(0)).getFirst().getGrade(), result.getFirst().getGrade());
    }
    @DirtiesContext
    @Transactional
    @Test
    void testContains() {
        assertNull(gradeService.contains(new Grade(0)));
        Grade grade = new Grade(5);
        gradeService.add(grade);
        assertEquals(grade.getGrade(), gradeService.contains(grade).getGrade());

    }
    @DirtiesContext
    @Transactional
    @Test
    void testGet() {
        gradeService.add(new Grade(5));
        Grade result = gradeService.get(1);
        assertEquals(result, gradeService.get(1));
    }
}