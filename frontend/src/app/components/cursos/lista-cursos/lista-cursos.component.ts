import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { global } from '../../../services/GLOBAL';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
})
export class ListaCursosComponent implements OnInit {
  // Variable cursos
  public cursos: any;
  // Variable url de imagenes
  public url: any;
  // Variable filtro para la busqueda
  public filtro: any;

  constructor(private cursoService: CursoService) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.cursoService.listarCurso('').subscribe(
      (response) => {
        this.cursos = response.productos;
        console.log(this.cursos);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
