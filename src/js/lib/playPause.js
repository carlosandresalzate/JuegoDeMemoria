import {
  iniciaCronometro,
  minutosRestantes,
  pausarCronometro,
  playCronometro,
  segundosRestantes,
} from './cronometro.js';
import {
  btnSwitch,
  btnPlay,
  btnPause,
  minutos,
  segundos,
} from './variables.js';

function playPause() {
  console.log('playPause()');

  btnPlay.classList.add('btn-hidden');
  btnPause.classList.add('btn-visible');

  // const tiempo = {
  //   minutos: 0,
  //   segundos: 8,
  // };

  // console.log('agrego 00 a minutos y segundos');
  // minutos.innerText = '00';
  // segundos.innerText = '00';

  btnSwitch.addEventListener('click', (e) => {
    if (btnPlay.classList.contains('btn-hidden')) {
      console.log('pausar usa pausarCronometro');
      btnPlay.classList.remove('btn-hidden');
      btnPause.classList.remove('btn-visible');
      btnPause.classList.add('btn-hidden');
      btnPlay.classList.add('btn-visible');
      pausarCronometro();
    } else {
      console.log('dar play usa playCronometro');
      btnPause.classList.remove('btn-hidden');
      btnPlay.classList.remove('btn-visible');
      btnPause.classList.add('btn-visible');
      btnPlay.classList.add('btn-hidden');
      playCronometro();
      // iniciaCronometro(minutosRestantes, segundosRestantes);
    }
  });
  console.log('termina el evento e iniciaCronometro');
  // iniciaCronometro(tiempo.minutos, tiempo.segundos);
}

export { playPause };
