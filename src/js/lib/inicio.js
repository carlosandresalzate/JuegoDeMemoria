/**
 * @file inicio.js
 * @description Este archivo contiene la funcion para iniciar el juego
 */

import { maxContador } from './contador.js';
import {
  iniciaCronometro,
  pausarCronometro,
  minutosRestantes,
  segundosRestantes,
  playCronometro,
} from './cronometro.js';
import {
  clickFueraDelMenu,
  descubrir,
  teclasEscCierraMenu,
} from './functions.js';
import {
  actualizaNivel,
  nivelesDelJuego,
  muestraMenuNiveles,
  ocultaMenuNiveles,
  cambiaNivel,
} from './niveles.js';
import {
  btnPause,
  btnPlay,
  btnSwitch,
  movimientos,
  segundos,
} from './variables.js';
import { vistaTarjetasMesa } from './vista.js';

/**
 * @description Inicia el juego el el modo especificado.
 *
 * Esta funcion configura el estado inicial del juego, incluyendo el modo de
 * juego, la distribucion de tarjetas, el contador de movimientos, el
 * cronometro.
 * Tambien añade los eventListeners necesario para la interaccion del usuario-
 *
 * @function inicioJuego
 * @param {boolean} modoBool - inidica si el modo relajado esta activado
 */
function inicioJuego(modoBool) {
  // console.log('InicioJuego(modoBool)');

  if (pausarCronometro()) {
    playCronometro();
  }

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  let modoRelax = modoBool;
  informacionDelJuego.modoRelax = modoRelax;
  let grupoTarjetas = informacionDelJuego.grupoTarjetas;
  let nivelActual = informacionDelJuego.nivelActual;
  let movimientosInciales = movimientos;
  informacionDelJuego.movimientos = movimientosInciales;

  let niveles = nivelesDelJuego(grupoTarjetas, nivelActual);

  document.querySelector('#mov').innerHTML = '00';

  document
    .querySelector('#control-nivel')
    .addEventListener('click', muestraMenuNiveles);

  document
    .querySelector('#cierra-niveles')
    .addEventListener('click', ocultaMenuNiveles);

  document.querySelectorAll('.nivel').forEach((element) => {
    element.addEventListener('click', cambiaNivel);
  });

  document.querySelector('body').addEventListener('click', clickFueraDelMenu);

  document.addEventListener('keydown', teclasEscCierraMenu);

  vistaTarjetasMesa(niveles, nivelActual);

  document.querySelector('#mov').innerText = '00';

  maxContador(niveles, nivelActual);

  document.querySelector('.selecciona-nivel').classList.remove('visible');
  document.body.classList.add('background');

  document.querySelectorAll('.tarjeta').forEach((element) => {
    element.addEventListener('click', descubrir);
  });

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );
  actualizaNivel();

  if (!modoRelax) {
    // console.log('if !modoRelax', modoRelax);
    minutos.innerText = '00';
    segundos.innerText = '00';

    const tiempo = {
      minutos: 0,
      segundos: 8,
    };

    iniciaCronometro(tiempo.minutos, tiempo.segundos);

    btnPause.style.display = 'block';
    btnPlay.style.display = 'none';

    btnSwitch.addEventListener('click', () => {
      if (btnPlay.style.display === 'none') {
        btnPlay.style.display = 'block';
        btnPause.style.display = 'none';
        pausarCronometro();
      } else if (btnPlay.style.display === 'block') {
        iniciaCronometro(minutosRestantes, segundosRestantes);
        btnPlay.style.display = 'none';
        btnPause.style.display = 'block';
      }
    });
  } else {
    // console.log('else modoRelax', modoRelax);
    document.querySelector('#cronometro').classList.add('cronometro-oculto');
  }
}

export { inicioJuego };
