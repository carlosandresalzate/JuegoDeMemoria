/**
 * @file modal.js
 * @description Archivo con funciones relacionadas con la visualizacion de modales en el juego
 */

import { cargaNuevoNivel } from './niveles.js';
import { reiniciar } from './functions.js';
import { iniciaJuego } from './inicio.js';
import { nivelDeInicio } from './variables.js';
import { obtenerDatosJuego } from './localStorage.js';
import { pausarCronometro } from './cronometro.js';

function modalSeleccionDeModo() {
  console.log('modalSeleccionDeModo');
  pausarCronometro();
  Swal.fire({
    title: 'Selecciona modo de juego 🎮',
    confirmButtonText: 'Juego Normal ⏳',
    confirmButtonColor: 'green',
    showCancelButton: true,
    cancelButtonText: 'Modo Relax 😇',
    cancelButtonColor: 'green',
    allowOutsideClick: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    position: 'top',
  }).then((result) => {
    let informacionDelJuego = obtenerDatosJuego();
    informacionDelJuego.nivelActual = nivelDeInicio;
    if (result.isConfirmed) {
      iniciaJuego(false);
    } else if (result.isDismissed) {
      iniciaJuego(true);
    }
  });
}

/**
 * @description Muestra un modal de game over cuando el jugador se queda sin
 * movimimientos
 * @function gameOver
 */
function gameOver() {
  pausarCronometro();
  // console.log('gameOver()');
  // Aqui llamo a clearInterval para limpiar el cronomtro, aun no esta creada la variable

  // el modal puede tener fondo(background), otro icono o los que tiene por defecto y muchas mas cosas.
  Swal.fire({
    title: '¡Oh no!',
    icon: 'error',
    iconColor: '#e94057',
    text: 'Te has quedado sin movimientos 😭',
    confirmButtonText: 'Reiniciar',
    buttonStyling: false,
    confirmButtonColor: '#e94057',
    allowOutsideClick: false,
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      // console.log('gameOver');
      reiniciar();
    }
  });
}

/**
 * @description Muestra un modal cuando el jugador sube de nivel
 * @function modalSubeNivel
 */
function modalSubeNivel() {
  console.log('modalSubeNivel()');
  pausarCronometro();
  document.querySelector('#siguiente-nivel').play();
  Swal.fire({
    title: '¡Muy Bien!',
    icon: 'success',
    // iconColor: '#f27121' el icono es verde,
    text: 'Siguiente nivel',
    confirmButtonText: 'Continuar',
    // buttonStyling: false,
    confirmButtonColor: 'green', // Agregar un buen color al boton de fin del juego
    showDenyButton: true,
    denyButtonText: 'Reiniciar',
    denyButtonColor: '#e94057',
    allowOutsideClick: false,
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      console.log('boton Continuar al siguiente nivel');
      document.querySelector('#continuar').play();
      cargaNuevoNivel();
    } else if (result.isDenied) {
      document.querySelector('#reiniciar').play();
      reiniciar();
    }
  });
}

/**
 * @description Muestra un modal de end game cuando el jugador supera todos los
 * niveles
 * @function endGame
 */
function endGame() {
  pausarCronometro();
  Swal.fire({
    title: '¡Enhorabuena!',
    icon: 'success',
    // iconColor: '#f27121' el icono es verde,
    text: 'Has superado todos los niveles 🏆',
    confirmButtonText: 'Reiniciar',
    buttonStyling: false,
    confirmButtonColor: 'green', // Agregar un buen color al boton de fin del juego
    allowOutsideClick: false,
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      // console.log('endGame');
      // hay que agregar algo para que muestre varias opciones como: volver al valver al inicio y elegir nivel o reiniciar nivel(este ya existe)
      let informacionDelJuego = obtenerDatosJuego();
      informacionDelJuego.nivelActual = nivelDeInicio;

      localStorage.setItem(
        'informacionDelJuego',
        JSON.stringify(informacionDelJuego)
      );

      reiniciar();
    }
  });
}

/**
 * @description Muestra un modal de time over cuando el jugador se queda sin tiempo
 * @function timeOver
 */
function timeOver() {
  // console.log('timeOver()');
  Swal.fire({
    title: '¡Oh no!',
    icon: 'error',
    iconColor: '#e94057',
    text: 'Te has quedado sin tiempo 😭',
    confirmButtonText: 'Reiniciar',
    buttonStyling: false,
    confirmButtonColor: '#e94057',
    allowOutsideClick: false,
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      // console.log('timeOver');
      reiniciar();
    }
  });
}

export { modalSeleccionDeModo, gameOver, modalSubeNivel, endGame, timeOver };
