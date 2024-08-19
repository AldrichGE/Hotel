import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.css']
})
export class ReserveFormComponent {
  @Input() room: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}