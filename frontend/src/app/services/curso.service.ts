import { Injectable } from "@angular/core";
// importamos modulos necesarios
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { global } from "./GLOBAL";

@Injectable({
  providedIn: "root",
})
export class CursoService {
  // variable url
  public url: any;

  constructor(private http: HttpClient) {
    // inicializamos url
    this.url = global.url;
  }

  listarCurso(filtro: any): Observable<any> {
    // Headers del request
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    // consumimos la API
    return this.http.get(this.url + "curso/" + filtro, { headers: headers });
  }

  obtenerCursoID(id: any): Observable<any> {
    // Headers del request
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "curso/obtenerCurso/" + id, {
      headers: headers,
    });
  }

  obtenerCategorias(): Observable<any> {
    // Headers del request
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    // consumimos la API
    return this.http.get(this.url + "categoria/", { headers: headers });
  }

  registrarCurso(data: any): Observable<any> {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("imagen", data.imagen);
    formData.append("precioTotal", data.precioTotal);
    formData.append("precioCompra", data.precioCompra);
    formData.append("cupos", data.cupos);
    formData.append("idCategoria", data.idCategoria);
    formData.append("puntos", data.puntos);

    return this.http.post(this.url + "curso/registrarCurso", formData);
  }

  editarCurso(data: any) {
    const formData = new FormData();
    console.log(data);

    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("imagen", data.imagen);
    formData.append("precioTotal", data.precioTotal);
    formData.append("precioCompra", data.precioCompra);
    formData.append("cupos", data.cupos);
    formData.append("idCategoria", data.idCategoria);
    formData.append("puntos", data.puntos);

    return this.http.put(this.url + "curso/editarCurso/" + data._id, formData);
  }
}
