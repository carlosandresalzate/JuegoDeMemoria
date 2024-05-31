/**
 * @file cronometro.js
 */

import { timeOver } from './modal.js';
import { pocoTiempoSonido } from './variables.js';

let temporizador,
  minutosRestantes,
  segundosRestantes,
  estaPausado = false;

function iniciaCronometro(minutosIniciales, segundosIniciales) {
  console.log('iniciaCronometro()');

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

function pausarCronometro() {
  console.log('pausarCronometro()');
  clearInterval(temporizador);
  estaPausado = true;
  return estaPausado;
}

function playCronometro() {
  estaPausado = false;
  return estaPausado;
}

// function detenerCronometro() {
//   clearInterval(temporizador);
//   minutosRestantes = 0;
//   segundosRestantes = 0;
//   document.querySelector('#minutos').innerText = '00';
//   document.querySelector('#segundos').innertext = '00';
//   estaPausado = false;
// }

function tiempoTerminado() {
  timeOver();
}

export {
  iniciaCronometro,
  pausarCronometro,
  playCronometro,
  minutosRestantes,
  segundosRestantes,
};
