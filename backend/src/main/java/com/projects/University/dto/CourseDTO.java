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
	private String description;
	private String imgUrl;
	
	private List<Long> subjectsId = new ArrayList<>();
	private List<Long> usersId = new ArrayList<>();
	
	public CourseDTO() {}

	public CourseDTO(Long id, String name, String imgUrl, String description) {
		super();
		this.id = id;
		this.name = name;
		this.imgUrl = imgUrl;
		this.description = description;
	}
	
	public CourseDTO(Course entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.imgUrl = entity.getImgUrl();
		this.description = entity.getDescription();
		
		entity.getSubjects().forEach(s -> this.subjectsId.add(s.getId()));
		entity.getUsers().forEach(u -> this.usersId.add(u.getId()));
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public List<Long> getSubjectsId() {
		return subjectsId;
	}


	public List<Long> getUsersId() {
		return usersId;
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
