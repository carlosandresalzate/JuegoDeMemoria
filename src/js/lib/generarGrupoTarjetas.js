/**
 * @file generarGrupoTarjetas.js
 * @description Este archivo genera la variable grupoTarjetas y cada vez que se
 * llama baraja las tarjetas y las coloca en una posicion diferente del array
 * multidimensional..
 */
console.log('file generarGrupoTarjetas');

/**
 * @description Baraja un array utilizando el famoso algoritmo Fisher-Yates.
 *
 * @function arrayAleatorio
 * @param {Array} array - El array que se va a mezclar(Barajar)
 * @returns {Array} El array Barajado.
 */
function arrayAleatorio(array) {
  console.log('arrayAleatorio(array)');
  let indiceActual = array.length;
  let valorTemporal, indiceRandom;

  while (indiceActual !== 0) {
    indiceRandom = Math.floor(Math.random() * indiceActual);
    indiceActual--;

    valorTemporal = array[indiceActual];
    array[indiceActual] = array[indiceRandom];
    array[indiceRandom] = valorTemporal;
  }
  return array;
}

/**
 * @description Baraja un conjunto de tarjetas utilizando el algoritmo
 * Fisher-yates
 *
 * @function barajaTarjetas
 * @param {Array<Object>} lasTarjetas
 * @returns {Array<Object>} Un array con los objetos Tarjetas barajados
 */
function barajaTarjetas(lasTarjetas) {
  console.log('barajaTarjetas(lasTarjetas)');

  const tarjetas = lasTarjetas.tarjetas;

  let totalTarjetas = tarjetas.concat(tarjetas);
  let indiceActual = totalTarjetas.length;

  while (indiceActual !== 0) {
    let indiceRandom = Math.floor(Math.random() * indiceActual);

    indiceActual--;

    [totalTarjetas[indiceActual], totalTarjetas[indiceRandom]] = [
      totalTarjetas[indiceRandom],
      totalTarjetas[indiceActual],
    ];
  }

  return totalTarjetas;
}

/**
 * @description Distribuye los personajes de manera aleatoria en grupoTarjetas.
 *
 * @function distribuyePersonajesAleatorio
 * @param {Array} personajes - La lista de personajes recuperada de localStorage
 * @returns {Array} El array grupoTarjetas con los personajes distribuidos de
 * manera aleatorio(Barajados)
 */
function distribuyePersonajesAleatorio(personajes) {
  console.log('distribuyePersonajesAleatorio(personajes)');
  if (!Array.isArray(personajes)) {
    // console.error('Se esperaban exactamente 16 personajes.');
    return [];
  }

  const personajesBarajados = arrayAleatorio([...personajes]);

  let grupoTarjetas = [
    personajesBarajados.slice(0, 2), // Primer sub-array con 2 personajes
    personajesBarajados.slice(2, 4), // Segundo sub-array con 2 personajes
    personajesBarajados.slice(4, 8), // tercer sub-array con 4 personajes
    personajesBarajados.slice(8, 12), // cuarto sub-array con 4 personajes
    personajesBarajados.slice(12, 16), // Quinto sub-array con 4 personajes
  ];

  return grupoTarjetas;
}

export { distribuyePersonajesAleatorio, barajaTarjetas };
