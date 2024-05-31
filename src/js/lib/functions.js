/**
 * @file functions.js
 * @description Archivo con funciones para utilidades varias.
 */
import { actualizarContador } from './contador.js';
import { pausarCronometro } from './cronometro.js';
import { inicioJuego } from './inicio.js';
import { endGame, modalSubeNivel } from './modal.js';
import { arrayNiveles, ocultaMenuNiveles } from './niveles.js';

/**
 * @description Recupera el valor alamacenado en localStorage usando la clave
 * proporcionada.
 *
 * @function obtieneCache
 * @param {string} value el valor obtenido de localStorage.
 * @returns {?*} El valor almacenado en localStorage o null si no existe
 */
// const cacheKey = localStorage.getItem('grupoTarjetas');
// console.log('cacheKey', Boolean(cacheKey));
function obtieneCache(value) {
  console.log('obtieneCache(key)');

  let personajes = JSON.parse(value);
  return personajes;
}

function finalizar() {
  console.log('finalizar()');
  pausarCronometro();

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

// #region descubrir y comparar;

function descubrir() {
  console.log('descubrir()');
  let descubiertas;
  let tarjetasPendientes;
  let totalDescubiertas = document.querySelectorAll(
    '.descubiertas:not(.acertado)'
  );

  if (totalDescubiertas.length > 1) {
    console.log(totalDescubiertas.length > 1);
    return;
  }

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

function comparar(tarjetasAComparar) {
  console.log('comparar(tarjetasAComparar)');
  if (
    tarjetasAComparar[0].dataset.valor === tarjetasAComparar[1].dataset.valor
  ) {
    acierto(tarjetasAComparar);
  } else {
    error(tarjetasAComparar);
  }
}

function acierto(lasTarjetas) {
  console.log('acierto(lasTarjetas)');
  console.log(lasTarjetas[0].dataset.valor);
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

function error(lasTarjetas) {
  console.log('error(lasTarjetas)');
  lasTarjetas.forEach((element) => {
    element.classList.add('error');
  });

  // agregar sonido de error
  console.log('sonido de error');
  document.querySelector('#sonido-error').play();
  // elimina la clase descubierta y error despues de un segundo
  setTimeout(function () {
    console.log('setTimeout()');
    lasTarjetas.forEach((element) => {
      element.classList.remove('descubierta');
      element.classList.remove('error');
    });
  }, 1000);
}

// #region FUncion reiniciar la logica de esta se trabaja en un modal.
function reiniciar() {
  console.log('reiniciar()');
  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );
  let modoBool = informacionDelJuego.modoRelax;

  inicioJuego(modoBool);
}

function iniciaJuegoNormal(modoRelax) {
  console.log('iniciaJuegoNormal', modoRelax);
  document.querySelector('.cabecera').style.display = 'flex';
  document.querySelector('main').style.display = 'flex';
  inicioJuego(modoRelax);
}

function iniciaJuegoRelax(modoRelax) {
  console.log('inciaJuegoRelax', modoRelax);
  document.querySelector('.cabecera').style.display = 'flex';
  document.querySelector('main').style.display = 'flex';
  document.querySelector('.btn-switch').style.display = 'none';
  inicioJuego(modoRelax);
}

// cierra el menu cuando se hace click fuera del contendor.
function clickFueraDelMenu(evento) {
  if (evento.target.closest('.selecciona-nivel')) return;
  document.querySelector('.selecciona-nivel').classList.remove('visible');
}

// se cierra el menu con la tecla Esc
function teclasEscCierraMenu(evento) {
  if (evento.key === 'Escape') ocultaMenuNiveles();
}

function animarLaOpacidad(elemento, desde, hasta, duracion) {
  const tiempo = 10;
  const pasos = duracion / tiempo;
  const tamaño = (hasta - desde) / pasos;
  let pasoActual = 0;

  function paso() {
    if (pasoActual < pasos) {
      elemento.style.opacity = parseFloat(elemento.style.opacity) + tamaño;
      pasoActual++;
      setTimeout(paso, tiempo);
    }
  }
  elemento.style.opacity = desde;
  paso();
}

export {
  obtieneCache,
  descubrir,
  comparar,
  reiniciar,
  iniciaJuegoNormal,
  iniciaJuegoRelax,
  clickFueraDelMenu,
  teclasEscCierraMenu,
  animarLaOpacidad,
};
