package com.example.demo.dto;

import lombok.Data;

@Data
public class NewUserDTO {
    private String username;
    private String password;
    private String email;
    private String[] roles;
}
