import { Injectable } from '@angular/core';
// importamos modulos necesarios
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './GLOBAL';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Varaible para la url
  public url;
  public usuario;
  // creamos variables token e identity
  public token: any;
  public identity: any;

  // Constructor de la clase
  constructor(private http: HttpClient) {
    // le asignamos la url del backen a la variable global
    this.url = global.url;
    // Inicializamos el modelo uusuario
    this.usuario = new Usuario('', '', '', 0, '', '', '', false);
  }

  // Metodo para hacer login
  login(usuario: Usuario, getToken: boolean): Observable<any> {
    // Variable que almacene los datos del usuario
    let json = usuario;
    // Validamos si llego un token
    if (!getToken) {
    } else {
      usuario.getToken = true;
    }
    // Headers del request
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // enviamos y recibimos la peticion
    // http://localhost:3001/api/login
    return this.http.post(this.url + 'login', json, { headers: headers });
  }

  // Metodo para obtener el token
  getToken(): Observable<any> {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = false;
    }
    return this.token;
  }

  // Metodo para los datos del usuario
  getIdentity(): Observable<any> {
    let identity = localStorage.getItem('identity');
    if (identity) {
      this.identity = identity;
    } else {
      this.identity = false;
    }
    return this.identity;
  }
}
