package org.vitamate.vitamatebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.vitamate.vitamatebackend.domain.entity.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    User findByLogin(String login);
}
