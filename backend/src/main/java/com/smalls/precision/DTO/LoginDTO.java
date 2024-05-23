package com.smalls.precision.DTO;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

    @NotBlank(message="username is required")
    @Size(min=5, message="username must be at least five characters")
    private String username;

    @NotBlank(message="password is required")
    @Size(min=5, message="password must be at least five characters")
    private String password;
}
