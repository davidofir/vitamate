package org.vitamate.vitamatebackend.service;

import org.vitamate.vitamatebackend.domain.dtos.UserDTO;
import org.vitamate.vitamatebackend.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void save(UserDTO userDTO);
    void save(User user);
    List<Optional<UserDTO>> findAll();
    Optional<UserDTO> findById(String id);
    void delete(String id);
    public void addDrugToUser(String userId, List<String> newDrugs);
    public List<String> getAllDrugs(String userId);
    public void removeDrugFromUser(String userId, List<String> drugs);
    Optional<UserDTO> findByLogin(String login);
    public Optional<UserDTO> convertToDto(User user);
    public User convertToUser(UserDTO userDto);
}
