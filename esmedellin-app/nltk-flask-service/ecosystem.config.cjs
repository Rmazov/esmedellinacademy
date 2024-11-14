module.exports = {
  apps: [
    {
      name: "nltk-flask-service", // Nombre de la aplicación
      script: "app.py", // Archivo principal de la aplicación
      interpreter: "python3", // Asegúrate de que sea el intérprete correcto
      args: "", // Aquí puedes añadir argumentos si los necesitas
      instances: 1, // Número de instancias
      exec_mode: "fork", // Modo de ejecución
      watch: false, // Cambia a true si quieres que PM2 observe cambios
      env: {
        FLASK_ENV: "development", // Establece el entorno si es necesario
      },
    },
  ],
};
