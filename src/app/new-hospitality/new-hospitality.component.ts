import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchHospitalities();
  }

  fetchHospitalities(): void {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe((data) => {
      this.hospitalities = data;
    }, error => {
      this.showSnackBar('Erro ao buscar as comodidades', 'error');
    });
  }

  createHospitality(): void {
    if (this.isFormValid(this.newHospitality)) {
      const headers = this.createAuthHeaders();
      this.http.post(this.apiUrl, this.newHospitality, { headers }).subscribe(() => {
        this.fetchHospitalities();
        this.resetForm();
        this.showSnackBar('Serviço criado com sucesso!', 'success');
      }, error => {
        this.showSnackBar('Erro ao criar o serviço', 'error');
      });
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios', 'error');
    }
  }

  editHospitality(hospitality: any): void {
    this.isEditMode = true;
    this.selectedHospitality = { ...hospitality };
  }

  updateHospitality(): void {
    if (this.isFormValid(this.selectedHospitality)) {
      const headers = this.createAuthHeaders();
      this.http.put(`${this.apiUrl}/${this.selectedHospitality.id}`, this.selectedHospitality, { headers }).subscribe(() => {
        this.fetchHospitalities();
        this.isEditMode = false;
        this.selectedHospitality = null;
        this.showSnackBar('Serviço atualizado com sucesso!', 'success');
      }, error => {
        this.showSnackBar('Erro ao atualizar o serviço', 'error');
      });
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios', 'error');
    }
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
        this.showSnackBar(`Serviço ${id} excluído com sucesso!`, 'success');
      }, error => {
        this.showSnackBar(`Erro ao excluir o serviço com ID ${id}`, 'error');
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

  private isFormValid(hospitality: any): boolean {
    return hospitality.name && hospitality.price && hospitality.description;
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
