package com.smalls.precision.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.ZonedDateTime;

@Entity
@Immutable
@Table(name="appointments_view")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentsView {

    @Id
    @Column(name="appointment_id")
    private int appointmentId;

    private String title;

    private String description;

    @Column(name="client_id")
    private int clientId;

    private String client;

    @Column(name="client_email")
    private String clientEmail;

    @Column(name="client_phone")
    private String clientPhone;

    private String stylist;

    @Column(name="start_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime startTime;

    @Column(name="end_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime endTime;

    private String username;

    @Column(name="user_id")
    private int userId;

}
