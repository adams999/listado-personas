import { EventEmitter, Injectable } from '@angular/core';
import { DataServices } from './data.services';
import { LogginService } from './LoggingService.service';
import { Persona } from './persona.model';

@Injectable()
export class PersonasService {
  personas: Persona[] = [];

  saludar = new EventEmitter<number>();

  constructor(
    private loggingService: LogginService,
    private dataService: DataServices
  ) {}

  setPersonas(personas: Persona[]) {
    this.personas = personas;
  }

  obtenerPersonas() {
    return this.dataService.cargarPersonas();
  }

  agregarPersona(persona: Persona) {
    this.loggingService.enviaMensajeAConsola(
      'enviamos persona ' + persona.nombre + ' apellido ' + persona.apellido
    );
    if (this.personas == null) {
      this.personas = [];
    }
    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);
  }

  encontrarPersona(indice: number) {
    let persona: Persona = this.personas[indice];
    return persona;
  }

  modificarPersona(indice: number, persona: Persona) {
    let persona1 = this.personas[indice];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    this.dataService.modificarPersona(indice, persona);
  }

  eliminarPersona(indice: number) {
    this.personas.splice(indice, 1);
    this.dataService.eliminarPersona(indice);
    //se vuelve a guardar el arreglo para que se regeneren los indices

    this.modificarPersonas();
  }

  modificarPersonas() {
    if (this.personas != null) {
      this.dataService.guardarPersonas(this.personas);
    }
  }
}
