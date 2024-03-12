package org.vitamate.vitamatebackend.domain.dtos;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private String email;
    private String name;
    private List<String> drugIds;
    public UserDTO(){}
    public UserDTO(String email, String name){
        this.email = email;
        this.name = name;
        this.drugIds = new ArrayList<>();
    }
    public UserDTO(String email, String name,List<String> drugIds){
        this.email = email;
        this.name = name;
        this.drugIds = drugIds;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
