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
    private List<String> drugs;

    private RegistrationSource registrationSource;
    private Role role;
    public User(){}

    public User(String login, String name, List<String> drugs,RegistrationSource registrationSource, Role role) {
        this.login = login;
        this.name = name;
        this.drugs = drugs;
        this.role = role;
        this.registrationSource = registrationSource;
    }
    public User(String id,String login, String name, List<String> drugs,RegistrationSource registrationSource, Role role) {
        this.id = id;
        this.login = login;
        this.name = name;
        this.drugs = drugs;
        this.role = role;
        this.registrationSource = registrationSource;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void AddDrug(String drugs){
        this.drugs.add(drugs);
    }
    public void removeDrug(String drugs){
        this.drugs.remove(drugs);
    }
    public List<String> getDrugs() {
        return drugs;
    }

    public void setDrugs(List<String> drugs) {
        this.drugs = drugs;
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
    public void setId(String id){
        this.id = id;
    }
    public String getId(){
        return this.id;
    }
}
