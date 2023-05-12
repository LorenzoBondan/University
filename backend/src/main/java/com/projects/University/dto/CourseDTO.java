package com.projects.University.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.University.entities.Course;

public class CourseDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String imgUrl;
	
	private List<SubjectDTO> subjects = new ArrayList<>();
	private List<UserDTO> users = new ArrayList<>();
	
	public CourseDTO() {}

	public CourseDTO(Long id, String name, String imgUrl) {
		super();
		this.id = id;
		this.name = name;
		this.imgUrl = imgUrl;
	}
	
	public CourseDTO(Course entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.imgUrl = entity.getImgUrl();
		
		entity.getSubjects().forEach(s -> this.subjects.add(new SubjectDTO(s)));
		entity.getUsers().forEach(u -> this.users.add(new UserDTO(u)));
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

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<SubjectDTO> getSubjects() {
		return subjects;
	}


	public List<UserDTO> getUsers() {
		return users;
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
		CourseDTO other = (CourseDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
