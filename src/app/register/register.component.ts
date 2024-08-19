import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  cpf: string = '';
  birth: string = '';
  email: string = '';
  ddi: string = '';
  ddd: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      cpf: this.cpf,
      birth: this.birth,
      email: this.email,
      password: this.password,
      role: 'CLIENT',
      phones: [
        {
          ddi: this.ddi,
          ddd: this.ddd,
          number: this.phone
        }
      ]
    };

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registro bem-sucedido', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro ao registrar', error);
      }
    );
  }

  validateName(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  }

  validateCPF(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');

    if (input.value.length > 11){
      input.value = input.value.substring(0,11)
    }
  }

  validateNumberInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  
    if (input.value.length > 3) {
      input.value = input.value.substring(0, 3);
    }
  }

  validateTel(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }
}
