import { Component, OnInit } from "@angular/core";
import { CursoService } from "src/app/services/curso.service";
import { Curso } from "../../../models/curso";

// Interface para manipular evento de seleccionar la imagen
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: "app-crear-curso",
  templateUrl: "./crear-curso.component.html",
  styleUrls: ["./crear-curso.component.css"],
})
export class CrearCursoComponent implements OnInit {
  // Variable de curso
  public curso: any;
  // variable del archivo
  public file: any;
  // variable para la imagen seleccionada
  public selecionarImg: any;
  // variable para cargar las categorias
  public categorias: any;
  // variable para mensajes exitosos
  public mensajeExito: any;
  // variable para mensajes error
  public mensajeError: any;

  constructor(private cursoService: CursoService) {
    // inicializamos curso
    this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
  }

  ngOnInit(): void {
    this.cursoService.obtenerCategorias().subscribe(
      (response) => {
        this.categorias = response.categoria;
        console.log(this.categorias);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  // Metodo para registrar un curso
  regCurso(cursoForm: any) {
    // validamos que el formulario tenga los campos requeridos
    if (cursoForm.valid) {
      // enviamos los datos del formulario al metodo registrar curso
      this.cursoService
        .registrarCurso({
          nombre: cursoForm.value.nombre,
          descripcion: cursoForm.value.descripcion,
          imagen: this.file, // imagen seleccionada
          precioTotal: cursoForm.value.precioTotal,
          precioCompra: cursoForm.value.precioCompra,
          cupos: cursoForm.value.cupos,
          idCategoria: cursoForm.value.idCategoria,
          puntos: cursoForm.value.puntos,
        })
        .subscribe(
          (response) => {
            // mensaje de exito
            this.mensajeExito = "curso registrado";
            console.log(response);
            //limpiamos todos los datos para que el formulario se limpie 
            this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
            this.selecionarImg = "";
            // limpiamos el mensaje
            this.cerrarError();
          },
          (error) => {
            // mensaje de error
            this.mensajeError = "Error al registrar";
            console.log("Error ", error);
            //limpiamos todos los datos para que el formulario se limpie 
            this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
            this.selecionarImg = "";
            // limpiamos el mensaje
            this.cerrarError();
          }
        );
    } else {
      // en caso tal que los datos del formulario no se envien o falten datos
      this.mensajeError = "Favor llenar todos los datos";
      console.log("Favor llenar todos los datos");
      this.curso = new Curso("", "", "", "", 0, 0, 0, "", 0);
      this.cerrarError();
      console.log("error en datos");
    }
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

  // cerrar ventana de error
  cerrarError() {
    setTimeout(() => {
      this.mensajeExito = "";
      this.mensajeError = "";
    }, 2000);
  }
}
