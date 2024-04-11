package SpringbootLab.Lab.DTO;

import SpringbootLab.Lab.Entity.Grade;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class SubjectGradeDto implements Serializable {
    Integer id;
    Grade grade;
}