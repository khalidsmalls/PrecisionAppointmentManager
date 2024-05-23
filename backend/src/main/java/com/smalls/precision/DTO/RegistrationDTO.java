package com.smalls.precision.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {

    private int userId;

    @NotBlank(message="username is required")
    @Size(min=5, message="username must be at least 5 characters")
    private String username;

    @NotBlank(message="password is required")
    @Size(min=5, message="password must be at least five characters")
    private String password;
}
