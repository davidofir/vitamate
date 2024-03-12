package org.vitamate.vitamatebackend.domain.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class User {
    @Id
    private String id;
    private String login;
    private String name;
    private List<String> drugIds;

    private RegistrationSource registrationSource;
    private Role role;
    public User(){}

    public User(String login, String name, List<String> drugIds,RegistrationSource registrationSource, Role role) {
        this.login = login;
        this.name = name;
        this.drugIds = drugIds;
        this.role = role;
        this.registrationSource = registrationSource;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void AddDrug(String drugId){
        this.drugIds.add(drugId);
    }
    public void removeDrug(String drugId){
        this.drugIds.remove(drugId);
    }
    public List<String> getDrugIds() {
        return drugIds;
    }

    public void setDrugIds(List<String> drugIds) {
        this.drugIds = drugIds;
    }

    public String getLogin() {
        return login;
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
