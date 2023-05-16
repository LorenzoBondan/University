package com.projects.University.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.University.dto.CourseDTO;
import com.projects.University.dto.SubjectDTO;
import com.projects.University.dto.UserDTO;
import com.projects.University.entities.Course;
import com.projects.University.entities.Subject;
import com.projects.University.entities.User;
import com.projects.University.repositories.CourseRepository;
import com.projects.University.repositories.SubjectRepository;
import com.projects.University.repositories.UserRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class CourseService {

	@Autowired
	private CourseRepository repository;
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public Page<CourseDTO> findAllPaged(Pageable pageable) {
		Page<Course> list = repository.findAll(pageable);
		return list.map(x -> new CourseDTO(x));
	}

	@Transactional(readOnly = true)
	public CourseDTO findById(Long id) {
		Optional<Course> obj = repository.findById(id);
		Course entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new CourseDTO(entity);
	}

	@Transactional
	public CourseDTO insert(CourseDTO dto) {
		Course entity = new Course();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new CourseDTO(entity);
	}
	
	@Transactional
	public CourseDTO update(Long id, CourseDTO dto) {
		try {
			Course entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new CourseDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
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
		entity.setDescription(dto.getDescription());
		
		entity.getSubjects().clear();

		for (SubjectDTO subDto : dto.getSubjects()) {
			Subject subject = subjectRepository.getOne(subDto.getId());
			entity.getSubjects().add(subject);
		}
		
		entity.getUsers().clear();

		for (UserDTO userDto : dto.getUsers()) {
			User user = userRepository.getOne(userDto.getId());
			entity.getUsers().add(user);
		}
		
	}
	
	@Transactional
	public CourseDTO registerInCourse(Long courseId, Long userId) {
		try {
			Course entity = repository.getOne(courseId);
			User user = userRepository.getOne(userId);
			
			if(!user.getCourses().contains(entity)) {
				entity.getUsers().add(user);
				user.getCourses().add(entity);
				
				entity = repository.save(entity);
				user = userRepository.save(user);
			}
			
			return new CourseDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("User or course Id not found " + courseId + " " + userId);
		}
	}
	
	@Transactional
	public CourseDTO unregisterInCourse(Long courseId, Long userId) {
		try {
			Course entity = repository.getOne(courseId);
			User user = userRepository.getOne(userId);
			
			if(user.getCourses().contains(entity)) {
				entity.getUsers().remove(user);
				user.getCourses().remove(entity);
				
				entity = repository.save(entity);
				user = userRepository.save(user);
			}
			
			return new CourseDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("User or class Id not found " + courseId + " " + userId);
		}
	}
}
