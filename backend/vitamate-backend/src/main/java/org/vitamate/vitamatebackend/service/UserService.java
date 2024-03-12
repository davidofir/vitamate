package org.vitamate.vitamatebackend.service;

import org.vitamate.vitamatebackend.domain.dtos.UserDTO;
import java.util.List;
public interface UserService {
    void save(UserDTO userDTO);
    List<UserDTO> findAll();
    UserDTO findById(String id);
    void delete(String id);
    void addDrugToUser(String userId,String drugId);
    void removeDrugFromUser(String userId,String drugId);
}
