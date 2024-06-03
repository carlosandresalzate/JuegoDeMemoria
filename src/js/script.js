/**
 * @file script.js
 * @brief Este script contiene funciones para un juego de memoria.
 * @author Carlos Andres Alzate
 * @version 1.0
 * @license MIT
 */
// console.log('Archivo script.js');

// #region imports
import { guardarPersonajesEnCache } from './lib/data.js';
import {
  iniciaJuegoNormal,
  iniciaJuegoRelax,
  obtieneCache,
} from './lib/functions.js';
import { distribuyePersonajesAleatorio } from './lib/generarGrupoTarjetas.js';
import { arrayNiveles, escribeNiveles } from './lib/niveles.js';
import { nivelDeInicio, cacheKey, movimientos } from './lib/variables.js';

// #region navigator.userAgent
const userAgent = navigator.userAgent;
const isChrome = /Chrome/i.test(userAgent);
const isFirefox = /Firefox/i.test(userAgent);
const isEdge = /Edge/i.test(userAgent);
const isSafari = /Safari/i.test(userAgent);

// #region carga del DOM
document.addEventListener('DOMContentLoaded', async (e) => {
  // console.log('DOMContentLoaded');

  let storage = localStorage.getItem(cacheKey);
  let counter = 5;

  function validarCacheKey(storage) {
    if (!storage) return false;
    try {
      const parsearStorage = JSON.parse(storage);
      return Array.isArray(parsearStorage) && parsearStorage.length === 16;
    } catch (e) {
      return false;
    }
  }

  async function comprobarChache() {
    while (counter >= 0 && !validarCacheKey(storage)) {
      await guardarPersonajesEnCache();
      storage = localStorage.getItem(cacheKey);
      counter--;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  if (isChrome || isFirefox || isEdge || isSafari) {
    // console.log('comprobarChache()');
    await comprobarChache();

    const cacheTarjetas = obtieneCache(storage);
    const grupoTarjetas = distribuyePersonajesAleatorio(cacheTarjetas);

    let informacionDelJuego = localStorage.getItem('informacionDelJuego');
    // console.log('informacionDelJuego', informacionDelJuego);
    try {
      informacionDelJuego = informacionDelJuego
        ? JSON.parse(informacionDelJuego)
        : {};
    } catch (eror) {
      console.error('Error parsing JSON de localStorage', e);
      informacionDelJuego = {};
    }

    // aqui ingresamos un nivel actual para el usuario ahora es 0
    let nivelActual = nivelDeInicio;
    let modoRelax = '';
    let movimientosIniciales = movimientos;
    let tarjetas = grupoTarjetas;

    informacionDelJuego.nivelActual = nivelActual;
    informacionDelJuego.modoRelax = modoRelax;
    informacionDelJuego.movimientos = movimientosIniciales;
    informacionDelJuego.grupoTarjetas = tarjetas;

    localStorage.setItem(
      'informacionDelJuego',
      JSON.stringify(informacionDelJuego)
    );

    const niveles = arrayNiveles(tarjetas);
    escribeNiveles(niveles);

    Swal.fire({
      width: '100%',
      heightAuto: false,
      backdrop: 'white',
      title: '👋 ¡Hola! 👋',
      text: 'Bienvenido al juego de Rick And Morty',
      imageUrl: './src/imagenes/rick-and-morty-start.png',
      imageAlt: 'Sombras de Rick and Morty',
      // iconColor: '#f27121' el icono es verde,
      confirmButtonText: 'Juego Normal',
      confirmButtonColor: 'green', // Agregar un buen color al boton de fin del juego
      showCancelButton: true,
      cancelButtonColor: 'green',
      cancelButtonText: 'Modo Relax',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      backdrop: `white url('./src/imagenes/rick-and-morty-cartoon-network.gif') left top/250px no-repeat`,
    }).then((result) => {
      // console.log(result);
      // console.log('inicias Swal.fire');
      if (result.isDismissed) {
        // console.log('Modo Relax', result.isDismissed);

        iniciaJuegoRelax(true);
      } else if (result.isConfirmed) {
        // console.log('Juego Normal', result.isConfirmed);
        iniciaJuegoNormal(false);
      }
    });
  }
});
