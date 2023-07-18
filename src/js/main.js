'use strict';

const pa = document.querySelector('.js-container');
const button = document.querySelector('.button');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.lang = 'es';

function resetfn(e) {
  e.preventDefault();
  pa.innerHTML = '';
  return pa;
}

//events
recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  document.getElementsByClassName('paragraph').textContent = poopScript;
  let newp = `<p class="paragraph">${transcript}</p>`;
  if (e.results[0].isFinal) {
    pa.innerHTML += newp;
  }
  localStorage.setItem('meeting notes', JSON.stringify(transcript));
});

recognition.addEventListener('end', recognition.start);
button.addEventListener('click', resetfn);

recognition.start();
