document.getElementById('classificationForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Impede o comportamento padrão de envio do formulário

    // Coletar os dados do formulário
    const texto = document.getElementById('texto').value;

    // Enviar os dados para o servidor usando fetch
    const response = await fetch('/classificar', {  // A URL deve ser relativa
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            texto: texto
        })
    });

    // Verificar se a requisição foi bem-sucedida
    if (response.ok) {
        const result = await response.json();  // Receber a resposta JSON
        // Exibir o resultado no HTML
        document.getElementById('classificationResult').textContent = `Classe predita: ${result.prediction}`;
    } else {
        document.getElementById('classificationResult').textContent = 'Erro ao classificar o texto.';
    }
});
