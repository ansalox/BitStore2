import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCursoComponent } from './components/cursos/crear-curso/crear-curso.component';
import { EditarCursoComponent } from './components/cursos/editar-curso/editar-curso.component';
import { ListaCursosComponent } from './components/cursos/lista-cursos/lista-cursos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/home/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'cursos',
    component: ListaCursosComponent,
    pathMatch: 'full'
  },
  {
    path: 'curso/registrarCurso',
    component: CrearCursoComponent,
    pathMatch: 'full'
  },
  {
    path: 'curso/editarCurso/:id',
    component: EditarCursoComponent,
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
