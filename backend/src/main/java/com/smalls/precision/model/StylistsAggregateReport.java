package com.smalls.precision.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name="stylists_aggregate_report_view")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StylistsAggregateReport {

    @Id
    @Column(name="stylist_id")
    private int stylistId;

    private String stylist;

    @Column(name="total_appointments")
    private Long totalAppointments;
}
