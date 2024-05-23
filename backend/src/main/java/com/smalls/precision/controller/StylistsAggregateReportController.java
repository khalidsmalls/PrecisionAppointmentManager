package com.smalls.precision.controller;

import com.smalls.precision.model.StylistsAggregateReport;
import com.smalls.precision.repository.StylistsAggregateReportViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports/stylistsAggregateReport")
@CrossOrigin(origins = {"http://precisionApptManager:8080", "http://localhost:8080"})
public class StylistsAggregateReportController {

    @Autowired
    private StylistsAggregateReportViewRepository repo;

    @GetMapping
    public Iterable<StylistsAggregateReport> getStylistsAggregateReport() {
        return repo.findAll();
    }
}
