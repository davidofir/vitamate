package org.vitamate.vitamatebackend.domain.dtos;

import org.vitamate.vitamatebackend.domain.entity.RegistrationSource;
import org.vitamate.vitamatebackend.domain.entity.Role;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private String login;
    private String name;
    private List<String> drugs;
    private Role role;
    private RegistrationSource registrationSource;
    public UserDTO(){}
    public UserDTO(String login, String name, List<String> drugs, RegistrationSource registrationSource, Role role){
        this.login = login;
        this.name = name;
        this.drugs = drugs;
        this.registrationSource = registrationSource;
        this.role = role;
    }
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getDrugs() {
        return drugs;
    }

    public void setDrugs(List<String> drugs) {
        this.drugs = drugs;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public RegistrationSource getRegistrationSource() {
        return registrationSource;
    }

    public void setRegistrationSource(RegistrationSource registrationSource) {
        this.registrationSource = registrationSource;
    }
}
