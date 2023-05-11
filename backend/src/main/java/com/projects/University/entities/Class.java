package com.projects.University.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
	
	@ManyToOne
	@JoinColumn(name = "subject_id")
	private Subject subject;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_subject_student",
				joinColumns = @JoinColumn(name = "subject_id"), 
				inverseJoinColumns = @JoinColumn(name = "student_id"))
	private Set<User> students = new HashSet<>();
	
	public Class() {}

	public Class(Long id, String code, Integer limitOfStudents, Subject subject) {
		super();
		this.id = id;
		this.code = code;
		this.limitOfStudents = limitOfStudents;
		this.subject = subject;
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

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Set<User> getStudents() {
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
		Class other = (Class) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
