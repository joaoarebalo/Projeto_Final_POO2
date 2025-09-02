-- Criação da tabela Aluno
-- A coluna 'idaluno' será autoincrementada.
CREATE TABLE aluno (
    idaluno SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    sexo VARCHAR(255) NOT NULL,
    dt_nasc DATE NOT NULL
);

-- Inserção de dados fakes na tabela Aluno
INSERT INTO aluno (nome, sexo, dt_nasc) VALUES
('João Silva', 'Masculino', '2002-05-10'),
('Maria Oliveira', 'Feminino', '2003-01-15'),
('Carlos Pereira', 'Masculino', '2002-11-30'),
('Ana Costa', 'Feminino', '2004-07-22'),
('Pedro Martins', 'Masculino', '2003-03-01');

-- A tabela de junção 'curso_aluno' para o relacionamento ManyToMany
-- geralmente é criada pelo JPA/Hibernate automaticamente.
-- Se precisar criá-la manualmente, você pode usar o comando abaixo.
/*
CREATE TABLE curso_aluno (
    curso_idcurso INT NOT NULL,
    aluno_idaluno INT NOT NULL,
    PRIMARY KEY (curso_idcurso, aluno_idaluno),
    FOREIGN KEY (curso_idcurso) REFERENCES curso(idcurso),
    FOREIGN KEY (aluno_idaluno) REFERENCES aluno(idaluno)
);
*/
