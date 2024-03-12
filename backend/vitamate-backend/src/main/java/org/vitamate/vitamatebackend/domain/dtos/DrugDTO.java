package org.vitamate.vitamatebackend.domain.dtos;

public class DrugDTO {
    private String drugName;
    public DrugDTO(String drugName){
        this.drugName = drugName;
    }
    public DrugDTO(){}

    public String getDrugName(){
        return this.drugName;
    }
    public void setDrugName(String drugName){
        this.drugName = drugName;
    }
}
