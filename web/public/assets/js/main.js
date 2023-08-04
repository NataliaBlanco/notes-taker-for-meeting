'use strict';

let isListening = false;
let recognition;
const pa = document.querySelector('.js-container');
const buttonReset = document.querySelector('.btn-cntr_reset');
const buttonStart = document.querySelector('.btn-cntr_record');
const buttonStop = document.querySelector('.btn-cntr_stop');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function resetfn(e) {
  e.preventDefault();
  pa.innerHTML = '';
  return pa;
}

function textParagraph(transcript) {
  let newp = `<p class="paragraph">${transcript}</p>`;
  pa.innerHTML += newp;
}
function startTranscript() {
  if (!isListening) {
    isListening = true;
    recognition.start();
  }
}
function stopTranscript() {
  if (isListening) {
    isListening = false;
    recognition.stop();
  }
}

buttonReset.addEventListener('click', resetfn);

//events
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'es';
  recognition.onresult = (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0].transcript)
      .join('');
    if (e.results[0].isFinal) {
      textParagraph(transcript);
    }
  };
  recognition.onend = () => {
    if (isListening) {
      recognition.start();
    }
  };
  buttonStart.onclick = () => {
    startTranscript();
  };
  buttonStop.onclick = () => {
    stopTranscript();
  };
} else {
  ('Your browser does not support recognition speech');
}

// Habría que añadir un botón para empezar el evento, y otro con el que terminarlo , en el que te diera la opción de guardarlo en el LS
//

//function addTitle() {}

// function keepLs(listName, value) {
//   let val = localStorage[listName] ? JSON.parse(localStorage[listName]) : [];
//   val.push(value.toString());
//   localStorage.setItem('meeting notes', JSON.stringify(ls));
// }

//# sourceMappingURL=main.js.map
