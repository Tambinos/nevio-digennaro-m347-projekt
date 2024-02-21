package AngularexamBackend.AngularexamBackend.Controller;

import AngularexamBackend.AngularexamBackend.Entities.Member;
import AngularexamBackend.AngularexamBackend.Services.AdminService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    @PostMapping("/addMember")
    public void addMember(@RequestBody Member member) {
        adminService.addMember(member);
    }
}
