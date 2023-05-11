package com.projects.University.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.University.dto.ClassDTO;
import com.projects.University.dto.UserDTO;
import com.projects.University.entities.Class;
import com.projects.University.entities.User;
import com.projects.University.repositories.ClassRepository;
import com.projects.University.repositories.UserRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class ClassService {

	@Autowired
	private ClassRepository repository;
	
	@Autowired
	private UserRepository userRepository;

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
		//entity.setSubject(dto.getSubject());

		entity.getStudents().clear();

		for (UserDTO userDto : dto.getStudents()) {
			User student = userRepository.getOne(userDto.getId());
			entity.getStudents().add(student);
		}
		
	}
}
