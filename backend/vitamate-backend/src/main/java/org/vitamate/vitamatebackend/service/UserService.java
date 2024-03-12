package org.vitamate.vitamatebackend.service;

import org.vitamate.vitamatebackend.domain.dtos.UserDTO;
import org.vitamate.vitamatebackend.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void save(UserDTO userDTO);
    List<Optional<UserDTO>> findAll();
    Optional<UserDTO> findById(String id);
    void delete(String id);
    void addDrugToUser(String userId,String drug);
    void removeDrugFromUser(String userId,String drug);
    Optional<UserDTO> findByLogin(String login);
    public Optional<UserDTO> convertToDto(User user);
    public User convertToUser(UserDTO userDto);
}
