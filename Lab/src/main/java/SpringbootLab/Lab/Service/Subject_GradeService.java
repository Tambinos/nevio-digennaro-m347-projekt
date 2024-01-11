package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.Subject_Grade;
import SpringbootLab.Lab.Repository.Subject_GradeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Subject_GradeService {
    private final Subject_GradeRepository subject_gradeRepository;

    private final GradeService gradeService;
    private final SubjectService subjectService;

    public Subject_GradeService(Subject_GradeRepository gradeRepository, GradeService gradeService, SubjectService subjectService) {
        this.subject_gradeRepository = gradeRepository;
        this.gradeService = gradeService;
        this.subjectService = subjectService;
    }

    public Subject_Grade add(Subject_Grade subject_grade) {
        if (gradeService.contains(subject_grade.getGrade()) == null||subjectService.contains(subject_grade.getSubject()) == null){
            return null;
        }
        return subject_gradeRepository.save(new Subject_Grade(subjectService.contains(subject_grade.getSubject()),gradeService.contains(subject_grade.getGrade())));
    }

    public void delete(int id) {
        subject_gradeRepository.deleteById(id);
    }

    public void edit(int id, Grade grade) {
        if (gradeService.contains(grade) != null){
            Subject_Grade newSubject_Grade = subject_gradeRepository.getById(id);
            newSubject_Grade.setGrade(gradeService.contains(grade));
            subject_gradeRepository.save(newSubject_Grade);
        }
    }

    public double getAVG(Subject subject) {
        if (subjectService.contains(subject) == null){
            return 0;
        }
        return subject_gradeRepository.calculateAverageGradeBySubjectId(subjectService.contains(subject).getId());
    }

    public List<String> report() {
        List <Subject> subjects = subjectService.getAll();
        List <String> report = new ArrayList<>();
        for (Subject sub: subjects) {
            report.add(sub.getSubject() + ":      " + getAVG(sub));
        }
        return report;
    }
//    public Subject contains(Subject subject){
//        Subject [] contains = new Subject[1];
//        subject_gradeRepository.findAll().forEach(s -> {
//            if (s.getSubject().getSubject().equalsIgnoreCase(subject.getSubject())){
//                contains[0] = s.getSubject();
//            }
//        });
//        return contains[0];
//    }
    public Subject_Grade get(int id){
        return subject_gradeRepository.getById(id);
    }
}
