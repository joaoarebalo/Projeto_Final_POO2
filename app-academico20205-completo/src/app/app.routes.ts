import { Routes } from '@angular/router';
import { CursoEditarComponent } from './curso-editar/curso-editar.component';
import { CursoNovoComponent } from './curso-novo/curso-novo.component';
import { CursoComponent } from './curso/curso.component';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoNovoComponent } from './aluno-novo/aluno-novo.component';
import { AlunoEditarComponent } from './aluno-editar/aluno-editar.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'curso', component: CursoComponent },
    { path: 'curso-novo', component: CursoNovoComponent },
    { path: 'curso-editar/:id', component: CursoEditarComponent },

    { path: 'aluno', component: AlunoComponent },
    { path: 'aluno-novo', component: AlunoNovoComponent },
    { path: 'aluno-editar/:id', component: AlunoEditarComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
