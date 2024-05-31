/**
 * @file modal.js
 */

import { pausarCronometro } from './cronometro.js';
import { reiniciar } from './functions.js';
// import { inicioJuego } from './inicio.js';
import {
  // actualizaNivel,
  cargaNuevoNivel,
  // escribeNiveles,
  // nivelesDelJuego,
} from './niveles.js';

function gameOver() {
  console.log('gameOver()');
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
    console.log(result);
    if (result.isConfirmed) {
      console.log('gameOver');
      reiniciar();
    }
  });
}

function timeOver() {
  console.log('timeOver()');
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
    console.log(result);
    if (result.isConfirmed) {
      console.log('timeOver');
      reiniciar();
    }
  });
}

function endGame() {
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
    console.log(result);
    if (result.isConfirmed) {
      console.log('endGame');
      // hay que agregar algo para que muestre varias opciones como: volver al valver al inicio y elegir nivel o reiniciar nivel(este ya existe)
      reiniciar();
    }
  });
}

function modalSubeNivel() {
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
    console.log(result);
    if (result.isConfirmed) {
      console.log('result.isConfirmed');
      document.querySelector('#continuar').play();
      cargaNuevoNivel();
    } else if (result.isDenied) {
      document.querySelector('#reiniciar').play();
      reiniciar();
    }
  });
}

export { gameOver, timeOver, endGame, modalSubeNivel };
