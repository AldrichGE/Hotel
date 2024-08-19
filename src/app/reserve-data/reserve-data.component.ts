import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reserve-data',
  templateUrl: './reserve-data.component.html',
  styleUrls: ['./reserve-data.component.css']
})
export class ReserveDataComponent {
  @Input() reservation: any;
  @Output() close = new EventEmitter<void>();

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
}
