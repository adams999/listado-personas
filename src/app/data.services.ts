import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable()
export class DataServices {
  constructor(
    private httpClient: HttpClient,
    private loginervice: LoginService
  ) {}

  //Guardar personas
  guardarPersonas(personas: Persona[]) {
    const token = this.loginervice.getIdToken();
    this.httpClient
      .put(
        'https://listado-personas-48fcf-default-rtdb.firebaseio.com/datos.json?auth=' +
          token,
        personas
      )
      .subscribe(
        (response) => {
          console.log('Resultado guardar personas', response);
        },
        (error) => {
          console.log('Error al guardar personas', error);
        }
      );
  }

  cargarPersonas() {
    const token = this.loginervice.getIdToken();
    return this.httpClient.get(
      'https://listado-personas-48fcf-default-rtdb.firebaseio.com/datos.json?auth=' +
        token
    );
  }

  modificarPersona(indice: number, persona: Persona) {
    const token = this.loginervice.getIdToken();
    let url: string;
    url =
      'https://listado-personas-48fcf-default-rtdb.firebaseio.com/datos/' +
      indice +
      '.json?auth=' +
      token;
    this.httpClient.put(url, persona).subscribe(
      (response) => {
        console.log('resultado modificar persona ' + response);
      },
      (error) => {
        console.log('Error modificar persona ' + error);
      }
    );
  }

  eliminarPersona(indice: number) {
    const token = this.loginervice.getIdToken();
    let url: string;
    url =
      'https://listado-personas-48fcf-default-rtdb.firebaseio.com/datos/' +
      indice +
      '.json?auth=' +
      token;
    this.httpClient.delete(url).subscribe(
      (response) => {
        console.log('Resultado eliminar persona ' + response);
      },
      (error) => {
        console.log('Error eliminar persona ' + error);
      }
    );
  }
}
