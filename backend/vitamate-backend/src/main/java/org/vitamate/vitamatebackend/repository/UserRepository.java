package org.vitamate.vitamatebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.vitamate.vitamatebackend.domain.entity.User;

public interface UserRepository extends MongoRepository<User,String> {

}
