import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Injectable()
export class LoginService {
  token: any;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((token) => {
            this.token = token;
            localStorage.setItem('token', this.token);
            this.router.navigate(['/']);
          });
      })
      .catch((err) => {});
  }

  getIdToken() {
    return localStorage.getItem('token') != undefined ||
      localStorage.getItem('token') != null
      ? localStorage.getItem('token')
      : null;
  }

  isAutenticado() {
    return localStorage.getItem('token') != undefined ||
      localStorage.getItem('token') != null
      ? true
      : false;
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.token = null;
        this.router.navigate(['login']);
      })
      .catch((err) => {
        console.log('Error de Logout ', err);
      });
  }
}
