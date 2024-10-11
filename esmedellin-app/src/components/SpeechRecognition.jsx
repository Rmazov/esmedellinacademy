import React, { useState, useEffect } from 'react';

const SpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [voices, setVoices] = useState([]); // Estado para almacenar las voces
    const [selectedVoice, setSelectedVoice] = useState(null); // Estado para la voz seleccionada
    const [rate, setRate] = useState(1); // Estado para la velocidad

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

    // Función para leer el texto utilizando la API SpeechSynthesis
    const readText = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(transcript); // Creamos la instancia con el texto
        utterance.voice = selectedVoice; // Usar la voz seleccionada
        utterance.lang = selectedVoice.lang; // Ajustar el idioma
        utterance.rate = rate; // Configurar la velocidad
        synth.speak(utterance); // Iniciar la síntesis de voz
    };

    // Obtener voces disponibles
    useEffect(() => {
        const fetchVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            // Filtrar solo voces en inglés
            const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en'));
            setVoices(englishVoices);
            if (englishVoices.length > 0) {
                setSelectedVoice(englishVoices[0]); // Selecciona la primera voz en inglés por defecto
            }
        };

        // Cargar voces cuando cambien
        window.speechSynthesis.onvoiceschanged = fetchVoices;
        fetchVoices(); // Llamar inmediatamente en caso de que las voces ya estén cargadas
    }, []);

    return (
        <div>
            <h2>Speech Recognition</h2>
            <button onClick={toggleListening}>
                {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <p>{transcript}</p>

            {/* Botón para leer el texto con SpeechSynthesis */}
            {transcript && (
                <button onClick={readText}>
                    Read Text
                </button>
            )}

            {/* Selección de voz */}
            <div>
                <label htmlFor="voice-select">Select Voice: </label>
                <select
                    id="voice-select"
                    onChange={(e) => setSelectedVoice(voices.find(voice => voice.name === e.target.value))}
                >
                    {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {`${voice.name} (${voice.lang})`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Control deslizante para ajustar la velocidad */}
            <div>
                <label htmlFor="rate">Speed: {rate.toFixed(2)}</label>
                <input
                    id="rate"
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                />
            </div>
        </div>
    );
};

export default SpeechRecognition;
