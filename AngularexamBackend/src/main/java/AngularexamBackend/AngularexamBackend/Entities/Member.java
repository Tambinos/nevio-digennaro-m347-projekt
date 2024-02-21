package AngularexamBackend.AngularexamBackend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table
public class Member {
    @Id
    Long id;
    String name;
    String preName;
    String userName;
    String password;
    String department;
    double workingHours;
    String urlToProfilePicture;
}
