// import { detenerCronometro } from './cronometro.js';
import { pausarCronometro, playCronometro } from './cronometro.js';
import { obtieneCache } from './functions.js';
import { distribuyePersonajesAleatorio } from './generarGrupoTarjetas.js';
import { inicioJuego } from './inicio.js';
import { cacheKey } from './variables.js';

/**
 *
 * @param {Array<Array>} grupoTarjetas
 */
function arrayNiveles(grupoTarjetas) {
  const niveles = [
    {
      tarjetas: grupoTarjetas[0],
      movimientosMax: 3,
    },
    {
      tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1]),
      movimientosMax: 8,
    },
    {
      tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1], grupoTarjetas[2]),
      movimientosMax: 12,
    },
    {
      tarjetas: grupoTarjetas[0].concat(
        grupoTarjetas[1],
        grupoTarjetas[2],
        grupoTarjetas[3]
      ),
      movimientosMax: 25,
    },
    {
      tarjetas: grupoTarjetas[0].concat(
        grupoTarjetas[1],
        grupoTarjetas[2],
        grupoTarjetas[3],
        grupoTarjetas[4]
      ),
      movimientosMax: 60,
    },
  ];
  return niveles;
}

function nivelesDelJuego(grupoTarjetas, nivelActual) {
  console.log('nivelesDelJuego(grupoTarjetas, nivelActual)');
  const niveles = arrayNiveles(grupoTarjetas);

  return niveles[nivelActual];
}

// #region Cambiar nivel
function subeNivel() {
  console.log('subeNivel()');
  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );
  let nivelActual = informacionDelJuego.nivelActual;
  nivelActual++;
  informacionDelJuego.nivelActual = nivelActual;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );
}

/**
 * @summary debe recibir como argumentos el nivel en el que se encuentre y la
 * cantidad de movimientos realizados en el nivel, aun incompleta.
 */
function actualizaNivel() {
  console.log('actualizaNivel()');

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  let nivelActual = informacionDelJuego.nivelActual;
  let nivelTexto = nivelActual + 1;
  informacionDelJuego.nivelActual = nivelActual;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );

  if (nivelTexto < 10) {
    nivelTexto = `0${nivelTexto}`;
  }

  let nivel = document.querySelector('#nivel');
  nivel.innerHTML = nivelTexto;
}

function cargaNuevoNivel() {
  console.log('cargaNuevoNivel()');

  subeNivel();
  actualizaNivel();

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  let modoRelax = informacionDelJuego.modoRelax;
  let nivelActual = informacionDelJuego.nivelActual;
  if (pausarCronometro()) {
    playCronometro();
  }

  nivelesDelJuego(informacionDelJuego.grupoTarjetas, nivelActual);
  inicioJuego(modoRelax);
}

// #region Menu niveles

/**
 * @summary recibe los niveles los itera con foreach para recibir el elemento y el indice, y agrega a una etiqueta li el indice que seria el numero del nivel.
 * @param {} - recibe como parametros los niveles totales para iterarlos
 */
function escribeNiveles(niveles) {
  console.log('escribeNiveles(niveles)');

  let menuNiveles = document.querySelector('.selecciona-nivel ul');

  niveles.forEach((element, index) => {
    let controlNivel = document.createElement('li');
    controlNivel.innerHTML = `
      <button class='nivel' data-nivel=${index}>
        Nivel ${index + 1}
      </button>
    `;
    menuNiveles.appendChild(controlNivel);
  });
}

/**
 * @summary recibe un evento, tambien debe recibir a niveles y nivel actual;
 * esto cambia el nivel por un nivel selecionado por el usuario.
 *
 * @param {*} evento - toma el evento click en el boton creado con la clase
 * nivel.
 */
function cambiaNivel(evento) {
  console.log('cambiaNivel()');
  evento.stopPropagation();

  let nivel = parseInt(this.dataset.nivel);
  let nivelActual = nivel;

  let informacionDelJuego = JSON.parse(
    localStorage.getItem('informacionDelJuego')
  );

  informacionDelJuego.nivelActual = nivelActual;
  let modoRelax = informacionDelJuego.modoRelax;

  localStorage.setItem(
    'informacionDelJuego',
    JSON.stringify(informacionDelJuego)
  );

  let storage = localStorage.getItem(cacheKey);

  // recibe niveles: nivelesDelJuego(grupotarjetas nivelActual)
  const cacheTarjetas = obtieneCache(storage);
  const grupoTarjetas = distribuyePersonajesAleatorio(cacheTarjetas);

  if (nivel >= 0 && nivel < arrayNiveles(grupoTarjetas).length) {
    actualizaNivel(nivelActual);
    inicioJuego(modoRelax);
  }
}

/**
 * @summary esta funcion despliega el menu niveles cuando se salta un evento
 * @module niveles.js
 * @param {*} evento - evento click en el control de menu niveles.
 */
function muestraMenuNiveles(evento) {
  console.log('muestraMenuNIveles()');
  evento.stopPropagation();
  document.querySelector('.selecciona-nivel').classList.toggle('visible');
}

/**
 * @summary oculta el menu niveles quitando la clase
 */
function ocultaMenuNiveles() {
  console.log('ocultaMenuNiveles()');
  document.querySelector('.selecciona-nivel').classList.remove('visible');
}

/**
 * @maneja el click fuera del menu niveles para cerrarlo si es necesario.
 * @param {*} evento
 * @returns
 */
function clickFueraDelMenu(evento) {
  if (evento.target.closest('selecciona-nivel')) {
    return;
  }
  document.querySelector('.selecciona-nivel').classList.remove('visible');
}

function teclassEscCierraMenu(evento) {
  if (evento.key === 'Escape') {
    ocultaMenuNiveles();
  }
}
// #region exports
export {
  nivelesDelJuego,
  actualizaNivel,
  escribeNiveles,
  muestraMenuNiveles,
  ocultaMenuNiveles,
  cambiaNivel,
  arrayNiveles,
  cargaNuevoNivel,
  clickFueraDelMenu,
  teclassEscCierraMenu,
};
