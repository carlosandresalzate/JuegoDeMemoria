/**
 * @file modos.js
 * @description Este archivo contiene las funciones para manejar los modos de
 * juego: normal y relax
 */

import { iniciaCronometro } from './cronometro.js';
import { playPause } from './playPause.js';
import { btnSwitch } from './variables.js';

function modoDeJuegoRelax() {
  console.log('modo relax');
}

function modoDeJuegoNormal() {
  console.log('modo normal');
  btnSwitch.addEventListener('click', playPause);

  const tiempo = {
    minutos: 0,
    segundos: 8,
  };

  iniciaCronometro(tiempo.minutos, tiempo.segundos);
}

export { modoDeJuegoNormal };
