package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.SubjectGrade;
import SpringbootLab.Lab.Repository.SubjectGradeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubjectGradeService {
    private final SubjectGradeRepository subject_gradeRepository;

    private final GradeService gradeService;
    private final SubjectService subjectService;

    @PersistenceContext
    EntityManager entityManager;

    public SubjectGradeService(SubjectGradeRepository subject_gradeRepository, GradeService gradeService, SubjectService subjectService) {
        this.subject_gradeRepository = subject_gradeRepository;
        this.gradeService = gradeService;
        this.subjectService = subjectService;
    }

    public void add(SubjectGrade subject_grade) {
        if (!(gradeService.contains(subject_grade.getGrade()) == null || subjectService.contains(subject_grade.getSubject()) == null)) {
            subject_gradeRepository.save(new SubjectGrade(subjectService.contains(subject_grade.getSubject()), gradeService.contains(subject_grade.getGrade())));
        }
    }

    public void delete(int id) {
        subject_gradeRepository.deleteById(id);
    }

    @Transactional
    public void edit(int id, Grade grade) {
        SubjectGrade subject_grade = subject_gradeRepository.getById(id);
        subject_grade.setGrade(gradeService.contains(grade));
        entityManager.merge(subject_grade);
    }


    public double getAVG(Subject subject) {
        if (subjectService.contains(subject) == null) {
            return 0;
        }
        return subject_gradeRepository.calculateAverageGradeBySubjectId(subjectService.contains(subject).getId());
    }

    public List<String> report() {
        List<Subject> subjects = subjectService.getAll();
        List<String> report = new ArrayList<>();
        for (Subject sub : subjects) {
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
    public SubjectGrade get(int id) {
        return subject_gradeRepository.getById(id);
    }
}
