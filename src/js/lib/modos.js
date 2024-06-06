/**
 * @file modos.js
 * @description Este archivo contiene las funciones para manejar los modos de
 * juego: normal y relax
 */

import { iniciaCronometro } from './cronometro.js';
import { obtenerDatosJuego } from './localStorage.js';
import { arrayNiveles } from './niveles.js';
import { playPause } from './playPause.js';
import { btnSwitch } from './variables.js';

function modoDeJuegoRelax() {
  console.log('modo relax');
}

function modoDeJuegoNormal() {
  console.log('modo normal');
  btnSwitch.addEventListener('click', playPause);

  const informacionDelJuego = obtenerDatosJuego();
  const niveles = arrayNiveles(informacionDelJuego.grupoTarjetas);

  let tiempo = {};

  niveles.forEach((element, i) => {
    if (informacionDelJuego.nivelActual === i) {
      tiempo = element.tiempo;
    }
  });

  iniciaCronometro(tiempo.minutos, tiempo.segundos);
}

export { modoDeJuegoNormal };
