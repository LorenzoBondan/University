package com.projects.University.resources;

import java.net.URI;

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

import com.projects.University.dto.ClassDTO;
import com.projects.University.services.ClassService;

@RestController
@RequestMapping(value = "/classes")
public class ClassResource {

	@Autowired
	private ClassService service;
	
	
	@GetMapping
	public ResponseEntity<Page<ClassDTO>> findAll(Pageable pageable)
	{		
		Page<ClassDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	

	@GetMapping(value = "/{id}")
	public ResponseEntity<ClassDTO> findById(@PathVariable Long id) {
		ClassDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<ClassDTO> insert (@RequestBody ClassDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ClassDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/registerInClass/{classId}/{userId}")
	public ResponseEntity<ClassDTO> registerInClass(@PathVariable Long classId, @PathVariable Long userId){
		ClassDTO c = service.registerInClass(classId, userId);
		return ResponseEntity.ok().body(c);
	}
	
}
