package AngularexamBackend.AngularexamBackend.Entities;

public class Admin extends Member{
    public Admin(Long id, String name, String preName, String userName, String password, String department, double workingHours, String urlToProfilePicture) {
        super(id, name, preName, userName, password, department, workingHours, urlToProfilePicture);
    }
}
