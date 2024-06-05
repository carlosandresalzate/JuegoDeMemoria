/**
 * @file playPause.js
 * @description Este archivo se encarga de los eventos relacionados con el
 * evento del boton de play y pause
 */

import { pausarCronometro, playCronometro } from './cronometro.js';
import { descubrir } from './functions.js';
import { btnPause, btnPlay } from './variables.js';

/**
 *
 * @param {Event} e - el evento clic
 */
function playPause(e) {
  if (btnPlay.classList.contains('btn-hidden')) {
    btnPlay.classList.remove('btn-hidden');
    btnPause.classList.remove('btn-visible');
    btnPause.classList.add('btn-hidden');
    btnPlay.classList.add('btn-visible');
    pausarCronometro();
    document.querySelectorAll('.tarjeta').forEach((element) => {
      element.removeEventListener('click', descubrir);
    });
  } else {
    btnPause.classList.remove('btn-hidden');
    btnPlay.classList.remove('btn-visible');
    btnPause.classList.add('btn-visible');
    btnPlay.classList.add('btn-hidden');
    playCronometro();
    document.querySelectorAll('.tarjeta').forEach((element) => {
      element.addEventListener('click', descubrir);
    });
  }
}

export { playPause };
