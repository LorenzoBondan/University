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

import com.projects.University.dto.ClassDTO;
import com.projects.University.entities.Class;
import com.projects.University.entities.User;
import com.projects.University.repositories.ClassRepository;
import com.projects.University.repositories.SubjectRepository;
import com.projects.University.repositories.UserRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class ClassService {

	@Autowired
	private ClassRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SubjectRepository subjectRepository;

	@Transactional(readOnly = true)
	public Page<ClassDTO> findAllPaged(Pageable pageable) {
		Page<Class> list = repository.findAll(pageable);
		return list.map(x -> new ClassDTO(x));
	}

	@Transactional(readOnly = true)
	public ClassDTO findById(Long id) {
		Optional<Class> obj = repository.findById(id);
		Class entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new ClassDTO(entity);
	}

	@Transactional
	public ClassDTO insert(ClassDTO dto) {
		Class entity = new Class();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ClassDTO(entity);
	}
	
	@Transactional
	public ClassDTO update(Long id, ClassDTO dto) {
		try {
			Class entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new ClassDTO(entity);
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
	
	private void copyDtoToEntity(ClassDTO dto, Class entity) {
		entity.setCode(dto.getCode());
		entity.setLimitOfStudents(dto.getLimitOfStudents());
		entity.setSubject(subjectRepository.getOne(dto.getSubjectId()));

		entity.getStudents().clear();

		for (Long userDto : dto.getStudentsId()) {
			User student = userRepository.getOne(userDto);
			entity.getStudents().add(student);
		}
		
	}
	
	@Transactional
	public ClassDTO registerInClass(Long classId, Long userId) {
		try {
			Class entity = repository.getOne(classId);
			User user = userRepository.getOne(userId);
			
			if(entity.getLimitOfStudents() > entity.getStudents().size()) {
				entity.getStudents().add(user);
				user.getClasses().add(entity);
				
				entity = repository.save(entity);
				user = userRepository.save(user);
			}
			
			return new ClassDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("User or class Id not found " + classId + " " + userId);
		}
	}
	
	@Transactional
	public ClassDTO unregisterInClass(Long classId, Long userId) {
		try {
			Class entity = repository.getOne(classId);
			User user = userRepository.getOne(userId);
			
			entity.getStudents().remove(user);
			user.getClasses().remove(entity);
			
			entity = repository.save(entity);
			user = userRepository.save(user);
			return new ClassDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("User or class Id not found " + classId + " " + userId);
		}
	}
}
