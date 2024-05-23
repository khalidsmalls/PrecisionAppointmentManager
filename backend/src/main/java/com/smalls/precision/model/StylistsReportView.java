package com.smalls.precision.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDateTime;

@Entity
@Immutable
@Table(name="stylists_report_view")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StylistsReportView {

    @Id
    @Column(name="appointment_id")
    private int appointmentId;

    private String title;

    private String stylist;

    private String client;

    private String description;

    @Column(name="start_time",
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime startTime;
}
