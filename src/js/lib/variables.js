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

const movimientos = 0;

const cacheKey = 'grupoTarjetas';

/* Si Se descomenta hay que agregar grupoTarjetas a export */
// const personajes = obtieneCache('grupoTarjetas');
// const nuevaBaraja = distribuyePersonajesAleatorio(personajes);
// const grupoTarjetas = nuevaBaraja;

const nivelDeInicio = 0;

const pocoTiempoSonido = new Audio('./src/sonidos/theres_no_time.mp3');

// Elementos del DOM
const btnSwitch = document.querySelector('.btn-switch');
const btnPause = document.querySelector('.btn-pause');
const btnPlay = document.querySelector('.btn-play');

const minutos = document.querySelector('#minutos');
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
