/**
 * @file clases.js
 * @description Archivo con definiciones de las clases para gestion de errores.
 */

// gestion de mensajes de error
/**
 * @class InvalidCountError
 * @extends {Error}
 * @classdesc Error que se lanza cuando el recuento de personajes es invalido
 * @param {string} message - El mensaje de error
 */
class InvalidCountError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCountError';
  }
}

/**
 * @class OutOfRangeError
 * @extends {Error}
 * @classdesc Error que se lanza cuando un valor esta fuera del rango esperado.
 * @param {string} message - el mensaje de error.
 */
class OutOfRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OutOfRangeError';
  }
}

/**
 * @class APIError
 * @extends {Error}
 * @classdesc Error que se lanza cuando hay un problema con la respuesta de
 * laAPI
 * @param {string} message - El mensaje de error
 * @param {number} statusCode - El codigo de estado de la respuesta API
 */
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

/**
 * @class NetworkError
 * @extends {Error}
 * @classdesc Error que se lanza cuando hay un problema de red
 */
class NetworkError extends Error {
  constructor() {
    super('Error de red');
    this.name = "'NetworkError";
  }
}

export { OutOfRangeError, InvalidCountError, APIError, NetworkError };
