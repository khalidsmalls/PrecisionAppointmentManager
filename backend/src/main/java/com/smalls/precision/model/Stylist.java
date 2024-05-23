package com.smalls.precision.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name="stylists")
@NoArgsConstructor(access= AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
public class Stylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="stylist_id")
    private int stylistId;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(unique = true)
    private String email;

    private String phone;
}
