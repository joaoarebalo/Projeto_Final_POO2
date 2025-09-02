import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../models/aluno.model';
import { AlunoService } from '../services/aluno.service';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-aluno-editar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './aluno-editar.component.html',
  styleUrls: ['./aluno-editar.component.css']
})
export class AlunoEditarComponent implements OnInit {

  aluno: Aluno = {} as Aluno;

  constructor(private alunoservice: AlunoService,
    private router: Router,
    private rotaAtiva: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAluno(this.rotaAtiva.snapshot.paramMap.get('id'));
  }

  getAluno(id: any) {
    this.alunoservice.getAlunoById(id).subscribe({
      next: (dado) => {
        this.aluno = dado;
        console.log(dado);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  atualizar() {
    const dialogData: ConfirmDialogData = {
      title: 'Confirmar atualização',
      message: `Tem certeza que deseja atualizar os dados do aluno id: "${this.aluno.idaluno}"?`,
      confirmText: 'Sim, atualizar',
      cancelText: 'Cancelar',
      confirmColor: 'primary'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunoservice.updateAluno(this.aluno.idaluno, this.aluno).subscribe({
          next: () => {
            this.router.navigate(['/aluno']);
          },
          error: (err) => {
            console.error('Erro ao atualizar aluno:', err);
          }
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/aluno']);
  }
} 