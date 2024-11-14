// AboutUs.js
import React from 'react';
import { useSpring, a } from '@react-spring/web';
import styles from './AboutUs.module.css';
import { useLanguage } from './LanguageContext'; // Usar el contexto

const AboutUs = () => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 220, friction: 120 },
  });

  // Textos para ambos idiomas
  const texts = {
    en: {
      title: "Discover Medellín Like Never Before",
      subtitle1: "Immerse Yourself in Medellín's Culture",
      description1: "At esmedellin, we offer you the best cultural tips to explore every corner of our beautiful city. From the unique flavors of our cuisine to the vibrant traditions that make Medellín a special place.",
      subtitle2: "Learn Spanish and English While You Travel",
      description2: "Make the most of your time in Medellín to enhance your Spanish and English skills. We provide resources and activities that will help you practice the language while immersing yourself in the local culture."
    },
    es: {
      title: "Descubre Medellín Como Nunca Antes",
      subtitle1: "Sumérgete en la Cultura de Medellín",
      description1: "En esmedellin, te ofrecemos los mejores consejos culturales para explorar cada rincón de nuestra hermosa ciudad. Desde los sabores únicos de nuestra cocina hasta las vibrantes tradiciones que hacen de Medellín un lugar especial.",
      subtitle2: "Aprende Español e Inglés Mientras Viajas",
      description2: "Aprovecha al máximo tu tiempo en Medellín para mejorar tus habilidades en español e inglés. Proporcionamos recursos y actividades que te ayudarán a practicar el idioma mientras te sumerges en la cultura local."
    },
  };

  // Obtener el idioma seleccionado del contexto
  const { selectedLanguage } = useLanguage();

  return (
    <a.div style={props} className={styles.container}>
      <h2 className={styles.title}>{texts[selectedLanguage].title}</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src="https://esmedellin.com/images/metro-gratis-elecciones-2023.jpg"
            alt="Imagen Representativa"
            className={styles.image}
          />
        </div>
        <div className={styles.textColumn}>
          <h3 className={styles.subTitle}>{texts[selectedLanguage].subtitle1}</h3>
          <p className={styles.description}>
            {texts[selectedLanguage].description1}
          </p>
          <h3 className={styles.subTitle}>{texts[selectedLanguage].subtitle2}</h3>
          <p className={styles.description}>
            {texts[selectedLanguage].description2}
          </p>
        </div>
      </div>
    </a.div>
  );
};

export default AboutUs;
