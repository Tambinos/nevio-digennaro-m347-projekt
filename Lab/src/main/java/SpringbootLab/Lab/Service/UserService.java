package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.User;
import SpringbootLab.Lab.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public void add(User user) {
        if (contains(user) == null) {
            userRepository.save(user);
        }
    }

    public User login(User user) {
        return contains(user);
    }
    public User contains(User user) {
        User[] users = new User[1];
        userRepository.findAll().forEach(s -> {
            if (s.getUsername().equalsIgnoreCase(user.getUsername()) && s.getPassword().equalsIgnoreCase(user.getPassword())) {
                users[0] = s;
            }
        });
        return users[0];
    }
}
