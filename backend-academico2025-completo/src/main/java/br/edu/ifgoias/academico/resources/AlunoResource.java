package br.edu.ifgoias.academico.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.edu.ifgoias.academico.dto.AlunoDTO;
import br.edu.ifgoias.academico.services.AlunoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/alunos")
@Tag(name = "Alunos", description = "Gerenciamento de alunos")
public class AlunoResource {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    @Operation(summary = "Listar todos os alunos")
    public ResponseEntity<Page<AlunoDTO>> findAll(Pageable pageable) {
        Page<AlunoDTO> alunos = alunoService.findAll(pageable);
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar aluno por ID")
    public ResponseEntity<AlunoDTO> findById(@PathVariable Integer id) {
        try {
            AlunoDTO aluno = alunoService.findById(id);
            return ResponseEntity.ok(aluno);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    @Operation(summary = "Criar um novo aluno")
    public ResponseEntity<AlunoDTO> insert(@RequestBody AlunoDTO dto) {
        AlunoDTO novoAluno = alunoService.insert(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um aluno existente")
    public ResponseEntity<AlunoDTO> update(@PathVariable Integer id, @RequestBody AlunoDTO dto) {
        try {
            AlunoDTO alunoAtualizado = alunoService.update(id, dto);
            return ResponseEntity.ok(alunoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir um aluno")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        try {
            alunoService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}