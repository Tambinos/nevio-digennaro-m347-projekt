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
    private final UserService userService;


    @PersistenceContext
    EntityManager entityManager;

    public SubjectGradeService(SubjectGradeRepository subject_gradeRepository, GradeService gradeService, SubjectService subjectService, UserService userService) {
        this.subject_gradeRepository = subject_gradeRepository;
        this.gradeService = gradeService;
        this.subjectService = subjectService;
        this.userService = userService;
    }

    public void add(SubjectGrade subject_grade) {
        if (!(gradeService.contains(subject_grade.getGrade()) == null ||
                subjectService.contains(subject_grade.getSubject()) == null) ||
                userService.contains(subject_grade.getUser()) == null) {
            SubjectGrade subjectGrade = new SubjectGrade(
                    subjectService.contains(subject_grade.getSubject()),
                    gradeService.contains(subject_grade.getGrade()),
                    userService.contains(subject_grade.getUser()));
            subjectGrade.setDate(java.time.LocalDate.now().toString());
            subject_gradeRepository.save(subjectGrade);
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


    public double getAVG(Integer subjectId, Long userId) {
        return subject_gradeRepository.calculateAverageGradeBySubjectId(subjectId, userId);
    }

    public List<String> report(Long userId) {
        List<Subject> subjects = subjectService.getAll();
        List<String> report = new ArrayList<>();
        for (Subject sub : subjects) {
            report.add(sub.getSubject() + ":      " + getAVG(sub.getId(), userId));
        }
        return report;
    }

    public List<SubjectGrade> getAllGrades(Long userId) {
        return subject_gradeRepository.findAll().stream().filter(subjectGrade -> subjectGrade.getUser().getId().equals(userId)).toList();
    }

    public SubjectGrade get(int id) {
        return subject_gradeRepository.getById(id);
    }
}
