package SpringbootLab.Lab.Databases;

import SpringbootLab.Lab.Databases.Subject;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table
public class Subject_Grade {
    public Subject_Grade(Subject subject, Grade grade) {
        this.subject = subject;
        this.grade = grade;
    }

    @Id
    @GeneratedValue
    Integer id;

    @ManyToOne
    Subject subject;

    @ManyToOne
    Grade grade;
}
