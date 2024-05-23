package com.smalls.precision.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private int userId;

    private String username;

    private Collection<? extends GrantedAuthority> authorities;
}
