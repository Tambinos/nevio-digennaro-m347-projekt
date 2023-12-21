package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.Subject_Grade;
import SpringbootLab.Lab.Service.Subject_GradeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grades")
public class Subject_GradeController {
    private final Subject_GradeService gradeService;

    public Subject_GradeController(Subject_GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @PostMapping("/createNewGrade")
    public Subject_Grade createNewGrade(@RequestBody Grade grade,Subject subject) {

        return gradeService.add(grade,subject);
    }
    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Integer id) {
        gradeService.delete(id);
    }
    @PutMapping("/{id}")
    public void editSubject(@PathVariable Integer id,@RequestBody Grade grade) {
        gradeService.edit(id,grade);
    }
    @GetMapping("/avgGrade")
    public double avgGrade(@RequestBody Subject subject) {
        return gradeService.getAVG(subject);
    }
    @GetMapping("/report")
    public String[] report() {
        return gradeService.report();
    }
}
