package com.smalls.precision.service;

import com.smalls.precision.DTO.UserDTO;
import com.smalls.precision.DTO.LoginResponseDTO;
import com.smalls.precision.model.Role;
import com.smalls.precision.model.User;
import com.smalls.precision.repository.RoleRepository;
import com.smalls.precision.repository.UserRepository;
import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
@Data
public class AuthenticationService {

    private UserRepository userRepo;

    private RoleRepository roleRepo;

    private PasswordEncoder encoder;

    private AuthenticationManager authenticationManager;

    private TokenService tokenService;

    @Autowired
    public AuthenticationService(
            UserRepository userRepo,
            RoleRepository roleRepo,
            PasswordEncoder encoder,
            AuthenticationManager authenticationManager,
            TokenService tokenService
    ) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public User registerUser(String username, String password) {
        String encodedPassword = encoder.encode(password);
        Role userRole = roleRepo.findByAuthority("USER").orElseThrow();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);

        if (userRepo.existsByUsername(username)) {
            throw new DuplicateUsernameException(username);
        }

        return userRepo.save(
                new User(
                        0,
                        username,
                        encodedPassword,
                        authorities
                )
        );
    }

    public ResponseEntity<?> loginUser(String username, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = tokenService.generateJwt(auth);

            UserDTO userDTO = userRepo.findByUsername(username)
                    .map(user -> new UserDTO(
                            user.getUserId(),
                            user.getUsername(),
                            user.getAuthorities()
                    ))
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return ResponseEntity.ok(new LoginResponseDTO(userDTO, token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Failed to authenticate user: bad credentials");
        }
    }


    @Getter
    public static class DuplicateUsernameException extends RuntimeException {

        private final String username;

        public DuplicateUsernameException(String username) {
            super("Username '" + username + "' already exists");
            this.username = username;
        }

    }
}


