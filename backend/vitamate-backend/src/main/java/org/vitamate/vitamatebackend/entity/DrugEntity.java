package org.vitamate.vitamatebackend.entity;
public class DrugEntity {

    private String drugName;
    public DrugEntity(String drugName){
        this.drugName = drugName;
    }
    public String getDrugName(){
        return this.drugName;
    }
    public void setDrugName(String drugName){
        this.drugName = drugName;
    }
}
