package SpringbootLab.Lab.Controller;

import SpringbootLab.Lab.DTO.SubjectDto;
import SpringbootLab.Lab.Databases.Subject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Assertions;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class SubjectAdminControllerTest {
    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    @Test
    void testCreateNewSubject() throws Exception {
        Subject subject = new Subject("FRANZ");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(subject);
        mockMvc.perform(post("/api/admin/subject/create").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk());
    }

    @DirtiesContext
    @Transactional
    @Test
    void testDeleteSubject() throws Exception {
        mockMvc.perform(delete("/api/admin/subject/delete").contentType(MediaType.APPLICATION_JSON).content("1")).andExpect(status().isOk());
    }

    @Test
    void testAllSubjects() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("/api/admin/subject/all")).andExpect(status().isOk()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        Assertions.assertEquals("[{\"id\":1,\"subject\":\"FRANZ\"}]",content);
    }

    @Test
    void testEditSubject() throws Exception {
        SubjectDto subject = new SubjectDto(1, "MATH");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(subject);
        mockMvc.perform(put("/api/admin/subject/editSubject").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk());
    }
}