package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/subject")
public class SubjectAdminController {
    private final SubjectService subjectService;
    public SubjectAdminController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    public Subject createNewSubject(@RequestBody Subject subject) {
        return subjectService.add(subject);
    }

    @DeleteMapping("{id}")
    public void deleteSubject(@PathVariable int id) {
        subjectService.delete(id);
    }

    @GetMapping("/all")
    public List<Subject> allSubjects() {
        return subjectService.getAll();
    }

    @PutMapping("/{id}")
    public void editSubject(@PathVariable int id, @RequestBody String newSubject) {
        subjectService.edit(id, newSubject);
    }
}
