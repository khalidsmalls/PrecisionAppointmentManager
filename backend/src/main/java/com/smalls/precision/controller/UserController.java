package com.smalls.precision.controller;

import com.smalls.precision.DTO.UserDTO;
import com.smalls.precision.model.User;
import com.smalls.precision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users", produces = "application/json")
public class UserController {

    @Autowired
    private UserRepository repo;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUserDTOs() {
        try {
            List<User> users = (List<User>) repo.findAll();

            List<UserDTO> userDTOS = users.stream()
                    .map(user -> new UserDTO(
                            user.getUserId(),
                            user.getUsername(),
                            user.getAuthorities()
                    )).toList();

            if (userDTOS.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(userDTOS, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") int id) {
        try {
            repo.deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {
        }
    }

}
