import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchConveniences();
  }

  fetchConveniences(): void {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe((data) => {
      this.conveniences = data;
    }, error => {
      console.error('Erro ao buscar as comodidades', error);
    });
  }

  createConvenience(): void {
    const headers = this.createAuthHeaders();
    this.http.post(this.apiUrl, this.newConvenience, { headers }).subscribe(() => {
      this.fetchConveniences();
      this.resetForm();
    }, error => {
      console.error('Erro ao criar a comodidade', error);
    });
  }

  editConvenience(convenience: any): void {
    this.isEditMode = true;
    this.selectedConvenience = { ...convenience };
  }

  updateConvenience(): void {
    const headers = this.createAuthHeaders();
    this.http.put(`${this.apiUrl}/${this.selectedConvenience.id}`, this.selectedConvenience, { headers }).subscribe(() => {
      this.fetchConveniences();
      this.isEditMode = false;
      this.selectedConvenience = null;
    }, error => {
      console.error('Erro ao atualizar a comodidade', error);
    });
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
      }, error => {
        console.error(`Erro ao excluir a comodidade com ID ${id}`, error);
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

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
