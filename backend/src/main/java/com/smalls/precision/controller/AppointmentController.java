package com.smalls.precision.controller;

import com.smalls.precision.model.Appointment;
import com.smalls.precision.repository.AppointmentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/appointments", produces = "application/json")
public class AppointmentController {

    @Autowired
    private AppointmentRepository repo;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable("id") int id
    ) {
        Optional<Appointment> appointment = repo.findById(id);

        return appointment.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/byStylist/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStylistIdAndDate(
            @PathVariable("id") int id,
            @RequestParam String date
    ) {
        try {
            LocalDate formattedDate = LocalDate.parse(date, formatter);
            List<Appointment> appointments = repo.findByStylistIdAndDate(id, formattedDate);
            if (appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(appointments, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/byClient/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentsByClientIdAndDate(
            @PathVariable("id") int id,
            @RequestParam String date
    ) {
        try {
            LocalDate formattedDate = LocalDate.parse(date, formatter);
            List<Appointment> appointments = repo.findByClientIdAndDate(id, formattedDate);
            if (appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(appointments, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Appointment postAppointment(
            @RequestBody @Valid Appointment appointment
    ) {
        repo.save(appointment);
        return appointment;
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Appointment putAppointment(
            @PathVariable("id") int id,
            @RequestBody @Valid Appointment appointment
    ) {
        appointment.setAppointmentId(id);
        repo.save(appointment);
        return appointment;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable("id") int id) {
        try {
            repo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
        }
    }

}
