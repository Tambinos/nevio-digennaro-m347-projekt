package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.Subject_Grade;
import SpringbootLab.Lab.Repository.GradeRepository;
import SpringbootLab.Lab.Repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GradeService {
    public GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Grade add(Grade grade) {
        return gradeRepository.save(grade);
    }

    public void delete(int id) {
        gradeRepository.deleteById(id);
    }

    public void edit(int id, double newGrade) {
        gradeRepository.findById(id).get().setGrade(newGrade);
    }

    public List<Grade> getAll() {
        return gradeRepository.findAll();
    }
    public Grade contains(Grade grade){
        Grade [] contains = new Grade[1];
        gradeRepository.findAll().forEach(s -> {
            if (s.getGrade() == grade.getGrade()){
                contains[0] = s;
            }
        });
        return contains[0];
    }
    public Grade get(int id){
        return gradeRepository.getById(id);
    }
}
