package com.smalls.precision.controller;

import com.smalls.precision.model.StylistsReportView;
import com.smalls.precision.repository.StylistsReportViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports/stylistsReport")
public class StylistsReportViewController {

    @Autowired
    private StylistsReportViewRepository repo;

    @GetMapping
    public Iterable<StylistsReportView> getStylistsReport() {
        return repo.findAll();
    }
}
