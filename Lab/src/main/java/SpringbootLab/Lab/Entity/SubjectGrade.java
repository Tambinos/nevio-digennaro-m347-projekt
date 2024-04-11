package SpringbootLab.Lab.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table
public class SubjectGrade {
    @Id
    @GeneratedValue
    Integer id;
    @ManyToOne
    Subject subject;
    @ManyToOne
    Grade grade;
    @ManyToOne
    User user;
    String date;

    public SubjectGrade(Subject subject, Grade grade, User user) {
        this.subject = subject;
        this.grade = grade;
        this.user = user;
    }
}
