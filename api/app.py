from flask import Flask, render_template, request, jsonify
import re
import nltk
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from spellchecker import SpellChecker

# Certifique-se de que a lista de stopwords está carregada
nltk.download('stopwords')

# Carregar o modelo e o vetor TF-IDF salvos
nb_model = joblib.load('./model/naive_bayes_model.pkl')
tfidf_vectorizer = joblib.load('./model/tfidf_vectorizer.pkl')

# Função de pré-processamento de texto
def clean_text(text):
    text = text.lower()  # Converte para caixa baixa
    text = re.sub(r'[^\w\s]', '', text)  # Retira pontuação
    text = re.sub(r'\d+', '', text)  # Retira números
    PORTUGUESE_STOP_WORDS = set(nltk.corpus.stopwords.words('portuguese'))
    text = ' '.join([word for word in text.split() if word not in PORTUGUESE_STOP_WORDS])  # Remove stopwords
    return text

# Função para calcular o comprimento médio das palavras
def comprimento_medio_palavras(texto):
    palavras = texto.split()
    if len(palavras) == 0:
        return 0
    return np.mean([len(palavra) for palavra in palavras])

# Função para calcular a porcentagem de erro ortográfico
def porcentagem_erro_ortografia(texto):
    spell = SpellChecker(language='pt')  # Define o idioma como português
    palavras = texto.split()
    erros = 0
    
    for palavra in palavras:
        # Remove pontuações e verifica se a palavra está correta
        palavra_limpa = ''.join(e for e in palavra if e.isalnum())  # Remove caracteres não alfabéticos
        if palavra_limpa and palavra_limpa not in spell:  # Se a palavra não estiver no dicionário
            erros += 1
            
    return (erros / len(palavras)) * 100 if palavras else 0

# Inicializar o Flask
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/classificar', methods=['POST'])
def classificar():
    data = request.get_json()  # Recebe os dados como JSON
    texto = data['texto']
    categoria = 'categoria'


    # Limpeza do texto
    texto_limpo = clean_text(texto)

    # Calcular as variáveis
    comprimento_medio = comprimento_medio_palavras(texto_limpo)
    erro_ortografia = porcentagem_erro_ortografia(texto)

    # Vetorização do texto com o TF-IDF
    texto_vec = tfidf_vectorizer.transform([texto_limpo])

    # Previsão do modelo Naive Bayes
    predicao = nb_model.predict(texto_vec)
    resultado = 'Fake' if predicao[0] == 1 else 'Real'

    # Retornar o resultado em formato JSON
    return jsonify({
        'prediction': resultado,
    })

# Iniciar o servidor
if __name__ == '__main__':
    app.run(debug=True)
