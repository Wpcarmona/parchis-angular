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

  fichaamarilla1: string = 'casilla6';
  fichaamarilla2: boolean = true;
  fichaamarilla3: boolean = true;
  fichaamarilla4: boolean = true;
  fichaazul1: boolean = true;
  fichaazul2: boolean = true;
  fichaazul3: boolean = true;
  fichaazul4: boolean = true;
  fichaverde1: boolean = true;
  fichaverde2: boolean = true;
  fichaverde3: boolean = true;
  fichaverde4: boolean = true;
  ficharoja1: boolean = true;
  ficharoja2: boolean = true;
  ficharoja3: boolean = true;
  ficharoja4: boolean = true;

  // Lista de jugadores con sus fichas y oportunidades
  jugadores = [
    { color: 'Amarillo', 
      fichasEnCasillaGrande: 4, 
      oportunidades: 3, 
      salida: 'casilla5', 
      ficha1: 'ficha-amarilla1',
      ficha2: 'ficha-amarilla2',
      ficha3: 'ficha-amarilla3',
      ficha4: 'ficha-amarilla4',
      posicionficha1: 'fichaamarilla',
      posicionficha2: 'fichaamarilla',
      posicionficha3: 'fichaamarilla',
      posicionficha4: 'fichaamarilla',
    },
    { color: 'azul', 
      fichasEnCasillaGrande: 4, 
      oportunidades: 3, 
      salida: 'casilla30',
      ficha1: 'ficha-azul1',
      ficha2: 'ficha-azul2',
      ficha3: 'ficha-azul3',
      ficha4: 'ficha-azul4',
      posicionficha1: 'fichaazul',
      posicionficha2: 'fichaazul',
      posicionficha3: 'fichaazul',
      posicionficha4: 'fichaazul',
    },
    { color: 'rojo', 
      fichasEnCasillaGrande: 4, 
      oportunidades: 3, 
      salida: 'casilla55',
      ficha1: 'ficha-rojo1',
      ficha2: 'ficha-rojo2',
      ficha3: 'ficha-rojo3',
      ficha4: 'ficha-rojo4',
      posicionficha1: 'ficharojo',
      posicionficha2: 'ficharojo',
      posicionficha3: 'ficharojo',
      posicionficha4: 'ficharojo', 
    },
    { color: 'verde', 
      fichasEnCasillaGrande: 4, 
      oportunidades: 3, 
      salida: 'casilla80',
      ficha1: 'ficha-verde1',
      ficha2: 'ficha-verde2',
      ficha3: 'ficha-verde3',
      ficha4: 'ficha-verde4',
      posicionficha1: 'fichaverde',
      posicionficha2: 'fichaverde',
      posicionficha3: 'fichaverde',
      posicionficha4: 'fichaverde',
     },
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
      console.log(`¡Doble! El jugador ${jugador.color} puede mover todas sus fichas a su salida.`);
      if (jugador.fichasEnCasillaGrande > 0) {
        this.moverFichasASalida(jugador);
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

  // Método para mover todas las fichas del jugador a su casilla de salida
  moverFichasASalida(jugador: any) { 
    console.log(jugador);
    const salida = document.getElementById(jugador.salida);
    
    if (salida) {
      const fichas = ['ficha1', 'ficha2', 'ficha3', 'ficha4'];
  
      fichas.forEach((fichaKey, index) => {
        const ficha = document.createElement('div');
        ficha.classList.add('ficha', jugador.color.toLowerCase());
        ficha.id = jugador[fichaKey]; // Asignar el id correspondiente a cada ficha
        salida.appendChild(ficha);
  
        // Actualizar la posición de cada ficha al nombre de la casilla de salida
        jugador[`posicionficha${index + 1}`] = jugador.salida;
      });
  
      console.log(`Todas las fichas del jugador ${jugador.color} se han movido a ${jugador.salida}.`);
      console.log('Estado actualizado del jugador:', jugador);
    } else {
      console.log(`No se encontró la casilla de salida para el jugador ${jugador.color}.`);
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
