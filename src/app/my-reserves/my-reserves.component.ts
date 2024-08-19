import { Component } from '@angular/core';

@Component({
  selector: 'app-my-reserves',
  templateUrl: './my-reserves.component.html',
  styleUrls: ['./my-reserves.component.css']
})
export class MyReservesComponent {
  selectedReservation: any = null;

  reservations = [
    {
      client: 'Carlos Matheus',
      checkIn: '24/11/2023',
      checkOut: '28/11/2023',
      predictedCheckIn: '23/11/2023',
      predictedCheckOut: '29/11/2023',
      nights: 4,
      totalValue: 1200.00,
      roomType: 'Quarto Single',
      status: 'Finalizada',
      image: './assets/individual.png'
    },
    {
      client: 'José Miguel',
      checkIn: '20/01/2024',
      checkOut: '23/01/2024',
      predictedCheckIn: '19/01/2024',
      predictedCheckOut: '24/01/2024',
      nights: 3,
      totalValue: 900.00,
      roomType: 'Quarto Double',
      status: 'Confirmado',
      image: './assets/standard.png'
    }
  ];

  onViewMore(reservation: any) {
    this.selectedReservation = reservation;
    document.body.classList.add('blurred');
  }

  onCloseReserveData() {
    this.selectedReservation = null;
    document.body.classList.remove('blurred');
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Finalizada':
      case 'Confirmado':
        return 'status-finalizada';
      case 'Cancelada':
        return 'status-aguardando';
      default:
        return '';
    }
  }
}