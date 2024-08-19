import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-new-hospitality',
  templateUrl: './new-hospitality.component.html',
  styleUrls: ['./new-hospitality.component.css']
})
export class NewHospitalityComponent implements OnInit {
  isEditMode: boolean = false;
  selectedHospitality: any = null;
  hospitalities: any[] = [];

  newHospitality = {
    name: '',
    price: null,
    description: ''
  };

  private apiUrl = 'http://localhost:8080/api/v1/hotel/hospitality';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchHospitalities();
  }

  fetchHospitalities(): void {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe((data) => {
      this.hospitalities = data;
    }, error => {
      console.error('Erro ao buscar as comodidades', error);
    });
  }

  createHospitality(): void {
    const headers = this.createAuthHeaders();
    this.http.post(this.apiUrl, this.newHospitality, { headers }).subscribe(() => {
      this.fetchHospitalities();
      this.resetForm();
    }, error => {
      console.error('Erro ao criar a comodidade', error);
    });
  }

  editHospitality(hospitality: any): void {
    this.isEditMode = true;
    this.selectedHospitality = { ...hospitality };
  }

  updateHospitality(): void {
    const headers = this.createAuthHeaders();
    this.http.put(`${this.apiUrl}/${this.selectedHospitality.id}`, this.selectedHospitality, { headers }).subscribe(() => {
      this.fetchHospitalities();
      this.isEditMode = false;
      this.selectedHospitality = null;
    }, error => {
      console.error('Erro ao atualizar a comodidade', error);
    });
  }

  onDeleteHospitalities() {
    const headers = this.createAuthHeaders();
    const selectedHospitalityIds = this.hospitalities
      .filter(hospitality => hospitality.selected)
      .map(hospitality => hospitality.id);
  
    console.log('IDs selecionados para deletar:', selectedHospitalityIds);
  
    selectedHospitalityIds.forEach(id => {
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(() => {
        this.fetchHospitalities();
      }, error => {
        console.error(`Erro ao excluir a comodidade com ID ${id}`, error);
      });
    });
  }

  resetForm(): void {
    this.newHospitality = {
      name: '',
      price: null,
      description: ''
    };
    this.isEditMode = false;
    this.selectedHospitality = null;
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
