package org.vitamate.vitamatebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vitamate.vitamatebackend.domain.dtos.UserDTO;
import org.vitamate.vitamatebackend.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping
    public List<Optional<UserDTO>> getUsers(){
        return userService.findAll();
    }
    @PostMapping("/drugs")
    public ResponseEntity<Void> AddDrugs(String userId,String drugName){
        userService.addDrugToUser(userId,drugName);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/drugs")
    public ResponseEntity<Void> DeleteDrugs(String userId, String drugName){
        userService.removeDrugFromUser(userId,drugName);
        return ResponseEntity.ok().build();
    }
}
