package com.projects.University.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class ClassDTO {

	private Long id;
	private String code;
	private Integer limitOfStudents;
	
	private Long subjectId;
	
	private List<UserDTO> students = new ArrayList<>();
	
	public ClassDTO() {}

	public ClassDTO(Long id, String code, Integer limitOfStudents, Long subjectId) {
		super();
		this.id = id;
		this.code = code;
		this.limitOfStudents = limitOfStudents;
		this.subjectId = subjectId;
	}
	
	public ClassDTO(com.projects.University.entities.Class entity) {
		this.id = entity.getId();
		this.code = entity.getCode();
		this.limitOfStudents = entity.getLimitOfStudents();
		this.subjectId = entity.getSubject().getId();
		
		entity.getStudents().forEach(s -> this.students.add(new UserDTO(s)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getLimitOfStudents() {
		return limitOfStudents;
	}

	public void setLimitOfStudents(Integer limitOfStudents) {
		this.limitOfStudents = limitOfStudents;
	}

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public List<UserDTO> getStudents() {
		return students;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ClassDTO other = (ClassDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
