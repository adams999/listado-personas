import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titulo = 'listado de Personas';

  constructor(private loginService:LoginService) {}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCcKyvyDjy5HViug7_MYYyDvgMxqYETLZU',
      authDomain: 'listado-personas-48fcf.firebaseapp.com',
    });
  }

  isAutenticado(){
    return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
  }
}
