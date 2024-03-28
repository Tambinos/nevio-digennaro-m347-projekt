package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.DTO.SubjectDto;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/subject")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping("/create")
    public void createNewSubject(@RequestBody Subject subject) {
        subjectService.add(subject);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSubject(@PathVariable int id) {
        subjectService.delete(id);
    }

    @GetMapping("/all")
    public List<Subject> allSubjects() {
        return subjectService.getAll();
    }

    @PutMapping("/editSubject")
    public void editSubject(@RequestBody SubjectDto subjectDto) {
        subjectService.edit(subjectDto.getId(), subjectDto.getSubject()
        );
    }

}
