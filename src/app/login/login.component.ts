import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string | null = null;
  passwordError: string | null = null;
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  isFormInvalid(): boolean {
    return !this.email || !this.password;
  }

  onLogin(): void {
    this.clearErrors();

    if (!this.email) {
      this.emailError = 'Campo Obrigatório.';
    }

    if (!this.password) {
      this.passwordError = 'Campo Obrigatório.';
    }

    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login bem-sucedido', response);
          this.router.navigate(['/newReserve']);
        },
        (error) => {
          console.error('Erro ao fazer login', error);
          this.loginError = 'Credenciais incorretas';
        }
      );
    }
  }

  clearErrors(): void {
    this.emailError = null;
    this.passwordError = null;
    this.loginError = null;
  }
}
