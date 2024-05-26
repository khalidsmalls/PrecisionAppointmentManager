package com.smalls.precision.controller;

import com.smalls.precision.model.AppointmentsView;
import com.smalls.precision.repository.AppointmentsViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/appointments/appointmentsView")
public class AppointmentsViewController {

    @Autowired
    private AppointmentsViewRepository repo;

    @GetMapping
    public Iterable<AppointmentsView> getAppointmentsView() {
        return repo.findAll();
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<AppointmentsView> getById(
            @PathVariable("appointmentId") int appointmentId
    ) {
        AppointmentsView appointment = repo.findById(appointmentId);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @GetMapping("/byClientId/{clientId}")
    public Iterable<AppointmentsView> getAllByClientId(
            @PathVariable("clientId") int clientId
    ) {
        return repo.findAllByClientId(clientId);
    }

    @GetMapping("/upcoming")
    public Iterable<AppointmentsView> getTodaysUpcomingAppointments() {
        return repo.findTodaysUpcomingAppointments();
    }
}
