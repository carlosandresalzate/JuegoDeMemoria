/**
 * @file variables.js
 * @description archivo con variables globales de la app
 */

/**
 * @summary Ruta a la API de rick and morty.
 * @description permite obtener informacion sobre personajes, episodios y ubicaciones de la serie
 * @constant
 * @type {string}
 * @global
 */
const URL = 'https://rickandmortyapi.com/api';

/**
 * @summary Contador de movimientos en el juego.
 * @description Inicializado en 0 al comenzar el juego.
 * @type {number}
 * @global
 */
const movimientos = 0;

/**
 *@summary Clave de la caché de personajes.
 *@description Utilizado para almacenar y recuperar personajes en el localStorage.
 *@constant
 *@type {string}
 *@global
 */
const cacheKey = 'grupoTarjetas';

/**
 * @summary Nivel inicial del juego.
 * @description Indica el nivel con el que el usuario comienza el juego.
 * @type {number}
 * @global
 */
const nivelDeInicio = 0;

/**
 * @summary Sonido de poco tiempo.
 * @description Reproduce un sonido de advertencia cuando queda poco tiempo en el juego.
 * @type {Audio}
 * @global
 */
const pocoTiempoSonido = new Audio('./src/sonidos/theres_no_time.mp3');

// Elementos del DOM
/**
 * @summary Contenedor de los iconos de play y pause.
 * @description Permite obtener un evento sobre el contenedor para alternar entre play y pause
 * @type {HTMLElement}
 * @global
 */
const btnSwitch = document.querySelector('.btn-switch');

/**
 * @summary Botón de pausa.
 * @description Permite al usuario pausar el juego.
 * @type {HTMLElement}
 * @global
 */
const btnPause = document.querySelector('.btn-pause');

/**

@summary Botón de inicio.
@description Permite al usuario iniciar o reanudar el juego.
@type {HTMLElement}
@global
*/
const btnPlay = document.querySelector('.btn-play');

/**

@summary Elemento de minutos.
@description Referencia al tag donde se muestras los minutos.
@type {HTMLElement}
@global
*/
const minutos = document.querySelector('#minutos');

/**

@summary Elemento de segundos.
@description Referencia al tag donde se muestras los segundos
@type {HTMLElement}
@global
*/
const segundos = document.querySelector('#segundos');

export {
  URL,
  movimientos,
  cacheKey,
  nivelDeInicio,
  pocoTiempoSonido,
  btnPause,
  btnSwitch,
  btnPlay,
  minutos,
  segundos,
};
