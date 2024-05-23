package com.smalls.precision.controller;

import com.smalls.precision.DTO.ClientDTO;
import com.smalls.precision.model.Client;
import com.smalls.precision.repository.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/clients", produces = "application/json")
@CrossOrigin(origins = {"http://precisionApptManager:8080", "http://localhost:8080"})
public class ClientController {

    @Autowired
    private ClientRepository repo;

    @GetMapping
    public Iterable<Client> getAllClients() {
        return repo.findAll();
    }

    @GetMapping("dto")
    public ResponseEntity<List<ClientDTO>> getAllClientDTOs() {
        List<Client> clients = (List<Client>) repo.findAll();

        List<ClientDTO> clientDTOs = clients.stream()
                .map(client -> new ClientDTO(
                        client.getClientId(),
                        client.getFirstName() + " " + client.getLastName())
                )
                .collect(Collectors.toList());

        return new ResponseEntity<>(clientDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id") int id) {
        Optional<Client> client = repo.findById(id);

        return client.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search")
    public ResponseEntity<Iterable<Client>> searchByFirstOrLastName(
            @RequestParam("searchTerm") String searchTerm
    ) {
        Iterable<Client> clients = repo.findByFirstNameOrLastNameIgnoreCase(searchTerm);

        if (clients == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(clients, HttpStatus.OK);
        }
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Client postClient(@RequestBody @Valid Client client) {
        return repo.save(client);
    }

    @PutMapping(path = "/{clientId}", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public Client putClient(
            @PathVariable("clientId") int id,
            @RequestBody @Valid Client client
    ) {
        client.setClientId(id);
        return repo.save(client);
    }

    @DeleteMapping("/{clientId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClient(@PathVariable("clientId") int id) {
        try {
            repo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
        }
    }
}
