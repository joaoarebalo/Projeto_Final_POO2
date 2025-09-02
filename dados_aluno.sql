CREATE DATABASE jpa;

CREATE TABLE aluno
(
    idaluno SERIAL,
    nome VARCHAR(80) NOT NULL,
    sexo VARCHAR(30) NOT NULL,
	dt_nasc DATE NOT NULL,
    CONSTRAINT aluno_pkey PRIMARY KEY (idaluno)
);

INSERT INTO aluno(nome, sexo, dt_nasc)
	  VALUES ('Maria', 'Feminino', '2010/1/03'),
	  ('João', 'Masculino', '2020/10/30'),
	  ('Pedro', 'Masculino', '1998/12/08'),
	  ('José', 'Masculino', '2005/6/01'),
	  ('Ana', 'Feminino', '1976/8/12'),
	  ('Carol', 'Feminino', '1995/11/21' );

CREATE TABLE curso
(
    idcurso SERIAL,
    nomecurso VARCHAR(100) NOT NULL,
    CONSTRAINT curso_pkey PRIMARY KEY (idcurso)
);

INSERT INTO curso(nomecurso)
	  VALUES ('Banco de Dados'),
	  ('Estrutura de Dados'),
	  ('Programação Web'),
	  ('Programação Orientada a Objetos');

CREATE TABLE public.aluno_curso
(
    idcurso integer NOT NULL,
    idaluno integer NOT NULL,
    FOREIGN KEY (idaluno) REFERENCES aluno (idaluno),
    FOREIGN KEY (idcurso) REFERENCES curso (idcurso)
);


INSERT INTO aluno_curso(idcurso, idaluno)
	        VALUES 	(1, 1),
			(1, 2),
			(2, 3),
			(2, 4),
			(3, 5),
			(3, 6),
			(4, 1),
			(4, 2);
