/**
 * @file functions.js
 * @description Archivo con funciones para utilidades varias.
 */
import { actualizarContador } from './contador.js';
import {
  iniciaCronometro,
  minutosRestantes,
  pausarCronometro,
  playCronometro,
  segundosRestantes,
} from './cronometro.js';
import { inicioJuego } from './inicio.js';
import { endGame, modalSubeNivel } from './modal.js';
import { arrayNiveles, ocultaMenuNiveles } from './niveles.js';
import { playPause } from './playPause.js';
import {
  btnPause,
  btnPlay,
  btnSwitch,
  minutos,
  segundos,
} from './variables.js';

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
 * @description Finaliza el juego pausando el cronometro y mostrando  el modal
 * correspondiente
 *
 * @function finalizar
 * @global
 */
function finalizar() {
  // console.log('finalizar()');
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

/**
 * @description reinicia el juego utilizando la configuracion almacenada en
 * localStorage
 *
 * @function reiniciar
 *
 */
function reiniciar() {
  // console.log('reiniciar()');
  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );
  let modoBool = informacionDelJuego.modoRelax;

  inicioJuego(modoBool);
}

/**
 * @description inicia el juego en modo normal
 *
 * @function iniciaJuegoNormal
 * @param {boolean} modoRelax - indica si el modo relajado esta activo
 */
function iniciaJuegoNormal(modoRelax) {
  console.log('iniciaJuegoNormal', modoRelax);
  document.querySelector('.cabecera').style.display = 'flex';
  document.querySelector('main').style.display = 'flex';
  document.querySelector('.btn-switch').style.display = 'flex';
  document.querySelector('#cronometro').classList.remove('cronometro-oculto');

  console.log('agrego 00 a minutos y segundos');
  minutos.innerText = '00';
  segundos.innerText = '00';

  playPause();

  const tiempo = {
    minutos: 0,
    segundos: 8,
  };

  iniciaCronometro(tiempo.minutos, tiempo.segundos);

  // if (btnPlay.classList.contains('btn-visible')) {
  //   pausarCronometro();
  // }

  // btnPause.style.display = 'block';
  // btnPlay.style.display = 'none';

  // btnSwitch.addEventListener('click', () => {
  //   if (btnPlay.style.display === 'none') {
  //     btnPlay.style.display = 'block';
  //     btnPause.style.display = 'none';
  //     pausarCronometro();
  //   } else if (btnPlay.style.display === 'block') {
  //     btnPlay.style.display = 'none';
  //     btnPause.style.display = 'block';
  //     iniciaCronometro(minutosRestantes, segundosRestantes);
  //   }
  // });
  // playCronometro();
  inicioJuego(modoRelax);
}

/**
 * @description Inicia Juego en modo relajado
 *
 * @function inciaJuegoRelax
 * @param {boolean} modoRelax - indica si el modo relajado  esta activo
 */
function iniciaJuegoRelax(modoRelax) {
  console.log('inciaJuegoRelax', modoRelax);
  document.querySelector('.cabecera').style.display = 'flex';
  document.querySelector('main').style.display = 'flex';
  document.querySelector('.btn-switch').style.display = 'none';
  document.querySelector('#cronometro').classList.add('cronometro-oculto');
  inicioJuego(modoRelax);
}

/**
 * @description cierra el menu niveles cuando se hace clic fuera del contenedor
 *
 * @function clickFueraDelMenu
 * @param {Event} evento  - evento del clic
 */
function clickFueraDelMenu(evento) {
  if (evento.target.closest('.selecciona-nivel')) return;
  document.querySelector('.selecciona-nivel').classList.remove('visible');
}

/**
 * @description cierra el menu de niveles cuando se presiona la tecla Escape
 *
 * @function teclasEscCierraMenu
 * @param {evento} evento - el evento del teclado
 */
function teclasEscCierraMenu(evento) {
  if (evento.key === 'Escape') ocultaMenuNiveles();
}

/**
 * @description anima la opaciodad de un elemento
 *
 * @function animarLaOpacidad
 * @param {HTMLElement} elemento - elemento a animar
 * @param {number} desde - el valor inicial de la opacidad
 * @param {number} hasta - el valor final de la opacidad
 * @param {number} duracion - la duracion de la animacion en milisengundos
 */
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
