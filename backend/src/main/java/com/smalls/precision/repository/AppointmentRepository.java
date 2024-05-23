package com.smalls.precision.repository;

import com.smalls.precision.model.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {

    @Query(value = "SELECT * FROM appointments " +
            "WHERE stylist_id = ?1 AND " +
            "DATE_TRUNC('day', start_time) = ?2",
            nativeQuery = true)
    List<Appointment> findByStylistIdAndDate(int stylistId, LocalDate date);

    @Query(value = "SELECT * FROM appointments " +
            "WHERE client_id = ?1 AND " +
            "DATE_TRUNC('day', start_time) = ?2",
            nativeQuery = true)
    List<Appointment> findByClientIdAndDate(int clientId, LocalDate date);
}
