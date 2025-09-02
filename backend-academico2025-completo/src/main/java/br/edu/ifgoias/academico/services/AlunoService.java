package br.edu.ifgoias.academico.services;

import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifgoias.academico.dto.AlunoDTO;
import br.edu.ifgoias.academico.dto.AlunoMapper;
import br.edu.ifgoias.academico.entities.Aluno;
import br.edu.ifgoias.academico.repositories.AlunoRepository;

@Service
public class AlunoService {

    private static final Logger LOGGER = Logger.getLogger(AlunoService.class.getName());

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AlunoMapper alunoMapper;

    @Transactional(readOnly = true)
    public Page<AlunoDTO> findAll(Pageable pageable) {
        Page<Aluno> alunos = alunoRepository.findAll(pageable);
        return alunos.map(alunoMapper::toDTO);
    }

    @Transactional(readOnly = true)
    public AlunoDTO findById(Integer id) {
        LOGGER.info("Buscando aluno com ID: " + id);
        Optional<Aluno> alunoOptional = alunoRepository.findById(id);

        if (alunoOptional.isPresent()) {
            LOGGER.info("Aluno encontrado: " + alunoOptional.get().getNome());
        } else {
            LOGGER.warning("Aluno com ID: " + id + " não foi encontrado no banco de dados.");
        }

        return alunoOptional
                .map(alunoMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));
    }

    @Transactional
    public AlunoDTO insert(AlunoDTO dto) {
        Aluno aluno = alunoMapper.toEntity(dto);
        aluno = alunoRepository.save(aluno);
        return alunoMapper.toDTO(aluno);
    }

    @Transactional
    public AlunoDTO update(Integer id, AlunoDTO dto) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));
        
        // Atualiza os campos
        aluno.setNome(dto.getNome());
        aluno.setSexo(dto.getSexo());
        aluno.setDt_nasc(dto.getDt_nasc());
        
        aluno = alunoRepository.save(aluno);
        
        return alunoMapper.toDTO(aluno);
    }

    @Transactional
    public void delete(Integer id) {
        if (!alunoRepository.existsById(id)) {
            throw new RuntimeException("Aluno não encontrado com ID: " + id);
        }
        alunoRepository.deleteById(id);
    }
}