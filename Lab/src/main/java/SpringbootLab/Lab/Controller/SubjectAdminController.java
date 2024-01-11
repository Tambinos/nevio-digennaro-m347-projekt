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

    @PostMapping("/create")
    public Subject createNewSubject(@RequestBody Subject subject) {
        return subjectService.add(subject);
    }

    @DeleteMapping("/delete")
    public void deleteSubject(@RequestBody int id) {
        subjectService.delete(id);
    }

    @GetMapping("/all")
    public List<Subject> allSubjects() {
        return subjectService.getAll();
    }

    @PutMapping("/editSubject")
    public void editSubject(@RequestBody int id, String newSubject) {
        subjectService.edit(id, newSubject);
    }
}
