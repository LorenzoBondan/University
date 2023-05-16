package com.projects.University.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.University.dto.ClassDTO;
import com.projects.University.dto.SubjectDTO;
import com.projects.University.entities.Class;
import com.projects.University.entities.Course;
import com.projects.University.entities.Subject;
import com.projects.University.repositories.ClassRepository;
import com.projects.University.repositories.CourseRepository;
import com.projects.University.repositories.SubjectRepository;
import com.projects.University.services.exceptions.DataBaseException;
import com.projects.University.services.exceptions.ResourceNotFoundException;

@Service
public class SubjectService {

	@Autowired
	private SubjectRepository repository;
	
	@Autowired
	private ClassRepository classRepository;
	
	@Autowired
	private CourseRepository courseRepository;
	

	@Transactional(readOnly = true)
	public Page<SubjectDTO> findAllPaged(Long classId, Pageable pageable) {
		List<Class> classes = (classId == 0) ? null :
	 		Arrays.asList(classRepository.getOne(classId));
	 	Page<Subject> page = repository.find(classes, pageable);
	 	repository.findSubjectsWithClasses(page.getContent()); 
	 	return page.map(x -> new SubjectDTO(x));
	}

	@Transactional(readOnly = true)
	public SubjectDTO findById(Long id) {
		Optional<Subject> obj = repository.findById(id);
		Subject entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new SubjectDTO(entity);
	}

	@Transactional
	public SubjectDTO insert(SubjectDTO dto) {
		Subject entity = new Subject();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SubjectDTO(entity);
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
	
	private void copyDtoToEntity(SubjectDTO dto, Subject entity) {
		entity.setName(dto.getName());
		entity.setSemester(dto.getSemester());
		
		entity.getClasses().clear();

		for (ClassDTO classDto : dto.getClasses()) {
			Class c = classRepository.getOne(classDto.getId());
			entity.getClasses().add(c);
		}
		
		for (Long courseId : dto.getCoursesId()) {
			Course c = courseRepository.getOne(courseId);
			entity.getCourses().add(c);
		}
		
		
	}
}
