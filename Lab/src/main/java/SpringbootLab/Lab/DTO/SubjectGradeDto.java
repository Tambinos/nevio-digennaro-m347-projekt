package SpringbootLab.Lab.DTO;

import SpringbootLab.Lab.Databases.Grade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class SubjectGradeDto implements Serializable {
    Integer id;
    Grade grade;
}