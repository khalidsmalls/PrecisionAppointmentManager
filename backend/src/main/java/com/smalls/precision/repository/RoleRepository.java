package com.smalls.precision.repository;

import com.smalls.precision.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {

    Optional<Role> findByAuthority(String authority);
}
