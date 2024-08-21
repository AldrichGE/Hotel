import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyReservesComponent } from '../my-reserves/my-reserves.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-reserve-data',
  templateUrl: './reserve-data.component.html',
  styleUrls: ['./reserve-data.component.css']
})
export class ReserveDataComponent {
  @Input() reservation: any;
  @Output() close = new EventEmitter<void>();

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private myReserves: MyReservesComponent,
    private authService : AuthService
  ) {}

  showCancelConfirmation = false;

  onClose() {
    this.close.emit();
  }

  onCancel() {
    this.showCancelConfirmation = true;
  }

  onCloseCancel() {
    this.showCancelConfirmation = false;
  }

  onCheckIn() {
    this.bookingService.checkIn(this.reservation.id).subscribe(
      (response) => {
        console.log('Check-in realizado com sucesso', response);
        this.reservation.status = 'Confirmado';
        this.snackBar.open('Check-In realizado com sucesso', 'Fechar', {
          duration: 3000, 
          verticalPosition: 'top', 
          horizontalPosition: 'center' 
        });
        this.myReserves.updateReservationStatus(this.reservation.id, 'CONFIRMED');
      },
      (error) => {
        console.error('Erro ao realizar check-in', error);
      }
    );
  }

  onCheckOut() {
    this.bookingService.checkOut(this.reservation.id).subscribe(
      (response) => {
        console.log('Check-Out realizado com sucesso', response);
        this.reservation.status = 'Finalizada';
        this.snackBar.open('Check-Out realizado com sucesso', 'Fechar', {
          duration: 3000, 
          verticalPosition: 'top', 
          horizontalPosition: 'center' 
        });
        this.myReserves.updateReservationStatus(this.reservation.id, 'FINISHED');
      },
      (error) => {
        console.error('Erro ao realizar check-out', error);
      }
    );
  }

  confirmCancelBooking() {
    this.bookingService.cancelBooking(this.reservation.id).subscribe(
      (response) => {
        console.log('Reserva cancelada com sucesso', response);
        this.reservation.status = 'Cancelada';
        this.showCancelConfirmation = false;
        this.onClose();
        this.snackBar.open('Reserva cancelada com sucesso', 'Fechar', {
          duration: 3000, 
          verticalPosition: 'top', 
          horizontalPosition: 'center' 
        });
        this.myReserves.updateReservationStatus(this.reservation.id, 'CANCELED');
      },
      (error) => {
        console.error('Erro ao cancelar a reserva', error);
      }
    );
  }

  get isAdminOrEmployee(): boolean {
    return this.authService.isAdminOrEmployee();
  }
}
