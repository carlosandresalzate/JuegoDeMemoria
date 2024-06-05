/**
 * @file niveles.js
 * @description Archivo con funciones relacionadas con los niveles del juego
 */

import { obtieneCache } from './functions.js';
import { distribuyePersonajesAleatorio } from './generarGrupoTarjetas.js';
import { iniciaJuego } from './inicio.js';
import { cacheKey } from './variables.js';

/**
 * @description Crea un array de objetos que representan los niveles del juego
 *
 * @function arrayNiveles
 * @param {Array<Array>} grupoTarjetas - grupo tarjetas para cada nivel.
 * @returns {Array<Object>} un array de niveles con tarjetas y movimientos
 * permitidos.
 */
function arrayNiveles(grupoTarjetas) {
  const niveles = [
    {
      tarjetas: grupoTarjetas[0],
      movimientosMax: 3,
      tiempo: {
        minutos: 0,
        segundos: 10,
      },
    },
    {
      tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1]),
      movimientosMax: 8,
      tiempo: {
        minutos: 0,
        segundos: 10,
      },
    },
    {
      tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1], grupoTarjetas[2]),
      movimientosMax: 12,
      tiempo: {
        minutos: 0,
        segundos: 10,
      },
    },
    {
      tarjetas: grupoTarjetas[0].concat(
        grupoTarjetas[1],
        grupoTarjetas[2],
        grupoTarjetas[3]
      ),
      movimientosMax: 25,
      tiempo: {
        minutos: 0,
        segundos: 10,
      },
    },
    {
      tarjetas: grupoTarjetas[0].concat(
        grupoTarjetas[1],
        grupoTarjetas[2],
        grupoTarjetas[3],
        grupoTarjetas[4]
      ),
      movimientosMax: 60,
      tiempo: {
        minutos: 0,
        segundos: 10,
      },
    },
  ];
  return niveles;
}

/**
 * @description Obtiene los datos del nivel actual del juego
 *
 * @function nivelesDelJuego
 * @param {Array<Array>} grupoTarjetas - grupo de tarjetas para cada nivel
 * @param {number} nivelActual - el nivel actual del juego
 * @returns {Object} el objeto del nivel actual
 */
function nivelesDelJuego(grupoTarjetas, nivelActual) {
  // console.log('nivelesDelJuego(grupoTarjetas, nivelActual)');
  const niveles = arrayNiveles(grupoTarjetas);

  return niveles[nivelActual];
}

/**
 * @description sube al siguiente nivel del juego
 *
 * @function subeNivel
 */
function subeNivel() {
  // console.log('subeNivel()');
  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );
  let nivelActual = informacionDelJuego.nivelActual;
  nivelActual++;
  informacionDelJuego.nivelActual = nivelActual;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );
}

/**
 * @description actualiza el nivel actual en la interfaz del usuario
 *
 * @function actualizaNivel
 */
function actualizaNivel() {
  // console.log('actualizaNivel()');

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  let nivelActual = informacionDelJuego.nivelActual;
  let nivelTexto = nivelActual + 1;
  informacionDelJuego.nivelActual = nivelActual;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );

  if (nivelTexto < 10) {
    nivelTexto = `0${nivelTexto}`;
  }

  let nivel = document.querySelector('#nivel');
  nivel.innerHTML = nivelTexto;
}

/**
 * @description carga el nuevo nivel del juego
 *
 * @function cargaNuevoNivel
 */
function cargaNuevoNivel() {
  // console.log('cargaNuevoNivel()');

  subeNivel();
  actualizaNivel();

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  let modoRelax = informacionDelJuego.modoRelax;
  let nivelActual = informacionDelJuego.nivelActual;

  nivelesDelJuego(informacionDelJuego.grupoTarjetas, nivelActual);

  iniciaJuego(modoRelax);
}

/**
 * @description escribe los niveles del menu de seleccion de niveles
 *
 * @function escribeNiveles
 * @summary recibe los niveles los itera con foreach para recibir el elemento y el indice, y agrega a una etiqueta li el indice que seria el numero del nivel.
 * @param {Array<Object>} niveles - los niveles del juego
 */
function escribeNiveles(niveles) {
  // console.log('escribeNiveles(niveles)');

  let menuNiveles = document.querySelector('.selecciona-nivel ul');

  niveles.forEach((element, index) => {
    let controlNivel = document.createElement('li');
    controlNivel.innerHTML = `
      <button class='nivel' data-nivel=${index}>
        Nivel ${index + 1}
      </button>
    `;
    menuNiveles.appendChild(controlNivel);
  });
}

/**
 * @description cambia el nivel actual del juego al nivel seleccionado por el
 * usuario
 *
 *@function cambiaNivel *
 * @param {Event} evento - el evento clic.
 */
function cambiaNivel(evento) {
  // console.log('cambiaNivel()');
  evento.stopPropagation();

  let nivel = parseInt(this.dataset.nivel);
  let nivelActual = nivel;

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  informacionDelJuego.nivelActual = nivelActual;
  let modoRelax = informacionDelJuego.modoRelax;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );

  let storage = localStorage.getItem(cacheKey);

  // recibe niveles: nivelesDelJuego(grupotarjetas nivelActual)
  const cacheTarjetas = obtieneCache(storage);
  const grupoTarjetas = distribuyePersonajesAleatorio(cacheTarjetas);

  if (nivel >= 0 && nivel < arrayNiveles(grupoTarjetas).length) {
    actualizaNivel(nivelActual);
    iniciaJuego(modoRelax);
  }
}

/**
 * @description muestra el menu de seleccion de niveles
 *
 * @function muestraMenuNiveles
 * @param {Event} evento - evento clic.
 */
function muestraMenuNiveles(evento) {
  // console.log('muestraMenuNIveles()');
  evento.stopPropagation();
  document.querySelector('.selecciona-nivel').classList.toggle('visible');
}

/**
 * @description oculta el menu niveles quitando la clase
 *
 * @function ocultaMenuNiveles
 */
function ocultaMenuNiveles() {
  // console.log('ocultaMenuNiveles()');
  document.querySelector('.selecciona-nivel').classList.remove('visible');
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

// #region exports
export {
  nivelesDelJuego,
  actualizaNivel,
  escribeNiveles,
  muestraMenuNiveles,
  ocultaMenuNiveles,
  cambiaNivel,
  arrayNiveles,
  cargaNuevoNivel,
  clickFueraDelMenu,
  teclasEscCierraMenu,
};
