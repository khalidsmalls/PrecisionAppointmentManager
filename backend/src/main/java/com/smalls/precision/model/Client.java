package com.smalls.precision.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Entity
@Table(name = "clients")
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Builder
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private int clientId;

    @Column(name = "first_name")
    @NotBlank(message="field is required")
    @Size(max=25, message="first name cannot be more than 25 characters")
    private String firstName;

    @Column(name = "last_name")
    @NotBlank(message="field is required")
    @Size(max=40, message="last name cannot be more than 40 characters")
    private String lastName;

    @Column(unique = true)
    @NotBlank(message="field is required")
    @Email(message="please enter a valid email address")
    private String email;

    @NotBlank(message="field is required")
    @Size(min=7, max=10, message="phone must be either 7 or 10 characters")
    private String phone;

    @NotNull(message = "user id is required")
    @Column(name = "user_id")
    private int userId;
}
