import React, { useState } from "react";

const SpeechComponent = () => {
  const [language, setLanguage] = useState("es-ES"); // Estado para el idioma
  const textES = "Santa Elena, un encantador corregimiento de Medellín, es famoso por su rica tradición en la elaboración de silletas, un símbolo cultural que resalta la identidad paisa. Cada año, durante la Feria de las Flores, esta tradición se convierte en el centro de atención, mostrando el talento y la creatividad de sus habitantes.";
  const textEN = "Santa Elena, a charming district of Medellín, is famous for its rich tradition in the making of silleteros, a cultural symbol that highlights the paisa identity. Each year, during the Flower Fair, this tradition becomes the center of attention, showcasing the talent and creativity of its inhabitants.";
  
  const words = language === "es-ES" ? textES.split(" ") : textEN.split(" "); // Divide el texto en palabras según el idioma

  const speak = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;  // Especificar el idioma
      utterance.rate = 1;     // Velocidad normal
      utterance.pitch = 1;    // Tono normal
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Lo siento, tu navegador no soporta la Web Speech API");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", overflow: "hidden" }}>
      <h2>Selecciona el idioma:</h2>
      <button onClick={() => setLanguage("es-ES")}>Español</button>
      <button onClick={() => setLanguage("en-US")}>English</button>
      <p>
        Haz clic en una palabra para escucharla en audio:{" "}
        {words.map((word, index) => (
          <span 
            key={index} 
            onClick={() => speak(word, language)} 
            style={{ cursor: "pointer", margin: "0 4px", textDecoration: "underline" }}
          >
            {word}
          </span>
        ))}
      </p>
      <button onClick={() => speak(language === "es-ES" ? textES : textEN, language)}>
        Leer toda la frase
      </button>
    </div>
  );
};

export default SpeechComponent;
