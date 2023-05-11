package com.projects.University.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject,Long>{

}
