package AngularexamBackend.AngularexamBackend.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
@NoArgsConstructor
public class GeneralData {
    @Id
    private Long id;
    String description;
    public GeneralData(Long id, String description) {
        this.id = id;
        this.description = description;
    }
}
