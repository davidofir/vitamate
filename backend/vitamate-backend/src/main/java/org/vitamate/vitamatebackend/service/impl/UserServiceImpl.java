package org.vitamate.vitamatebackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vitamate.vitamatebackend.domain.dtos.UserDTO;
import org.vitamate.vitamatebackend.domain.entity.User;
import org.vitamate.vitamatebackend.repository.DrugRepository;
import org.vitamate.vitamatebackend.repository.UserRepository;
import org.vitamate.vitamatebackend.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    DrugRepository drugRepository;
    @Autowired
    UserServiceImpl(UserRepository userRepository, DrugRepository drugRepository){
        this.userRepository = userRepository;
        this.drugRepository = drugRepository;
    }

    @Override
    public void save(UserDTO userDTO) {
        userRepository.save(convertToUser(userDTO));
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO findById(String id) {
        return userRepository.findById(id)
                .map(this::convertToDto)
                .orElse(null);
    }

    @Override
    public void delete(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public void addDrugToUser(String userId, String drugId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        drugRepository.findById(drugId).orElseThrow(() -> new RuntimeException("Drug not found"));
        if(!user.getDrugIds().contains(drugId)){
            user.AddDrug(drugId);
            userRepository.save(user);
        }

    }

    @Override
    public void removeDrugFromUser(String userId, String drugId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        drugRepository.findById(drugId).orElseThrow(() -> new RuntimeException("Drug not found"));
        if(user.getDrugIds().contains(drugId)){
            user.removeDrug(drugId);
            userRepository.save(user);
        }
    }
    public User convertToUser(UserDTO userDto){
        return new User(userDto.getEmail(), userDto.getName(),userDto.getDrugIds());
    }
    public UserDTO convertToDto(User user){
        return new UserDTO(user.getEmail(),user.getName(),user.getDrugIds());
    }
}
