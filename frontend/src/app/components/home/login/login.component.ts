import { Component, OnInit } from '@angular/core';
// Importamos modulos necesarios
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Variable usuario
  public usuario;
  // variable token
  public token: any;
  // variable indetity
  public identity: any;
  // variable de errores
  public errores: any;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = new Usuario('', '', '', 0, '', '', '', false);
  }

  ngOnInit(): void {}

  // Metodo login
  login(loginForm: any) {
    // Validamos si el formulario es valido
    if (!loginForm.valid) {
      // Validamos que los datos no esten completos
      console.log('Faltan datos obligatorios');
      this.errores = "Faltan datos obligatorios";
      this.cerrarError();
    } else {
      // Realizamos el login
      this.usuarioService.login(this.usuario, true).subscribe(
        (response) => {
          // guardamos el token en una variable
          this.token = response.jwt;
          localStorage.setItem('token', this.token);
          // guardamos la info del usuario en variable
          localStorage.setItem('identity', JSON.stringify(response.usuario));
          console.log(response);
          // redirecciono a dashboard
          this.router.navigate(['dashboard']);
          
        },
        (error) => {
          console.log(error.error.mensaje);
          this.errores = error.error.mensaje;
          this.cerrarError();
        }
      );
    }
  }

 // cerrar ventana de error
 cerrarError(){
   setTimeout(() => {
    this.errores = '';
   }, 2000);
 }

}
