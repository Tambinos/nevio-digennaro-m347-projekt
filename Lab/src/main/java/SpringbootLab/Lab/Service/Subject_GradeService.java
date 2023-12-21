package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.Subject_Grade;
import SpringbootLab.Lab.Repository.Subject_GradeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Subject_GradeService {
    private final Subject_GradeRepository gradeRepository;

    public Subject_GradeService(Subject_GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Subject_Grade add(Grade grade, Subject subject) {
        Subject_Grade newSubject_Grade = new Subject_Grade(subject,grade);
        return gradeRepository.save(newSubject_Grade);
    }

    public void delete(int id) {
        gradeRepository.deleteById(id);
    }

    public void edit(int id, Grade grade) {
        gradeRepository.findById(id).get().setGrade(grade);
    }

    public double getAVG(Subject subject) {
        return gradeRepository.calculateAverageGradeBySubjectId(subject.getId());
    }

    public String[] report() {
        String [] report = new String[gradeRepository.gradesSize()];
        for (int i = 0; i < report.length; i++) {
            report[i] = gradeRepository.subject(i) + "  :             " + String.valueOf(gradeRepository.calculateAverageGradeBySubjectId(i));
        }
        return report;
    }
}
