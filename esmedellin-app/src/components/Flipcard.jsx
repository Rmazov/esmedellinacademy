import React, { useState } from 'react';
import { useSpring, a } from '@react-spring/web';
import styles from './styles.module.css';

export default function App() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const imagePairs = [
    {
      front: 'https://esmedellin.com/images/metro-gratis-elecciones-2023.jpg',
      back: 'https://esmedellin.com/images/metro-gratis-elecciones-2023.jpg',
      title: 'Título 1',
    },
    {
      front: 'https://esmedellin.com/images/metro1.jpg',
      back: 'https://esmedellin.com/images/metro-gratis-elecciones-2023.jpg',
      title: 'Título 2',
    },
    {
      front: 'https://esmedellin.com/images/metro-gratis-elecciones-2023.jpg',
      back: 'https://esmedellin.com/images/metro1.jpg',
      title: 'Título 3',
    },
  ];

  const getSpringProps = (index) => {
    const isFlipped = flippedIndex === index;
    return useSpring({
      opacity: isFlipped ? 1 : 0,
      transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 },
    });
  };

  const getTitleSpringProps = (index) => {
    const isFlipped = flippedIndex === index;
    return useSpring({
      opacity: isFlipped ? 1 : 0, // Cambiar la opacidad del título
      transform: `translateY(${isFlipped ? 0 : -20}px)`, // Efecto de movimiento hacia arriba
      config: { tension: 200, friction: 20 },
    });
  };

  return (
    <div className={styles.container}>
      {imagePairs.map((pair, index) => {
        const { transform, opacity } = getSpringProps(index);
        const { opacity: titleOpacity, transform: titleTransform } = getTitleSpringProps(index); // Obtener las propiedades del título

        return (
          <div
            className={styles.cardContainer}
            onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
            key={index}
          >
            <a.div
              className={`${styles.c} ${styles.back}`}
              style={{
                opacity: opacity.to(o => 1 - o),
                transform,
                backgroundImage: `url(${pair.back})`,
              }}
            />
            <a.div
              className={`${styles.c} ${styles.front}`}
              style={{
                opacity,
                transform,
                rotateX: '180deg',
                backgroundImage: `url(${pair.front})`,
              }}
            />
            {/* Título superpuesto con animación */}
            <a.div
              className={styles.title}
              style={{
                opacity: titleOpacity,
                transform: titleTransform,
              }}
            >
              {pair.title}
            </a.div>
          </div>
        );
      })}
    </div>
  );
}
