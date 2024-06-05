/**
 * @file localstorage.js
 * @description Las funciones en este archivo se encargan de obtener y guardar
 * datos en el localStorage
 */

/**
 *
 * @returns {Object}
 */
function obtenerDatosJuego() {
  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );
  return informacionDelJuego;
}

/**
 *
 * @param {boolean} modoRelax
 * @param {number} nivelActual
 * @param {number} movimientos
 * @param {Array} grupoTarjetas
 */
function guardarDatosJuego(modoRelax, nivelActual, movimientos, grupoTarjetas) {
  informacionDelJuego.modoRelax = modoRelax;
  informacionDelJuego.nivelActual = nivelActual;
  informacionDelJuego.movimientos = movimientos;
  informacionDelJuego.grupoTarjetas = grupoTarjetas;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );
}

export { obtenerDatosJuego, guardarDatosJuego };
