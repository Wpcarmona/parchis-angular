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

  // Lista de jugadores con sus fichas y oportunidades
  jugadores = [
    { color: 'Amarillo', fichasEnCasillaGrande: 4, oportunidades: 3 },
    { color: 'Rojo', fichasEnCasillaGrande: 4, oportunidades: 3 },
    // Puedes agregar más jugadores aquí
  ];

  jugadorActual = 0; // Índice del jugador actual

  // Método para lanzar los dados
  lanzarDados(dado1: number, dado2: number) {
    const jugador = this.jugadores[this.jugadorActual];

    if (jugador.oportunidades === 0) {
      console.log(`El jugador ${jugador.color} ya no tiene oportunidades. Pasando turno...`);
      this.pasarTurno();
      return;
    }

    console.log(`Jugador ${jugador.color} tiró: ${dado1} y ${dado2}`);

    if (dado1 === dado2) {
      console.log(`¡Doble! El jugador ${jugador.color} puede mover una ficha afuera de la casilla grande.`);
      if (jugador.fichasEnCasillaGrande > 0) {
        jugador.fichasEnCasillaGrande--;  // Mueve una ficha fuera
      }
      // Aquí podríamos dar al jugador otra oportunidad si es necesario según las reglas.
    } else {
      jugador.oportunidades--;  // Resta una oportunidad
      console.log(`No sacaste un doble. Te quedan ${jugador.oportunidades} oportunidades.`);
    }

    // Si ya no tiene oportunidades, cambia de turno automáticamente
    if (jugador.oportunidades === 0) {
      this.pasarTurno();
    }
  }

  // Método para pasar al siguiente jugador
  pasarTurno() {
    this.jugadorActual = (this.jugadorActual + 1) % this.jugadores.length;
    
    // Reiniciar las oportunidades del nuevo jugador
    this.jugadores[this.jugadorActual].oportunidades = 3;
    
    console.log(`Es el turno del jugador ${this.jugadores[this.jugadorActual].color}`);
  }
}
