/**
 * @file inicio.js
 * @description Este archivo contiene la funcion para iniciar el juego
 */

import { maxContador } from './contador.js';
import { resetearCronometro } from './cronometro.js';
import { descubrir } from './functions.js';
import { obtenerDatosJuego } from './localStorage.js';
import { vistaTarjetasMesa } from './vista.js';
import { modalSeleccionDeModo } from './modal.js';
import { modoDeJuegoNormal } from './modos.js';
import {
  actualizaNivel,
  cambiaNivel,
  clickFueraDelMenu,
  muestraMenuNiveles,
  nivelesDelJuego,
  ocultaMenuNiveles,
  teclasEscCierraMenu,
} from './niveles.js';
import { movimientos } from './variables.js';

function iniciaJuego(modoRelax) {
  let informacionDelJuego = obtenerDatosJuego();

  let modo = modoRelax;
  informacionDelJuego.modoRelax = modo;
  let grupoTarjetas = informacionDelJuego.grupoTarjetas;
  let nivelActual = informacionDelJuego.nivelActual;
  let movimientosInciales = movimientos;
  informacionDelJuego.movimientos = movimientosInciales;

  let niveles = nivelesDelJuego(grupoTarjetas, nivelActual);

  document.querySelector('.cabecera').style.display = 'flex';
  document.querySelector('#mov').innerHTML = '00';

  // interaccion con el menu de niveles
  document
    .querySelector('#control-nivel')
    .addEventListener('click', muestraMenuNiveles);
  document
    .querySelector('#cierra-niveles')
    .addEventListener('click', ocultaMenuNiveles);

  // cambiar nivel
  document.querySelectorAll('.nivel').forEach((element) => {
    element.addEventListener('click', cambiaNivel);
  });

  document.querySelector('body').addEventListener('click', clickFueraDelMenu);
  document.addEventListener('keydown', teclasEscCierraMenu);

  vistaTarjetasMesa(niveles, nivelActual);
  maxContador(niveles, nivelActual);

  document.querySelector('.selecciona-nivel').classList.remove('visible');
  document.body.classList.add('background');

  document.querySelectorAll('.tarjeta').forEach((element) => {
    element.addEventListener('click', descubrir);
  });

  if (!modoRelax) {
    console.log('!modoRelax', modoRelax);
    document.querySelector('#cronometro').style.display = 'block';
    document.querySelector('.btn-switch').style.display = 'flex';
    document.querySelector('.btn-play').classList.add('btn-hidden');
    resetearCronometro();
    modoDeJuegoNormal();
  } else {
    console.log('modoRelax', modoRelax);
    document.querySelector('#cronometro').style.display = 'none';
    document.querySelector('.btn-switch').style.display = 'none';
    document.querySelector('.btn-play').classList.add('btn-hidden');
    // modoJuegoRelax();
  }

  document
    .querySelector('.selecciona-modo')
    .addEventListener('click', modalSeleccionDeModo);

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );
  actualizaNivel();
}

export { iniciaJuego };
