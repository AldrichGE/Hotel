import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {
  isEditMode: boolean = false;
  selectedRoom: any = null;
  rooms: any[] = [];

  newRoom = {
    type: 'single',
    capacity: null,
    floor: null,
    price: null,
    description: '',
    available: 1
  };

  private apiUrl = 'http://localhost:8080/api/v1/hotel/rooms';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms() {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.apiUrl, { headers }).subscribe((data) => {
      this.rooms = data;
    }, error => {
      console.error('Erro ao buscar os quartos', error);
    });
  }

  onCreateRoom() {
    const headers = this.createAuthHeaders();
    const roomData = this.transformRoomData(this.newRoom);
  
    console.log('Dados enviados:', roomData);
  
    this.http.post(this.apiUrl, roomData, { headers }).subscribe(() => {
      this.fetchRooms();
      this.resetForm();
    }, error => {
      console.error('Erro ao criar o quarto', error);
    });
  }

  onEdit(room: any) {
    this.isEditMode = true;
    this.selectedRoom = { ...room };
  }

  onUpdateRoom() {
    const headers = this.createAuthHeaders();
    const roomData = this.transformRoomData(this.selectedRoom);

    this.http.put(`${this.apiUrl}/${this.selectedRoom.id}`, roomData, { headers }).subscribe(() => {
      this.fetchRooms();
      this.isEditMode = false;
      this.selectedRoom = null;
    }, error => {
      console.error('Erro ao atualizar o quarto', error);
    });
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
  
    console.log('IDs selecionados para deletar:', selectedRoomIds);
  
    selectedRoomIds.forEach(id => {
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(() => {
        this.fetchRooms();
      }, error => {
        console.error(`Erro ao excluir o quarto com ID ${id}`, error);
      });
    });
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
}
