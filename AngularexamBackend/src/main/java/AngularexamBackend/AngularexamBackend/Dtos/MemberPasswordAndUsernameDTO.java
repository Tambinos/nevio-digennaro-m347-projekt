package AngularexamBackend.AngularexamBackend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberPasswordAndUsernameDTO {
    private Long id;
    private String username;
    private String password;
}
