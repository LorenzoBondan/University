package com.projects.University.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.University.dto.CourseDTO;
import com.projects.University.services.CourseService;

@RestController
@RequestMapping(value = "/courses")
public class CourseResource {

	@Autowired
	private CourseService service;
	
	
	@GetMapping
	public ResponseEntity<Page<CourseDTO>> findAll(Pageable pageable)
	{		
		Page<CourseDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	

	@GetMapping(value = "/{id}")
	public ResponseEntity<CourseDTO> findById(@PathVariable Long id) {
		CourseDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<CourseDTO> insert (@RequestBody CourseDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CourseDTO> update(@PathVariable Long id, @Valid @RequestBody CourseDTO dto)	{
		CourseDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<CourseDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/registerInCourse/{courseId}/{userId}")
	public ResponseEntity<CourseDTO> registerInCourse(@PathVariable Long courseId, @PathVariable Long userId){
		CourseDTO c = service.registerInCourse(courseId, userId);
		return ResponseEntity.ok().body(c);
	}
	
	@PutMapping(value = "/unregisterInCourse/{courseId}/{userId}")
	public ResponseEntity<CourseDTO> unregisterInCourse(@PathVariable Long courseId, @PathVariable Long userId){
		CourseDTO c = service.unregisterInCourse(courseId, userId);
		return ResponseEntity.ok().body(c);
	}
	
}
