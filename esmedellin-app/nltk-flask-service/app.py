from flask import Flask, request, jsonify
# -*- coding: utf-8 -*-
import nltk
from nltk.tokenize import word_tokenize

# Descargar los recursos necesarios de nltk
nltk.download('punkt')

app = Flask(__name__)

# Ruta para procesar el texto con nltk
@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text', '')

    # Tokenizar el texto (puedes aplicar otras funcionalidades de nltk aqu­)
    tokens = word_tokenize(text)

    return jsonify({'tokens': tokens})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Modificado para escuchar en todas las interfaces
