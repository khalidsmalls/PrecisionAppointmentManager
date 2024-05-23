package com.smalls.precision.repository;

import com.smalls.precision.model.Client;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {

    @Query(value = "SELECT * " +
            "FROM clients " +
            "WHERE LOWER(first_name || last_name) " +
            "LIKE LOWER('%' || :searchTerm || '%')",
    nativeQuery = true)
    Iterable<Client> findByFirstNameOrLastNameIgnoreCase(
            @Param("searchTerm") String searchTerm
    );

}
