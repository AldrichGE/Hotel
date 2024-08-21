import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.css']
})
export class ReserveFormComponent implements OnInit {
  @Input() room: any;
  @Output() close = new EventEmitter<void>();

  hospitalities: any[] = [];
  bookingData: any = {
    days: 1,
    totalValue: 0,
    checkInDatePlanned: '',
    checkOutDatePlanned: '',
    bookingStatus: 'CONFIRMED',
    hospitalities: [],
    client: {
      id: null
    },
    room: {
      id: null
    }
  };

  private apiUrl = 'http://localhost:8080/api/v1/hotel/bookings';
  private hospitalityApiUrl = 'http://localhost:8080/api/v1/hotel/hospitality';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {
    this.fetchHospitalities();
    this.bookingData.room.id = this.room.id;
    this.bookingData.client.id = this.authService.getUserId();
    this.calculateTotalValue();
  }

  fetchHospitalities(): void {
    const headers = this.createAuthHeaders();
    this.http.get<any[]>(this.hospitalityApiUrl, { headers }).subscribe((data) => {
      this.hospitalities = data;
    }, error => {
      console.error('Erro ao buscar as comodidades', error);
    });
  }

  onHospitalityChange(event: any) {
    const selectedHospitalityId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      const selectedHospitality = this.hospitalities.find(h => h.id === selectedHospitalityId);
      this.bookingData.hospitalities.push(selectedHospitality);
    } else {
      this.bookingData.hospitalities = this.bookingData.hospitalities.filter((h: any) => h.id !== selectedHospitalityId);
    }
    this.calculateTotalValue();
  }

  onDateChange(): void {
    const checkInDate = new Date(this.bookingData.checkInDatePlanned);
    const checkOutDate = new Date(this.bookingData.checkOutDatePlanned);
    const currentDate = new Date();

    if (checkInDate < currentDate) {
      alert('A data de check-in não pode ser anterior à data atual.');
      this.bookingData.checkInDatePlanned = currentDate.toISOString().split('T')[0];
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert('A data de check-out não pode ser anterior ou igual à data de check-in.');
      this.bookingData.checkOutDatePlanned = '';
      return;
    }

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.bookingData.days = daysDiff;
    this.calculateTotalValue();
  }

  calculateTotalValue(): void {
    const roomPrice = this.room.price * this.bookingData.days;
    const hospitalitiesPrice = this.bookingData.hospitalities.reduce((acc: number, h: any) => acc + h.price, 0);
    this.bookingData.totalValue = roomPrice + hospitalitiesPrice;
  }

  submitReservation(): void {
    if (!this.bookingData.checkInDatePlanned || !this.bookingData.checkOutDatePlanned) {
      alert('Por favor, preencha as datas de check-in e check-out.');
      return;
    }
  
    this.calculateTotalValue();
  
    console.log(this.bookingData);
  
    const headers = this.createAuthHeaders();
    this.http.post<any>(this.apiUrl, this.bookingData, { headers }).subscribe(
      (response) => {
        console.log('Reserva criada com sucesso:', response);
        this.onClose();
      },
      (error) => {
        console.error('Erro ao criar reserva:', error);
      }
    );
  }

  onClose() {
    this.close.emit();
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
