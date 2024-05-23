package com.smalls.precision;

import com.smalls.precision.model.Role;
import com.smalls.precision.model.User;
import com.smalls.precision.repository.RoleRepository;
import com.smalls.precision.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@PropertySource("classpath:config.properties")
public class PrecisionApptManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrecisionApptManagerApplication.class, args);
	}

	@Bean
	@Profile("run_on_startup")
	CommandLineRunner run(
			RoleRepository roleRepo,
			UserRepository userRepo,
			PasswordEncoder encoder
	) {
		return args -> {
			if (userRepo.findByUsername("admin").isPresent()) return;

			Role adminRole = roleRepo.findByAuthority("ADMIN").orElseThrow();
			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);
			User adminUser = new User(
					0,
					"admin",
					encoder.encode("admin"),
					roles
			);
			userRepo.save(adminUser);
		};
	}

}
