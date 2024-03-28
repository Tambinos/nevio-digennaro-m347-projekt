package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.DTO.SubjectGradeDto;
import SpringbootLab.Lab.Databases.Grade;
import SpringbootLab.Lab.Databases.Subject;
import SpringbootLab.Lab.Databases.SubjectGrade;
import SpringbootLab.Lab.Databases.User;
import SpringbootLab.Lab.Service.GradeService;
import SpringbootLab.Lab.Service.SubjectGradeService;
import SpringbootLab.Lab.Service.SubjectService;
import SpringbootLab.Lab.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class SubjectGradeControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    SubjectGradeService subjectGradeService;
    @Autowired
    GradeService gradeService;
    @Autowired
    SubjectService subjectService;
    @Autowired
    UserService userService;

    @BeforeEach
    void setUP() {
        gradeService.add(new Grade(5));
        subjectService.add(new Subject("GEO"));
        userService.add(new User("Hans", "hansiPeter", false));
        subjectGradeService.add(new SubjectGrade(new Subject("GEO"), new Grade(5), new User("Hans", "hansiPeter", false)));
    }

    @DirtiesContext
    @Transactional
    @Test
    void testCreateNewGrade() throws Exception {
        SubjectGrade subject_grade = new SubjectGrade(new Subject("GEO"), new Grade(5), new User("Hans", "hansiPeter", false));
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(subject_grade);
        mockMvc.perform(post("/api/user/createNewGrade")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
        ).andExpect(status().isOk());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testDeleteSubjectGrade() throws Exception {
        mockMvc.perform(delete("/api/user/delete").contentType(MediaType.APPLICATION_JSON).content("1").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testEditSubject() throws Exception {
        SubjectGradeDto subjectGradeDto = new SubjectGradeDto(1, new Grade(3));
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(subjectGradeDto);
        mockMvc.perform(put("/api/user/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }


    @DirtiesContext
    @Transactional
    @Test
    void testAvgGrade() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(new Subject("GEO"));
        mockMvc.perform(get("/api/user/avgGrade").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk()).andExpect(jsonPath("$").value(5));
    }

    @DirtiesContext
    @Transactional
    @Test
    void testReport() throws Exception {
        gradeService.add(new Grade(4));
        subjectService.add(new Subject("MATH"));
        subjectGradeService.add(new SubjectGrade(new Subject("MATH"), new Grade(4), new User("Hans", "hansiPeter", false)));
        List<String> stringList = new ArrayList<>();
        stringList.add("GEO:      5.0");
        stringList.add("MATH:      4.0");
        mockMvc.perform(get("/api/user/report/" + userService.contains(new User("Hans", "hansiPeter", false)).getId()))
                .andExpect(jsonPath("$")
                        .value(stringList));
    }
}
