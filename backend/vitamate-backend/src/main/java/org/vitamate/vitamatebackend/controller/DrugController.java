package org.vitamate.vitamatebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vitamate.vitamatebackend.domain.dtos.DrugDTO;
import org.vitamate.vitamatebackend.domain.entity.Drug;
import org.vitamate.vitamatebackend.repository.DrugRepository;
import org.vitamate.vitamatebackend.service.DrugService;

import java.util.List;

@RestController
@RequestMapping("/drugs")
public class DrugController {
    @Autowired
    private DrugService drugService;
    @GetMapping
    public List<DrugDTO> drugs(){
        return drugService.findAll();
    }
    @PostMapping
    public ResponseEntity<Void> addDrugs(@RequestBody DrugDTO drug){
        drugService.save(drug);
        return ResponseEntity.ok().build();
    }
}
