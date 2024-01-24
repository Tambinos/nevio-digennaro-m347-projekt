package SpringbootLab.Lab.Databases;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "all_subjects")
public class Subject {
    @Id
    @GeneratedValue
    int id;

    String subject;

    public Subject(String subject) {
        this.subject = subject;
    }
}