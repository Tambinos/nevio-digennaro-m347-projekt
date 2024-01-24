package SpringbootLab.Lab.Databases;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Table(name = "all_grades")
@NoArgsConstructor
public class Grade {
    @Id
    @GeneratedValue
    int id;
    double grade;

    public Grade(double grade) {
        this.grade = grade;
    }
}
