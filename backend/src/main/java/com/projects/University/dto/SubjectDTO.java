package com.projects.University.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.University.entities.Subject;

public class SubjectDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private Integer semester;
	
	private List<ClassDTO> classes = new ArrayList<>();
	
	private List<CourseDTO> courses = new ArrayList<>();
	
	public SubjectDTO() {}

	public SubjectDTO(Long id, String name, Integer semester) {
		super();
		this.id = id;
		this.name = name;
		this.semester = semester;
	}
	
	public SubjectDTO(Subject entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.semester = entity.getSemester();
		
		entity.getClasses().forEach(c -> this.classes.add(new ClassDTO(c)));
		entity.getCourses().forEach(c -> this.courses.add(new CourseDTO(c)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSemester() {
		return semester;
	}

	public void setSemester(Integer semester) {
		this.semester = semester;
	}

	public List<ClassDTO> getClasses() {
		return classes;
	}

	public List<CourseDTO> getCourses() {
		return courses;
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
		SubjectDTO other = (SubjectDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
