import React, { useState } from 'react';

const SpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Configuración básica de la API de reconocimiento de voz
    recognition.lang = 'en-US'; // Cambia a 'es-ES' para español
    recognition.continuous = true; // Sigue reconociendo sin detenerse
    recognition.interimResults = false; // Solo transcripciones finales

    // Manejar el evento onresult cuando se reconocen palabras
    recognition.onresult = (event) => {
        const currentTranscript = event.results[event.results.length - 1][0].transcript;
        setTranscript(currentTranscript);
    };

    // Iniciar y detener el reconocimiento de voz
    const toggleListening = () => {
        if (listening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setListening(!listening);
    };

    return (
        <div>
            <h2>Speech Recognition</h2>
            <button onClick={toggleListening}>
                {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechRecognition;
