package org.vitamate.vitamatebackend.domain.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class User {
    @Id
    private String id;
    private String email;
    private String name;
    private List<String> drugIds;

    public User(){}
    public User(String email, String name) {
        this(email, name, new ArrayList<>());
    }

    public User(String email, String name, List<String> drugIds) {
        this.email = email;
        this.name = name;
        this.drugIds = drugIds;
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

    public String getEmail() {
        return email;
    }

}
