import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {
  isEditMode: boolean = false;
  selectedRoom: any = null;
  rooms: any[] = [];
  selectedFile: File | null = null;

  newRoom = {
    type: 'single',
    capacity: null,
    floor: null,
    price: null,
    description: '',
    available: 1
  };

  private apiUrl = 'http://localhost:8080/api/v1/hotel/rooms';

  constructor(private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms() {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe((data) => {
      this.rooms = data;
    }, error => {
      this.showSnackBar('Erro ao buscar os quartos', 'error');
    });
  }

  onCreateRoom() {
    if (this.isFormValid(this.newRoom)) {
      const headers = this.createAuthHeaders();
      const roomData = this.transformRoomData(this.newRoom);

      this.http.post(this.apiUrl, roomData, { headers }).subscribe(() => {
        this.fetchRooms();
        this.resetForm();
        this.showSnackBar('Quarto criado com sucesso!', 'success');
      }, error => {
        this.showSnackBar('Erro ao criar o quarto', 'error');
      });
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios', 'error');
    }
  }

  onEdit(room: any) {
    this.isEditMode = true;
    this.selectedRoom = { ...room };
  }

  onUpdateRoom() {
    if (this.isFormValid(this.selectedRoom)) {
      const headers = this.createAuthHeaders();
      const roomData = this.transformRoomData(this.selectedRoom);

      this.http.put(`${this.apiUrl}/${this.selectedRoom.id}`, roomData, { headers }).subscribe(() => {
        this.fetchRooms();
        this.isEditMode = false;
        this.selectedRoom = null;
        this.showSnackBar('Quarto atualizado com sucesso!', 'success');
      }, error => {
        this.showSnackBar('Erro ao atualizar o quarto', 'error');
      });
    } else {
      this.showSnackBar('Por favor, preencha todos os campos obrigatórios', 'error');
    }
  }

  onCancelEdit() {
    this.isEditMode = false;
    this.selectedRoom = null;
  }

  resetForm() {
    this.newRoom = {
      type: 'single',
      capacity: null,
      floor: null,
      price: null,
      description: '',
      available: 1
    };
  }

  onDeleteRooms() {
    const headers = this.createAuthHeaders();
    const selectedRoomIds = this.rooms
      .filter(room => room.selected)
      .map(room => room.id);

    selectedRoomIds.forEach(id => {
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(() => {
        this.fetchRooms();
        this.showSnackBar(`Quarto ${id} excluído com sucesso!`, 'success');
      }, error => {
        this.showSnackBar(`Erro ao excluir o quarto com ID ${id}`, 'error');
      });
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUploadImage() {
    if (this.selectedRoom && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      const headers = this.createAuthHeaders();
      this.http.post(`${this.apiUrl}/${this.selectedRoom.id}/upload-photo`, formData, { headers }).subscribe(response => {
        this.showSnackBar('Imagem enviada com sucesso!', 'success');
        this.selectedFile = null;
      }, error => {
        this.showSnackBar('Erro ao enviar a imagem', 'error');
      });
    }
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private transformRoomData(room: any) {
    return {
      ...room,
      type: this.convertRoomType(room.type)
    };
  }

  private convertRoomType(type: string): string {
    switch (type) {
      case 'single':
        return 'SINGLE';
      case 'double':
        return 'DUPLO';
      case 'suite':
        return 'SUITE';
      default:
        return type;
    }
  }

  private isFormValid(room: any): boolean {
    return room.type && room.capacity && room.floor && room.price && room.description;
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error'
    });
  }
}
