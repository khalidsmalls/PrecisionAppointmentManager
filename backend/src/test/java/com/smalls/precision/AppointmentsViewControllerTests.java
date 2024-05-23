package com.smalls.precision;

import com.smalls.precision.controller.AppointmentsViewController;
import com.smalls.precision.model.AppointmentsView;
import com.smalls.precision.model.Client;
import com.smalls.precision.repository.AppointmentsViewRepository;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.*;
import java.util.ArrayList;
import java.util.Arrays;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AppointmentsViewController.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class AppointmentsViewControllerTests {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    AppointmentsViewRepository repo;

    Client george = new Client(
            63,
            "george",
            "russel",
            "george@example.com",
            "2348765",
            413
    );

    ZonedDateTime appt1Start = ZonedDateTime.of(
            LocalDateTime.of(2022,6,1,8,30),
            ZoneId.systemDefault()
    );
    ZonedDateTime appt1End = ZonedDateTime.of(
            LocalDateTime.of(2022,6,1,10,15),
            ZoneId.systemDefault()
    );

    AppointmentsView appointment1 = new AppointmentsView(
            333,
            "hot new style",
            "pompadour",
            63,
            "george",
            "george@example.com",
            "8675309",
            "lewis",
            appt1Start,
            appt1End,
            "phil",
            1
    );

    ZonedDateTime appt2Start = ZonedDateTime.of(
            LocalDateTime.of(2023,9,3,9,15),
            ZoneId.systemDefault()
    );
    ZonedDateTime appt2End = ZonedDateTime.of(
            LocalDateTime.of(2023,9,3,10,30),
            ZoneId.systemDefault()
    );

    AppointmentsView appointment2 = new AppointmentsView(
            444,
            "new look",
            "wolf",
            63,
            "george",
            "george@example.com",
            "8675309",
            "lewis",
            appt2Start,
            appt2End,
            "phil",
            1
    );

    @Test
    @WithMockUser
    public void getAllByClientId() throws Exception {
        Mockito.when(repo.findAllByClientId(george.getClientId()))
                .thenReturn(new ArrayList<>(Arrays.asList(
                        appointment1,
                        appointment2
                )));

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/appointments/appointmentsView/byClientId/" + george.getClientId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[1].description")
                        .value("wolf"));
    }

    @Test
    @WithMockUser
    public void findById() throws Exception {
        Mockito.when(repo.findById(appointment2.getAppointmentId()))
                .thenReturn(appointment2);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/appointments/appointmentsView/" + appointment2.getAppointmentId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
