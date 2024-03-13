package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.Databases.User;
import SpringbootLab.Lab.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/getUsers")
    public List<User> getUsers() {
        return userService.getAll();
    }
    @PostMapping("/createUser")
    public void createUser(@RequestBody User user) {
        userService.add(user);
    }
}
