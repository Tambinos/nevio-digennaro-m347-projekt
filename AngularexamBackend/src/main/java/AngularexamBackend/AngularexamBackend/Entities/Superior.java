package AngularexamBackend.AngularexamBackend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Superior extends Member {
    Member[] members;

    public Superior(Long id, String name, String preName, String userName, String password, String department, double workingHours, String urlToProfilePicture, Member[] members) {
        super(id, name, preName, userName, password, department, workingHours, urlToProfilePicture);
        this.members = members;
    }
}
