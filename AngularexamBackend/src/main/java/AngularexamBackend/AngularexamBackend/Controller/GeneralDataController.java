package AngularexamBackend.AngularexamBackend.Controller;

import AngularexamBackend.AngularexamBackend.Services.GeneralDataService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/generalData")
public class GeneralDataController {
    GeneralDataService generalDataService;

    public GeneralDataController(GeneralDataService generalDataService) {
        this.generalDataService = generalDataService;
    }

    @GetMapping("/getLoggedInUserId")
    public Long getLoggedInUserId() {
        return generalDataService.getGeneralData("loggedInUserId");
    }

    @PostMapping("/setLoggedInUserId")
    public void setLoggedInUserId(@RequestBody Long id) {
        generalDataService.setGeneralData("loggedInUserId", id);
    }

    @GetMapping("/getFocusedUserId")
    public Long getFocusedUserId() {
        return generalDataService.getGeneralData("focusedUserId");
    }

    @PostMapping("/setFocusedUserId")
    public void setFocusedUserId(@RequestBody Long id) {
        generalDataService.setGeneralData("focusedUserId", id);
    }
}
