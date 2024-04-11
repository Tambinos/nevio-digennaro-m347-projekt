package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Entity.Subject;
import SpringbootLab.Lab.Repository.SubjectGradeRepository;
import SpringbootLab.Lab.Repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final SubjectGradeRepository subjectGradeRepository;

    public SubjectService(SubjectRepository subjectRepository, SubjectGradeRepository subjectGradeRepository) {
        this.subjectRepository = subjectRepository;
        this.subjectGradeRepository = subjectGradeRepository;
    }

    public Subject add(Subject subject) {
        subject.setSubject(subject.getSubject());
        return subjectRepository.save(subject);
    }

    public void delete(int id) {
        subjectGradeRepository.findAll().stream().filter(s -> s.getSubject().getId() == id).forEach(s -> subjectGradeRepository.deleteById(s.getId()));
        subjectRepository.deleteById(id);
    }

    public void edit(int id, String newSubject) {
        Subject updatedSubject = subjectRepository.findById(id).get();
        updatedSubject.setSubject(newSubject);
        subjectRepository.save(updatedSubject);
    }

    public List<Subject> getAll() {
        return subjectRepository.findAll();
    }

    public Subject contains(Subject subject) {
        Subject[] contains = new Subject[1];
        subjectRepository.findAll().forEach(s -> {
            if (s.getSubject().equalsIgnoreCase(subject.getSubject())) {
                contains[0] = s;
            }
        });
        return contains[0];
    }

    public Subject get(int id) {
        return subjectRepository.findById(id).get();
    }
}
