package com.smalls.precision.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Immutable
@Table(name="appointments_report_view")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentsReportView {

    @Id
    @Column(name="ID")
    private int appointmentId;

    private String title;

    private String description;

    @Column(name="stylist_id")
    private int stylistId;

    private String stylist;

    @Column(name="stylist_email")
    private String stylistEmail;

    @Column(name="stylist_phone")
    private String stylistPhone;

    private String client;

    @Column(name="client_email")
    private String clientEmail;

    @Column(name="client_phone")
    private String clientPhone;

    @Column(name="start_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime startTime;

    @Column(name="end_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime endTime;

    @Column(name="user_id")
    private int userId;

    private String username;
}
