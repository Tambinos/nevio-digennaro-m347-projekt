package SpringbootLab.Lab.Service;

import SpringbootLab.Lab.Databases.User;
import SpringbootLab.Lab.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public void add(User user) {
        userRepository.save(user);
    }

    public List<User> getAll() {
        return userRepository.findAll();
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
