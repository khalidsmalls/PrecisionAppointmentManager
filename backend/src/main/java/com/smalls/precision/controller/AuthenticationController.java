package com.smalls.precision.controller;

import com.smalls.precision.DTO.LoginDTO;
import com.smalls.precision.DTO.RegistrationDTO;
import com.smalls.precision.DTO.UserDTO;
import com.smalls.precision.model.User;
import com.smalls.precision.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://precisionApptManager:8080", "http://localhost:8080"})
@Data
public class AuthenticationController {

    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(
            AuthenticationService authenticationService
    ) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationDTO dto) {
        try {
            User user = authenticationService.registerUser(
                    dto.getUsername(),
                    dto.getPassword()
            );

            UserDTO userDTO = new UserDTO(
                    user.getUserId(),
                    user.getUsername(),
                    user.getAuthorities()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
        } catch (AuthenticationService.DuplicateUsernameException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username '" + e.getUsername() + "' already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDTO dto, Errors errors) {
        if (errors.hasErrors()) {
            Map<String, String> err = new HashMap<>();
            for (FieldError e : errors.getFieldErrors()) {
                err.put(e.getField(), e.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(err);
        }
        ResponseEntity<?> responseEntity = authenticationService.loginUser(
                dto.getUsername(),
                dto.getPassword()
        );

        if (responseEntity.getBody() instanceof UserDTO userDTO) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(responseEntity.getStatusCode())
                    .body(responseEntity.getBody());
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            SecurityContextHolder.clearContext();
            new SecurityContextLogoutHandler().logout(request, response, auth);

            return ResponseEntity.ok("Logout Successful");
        }

        return ResponseEntity.status(400).body("There was a problem logging out the user");
    }
}
