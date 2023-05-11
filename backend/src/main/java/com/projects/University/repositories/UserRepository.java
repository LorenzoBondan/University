package com.projects.University.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	// METODO QUE BUSCA NO BANCO UM USUARIO POR EMAIL
	User findByEmail(String email);
	
	@Query("SELECT obj FROM User obj JOIN FETCH obj.courses WHERE obj IN :users")
	List<User> findUsersCourses(List<User> users);
}
