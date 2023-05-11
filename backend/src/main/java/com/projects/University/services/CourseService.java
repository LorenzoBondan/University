package com.projects.University.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.University.dto.CourseDTO;
import com.projects.University.dto.SubjectDTO;
import com.projects.University.entities.Course;
import com.projects.University.entities.Subject;
import com.projects.University.repositories.CourseRepository;
import com.projects.University.repositories.SubjectRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class CourseService {

	@Autowired
	private CourseRepository repository;
	
	@Autowired
	private SubjectRepository subjectRepository;

	@Transactional(readOnly = true)
	public Page<CourseDTO> findAllPaged(Pageable pageable) {
		Page<Course> list = repository.findAll(pageable);
		return list.map(x -> new CourseDTO(x, x.getSubjects(), x.getUsers()));
	}

	@Transactional(readOnly = true)
	public CourseDTO findById(Long id) {
		Optional<Course> obj = repository.findById(id);
		Course entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new CourseDTO(entity, entity.getSubjects(), entity.getUsers());
	}

	@Transactional
	public CourseDTO insert(CourseDTO dto) {
		Course entity = new Course();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new CourseDTO(entity);
	}


	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}
	
	private void copyDtoToEntity(CourseDTO dto, Course entity) {
		entity.setName(dto.getName());
		entity.setImgUrl(dto.getImgUrl());
		
		entity.getSubjects().clear();

		for (SubjectDTO subDto : dto.getSubjects()) {
			Subject subject = subjectRepository.getOne(subDto.getId());
			entity.getSubjects().add(subject);
		}
		
	}
}
