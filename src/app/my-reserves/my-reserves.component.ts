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
  filteredReservations: any[] = [];
  searchText: string = '';

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    const userId = this.authService.getUserId();
    const userRole = this.authService.getUserRole();

    this.bookingService.getBookings().subscribe(
      (data: any[]) => {
        this.reservations = data
          .filter(booking => {
            if (userRole === 'ADMINISTRATOR' || userRole === 'EMPLOYEE') {
              return true;
            }
            return booking.client.id === userId;
          })
          .map(booking => ({
            id: booking.id,
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
          }))
          .sort((a, b) => this.compareStatus(a.status, b.status));

        this.filteredReservations = [...this.reservations];
      },
      (error) => {
        console.error('Erro ao carregar reservas', error);
      }
    );
  }

  compareStatus(statusA: string, statusB: string): number {
    const order = { Confirmado: 1, Finalizada: 2, Cancelada: 3 } as const;

    const getOrderValue = (status: string): number => {
      return order[status as keyof typeof order] ?? 999;
    };

    return getOrderValue(statusA) - getOrderValue(statusB);
  }

  filterReservations(): void {
    const searchInput = this.searchText.toLowerCase().trim();

    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesName = reservation.client.toLowerCase().includes(searchInput);
      const matchesValue = reservation.totalValue.toString().includes(searchInput);
      const matchesDate = this.isMatchingDate(reservation, searchInput);

      return matchesName || matchesValue || matchesDate;
    });

    this.filteredReservations.sort((a, b) => this.compareStatus(a.status, b.status));
  }

  isMatchingDate(reservation: any, searchInput: string): boolean {
    const formattedCheckIn = this.formatDate(reservation.checkIn);
    const formattedCheckOut = this.formatDate(reservation.checkOut);
    const formattedPredictedCheckIn = this.formatDate(reservation.predictedCheckIn);
    const formattedPredictedCheckOut = this.formatDate(reservation.predictedCheckOut);

    return (
      formattedCheckIn.includes(searchInput) ||
      formattedCheckOut.includes(searchInput) ||
      formattedPredictedCheckIn.includes(searchInput) ||
      formattedPredictedCheckOut.includes(searchInput)
    );
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  mapBookingStatus(status: string): string {
    switch (status) {
      case 'FINISHED':
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
      default:
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

  updateReservationStatus(id: number, newStatus: string): void {
    const reservation = this.reservations.find(r => r.id === id);
    if (reservation) {
      reservation.status = this.mapBookingStatus(newStatus);
      this.filteredReservations.sort((a, b) => this.compareStatus(a.status, b.status));
    }
  }
}
