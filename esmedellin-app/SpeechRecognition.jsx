// src/components/SpeechRecognition.jsx
import React, { useState } from 'react';

const SpeechRecognition = () => {
  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    setListening(!listening);
    if (listening) {
      // Lógica para detener el reconocimiento de voz
      console.log('Stopped listening');
    } else {
      // Lógica para iniciar el reconocimiento de voz
      console.log('Started listening');
    }
  };

  return (
    <div>
      <h2>Speech Recognition</h2>
      <button onClick={toggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

export default SpeechRecognition;
