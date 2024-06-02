/**
 * @file contador.js
 * @description Archivo con funciones relacionadas con la actualizacion del
 * contador de movimientos en el juego
 */

import { gameOver } from './modal.js';
import { arrayNiveles } from './niveles.js';

/**
 * @description Actualiza el contador de movimientos del juego
 *
 * Esta funcion incrementa el contados de movimientos, actualiza el
 * almacenamiento local y verifica si el jugador ha excedido el numero maximo de
 * movimientos permitidos para el nuvel actual.
 * Si se excede el numero maximo de movimientos y el modo relajado no esta activado se llama la funcion gameOver.
 * @function actualizarContador
 */
function actualizarContador() {
  console.log('actualizarContador()');

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  let niveles = arrayNiveles(informacionDelJuego.grupoTarjetas);

  let movimientosTexto;

  let movimientosActuales = informacionDelJuego.movimientos;
  let nivelActual = informacionDelJuego.nivelActual;
  let modoRelax = informacionDelJuego.modoRelax;

  movimientosActuales++;
  movimientosTexto = movimientosActuales;

  informacionDelJuego.movimientos = movimientosActuales;

  if (movimientosActuales > niveles[nivelActual].movimientosMax && !modoRelax) {
    gameOver();
    return;
  }

  if (movimientosActuales < 10) {
    movimientosTexto = `0${movimientosActuales}`;
  }

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );

  document.querySelector('#mov').innerHTML = movimientosTexto;
}

/**
 * @description Muestra el numero maximo de movimientos permitidos en el nivel
 * actual.
 *
 * Esta funcion actualiza el elemento DOM que muestra el numero maximo de movimientos permitidos.en el nivel actual del juego
 *
 * @function maxContador
 * @param {Object} niveles - el objeto niveles de juego
 * @param {number} nivelActual el nivel artual del juego.
 */
function maxContador(niveles, nivelActual) {
  console.log('maxContador(niveles, nivelActual)');
  let movimientosMaxTexto = niveles.movimientosMax;

  if (movimientosMaxTexto < 10) {
    movimientosMaxTexto = `0${movimientosMaxTexto}`;
  }
  document.querySelector('#mov-total').innerHTML = movimientosMaxTexto;
}

export { maxContador, actualizarContador };
