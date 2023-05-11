package com.projects.University.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.University.entities.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject,Long>{
	
	@Query("SELECT DISTINCT obj FROM Subject obj "
			+ "	INNER JOIN obj.classes cats "
			+ "WHERE (COALESCE(:classes) IS NULL OR cats IN :classes)")
	Page<Subject> find(List<com.projects.University.entities.Class> classes, Pageable pageable); // METODO CRIADO PARA BUSCAR PRODUTOS POR CATEGORIA, ULTIMO PARAMETRO TEM QUE SER UM PAGEABLE
	
	// PRA CORRIGIR O PROBLEMA DAS N+1 CONSULTAS
	@Query("SELECT obj FROM Subject obj JOIN FETCH obj.classes WHERE obj IN :subjects") // JOIN FETCH BUSCA OS OBJETOS JUNTO COM O PRODUTO. SÓ FUNCIONA COM LISTA E NAO COM PAGINA, POR ISSO A CONSULTA EM DUAS ETAPAS
	List<Subject> findSubjectsWithClasses(List<Subject> subjects);

}
