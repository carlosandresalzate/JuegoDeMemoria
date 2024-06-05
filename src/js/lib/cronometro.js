/**
 * @file cronometro.js
 * @description Archivo con funciones relacionadas con el cronometro del juego
 */

import { timeOver } from './modal.js';
import { minutos, pocoTiempoSonido, segundos } from './variables.js';

let temporizador,
  minutosRestantes,
  segundosRestantes,
  estaPausado = false;

/**
 * @description Inicia el cronometro con el tiempo especificado.
 *
 * Esta funcion inicia una cuenta regresiva desde los minutos y segundos
 * iniciales propocionados. Actualiza el DOM cada segundo y reproduce un sonido cuando quedan 5 segundos. Si el tiempo llega a cenro se llama a la funcion
 * timeOver()
 *
 * @function iniciaCronometro
 * @param {number} minutosIniciales - Los minutos del cronometro.
 * @param {number} segundosIniciales - los segundos iniciales del cronometro
 */
function iniciaCronometro(minutosIniciales, segundosIniciales) {
  // console.log('iniciaCronometro()');

  if (!estaPausado) {
    minutosRestantes = minutosIniciales;
    segundosRestantes = segundosIniciales;
  }

  const actualizaDom = () => {
    document.querySelector('#minutos').innerText =
      minutosRestantes < 10 ? `0${minutosRestantes}` : minutosRestantes;

    document.querySelector('#segundos').innerText =
      segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
  };

  const cuentaRegresiva = () => {
    if (segundosRestantes === 0) {
      if (minutosRestantes === 0) {
        clearInterval(temporizador);
        tiempoTerminado();
        return;
      } else {
        minutosRestantes--;
        segundosRestantes = 59;
      }
    } else {
      segundosRestantes--;
    }

    if (minutosRestantes === 0 && segundosRestantes === 5) {
      pocoTiempoSonido.play();
    }
    actualizaDom();
  };

  clearInterval(temporizador);
  temporizador = setInterval(cuentaRegresiva, 1000);
  estaPausado = false;
}

/**
 * @description Pausa el cronometro
 *
 * Esta funcion detiene el cronometro temporalmente
 *
 * @function pausarCronometro
 * @return {boolean} El estado de pausa del cronometro.
 */
function pausarCronometro() {
  // console.log('pausarCronometro()');
  clearInterval(temporizador);
  estaPausado = true;
  return estaPausado;
}

/**
 * @description Reanuda el cronometro
 *
 * Esta funtion cambia el estado del cronometro a no pausado.
 *
 * @function playCronometro
 * @return {boolean} El estado de pausa del cronometro.
 */
function playCronometro() {
  iniciaCronometro(minutosRestantes, segundosRestantes);
  estaPausado = false;
  return estaPausado;
}

/**
 * @description Limpia el cronometro
 *
 * Esta función detiene el cronometro y reinicia los valores de los minutos y segundos restantes.
 *
 * @function resetearCronometro
 */
function resetearCronometro() {
  clearInterval(temporizador);
  minutosRestantes = 0;
  segundosRestantes = 0;
  estaPausado = false;
  minutos.innerText = '00';
  segundos.innerText = '00';
}

/**
 * @description Maneja el evento de tiempo terminado.
 *
 * Esta funcion se llama cuando el cronometro llega 0
 *
 * @function tiempoTerminado
 */
function tiempoTerminado() {
  timeOver();
}

export {
  iniciaCronometro,
  pausarCronometro,
  playCronometro,
  resetearCronometro,
  minutosRestantes,
  segundosRestantes,
};
