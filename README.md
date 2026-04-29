# 🔍 Detector de Fake News

Aplicação web que utiliza **Machine Learning (Naive Bayes + TF-IDF)** para classificar notícias em português como **reais** ou **falsas**.

Interface moderna no estilo **shadcn/ui** com tema escuro.

---

## ✨ Funcionalidades

- Classificação de texto em tempo real via API REST
- Pré-processamento de texto com NLTK (remoção de stopwords, pontuação, números)
- Vetorização com TF-IDF
- Modelo Naive Bayes treinado para português
- Interface responsiva com tema dark no padrão shadcn/ui

---

## 🛠️ Pré-requisitos

- **Python** 3.10 ou superior → [download](https://python.org)
- **pip** (já vem com o Python)
- **Git** (opcional)

---

## 🚀 Como inicializar

### 1. Clone ou extraia o projeto

```bash
git clone https://github.com/seu-usuario/fake-news-detector.git
cd fake-news-detector
```

Ou extraia o `.zip` e entre na pasta:

```bash
cd Classifica-o-Fake-News-MI--main
```

---

### 2. Crie e ative um ambiente virtual

**Linux / macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (CMD):**
```cmd
python -m venv venv
venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

> O prefixo `(venv)` aparecerá no terminal quando o ambiente estiver ativo.

---

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

> ⏳ Isso pode demorar alguns minutos na primeira vez.

---

### 4. Baixe os recursos do NLTK

Execute uma vez para baixar as stopwords em português:

```bash
python -c "import nltk; nltk.download('stopwords')"
```

---

### 5. Confirme que os modelos estão presentes

O projeto requer dois arquivos na pasta `model/`:

```
model/
  ├── naive_bayes_model.pkl
  └── tfidf_vectorizer.pkl
```

> Se estiverem ausentes, execute o notebook de treinamento antes de continuar.

---

### 6. Inicie o servidor

```bash
python app.py
```

O Flask iniciará em modo de desenvolvimento. Acesse no navegador:

```
http://127.0.0.1:5000
```

---

## 📁 Estrutura do projeto

```
.
├── app.py                  # Servidor Flask + lógica de classificação
├── requirements.txt        # Dependências Python
├── gunicorn_config.py      # Configuração para deploy em produção
├── render.yaml             # Configuração para deploy no Render
├── model/
│   ├── naive_bayes_model.pkl
│   └── tfidf_vectorizer.pkl
├── templates/
│   └── index.html          # Interface principal
└── static/
    ├── style.css           # Estilos (shadcn/ui dark theme)
    └── script.js           # Lógica do frontend
```

---

## 🌐 Deploy em produção

### Usando Gunicorn (Linux/macOS)

```bash
pip install gunicorn
gunicorn -c gunicorn_config.py app:app
```

### Usando Render

O arquivo `render.yaml` já está configurado. Basta conectar o repositório na plataforma [Render](https://render.com) e fazer o deploy automaticamente.

---

## 🔌 API

### `POST /classificar`

Classifica um texto como real ou fake.

**Request:**
```json
{
  "texto": "Conteúdo da notícia a ser verificada."
}
```

**Response:**
```json
{
  "prediction": "Fake"
}
```

Valores possíveis de `prediction`: `"Fake"` ou `"Real"`.

---

## ⚠️ Aviso

Este projeto foi desenvolvido para fins **educacionais**. Os resultados da classificação podem não ser totalmente precisos e não devem ser usados como única fonte para verificação de notícias.

---

## 📄 Licença

MIT
