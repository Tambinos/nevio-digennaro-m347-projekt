package AngularexamBackend.AngularexamBackend.Controller;

import AngularexamBackend.AngularexamBackend.Entities.Superior;
import AngularexamBackend.AngularexamBackend.Services.SuperiorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class SuperiorsController {
    SuperiorService superiorService;

    public SuperiorsController(SuperiorService superiorService) {
        this.superiorService = superiorService;
    }
    @PostMapping("/setSuperiors")
    public void setSuperiors(@RequestBody Superior[] superiors) {
        superiorService.setSuperiors(superiors);
    }
    @GetMapping("/getSuperiors")
    public List<Superior> getSuperiors() {
        return superiorService.getSuperiors();
    }
}
