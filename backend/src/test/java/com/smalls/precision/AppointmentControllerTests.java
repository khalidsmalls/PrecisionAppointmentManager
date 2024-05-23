package com.smalls.precision;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smalls.precision.controller.AppointmentController;
import com.smalls.precision.model.Appointment;
import com.smalls.precision.repository.AppointmentRepository;
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

import java.time.*;
import java.util.*;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@WebMvcTest(AppointmentController.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class AppointmentControllerTests {

    private static final Logger logger = LoggerFactory.getLogger(
            AppointmentControllerTests.class
    );

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    AppointmentRepository repo;

    Appointment appt101 = new Appointment(
            101,
            "fresh cut",
            "cut and color",
            44,
            16,
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            4,
                            13,
                            10,
                            30
                    ), ZoneId.systemDefault()
            ),
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            4,
                            13,
                            11,
                            30
                    ), ZoneId.systemDefault()
            ),
            99
    );

    Appointment appt102 = new Appointment(
            102,
            "new style",
            "trim",
            44,
            16,
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            10,
                            13,
                            8,
                            0
                    ), ZoneId.systemDefault()
            ),
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            10,
                            13,
                            9,
                            0
                    ), ZoneId.systemDefault()
            ),
            99
    );

    Appointment appt103 = new Appointment(
            103,
            "new Do",
            "highlights",
            44,
            16,
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            10,
                            13,
                            14,
                            30
                    ), ZoneId.systemDefault()
            ),
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            10,
                            13,
                            15,
                            30
                    ), ZoneId.systemDefault()
            ),
            99
    );

    Appointment appt201 = new Appointment(
            201,
            "new style",
            "high and tight",
            63,
            11,
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            9,
                            20,
                            11,
                            0
                    ), ZoneId.systemDefault()
            ),
            ZonedDateTime.of(
                    LocalDateTime.of(
                            2023,
                            9,
                            20,
                            12,
                            15
                    ), ZoneId.systemDefault()
            ),
            99
    );

    List<Appointment> appointments = new ArrayList<>(Arrays.asList(
            appt101,
            appt102,
            appt103,
            appt201
    ));

    ZonedDateTime start = ZonedDateTime.of(
            LocalDateTime.of(
                    2023,
                    4,
                    17,
                    9,
                    0
            ),
            ZoneId.systemDefault()
    );

    ZonedDateTime end = ZonedDateTime.of(
            LocalDateTime.of(
                    2023,
                    4,
                    17,
                    10,
                    0
            ),
            ZoneId.systemDefault()
    );

    Appointment appt333 = new Appointment(
            333,
            "fresh new cut",
            "high and tight",
            63,
            11,
            start,
            end,
            99
    );

    @Test
    @WithMockUser
    public void getAppointmentById() throws Exception {
        Mockito.when(repo.findById(appt333.getAppointmentId()))
                .thenReturn(Optional.ofNullable(appt333));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/333")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.description")
                        .value("high and tight"))
                .andExpect(jsonPath("$.startTime")
                        .value("2023-04-17T09:00:00-04:00"));

        logger.info("Appointment details: {}", appt333);
    }

    @Test
    @WithMockUser
    public void getAppointmentsByClientId() throws Exception {
        Mockito.when(repo.findByClientIdAndDate(16, LocalDate.parse("2023-04-13")))
                .thenReturn(Collections.singletonList(appt101));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/byClient/16")
                        .param("date", "2023-04-13")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$[0].description")
                        .value("cut and color"));
    }

    @Test
    @WithMockUser
    public void getAppointmentsByStylistId() throws Exception {
        Mockito.when(repo.findByStylistIdAndDate(44, LocalDate.parse("2023-10-13")))
                .thenReturn(Arrays.asList(appt102, appt103));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/appointments/byStylist/44")
                        .param("date", "2023-10-13")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$[1].description")
                        .value("highlights"));
    }

    @Test
    @WithMockUser
    public void postAppointment() throws Exception {

        Appointment appt = new Appointment(
                0,
                "fresh cut",
                "pompadour",
                63,
                23,
                ZonedDateTime.of(
                        LocalDateTime.of(
                                2023,
                                11,
                                12,
                                8,
                                30
                        ),
                        ZoneId.systemDefault()
                ),
                ZonedDateTime.of(
                        LocalDateTime.of(
                                2023,
                                11,
                                12,
                                10,
                                0
                        ),
                        ZoneId.systemDefault()
                ),
                1
        );

        Mockito.when(repo.save(appt)).thenReturn(appt);

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders.post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(appt));

        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.description").value("pompadour"))
                .andExpect(jsonPath("$.stylistId").value(63))
                .andExpect(jsonPath("$.clientId").value(23))
                .andExpect(jsonPath("$.startTime").value("2023-11-12T13:30:00Z"))
                .andExpect(jsonPath("$.endTime").value("2023-11-12T15:00:00Z"))
                .andExpect(jsonPath("$.userId").value(1));

        logger.info("Appointment details: {}", appt);
    }

    @Test
    @WithMockUser
    public void putAppointment() throws Exception {
        Appointment updatedAppt = new Appointment(
                311,
                "fresh cut",
                "pompadour",
                63,
                23,
                ZonedDateTime.of(
                        LocalDateTime.of(2023,
                                11,
                                7,
                                13,
                                0),
                        ZoneId.systemDefault()
                ),
                ZonedDateTime.of(
                        LocalDateTime.of(
                                2023,
                                11,
                                7,
                                14,
                                15),
                        ZoneId.systemDefault()
                ),
                1
        );

        Mockito.when(repo.findById(updatedAppt.getAppointmentId()))
                .thenReturn(Optional.of(updatedAppt));

        Mockito.when(repo.save(updatedAppt)).thenReturn(updatedAppt);

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .put("/api/appointments/" + updatedAppt.getAppointmentId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(updatedAppt));

        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.description").value(
                        "pompadour"
                ));
    }

    @Test
    @WithMockUser
    public void deleteAppointmentById() throws Exception {
        Mockito.when(repo.findById(appt102.getAppointmentId()))
                .thenReturn(Optional.of(appt102));

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/appointments/102")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }


}
