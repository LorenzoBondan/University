package com.projects.University.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_class")
public class Class implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String code;
	private Integer limitOfStudents;
	
	public Class() {}

	public Class(Long id, String code, Integer limitOfStudents) {
		super();
		this.id = id;
		this.code = code;
		this.limitOfStudents = limitOfStudents;
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
		Class other = (Class) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
