package SpringbootLab.Lab.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
@Getter
@AllArgsConstructor
public class SubjectDto implements Serializable {
    int id;
    String subject;
}