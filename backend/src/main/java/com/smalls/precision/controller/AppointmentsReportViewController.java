package com.smalls.precision.controller;

import com.smalls.precision.model.AppointmentsReportView;
import com.smalls.precision.repository.AppointmentsReportViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports/appointmentsReport")
@CrossOrigin(origins = {"http://precisionApptManager:8080", "http://localhost:8080"})
public class AppointmentsReportViewController {

    @Autowired
    private AppointmentsReportViewRepository repo;

    @GetMapping
    public Iterable<AppointmentsReportView> getAppointmentsReportView() {
        return repo.findAll();
    }
}
