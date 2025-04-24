import { Component } from '@angular/core';
import { DiceComponent } from './components/dice/dice.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiceComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'parchis';
  dados: number[] = [0, 0]; // Valores de los dados lanzados
  fichaSeleccionada: string = ''; // ID de la ficha seleccionada (ej. 'ficha-amarilla1')
  modoSeleccion: boolean = false;
  respuestaSeleccionada: string = '';
  fichaamarilla1: string = 'casilla6';
  fichaazul1: boolean = true;
  fichaverde1: boolean = true;
  ficharoja1: boolean = true;
  preguntadado: number = 0; // Dado lanzado
  modal1: boolean = false; // Modal para preguntas
  modal2: boolean = false; // Modal para preguntas
  modal3: boolean = false; // Modal para preguntas
  correctAnswer: string = ''; // Respuesta correcta para la pregunta
  positive: boolean = false; // Para mostrar el mensaje de respuesta correcta
  negative: boolean = false; // Para mostrar el mensaje de respuesta incorrecta
  closeeButton: boolean = false; // Para cerrar el modal
  // Lista de jugadores con sus fichas y oportunidades
  jugadores = [
    {
      color: 'Amarillo',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '5',
      ficha1: 'ficha-amarilla1',
      posicionficha1: 'fichaamarilla',
      isFree: false,
    },
    {
      color: 'azul',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '30',
      ficha1: 'ficha-azul1',
      posicionficha1: 'fichaazul',
      isFree: false,
    },
    {
      color: 'rojo',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '55',
      ficha1: 'ficha-rojo1',
      posicionficha1: 'ficharojo',
      isFree: false,
    },
    {
      color: 'verde',
      fichasEnCasillaGrande: 4,
      oportunidades: 3,
      salida: '80',
      ficha1: 'ficha-verde1',
      posicionficha1: 'fichaverde',
      isFree: false,
    },
  ];

  jugadorActual = 0; // Índice del jugador actual

  // Método para lanzar los dados
  lanzarDados(dado1: number, dado2: number) {
    const jugador = this.jugadores[this.jugadorActual];

    if (jugador.oportunidades === 0) {
      console.log(
        `El jugador ${jugador.color} ya no tiene oportunidades. Pasando turno...`
      );
      this.pasarTurno();
      return;
    }

    if (jugador.isFree) {
      this.moverjugador(jugador, dado1 + dado2);
    } else if (dado1 === dado2) {
      if (jugador.fichasEnCasillaGrande > 0) {
        console.log(jugador);
        this.moverFichasASalida(jugador, dado1 + dado2);
      }
      // Aquí podríamos dar al jugador otra oportunidad si es necesario según las reglas.
    } else {
      jugador.oportunidades--; // Resta una oportunidad
      console.log(
        `No sacaste un doble. Te quedan ${jugador.oportunidades} oportunidades.`
      );
    }

    // Si ya no tiene oportunidades, cambia de turno automáticamente
    if (jugador.oportunidades === 0) {
      this.pasarTurno();
    }
  }

  seleccionarFicha(fichaId: string) {
    if (this.modoSeleccion) {
      this.fichaSeleccionada = fichaId;
    }
  }

  moverFicha(fichaId: string, posicionFicha: string) {
    console.log(`Moviendo ficha: ${fichaId} a ${posicionFicha}`);
  }

  moviendoFicha(dado: number, posicionFicha: String) {
    const posicionActual = parseInt(posicionFicha.split('-')[1]);
    const nuevaPosicion = posicionActual + dado;
    return `${nuevaPosicion}`;
  }

  // Método para mover todas las fichas del jugador a su casilla de salida
  moverFichasASalida(jugador: any, total: number) {
    const salida = document.getElementById(jugador.salida);

    if (salida) {
      const fichas = ['ficha1'];

      fichas.forEach((fichaKey, index) => {
        const ficha = document.createElement('div');
        ficha.classList.add('ficha', jugador.color.toLowerCase());
        ficha.id = jugador[fichaKey]; // Asignar el id correspondiente a cada ficha
        salida.appendChild(ficha);
        jugador.isFree = true; // Marcar la ficha como libre
        const nuevaPosicion = parseInt(jugador.salida) + total;
        const nuevaPosicionId = nuevaPosicion.toString();
        // Actualizar la posición de cada ficha al nombre de la casilla de salida
        this.openPreguntas(nuevaPosicionId, total);
        jugador[`posicionficha${index + 1}`] = nuevaPosicionId;
      });
      console.log('Estado actualizado del jugador:', jugador);
    } else {
      console.log(
        `No se encontró la casilla de salida para el jugador ${jugador.color}.`
      );
    }
  }

  moverjugador(jugador: any, dado: number) {
    const fichas = ['ficha1'];

    fichas.forEach((fichaKey, index) => {
      let nuevaPosicion = parseInt(jugador[`posicionficha${index + 1}`]) + dado;

      // Sumar 9 si es color especial y la posición está entre 17 y 25
      const coloresEspeciales = ['amarillo', 'rojo', 'verde'];
      if (
        coloresEspeciales.includes(jugador.color.toLowerCase()) &&
        nuevaPosicion >= 17 &&
        nuevaPosicion <= 25
      ) {
        nuevaPosicion += 9;
      } 
      
      const coloresEspeciales2 = ['amarillo', 'azul', 'verde'];
      if (
        coloresEspeciales2.includes(jugador.color.toLowerCase()) &&
        nuevaPosicion >= 42 &&
        nuevaPosicion <= 50
      ) {
        nuevaPosicion += 9;
      } 

      const coloresEspeciales3 = ['amarillo', 'azul', 'rojo'];
      if (
        coloresEspeciales3.includes(jugador.color.toLowerCase()) &&
        nuevaPosicion >= 67 &&
        nuevaPosicion <= 75
      ) {
        nuevaPosicion += 9;
      } 

      const coloresEspeciales4 = ['verde', 'azul', 'rojo'];
      if (
        coloresEspeciales4.includes(jugador.color.toLowerCase()) &&
        nuevaPosicion >= 92 &&
        nuevaPosicion <= 100
      ) {
        nuevaPosicion == 1;
      } 


      const nuevaPosicionId = nuevaPosicion.toString();

      // ✅ Nuevo console.log si cae en la casilla 7
      if (nuevaPosicionId == '7') {
        console.log(`El jugador ${jugador.color} cayó en la casilla 7`);
      }

      this.openPreguntas(nuevaPosicionId, dado); // Llamar a la función openPreguntas

      const casillaDestino = document.getElementById(nuevaPosicionId);

      if (casillaDestino) {
        const fichaExistente = document.getElementById(jugador[fichaKey]);

        if (fichaExistente) {
          casillaDestino.appendChild(fichaExistente);
        } else {
          const nuevaFicha = document.createElement('div');
          nuevaFicha.classList.add('ficha', jugador.color.toLowerCase());
          nuevaFicha.id = jugador[fichaKey];
          casillaDestino.appendChild(nuevaFicha);
        }

        jugador[`posicionficha${index + 1}`] = nuevaPosicionId;
      } else {
        console.warn(`No se encontró la casilla con id ${nuevaPosicionId}`);
      }
    });

    console.log('Estado actualizado del jugador:', jugador);
  }

  // Método para pasar al siguiente jugador
  pasarTurno() {
    this.jugadorActual = (this.jugadorActual + 1) % this.jugadores.length;

    // Reiniciar las oportunidades del nuevo jugador
    this.jugadores[this.jugadorActual].oportunidades = 3;

    console.log(
      `Es el turno del jugador ${this.jugadores[this.jugadorActual].color}`
    );
  }

  openPreguntas(casilla: string, daddo: number) {
    switch (casilla) {
      case '7':
        this.modal1 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo; // Guardar el valor del dado lanzado
        break;
      case '9':
        this.modal2 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo; 
        break;
      case '11':
        this.modal3 = true;
        this.correctAnswer = 'C';
        this.preguntadado = daddo; 
        break;
    }
  }

  validarRespuesta() {
    if (this.respuestaSeleccionada) {
      console.log('Respuesta seleccionada:', this.respuestaSeleccionada);
      if (this.respuestaSeleccionada === this.correctAnswer) {
        console.log('Respuesta correcta!');
        this.positive = true; // Mostrar mensaje de respuesta correcta
        this.respuestaSeleccionada = ''; // Limpiar la respuesta seleccionada
        this.closeeButton = true;
        this.correctAnswer = ''; // Mostrar botón de cerrar modal
      } else {
        this.negative = true; // Mostrar mensaje de respuesta incorrecta
        this.closeeButton = true;
        this.respuestaSeleccionada = ''; // Limpiar la respuesta seleccionada
        this.correctAnswer = ''; // Limpiar la respuesta correcta
      }
    } else {
      console.warn('No seleccionaste una respuesta');
    }
  }

  closeModal() {
    this.modal1 = false;
    this.modal2 = false;
    this.modal3 = false;
    this.positive = false; // Ocultar mensaje de respuesta correcta
    this.negative = false; // Ocultar mensaje de respuesta incorrecta
  }
}
