package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.DTO.SubjectGradeDto;
import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.SubjectGrade;
import SpringbootLab.Lab.Service.SubjectGradeService;
import org.jetbrains.kotlin.types.ConstantValueKind;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjectGrade")
public class SubjectGradeController {
    private final SubjectGradeService subject_gradeService;

    public SubjectGradeController(SubjectGradeService subject_gradeService) {
        this.subject_gradeService = subject_gradeService;
    }

    @PostMapping("/createNewGrade")
    public void createNewGrade(@RequestBody SubjectGrade subject_grade) {
        subject_gradeService.add(subject_grade);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSubject(@PathVariable Integer id) {
        subject_gradeService.delete(id);
    }

    @PutMapping("/edit/{gradeId}")
    public void editSubject(@PathVariable int gradeId,@RequestBody Grade grade) {
        subject_gradeService.edit(gradeId, grade);
    }

    @GetMapping("/avgGrade/{userId}/{subjectId}")
    public double avgGrade(@PathVariable Integer subjectId,@PathVariable Long userId) {
        return subject_gradeService.getAVG(subjectId, userId);
    }
    @GetMapping("getAllGrades/{userId}")
    public List<SubjectGrade> getAllGrades(@PathVariable Long userId) {
        return subject_gradeService.getAllGrades(userId);
    }

    @GetMapping("/report/{UserId}")
    public List<String> report(@PathVariable Long UserId) {
        return subject_gradeService.report(UserId);
    }
}
