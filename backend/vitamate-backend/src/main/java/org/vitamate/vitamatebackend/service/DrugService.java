package org.vitamate.vitamatebackend.service;

import org.vitamate.vitamatebackend.domain.dtos.DrugDTO;

import java.util.List;

public interface DrugService {
    void save(DrugDTO drugDTO);
    List<DrugDTO> findAll();
    DrugDTO findById(String id);
    void delete(String id);
}
