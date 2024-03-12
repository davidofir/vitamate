package org.vitamate.vitamatebackend.domain.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;

@Document
public class Drug {
    @Id
    private String id;
    @NotEmpty
    private String drugName;
    public Drug(String drugName){
        this.drugName = drugName;
    }
    public Drug(){}
    public String getDrugName(){
        return this.drugName;
    }
    public void setDrugName(String drugName){
        this.drugName = drugName;
    }
}
