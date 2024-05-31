/**
 * @file clases.js
 *
 */

// gestion de mensajes de error
class InvalidCountError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCountError';
  }
}

class OutOfRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OutOfRangeError';
  }
}

// Errores para manejo especifico de la API
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

//  Manejo de errores de red
class NetworkError extends Error {
  constructor() {
    super('Error de red');
    this.name = "'NetworkError";
  }
}

export { OutOfRangeError, InvalidCountError, APIError, NetworkError };
