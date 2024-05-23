package com.smalls.precision.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.*;


@Builder
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private int appointmentId;

    @NotBlank(message = "Field is required")
    private String title;

    @NotBlank(message = "Field is required")
    private String description;

    @Column(name = "stylist_id")
    @NotNull(message = "Field is required")
    private int stylistId;

    @Column(name = "client_id")
    @NotNull(message = "Field is required")
    private int clientId;

    @Column(name="start_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @NotNull(message = "Field is required")
    private ZonedDateTime startTime;

    @Column(name="end_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @NotNull(message = "Field is required")
    private ZonedDateTime endTime;

    @Column(name = "user_id")
    @NotNull(message = "Field is required")
    private int userId;
    
}
