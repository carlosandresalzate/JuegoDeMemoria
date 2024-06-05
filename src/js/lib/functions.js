/**
 * @file functions.js
 * @description Archivo con funciones para utilidades varias.
 */

import { actualizarContador } from './contador.js';
import { obtenerDatosJuego } from './localStorage.js';
import { iniciaJuego } from './inicio.js';
import { endGame, modalSubeNivel } from './modal.js';
import { arrayNiveles } from './niveles.js';

/**
 * @description Recupera el valor alamacenado en localStorage usando la clave
 * proporcionada.
 *
 * @function obtieneCache
 * @param {string} value el valor obtenido de localStorage.
 * @returns {?*} El valor almacenado en localStorage o null si no existe
 */
function obtieneCache(value) {
  // console.log('obtieneCache(key)');

  let personajes = JSON.parse(value);
  return personajes;
}

/**
 * @description Descubre una tarjeta y comprueba si hay un par coincidente.
 * @function descubrir
 * @this {HTMLElement}
 * @returns
 */
function descubrir() {
  // console.log('descubrir()');
  let descubiertas;
  let tarjetasPendientes;
  let totalDescubiertas = document.querySelectorAll(
    '.descubiertas:not(.acertado)'
  );

  // si ya hay dos tarjetas descubiertas, no hacer nada;
  if (totalDescubiertas.length > 1) {
    // console.log(totalDescubiertas.length > 1);
    return;
  }

  // marca la tarjeta descubierta
  this.classList.add('descubierta');

  // agregamos un sonido
  document.querySelector('#sonido-carta').cloneNode().play();

  descubiertas = document.querySelectorAll('.descubierta:not(.acertada)');

  if (descubiertas.length < 2) return;

  comparar(descubiertas);
  actualizarContador();

  tarjetasPendientes = document.querySelectorAll('.tarjeta:not(.acertada)');

  if (tarjetasPendientes.length === 0) setTimeout(finalizar, 1000);
}

/**
 * @description compara dos tarjetas descubiertas para verificar si don iguales
 *
 * @function comparar
 * @param {NodeList} tarjetasAComparar -lasTarjetas que se estan comparando.
 */
function comparar(tarjetasAComparar) {
  // console.log('comparar(tarjetasAComparar)');
  if (
    tarjetasAComparar[0].dataset.valor === tarjetasAComparar[1].dataset.valor
  ) {
    acierto(tarjetasAComparar);
  } else {
    error(tarjetasAComparar);
  }
}

/**
 * @description marca un par de tarjetas como acertadas y reproduce un sonido
 * @param {NodeList} lasTarjetas las tarjetas que son un par acertado
 */
function acierto(lasTarjetas) {
  // console.log('acierto(lasTarjetas)');
  // console.log(lasTarjetas[0].dataset.valor);
  /* Este if no esta definido, aun falta diseño */
  // if(lasTarjetas[0].dataset.valor === 1) {
  //   // aqui debo pausar el tiempo, mostrar una modal con un rick sanchez bailando, esa idea aun se debe trabajar.
  // }
  lasTarjetas.forEach((element) => {
    element.classList.add('acertada');
  });
  // Agregar el sonido para los aciertos
  document.querySelector('#sonido-acierto').play();
}

/**
 * @description marca un par de tarjetas como incorectas y las oculta despues
 * de un breve retraso
 *
 * @function error
 * @param {NodeList} lasTarjetas - las tarjetas que no son par
 */
function error(lasTarjetas) {
  // console.log('error(lasTarjetas)');
  lasTarjetas.forEach((element) => {
    element.classList.add('error');
  });

  document.querySelector('#sonido-error').play();
  // elimina la clase descubierta y error despues de un segundo
  setTimeout(function () {
    // console.log('setTimeout()');
    lasTarjetas.forEach((element) => {
      element.classList.remove('descubierta');
      element.classList.remove('error');
    });
  }, 1000);
}

function reiniciar() {
  // console.log('reiniciar()');
  let informacionDelJuego = obtenerDatosJuego();

  let modoBool = informacionDelJuego.modoRelax;

  iniciaJuego(modoBool);
}

/**
 * @description Finaliza el juego pausando el cronometro y mostrando  el modal
 * correspondiente
 *
 * @function finalizar
 * @global
 */
function finalizar() {
  // console.log('finalizar()');

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );
  let nivelActual = informacionDelJuego.nivelActual;
  let niveles = arrayNiveles(informacionDelJuego.grupoTarjetas);

  if (nivelActual < niveles.length - 1) {
    modalSubeNivel();
  } else {
    endGame();
  }
}

export { obtieneCache, descubrir, reiniciar };
