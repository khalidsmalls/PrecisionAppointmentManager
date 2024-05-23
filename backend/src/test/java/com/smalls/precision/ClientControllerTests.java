package com.smalls.precision;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smalls.precision.controller.ClientController;
import com.smalls.precision.model.Client;
import com.smalls.precision.repository.ClientRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ClientController.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class ClientControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    ClientRepository repo;

    Client philCollins = new Client(
            11,
            "phil",
            "collins",
            "phil@example.com",
            "8675309",
            123
    );

    Client peterGabriel = new Client(
            21,
            "peter",
            "gabriel",
            "peter@example.com",
            "1234567",
            311
    );

    Client annieLennox = new Client(
            31,
            "annie",
            "lennox",
            "annie@email.com",
            "0987654",
            413
    );

    @Test
    @WithMockUser
    public void getAllClients() throws Exception {
        List<Client> clients = new ArrayList<>(Arrays.asList(
                philCollins,
                peterGabriel,
                annieLennox
        ));

        Mockito.when(repo.findAll()).thenReturn(clients);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/clients")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[2].firstName", is("annie")));
    }

    @Test
    @WithMockUser
    void getClientById() throws Exception {
        Mockito.when(
                repo.findById(
                        philCollins.getClientId())
        )
                .thenReturn(Optional.ofNullable(philCollins)
        );

        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/11")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.firstName", is("phil")));
    }

    @Test
    @WithMockUser
    void postCustomer() throws Exception {
        Client client = Client.builder()
                .firstName("siouxie")
                .lastName("sioux")
                .email("siouxie@example.com")
                .phone("8675309")
                .build();

        Mockito.when(repo.save(client)).thenReturn(client);

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(client));

        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.firstName", is("siouxie")));
    }

    @Test
    @WithMockUser
    public void putCustomer() throws Exception {
        Client updatedClient = Client.builder()
                .clientId(31)
                .firstName("annie")
                .lastName("lennox")
                .email("annie@email.com")
                .phone("8675309")
                .build();

        Mockito.when(repo.findById(updatedClient.getClientId()))
                .thenReturn(Optional.of(updatedClient));

        Mockito.when(repo.save(updatedClient))
                .thenReturn(updatedClient);

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .put("/api/clients/" + updatedClient.getClientId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(updatedClient));

        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.phone", is("8675309")));

    }

    @Test
    @WithMockUser
    public void deleteCustomerById() throws Exception {
        Mockito.when(repo.findById(peterGabriel.getClientId()))
                .thenReturn(Optional.of(peterGabriel));

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/clients/21")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }



}
