/**
 * @file contador.js
 */

import { gameOver } from './modal.js';
import { arrayNiveles } from './niveles.js';

/**
 * @todo esta funcion deberia obtener  la cantidad de movimientos y
 * actualizarlos. esta variable esta declarada en inicioJuego.
 * Tambien se usan los niveles asi que debera saber que retorna niveles.movimientosMax y tambien si esta en modo relax o no.
 * @param {} - deveria recibir niveles.movimientosMax y modoRelax
 * @returns
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

// En esta funcion manejo la visual del contador de movimientos
function maxContador(niveles, nivelActual) {
  console.log('maxContador(niveles, nivelActual)');
  let movimientosMaxTexto = niveles.movimientosMax;

  if (movimientosMaxTexto < 10) {
    movimientosMaxTexto = `0${movimientosMaxTexto}`;
  }
  document.querySelector('#mov-total').innerHTML = movimientosMaxTexto;
}

export { maxContador, actualizarContador };
