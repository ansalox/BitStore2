import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CursoService } from "src/app/services/curso.service";
import { global } from "../../../services/GLOBAL";
import { Curso } from "../../../models/curso";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-editar-curso",
  templateUrl: "./editar-curso.component.html",
  styleUrls: ["./editar-curso.component.css"],
})
export class EditarCursoComponent implements OnInit {
  // variables
  public curso: any;
  public id: any;
  public categorias: any;
  public url: any;
  public file: any;
  public selecionarImg: any;
  public mensajeExito: any;
  public mensajeError: any;
  public stock: any;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {
    this.url = global.url;
    this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.cursoService.obtenerCursoID(this.id).subscribe(
        (response) => {
          this.curso = response.curso;
          // cargamos las categorias
          this.cursoService.obtenerCategorias().subscribe(
            (response) => {
              this.categorias = response.categoria;
              console.log(this.categorias);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  // Metodo para seleccionar la imagen a subir
  subirImg(event: any) {
    // Validamos si se cargo alguna imagen
    if (event.target.files && event.target.files[0]) {
      // en nuestra variable publica file obtenemos la imagen que llego desde el evento de la pagina
      this.file = <File>event.target.files[0];
      // creamos una variable de lectura para ver la imagen seleccionada
      const leer = new FileReader();
      // cargamos la imagen seleccionada y guardamos lo que haya en resultado
      leer.onload = (img) => (this.selecionarImg = leer.result);
      // leemos y mostramos la imagen
      leer.readAsDataURL(this.file);
    }
  }

  editarCurso(cursoForm: any) {
    if (cursoForm.valid && this.file) {
      this.cursoService
        .editarCurso({
          _id: this.id,
          nombre: cursoForm.value.nombre,
          descripcion: cursoForm.value.descripcion,
          imagen: this.file,
          precioTotal: cursoForm.value.precioTotal,
          precioCompra: cursoForm.value.precioCompra,
          cupos: cursoForm.value.cupos,
          idCategoria: cursoForm.value.idCategoria,
          puntos: cursoForm.value.puntos,
          selecionarImg: this.curso.imagen,
        })
        .subscribe(
          (response) => {
            console.log(response);
            // mensaje de exito
            this.mensajeExito = "Se actualizó el curso correctamente";
            //limpiamos todos los datos para que el formulario se limpie
            this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
            this.selecionarImg = "";
            // limpiamos el mensaje
            this.cerrarError();
          },
          (error) => {
            // mensaje de error
            this.mensajeError = "Error al editar curso";
            console.log("Error ", error);
            //limpiamos todos los datos para que el formulario se limpie
            this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
            this.selecionarImg = "";
            // limpiamos el mensaje
            this.cerrarError();
          }
        );
    } else {
      this.mensajeError = "Complete correctamente el formulario y/o la imagen";
      this.cerrarError();
    }
  }

  // cerrar ventana de error
  cerrarError() {
    setTimeout(() => {
      this.mensajeExito = "";
      this.mensajeError = "";
    }, 2000);
  }
}
