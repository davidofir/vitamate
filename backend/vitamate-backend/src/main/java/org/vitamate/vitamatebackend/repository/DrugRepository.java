package org.vitamate.vitamatebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.vitamate.vitamatebackend.domain.entity.Drug;

import java.util.Optional;

public interface DrugRepository extends MongoRepository<Drug,String> {
    Optional<Drug> findByDrugName(String drugName);
    
}
