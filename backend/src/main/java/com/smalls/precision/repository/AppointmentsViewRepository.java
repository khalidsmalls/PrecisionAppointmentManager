package com.smalls.precision.repository;

import com.smalls.precision.model.AppointmentsView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentsViewRepository extends CrudRepository<AppointmentsView, Integer> {

    AppointmentsView findById(int appointmentId);

    @Query(value = "SELECT * " +
            "FROM appointments_view " +
            "WHERE client_id = :clientId",
            nativeQuery = true)
    Iterable<AppointmentsView> findAllByClientId(int clientId);

    @Query(value="SELECT * FROM appointments_view " +
            "WHERE CAST(start_time AS date) = CURRENT_DATE " +
            "AND CAST(end_time AS time) > CURRENT_TIME", nativeQuery = true)
    Iterable<AppointmentsView> findTodaysUpcomingAppointments();

}
