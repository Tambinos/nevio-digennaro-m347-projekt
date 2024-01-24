package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.DTO.SubjectGradeDto;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.SubjectGrade;
import SpringbootLab.Lab.Service.SubjectGradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final SubjectGradeService subject_gradeService;

    public UserController(SubjectGradeService subject_gradeService) {
        this.subject_gradeService = subject_gradeService;
    }

    @PostMapping("/createNewGrade")
    public void createNewGrade(@RequestBody SubjectGrade subject_grade) {
        subject_gradeService.add(subject_grade);
    }

    @DeleteMapping("/delete")
    public void deleteSubject(@RequestBody Integer id) {
        subject_gradeService.delete(id);
    }

    @PutMapping("/edit")
    public void editSubject(@RequestBody SubjectGradeDto subjectGradeDto) {
        subject_gradeService.edit(subjectGradeDto.getId(), subjectGradeDto.getGrade());
    }

    @GetMapping("/avgGrade")
    public double avgGrade(@RequestBody Subject subject) {
        return subject_gradeService.getAVG(subject);
    }

    @GetMapping("/report")
    public List<String> report() {
        return subject_gradeService.report();
    }
}
