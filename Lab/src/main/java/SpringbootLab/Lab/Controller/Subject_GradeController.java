package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.Subject_Grade;
import SpringbootLab.Lab.Service.Subject_GradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
public class Subject_GradeController {
    private final Subject_GradeService subject_gradeService;

    public Subject_GradeController(Subject_GradeService subject_gradeService) {
        this.subject_gradeService = subject_gradeService;
    }

    @PostMapping("/createNewGrade")
    public Subject_Grade createNewGrade(@RequestBody Subject_Grade subject_grade) {
            return subject_gradeService.add(subject_grade);
    }
    @DeleteMapping("/delete")
    public void deleteSubject(@RequestBody Integer id) {
        subject_gradeService.delete(id);
    }
    @PutMapping("/edit")
    public void editSubject(@RequestBody Integer id, Grade grade) {
        subject_gradeService.edit(id,grade);
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
