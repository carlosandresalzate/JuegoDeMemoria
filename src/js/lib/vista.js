/**
 * @file vista.js
 * @description Archivo con funciones relacionadas con la vista de las tarjetas
 * en el juego
 */

import { barajaTarjetas } from './generarGrupoTarjetas.js';

/**
 * @description Reparte las tarjetas de la mesa de juego
 *
 * Esta funcion baraja las tarjetas propocionadas y las coloca en el contenedor
 * de la mesa de jugo. Cada tarjeta se representa como un div con una imagen
 *
 * @function reparteTarjetas
 * @param {Array<Object>} lasTarjetas - las tarjetas a repartir en la mesa
 * @return {Array<Object>} las tajetas barajadas
 */
function reparteTarjetas(lasTarjetas) {
  // console.log('reparteTarjetas(lasTarjetas)');
  const mesa = document.querySelector('#mesa');
  const tarjetasBarajadas = barajaTarjetas(lasTarjetas);

  mesa.innerHTML = '';

  tarjetasBarajadas.forEach((element) => {
    let tarjeta = document.createElement('div');

    tarjeta.innerHTML = `
    <div class="tarjeta" data-valor="${element.id}">
      <img src="${element.image}" alt="${element.species}" class="tarjeta__contenido" >
    </div>
    `;

    mesa.appendChild(tarjeta);
  });
  return tarjetasBarajadas;
}

/**
 * @description Muestra las tarjetas en la mesa de juego segun el nivel actual
 *
 * Esta funcion obtien las tarjetas del nivel actual, las reparte en la mesa y
 * baraja
 *
 * @function vistaTarjetasMesa
 * @param {Array<Object>} niveles - los niveles de juego
 * @param {number} nivelActual - el nivel actual del juego
 * @return {Array<Object>} las tarjetas barajadas del nivel actual
 */
function vistaTarjetasMesa(niveles, nivelActual) {
  // console.log('vistaTarjetasMesa(niveles, nivelActual)');
  const tarjetasBarajadas = reparteTarjetas(niveles);
  return tarjetasBarajadas;
}

export { vistaTarjetasMesa };
