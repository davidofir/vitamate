package org.vitamate.vitamatebackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vitamate.vitamatebackend.domain.dtos.UserDTO;
import org.vitamate.vitamatebackend.domain.entity.User;
import org.vitamate.vitamatebackend.repository.DrugRepository;
import org.vitamate.vitamatebackend.repository.UserRepository;
import org.vitamate.vitamatebackend.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    @Autowired
    UserServiceImpl(UserRepository userRepository, DrugRepository drugRepository){
        this.userRepository = userRepository;
    }

    @Override
    public void save(UserDTO userDTO) {
        userRepository.save(convertToUser(userDTO));
    }

    @Override
    public List<Optional<UserDTO>> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> findById(String id) {
        return userRepository.findById(id)
                .map(this::convertToDto)
                .orElse(null);
    }

    @Override
    public void delete(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public void addDrugToUser(String userId, String drug) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if(!user.getDrugs().contains(drug)){
            user.AddDrug(drug);
            userRepository.save(user);
        }

    }

    @Override
    public void removeDrugFromUser(String userId, String drug) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getDrugs().contains(drug)){
            user.removeDrug(drug);
            userRepository.save(user);
        }
    }

    @Override
    public Optional<UserDTO> findByLogin(String login) {
        return convertToDto(userRepository.findByLogin(login));
    }

    public User convertToUser(UserDTO userDto){
        return new User(userDto.getLogin(), userDto.getName(), userDto.getDrugs(),userDto.getRegistrationSource(), userDto.getRole());
    }
    public Optional<UserDTO> convertToDto(User user){
        if (user == null) {
            return Optional.empty();
        }
        return Optional.of(new UserDTO(user.getLogin(), user.getName(), user.getDrugs(), user.getRegistrationSource(),user.getRole()));
    }
}
