package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Subject;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SubjectServiceTest {
    @Autowired
    SubjectService subjectService;

    @DirtiesContext
    @Transactional
    @Test
    void testAdd() {
        subjectService.add(new Subject("FRANZ"));
        assertEquals("FRANZ", subjectService.get(1).getSubject());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testDelete() {
        subjectService.add(new Subject("Franz"));
        subjectService.delete(1);
        assertThrows(NoSuchElementException.class, () -> {
            subjectService.get(1);
        });
    }

    @DirtiesContext
    @Transactional
    @Test
    void testEdit() {
        subjectService.add(new Subject("FRANZ"));
        subjectService.edit(1, "MATH");
        assertEquals("MATH", subjectService.get(1).getSubject());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testGetAll() {
        subjectService.add(new Subject("FRANZ"));
        subjectService.add(new Subject("MATH"));
        subjectService.add(new Subject("ENGLISCH"));
        assertEquals(List.of(new Subject("FRANZ")).getFirst().getSubject(), subjectService.getAll().getFirst().getSubject());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testContains() {
        subjectService.add(new Subject("FRANZ"));
        assertEquals(new Subject("FRANZ").getSubject(), subjectService.contains(new Subject("FRANZ")).getSubject());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testGet() {
        subjectService.add(new Subject("FRANZ"));
        assertEquals(new Subject("FRANZ").getSubject(), subjectService.get(1).getSubject());
    }
}
