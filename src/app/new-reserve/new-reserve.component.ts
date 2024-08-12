import { Component } from '@angular/core';

@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.css']
})
export class NewReserveComponent {

  rooms = [
    {
      name: 'Quarto Individual',
      description: 'Um quarto confortável para se passar a noite.',
      price: 120,
      image: './assets/individual.png'
    },
    {
      name: 'Quarto Casal Básico',
      description: 'Um quarto aconchegante com uma cama de casal, ar-condicionado e Wi-Fi gratuito.',
      price: 220,
      image: './assets/casal.png'
    },
    {
      name: 'Quarto Família',
      description: 'Um quarto aconchegante com uma cama de casal e uma beliche.',
      price: 300,
      image: './assets/familia.png'
    },
    {
      name: 'Quarto Solteiro Duplo',
      description: 'Um quarto aconchegante com duas camas de solteiro.',
      price: 260,
      image: './assets/solteiro.png'
    },
    {
      name: 'Quarto Luxo',
      description: 'Quarto espaçoso com varanda, vista para o mar, ar-condicionado e TV a cabo.',
      price: 400,
      image: './assets/luxo.png'
    },
    {
      name: 'Quarto Suíte Master',
      description: 'Suíte com sala de estar, jacuzzi, minibar e vista panorâmica.',
      price: 600,
      image: './assets/master.png'
    }
  ];

  reserveRoom(room: any) {
    alert(`Você reservou o ${room.name} por ${room.price} reais.`);
  }
}
