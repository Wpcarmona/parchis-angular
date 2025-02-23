import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiceComponent } from "./components/dice/dice.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DiceComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parchis';

  // Propiedades para los jugadores
  jugadores = [
    { color: 'Amarillo', fichasEnCasillaGrande: 4, oportunidades: 3 },
    { color: 'Rojo', fichasEnCasillaGrande: 4, oportunidades: 3 },
    // Puedes agregar más jugadores si lo deseas
  ];

  // Propiedad para el jugador actual
  jugadorActual = 0;

  // Método para lanzar los dados
  lanzarDados(dado1: number, dado2: number) {
    console.log(`Jugador ${this.jugadores[this.jugadorActual].color} tiró: ${dado1} y ${dado2}`);
    
    // Verificar si es un doble
    if (dado1 === dado2) {
      console.log(`¡Doble! El jugador ${this.jugadores[this.jugadorActual].color} puede mover una ficha afuera de la casilla grande.`);
      this.jugadores[this.jugadorActual].fichasEnCasillaGrande--;  // Mover una ficha fuera
    } else {
      this.jugadores[this.jugadorActual].oportunidades--;  // Restar una oportunidad
      console.log(`No sacaste un doble. El jugador ${this.jugadores[this.jugadorActual].color} tiene ${this.jugadores[this.jugadorActual].oportunidades} oportunidades restantes.`);
    }
  }

  // Método para pasar al siguiente jugador
  pasarTurno() {
    this.jugadorActual = (this.jugadorActual + 1) % this.jugadores.length;
    console.log(`Es el turno del jugador ${this.jugadores[this.jugadorActual].color}`);
  }
}
