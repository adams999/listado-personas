import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  nombreInput: string = '';
  apellidoInput: string = '';
  index: number;
  modoEdicion: number;

  constructor(
    private personaService: PersonasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personaService.saludar.subscribe((indice: number) => {
      alert('el indice es ' + Number(indice + 1));
    });
  }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
    if (this.index) {
      let persona: Persona = this.personaService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }

  agregarPersona(): void {
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    if (this.modoEdicion != null && this.modoEdicion == 1) {
      this.personaService.modificarPersona(this.index, persona1);
    } else {
      this.personaService.agregarPersona(persona1);
    }

    this.router.navigate(['personas']);
  }

  eliminarPersona() {
    if (this.modoEdicion != null && this.modoEdicion == 1) {
      this.personaService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
