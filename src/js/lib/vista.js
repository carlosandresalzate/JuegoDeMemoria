/**
 * @file vista.js
 */

// import { descubrir } from './functions.js';
import { barajaTarjetas } from './generarGrupoTarjetas.js';

function reparteTarjetas(lasTarjetas) {
  console.log('reparteTarjetas(lasTarjetas)');
  // console.log(lasTarjetas);
  const mesa = document.querySelector('#mesa');
  const tarjetasBarajadas = barajaTarjetas(lasTarjetas);

  mesa.innerHTML = '';

  tarjetasBarajadas.forEach((element) => {
    let tarjeta = document.createElement('div');
    // const portal = document.createElement('img');
    // portal.alt = '';
    // portal.src = './imagenes/portal-rick-and-morty.gif';

    tarjeta.innerHTML = `
    <div class="tarjeta" data-valor="${element.id}">
      <img src="${element.image}" alt="${element.species}" class="tarjeta__contenido" >
    </div>
    `;

    mesa.appendChild(tarjeta);
    // tarjeta.appendChild(portal);
  });
  return tarjetasBarajadas;
}

// reparteTarjetas(niveles[nivelActual].tarjetas);

function vistaTarjetasMesa(niveles, nivelActual) {
  console.log('vistaTarjetasMesa(niveles, nivelActual)');
  // console.log('niveles: ', niveles);
  const tarjetasBarajadas = reparteTarjetas(niveles);
  // console.log('tarjetasBarajadas', tarjetasBarajadas);
  return tarjetasBarajadas;

  // descubrir();
}

export { vistaTarjetasMesa };
