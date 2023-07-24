'use strict';
let isListening = false;
let isPaused = false;
let pauseTimeout;
const pa = document.querySelector('.js-container');
const buttonReset = document.querySelector('.btn-cntr_reset');
const buttonStart = document.querySelector('.btn-cntr_record');
const buttonStop = document.querySelector('.btn-cntr_stop');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.lang = 'es';

function resetfn(e) {
  e.preventDefault();
  pa.innerHTML = '';
  return pa;
}

function textParagraph(transcript) {
  let newp = `<p class="paragraph">${transcript}</p>`;
  pa.innerHTML += newp;
}

//events

function notesTranscription() {
  recognition.onend = () => {
    if (isListening) {
      recognition.start();
    }
  };
  recognition.start();
}

buttonReset.addEventListener('click', resetfn);
buttonStart.addEventListener('click', () => {
  if (!isListening) {
    isListening = true;
    notesTranscription();
    recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      if (e.results[0].isFinal) {
        textParagraph(transcript);
        isPaused = false;
      } else {
        if (!isPaused) {
          clearTimeout(pauseTimeout);
          pauseTimeout = setTimeout(() => {
            isPaused = true;
          }, 1500);
        }
      }
    });
  }
});
buttonStop.addEventListener('click', () => {
  if (isListening) {
    isListening = false;
    clearTimeout(pauseTimeout);
    recognition.stop();
  }
});

//recognition.start();
//recognition.addEventListener('end', recognition.start);

// Habría que añadir un botón para empezar el evento, y otro con el que terminarlo , en el que te diera la opción de guardarlo en el LS
//

//function addTitle() {}

// function keepLs(listName, value) {
//   let val = localStorage[listName] ? JSON.parse(localStorage[listName]) : [];
//   val.push(value.toString());
//   localStorage.setItem('meeting notes', JSON.stringify(ls));
// }
