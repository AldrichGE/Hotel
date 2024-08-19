import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-reserves',
  templateUrl: './my-reserves.component.html',
  styleUrls: ['./my-reserves.component.css']
})
export class MyReservesComponent implements OnInit {
  selectedReservation: any = null;
  reservations: any[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.bookingService.getBookings().subscribe(
      (data: any[]) => {
        this.reservations = data.map(booking => ({
          client: `${booking.client.firstName} ${booking.client.lastName}`,
          checkIn: booking.checkInDate,
          checkOut: booking.checkOutDate,
          predictedCheckIn: booking.checkInDatePlanned,
          predictedCheckOut: booking.checkOutDatePlanned,
          nights: booking.days,
          totalValue: booking.totalValue,
          roomType: `Quarto ${booking.room.type}`,
          status: this.mapBookingStatus(booking.bookingStatus),
          image: this.getRoomImage(booking.room.type)
        }));
      },
      (error) => {
        console.error('Erro ao carregar reservas', error);
      }
    );
  }

  mapBookingStatus(status: string): string {
    switch (status) {
      case 'FINALIZED':
        return 'Finalizada';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'CANCELED':
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  }

  getRoomImage(roomType: string): string {
    switch (roomType) {
      case 'SINGLE':
        return './assets/individual.png';
      case 'DUPLO':
        return './assets/standard.png';
      default:''
        return './assets/luxo.png';
    }
  }

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
