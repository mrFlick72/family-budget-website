package it.valeriovaudi.familybudget.familybudgetwebsite.web.endpoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.model.messages.DictionaryMessage;
import it.valeriovaudi.familybudget.familybudgetwebsite.domain.repository.DictionaryMessageRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Locale;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(value = MessagesEndPoint.class, secure = false)
public class MessagesEndPointTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DictionaryMessageRepository dictionaryMessageRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void saveANewMessage() throws Exception {
        DictionaryMessage dictionaryMessage = new DictionaryMessage("page", Locale.ITALIAN, "actualKey", "message");

        mockMvc.perform(put("/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(dictionaryMessage)))
                .andExpect(status().isNoContent())
                .andExpect(header().string("LOCATION", "http://localhost/messages/page/key/actualKey/lang/it"));

        verify(dictionaryMessageRepository).save(dictionaryMessage);
    }
}