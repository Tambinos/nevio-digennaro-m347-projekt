package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public Subject add(Subject subject) {
        return subjectRepository.save(subject);
    }

    public void delete(int id) {
        subjectRepository.deleteById(id);
    }

    public void edit(int id, String newSubject) {
        subjectRepository.findById(id).get().setSubject(newSubject);
    }

    public List<Subject> getAll() {
        return subjectRepository.findAll();
    }
}
