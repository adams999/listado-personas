import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];

  constructor(
    private personasService: PersonasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personasService.obtenerPersonas().subscribe((personas:any) => {
      this.personas = personas;
      this.personasService.setPersonas(personas);
    });
  }

  personaAgregada(persona: Persona) {
    // this.logginService.enviaMensajeAConsola('APP COMPONENT');
    // this.personas.push(persona);
    this.personasService.agregarPersona(persona);
  }

  agregar() {
    this.router.navigate(['personas/agregar']);
  }
}
