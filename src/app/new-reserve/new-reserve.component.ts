import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room/room.service';

@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.css']
})
export class NewReserveComponent implements OnInit {
  rooms: any[] = [];
  selectedRoom: any = null;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.roomService.getRooms().subscribe(
      (data: any) => {
        const roomTypeMapping: { [key: string]: string } = {
          'SINGLE': 'Quarto Individual',
          'DUPLO': 'Quarto Duplo',
          'SUITE': 'Quarto Suíte'
        };
  
        const roomImageMapping: { [key: string]: string[] } = {
          'SINGLE': ['./assets/individual.png'],
          'DUPLO': ['./assets/solteiro.png'],
          'SUITE': ['./assets/luxo.png']
        };
  
        this.rooms = data.map((room: any) => {
          const images = roomImageMapping[room.type] || [];
          const selectedImage = images.length ? images[Math.floor(Math.random() * images.length)] : '';
  
          return {
            ...room,
            name: roomTypeMapping[room.type] || room.name,
            guests: room.capacity,
            image: selectedImage || room.image
          };
        });
      },
      (error) => {
        console.error('Erro ao buscar quartos:', error);
      }
    );
  }

  openReserveForm(room: any) {
    this.selectedRoom = room;
  }

  closeReserveForm() {
    this.selectedRoom = null;
  }
}
