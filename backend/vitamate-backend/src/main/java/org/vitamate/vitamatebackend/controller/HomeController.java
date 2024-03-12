package org.vitamate.vitamatebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vitamate.vitamatebackend.repository.DrugRepository;

@RestController
public class HomeController {
    @Autowired
    private DrugRepository drugRepository;
    @GetMapping("/")
    public String home(){
        return "Hello, Home";
    }
    @GetMapping("/secured")
    public String secured(){
        return "Hello, Secured";
    }
}
