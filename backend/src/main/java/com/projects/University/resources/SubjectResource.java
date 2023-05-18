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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.University.dto.SubjectDTO;
import com.projects.University.services.SubjectService;

@RestController
@RequestMapping(value = "/subjects")
public class SubjectResource {

	@Autowired
	private SubjectService service;
	
	
	@GetMapping
	public ResponseEntity<Page<SubjectDTO>> findAll(
			@RequestParam(value = "classId", defaultValue = "0") Long classId, // FILTRO POR CATEGORIA
			Pageable pageable)
	{		
		Page<SubjectDTO> list = service.findAllPaged(classId, pageable);	
		return ResponseEntity.ok().body(list);
	}
	

	@GetMapping(value = "/{id}")
	public ResponseEntity<SubjectDTO> findById(@PathVariable Long id) {
		SubjectDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<SubjectDTO> insert (@RequestBody SubjectDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<SubjectDTO> update(@PathVariable Long id, @Valid @RequestBody SubjectDTO dto)	{
		SubjectDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<SubjectDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
