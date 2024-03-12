package org.vitamate.vitamatebackend.domain.dtos;

import org.vitamate.vitamatebackend.domain.entity.RegistrationSource;
import org.vitamate.vitamatebackend.domain.entity.Role;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private String login;
    private String name;
    private List<String> drugIds;
    private Role role;
    private RegistrationSource registrationSource;
    public UserDTO(){}
    public UserDTO(String login, String name, List<String> drugIds, RegistrationSource registrationSource, Role role){
        this.login = login;
        this.name = name;
        this.drugIds = drugIds;
        this.registrationSource = registrationSource;
        this.role = role;
    }
    public UserDTO(String login, String name,List<String> drugIds,Role role, RegistrationSource registrationSource){
        this.login = login;
        this.name = name;
        this.drugIds = drugIds;
        this.role = role;
        this.registrationSource = registrationSource;
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

    public List<String> getDrugIds() {
        return drugIds;
    }

    public void setDrugIds(List<String> drugIds) {
        this.drugIds = drugIds;
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
