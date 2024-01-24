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

    public void add(Subject subject) {
        if (contains(subject) != null) {
        }
        subject.setSubject(subject.getSubject().toUpperCase());
        subjectRepository.save(subject);
    }

    public void delete(int id) {
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
