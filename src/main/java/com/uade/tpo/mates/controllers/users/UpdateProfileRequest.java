package com.uade.tpo.mates.controllers.users;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String lastName;
    private String phone;
    private String address;
}