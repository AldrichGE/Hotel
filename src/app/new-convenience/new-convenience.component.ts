import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-convenience',
  templateUrl: './new-convenience.component.html',
  styleUrls: ['./new-convenience.component.css']
})
export class NewConvenienceComponent implements OnInit {
  isEditMode: boolean = false;
  selectedConvenience: any = null;
  conveniences: any[] = [];

  newConvenience = {
    name: '',
    description: ''
  };

  private apiUrl = 'http://localhost:8080/api/v1/hotel/conveniences';

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchConveniences();
  }

  fetchConveniences(): void {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe((data) => {
      this.conveniences = data;
    }, error => {
      this.showSnackBar('Erro ao buscar as comodidades', 'error');
    });
  }

  createConvenience(): void {
    if (this.isFormValid(this.newConvenience)) {
      const headers = this.createAuthHeaders();
      this.http.post(this.apiUrl, this.newConvenience, { headers }).subscribe(() => {
        this.fetchConveniences();
        this.resetForm();
        this.showSnackBar('Comodidade criada com sucesso!', 'success');
      }, error => {
        this.showSnackBar('Erro ao criar a comodidade', 'error');
      });
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios', 'error');
    }
  }

  editConvenience(convenience: any): void {
    this.isEditMode = true;
    this.selectedConvenience = { ...convenience };
  }

  updateConvenience(): void {
    if (this.isFormValid(this.selectedConvenience)) {
      const headers = this.createAuthHeaders();
      this.http.put(`${this.apiUrl}/${this.selectedConvenience.id}`, this.selectedConvenience, { headers }).subscribe(() => {
        this.fetchConveniences();
        this.isEditMode = false;
        this.selectedConvenience = null;
        this.showSnackBar('Comodidade atualizada com sucesso!', 'success');
      }, error => {
        this.showSnackBar('Erro ao atualizar a comodidade', 'error');
      });
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios', 'error');
    }
  }

  onDeleteConveniences() {
    const headers = this.createAuthHeaders();
    const selectedConvenienceIds = this.conveniences
      .filter(convenience => convenience.selected)
      .map(convenience => convenience.id);
  
    console.log('IDs selecionados para deletar:', selectedConvenienceIds);
  
    selectedConvenienceIds.forEach(id => {
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(() => {
        this.fetchConveniences();
        this.showSnackBar(`Comodidade ${id} excluída com sucesso!`, 'success');
      }, error => {
        this.showSnackBar(`Erro ao excluir a comodidade com ID ${id}`, 'error');
      });
    });
  }

  resetForm(): void {
    this.newConvenience = {
      name: '',
      description: ''
    };
    this.isEditMode = false;
    this.selectedConvenience = null;
  }

  private isFormValid(convenience: any): boolean {
    return convenience.name && convenience.description;
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error'
    });
  }
}
