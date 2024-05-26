package com.smalls.precision.controller;

import com.smalls.precision.DTO.StylistDTO;
import com.smalls.precision.model.Stylist;
import com.smalls.precision.repository.StylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/stylists")
public class StylistController {

    @Autowired
    private StylistRepository repo;

    @GetMapping
    public Iterable<Stylist> getAllStylists() {
        return repo.findAll();
    }

    @GetMapping("dto")
    public ResponseEntity<Iterable<StylistDTO>> getAllStylistDTOs() {
        Iterable<Stylist> stylists = repo.findAll();

        Iterable<StylistDTO> stylistDTOs = StreamSupport.stream(stylists.spliterator(), false)
                .map(stylist -> new StylistDTO(
                        stylist.getStylistId(),
                        stylist.getFirstName() + " " + stylist.getLastName())
                )
                .collect(Collectors.toList());

        return ResponseEntity.ok(stylistDTOs);
    }
}
