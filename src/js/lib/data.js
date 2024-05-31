/**
 * @file data.js
 * @description Obtiene los datos de la API, los filtra y retorna un array
 */

// #region imports
import { URL } from './variables.js';
import {
  InvalidCountError,
  OutOfRangeError,
  APIError,
  NetworkError,
} from './clases.js';

// #region functions
/**
 * @description Obtiene el numero total de personajes de la API
 *
 * Esta funcion asincrona obtiene los datos de la variable URL, luego analiza la
 * respuesta JSON y devuelve el numero total de personajes encontrados.
 *
 * En caso de errores durante la operacion de busqueda o el analisis de datos
 * la funcion retornara un mensaje de error descriptivo
 *
 * @function obtenerNumeroTotalPersonajes
 * @returns {Promise<number>} Una promesa que se resuelve con el numero total
 * de personajes (Un entero) si la operacion es exitosa.
 *
 * @throws {Error} Un error si la operacion falla o si los datos de respuesta
 * no tiene el formato esperado.
 */
async function obtenerNumeroTotalPersonajes() {
  console.log('obtenerNumeroTotalPersonajes()');
  try {
    const response = await fetch(`${URL}/character`);
    if (!response.ok) {
      throw new Error(
        `Error al obtener datos de personajes: ${response.status}`
      );
    }

    const data = await response.json();
    console.log('data que llega', data);
    if (!data || !data.info || !data.info.count) {
      throw new Error('Formato de datos de respuesta inesperado');
    }

    return data.info.count;
  } catch (error) {
    throw error;
  }
}

/**
 * @description Genera un numero aleatorio entre 1 y el numero total de
 * personajes.
 *
 * Esta funcion asincrona primero recupera el numero total de personajes
 * utilizando la funcion `obtenerNumeroTotalPersonajes`. Luego genera un numero
 * aleatorio entre 1 y el numero de personajes.utilizando la funcion
 * `Math.random()` y la funcion `Math.ceil()`. Devuelve un numero Entero
 *
 * @returns {Promise<number>} Una promesa que se resuelve con un numero
 * aleatorio entero entre 1 y el total de personajes.
 *
 * @throws {Error} un eeror si la funcion `obtenerNumeroTotalPersonajes` falla.
 *
 * @throws {InvalidCountError} Un error personalizado si el recuento total de
 * personajes es negativo o no es un numero valido.
 *
 * @throws {OutOfRangeError} Un error personalizado si el numero elaeatorio
 * generado esta fuera del rango esperado.
 */
async function numeroRandom() {
  console.log('numeroRandom()');
  try {
    const almacenaCache = localStorage.getItem('conteoPersonajes');
    let count = null;

    if (almacenaCache) {
      const conteoCache = JSON.parse(almacenaCache);
      const now = Date.now();
      if (conteoCache.expiration > now) {
        count = conteoCache.value;
      }
    }

    if (!count) {
      count = await obtenerNumeroTotalPersonajes();
      localStorage.setItem(
        'conteoPersonajes',
        JSON.stringify({
          value: count,
        })
      );
    }

    if (count < 1 || isNaN(count)) {
      throw new InvalidCountError('Recuento total de personajes invalido');
    }

    const valorRandom = Math.random() * count;
    const numeroRandom = Math.ceil(valorRandom);

    if (numeroRandom > count || numeroRandom < 1) {
      throw new OutOfRangeError('Numero aleatorio fuera del rango esperado');
    }

    return numeroRandom;
  } catch (error) {
    if (
      error instanceof InvalidCountError ||
      error instanceof OutOfRangeError
    ) {
      throw error;
    } else {
      throw error;
    }
  }
}

/**
 * @summary Obtiene un numero aleatorio de personajes de la API de Rick and
 * Morty.
 * @description La funcion busca en la API la informacion de los personajes de
 * forma aleatoria hasta alcanzar la cantidad especificada.
 *
 * @param {number} number El numero de personajes aleatorios que se desea
 * obtener.
 * @param {Array<Object>} obtenidos Array que contiene los personajes ya
 * obtenidos.
 * @param {Set} idsSet Set que almacena los IDs de los personajes ya Obtendios
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve con una lista
 * de objetos de personajes obtenidos de la API. Cada Objeto de personaje
 * contiene propiedades como: `id`, `name`, `status`, `species`, `gender`, etc.
 *
 * @throws {InvalidCountError} Si  `numeroRandom` genera un ID de personaje
 * invalido.
 *
 * @throws {OutOfRangeError} Si la funcion `numeroRandom` falla y genera un ID
 * de persona fuera del rango esperado.
 *
 * @throws {NeworkError} Si se produce un error de red durante la llamda a la
 * API
 *
 * @throws {APIError} Si la API devuelve un codigo de estado no existoso o
 * datos invalidos
 *
 * @throws {Error} Si se Produce un error inesperado durante la ejecucion de la
 * funcion.
 */
async function obtenerPersonajes(number, obtenidos = [], idsSet = new Set()) {
  console.log('obtenerPersonajes(number, obtenidos = [], idsSet = new Set())');
  try {
    if (obtenidos.length === number) {
      return obtenidos;
    }

    for (let i = 0; i < number; i++) {
      const RandomId = await numeroRandom();

      if (idsSet.has(RandomId)) {
        await obtenerPersonajes(number, obtenidos, idsSet);
      }

      idsSet.add(RandomId);
      console.log('idsSet', idsSet);

      const response = await fetch(`${URL}/character/${RandomId}`);

      if (!response.ok) {
        throw new APIError(
          `Error al obtener el personaje ${RandomId} (Codigo de estado: ${response.status})`
        );
      }

      const data = await response.json();

      obtenidos.push(data);
    }
  } catch (error) {
    if (
      error instanceof InvalidCountError ||
      error instanceof OutOfRangeError
    ) {
      throw error;
    } else if (error instanceof NetworkError) {
      console.error('Error de red al obtener el personaje ', error);
      throw error;
    } else if (error instanceof APIError) {
      console.error('Error en la respuesta de la API: ', error.message);
      throw error;
    } else {
      console.error('Error inesperado al obtener personaje: ', error);
    }
  }
  console.log('obtenidos fuera for:', obtenidos);
  return obtenidos;
}

/**
 * @description guarda un conjunto de personajes en la cache local.
 *
 * Esta funcion verifica si ya existe un conjunto de personajes en el
 * localStorage. Si no existe, obtiene los personajes de una API y los guarda en
 * localStorage.
 *
 * @async
 * @function guardarPersonajesEnCache
 *
 * @returns {Promise<Array<Object>>} Una Promesa que se resuelve con el conjunto
 * de personajes obtenidos ya sea del cache o de la API.
 *
 * @throws {Error} SI ocurre un error durante la Obtencion o el almacenamiento
 * de los personajes.
 */
async function guardarPersonajesEnCache() {
  console.log('guardarPersonajesEnCache()');
  const userAgent = navigator.userAgent;

  const isChrome = /Chrome/i.test(userAgent);
  const isFirefox = /Firefox/i.test(userAgent);
  const isEdge = /Edge/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent);

  if (isChrome || isFirefox || isEdge || isSafari) {
    const cacheKey = 'grupoTarjetas';
    let cacheTarjetas = JSON.parse(localStorage.getItem(cacheKey)) || [];
    console.log(localStorage.length);
    if (cacheTarjetas.length <= 0) {
      const arrayTarjetas = await obtenerPersonajes(16);

      console.log('arrayTarjetas', arrayTarjetas);
      cacheTarjetas.push(...arrayTarjetas);

      localStorage.setItem(cacheKey, JSON.stringify(cacheTarjetas));
    }
    return cacheTarjetas;
  }
}

/* Exports */
export { guardarPersonajesEnCache };
