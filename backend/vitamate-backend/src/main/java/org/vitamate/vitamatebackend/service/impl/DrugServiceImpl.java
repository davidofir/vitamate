package org.vitamate.vitamatebackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vitamate.vitamatebackend.domain.entity.Drug;
import org.vitamate.vitamatebackend.domain.dtos.DrugDTO;
import org.vitamate.vitamatebackend.repository.DrugRepository;
import org.vitamate.vitamatebackend.service.DrugService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DrugServiceImpl implements DrugService {

    private final DrugRepository drugRepository;

    @Autowired
    public DrugServiceImpl(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @Override
    public void save(DrugDTO drugDTO) {
        Drug drug = convertToEntity(drugDTO);
        drugRepository.save(drug);
    }

    @Override
    public List<DrugDTO> findAll() {
        return drugRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DrugDTO findById(String id) {
        return drugRepository.findById(id)
                .map(this::convertToDto)
                .orElse(null);
    }

    @Override
    public void delete(String id) {
        drugRepository.deleteById(id);
    }


    private DrugDTO convertToDto(Drug drug) {
        return new DrugDTO(drug.getDrugName());
    }

    private Drug convertToEntity(DrugDTO drugDTO) {
        return new Drug(drugDTO.getDrugName());
    }
}
