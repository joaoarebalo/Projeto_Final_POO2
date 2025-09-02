import { Component } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { AlunoService } from '../services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-aluno-novo',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './aluno-novo.component.html',
  styleUrls: ['./aluno-novo.component.css']
})
export class AlunoNovoComponent {

  aluno: Aluno = {} as Aluno;

  constructor(private alunoService: AlunoService, private router: Router, private dialog: MatDialog) { }

  inserirAluno() {

    const dialogData: ConfirmDialogData = {
      title: 'Confirmar inclusão',
      message: `Tem certeza que deseja incluir o aluno "${this.aluno.nome}"?`,
      confirmText: 'Sim, incluir',
      cancelText: 'Cancelar',
      confirmColor: 'secondary'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunoService.createAluno(this.aluno).subscribe({
          next: () => {
            this.router.navigate(['/aluno']);
          },
          error: (err) => {
            console.error('Erro ao incluir aluno:', err);
          }
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/aluno']);
  }

} 