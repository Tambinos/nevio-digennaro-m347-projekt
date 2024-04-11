package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Entity.Grade;
import SpringbootLab.Lab.Repository.GradeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
    public GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public Grade add(Grade grade) {
        if (grade.getGrade() > 6 || grade.getGrade() < 1){
            return new Grade(0);
        }
        return gradeRepository.save(grade);
    }

    public void delete(int id) {
        gradeRepository.deleteById(id);
    }

    public void edit(int id, double newGrade) {
        gradeRepository.getOne(id).setGrade(newGrade);
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
        return gradeRepository.findById(id).get();
    }
}
