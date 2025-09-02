import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-aluno.component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconButton,
    MatIcon,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunos: Aluno[] = [];
  displayedAlunos: string[] = ['nome', 'sexo', 'dt_nasc', 'update', 'delete'];
  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alunoService: AlunoService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAlunoList();
  }

  getAlunoList(page: number = 0, search: string = ''): void {
    this.alunoService.getAlunos(page, this.pageSize, search).subscribe({
      next: dados => {
        this.alunos = dados.content;
        this.totalElements = dados.totalElements;
        this.currentPage = dados.page;
      },
      error: erro => console.error(erro),
    });
  }

  filtrarAlunos(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.getAlunoList(0, valor);
  }

  onPaginateChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.getAlunoList(event.pageIndex);
  }

  deletarAluno(delaluno: Aluno) {
    const dialogData: ConfirmDialogData = {
      title: 'Confirmar a exclusão',
      message: `Tem certeza que deseja excluir o aluno "${delaluno.nome}"?`,
      confirmText: 'Sim, excluir',
      cancelText: 'Cancelar',
      confirmColor: 'secondary'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunoService.deleteAluno(delaluno.idaluno).subscribe({
          next: () => {
            this.getAlunoList(this.currentPage);
          }
        });
      }
    });
  }

  novoAluno() {
    this.router.navigate(['/aluno-novo']);
  }

  editarAluno(aluno: Aluno) {
    this.router.navigate([`/aluno-editar/${aluno.idaluno}`]);
  }
} 