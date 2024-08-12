import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  onRegister() {
    console.log('Registrar clicado');
  }

  onLogin() {
    console.log('Login clicado');
  }
}
