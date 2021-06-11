import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Importamos modulo http
import { HttpClientModule } from '@angular/common/http';
// Importamos modulo forms
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/home/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaCursosComponent } from './components/cursos/lista-cursos/lista-cursos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CrearCursoComponent } from './components/cursos/crear-curso/crear-curso.component';
import { EditarCursoComponent } from './components/cursos/editar-curso/editar-curso.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, ListaCursosComponent, SidebarComponent, CrearCursoComponent, EditarCursoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
