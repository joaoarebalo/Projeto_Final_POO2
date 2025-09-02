package br.edu.ifgoias.academico.dto;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import br.edu.ifgoias.academico.entities.Aluno;

@Mapper(componentModel = "spring")
public interface AlunoMapper {

    AlunoMapper INSTANCE = Mappers.getMapper(AlunoMapper.class);

    AlunoDTO toDTO(Aluno aluno);

    Aluno toEntity(AlunoDTO alunoDTO);
}
