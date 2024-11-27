document.getElementById('classificationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    // Exibir o GIF de carregamento
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'flex';

    // Coletar os dados do formulário
    const texto = document.getElementById('texto').value;

    try {
        // Enviar os dados para o servidor usando fetch
        const response = await fetch('/classificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto: texto })
        });

        if (response.ok) {
            const result = await response.json(); // Receber a resposta JSON
            // Exibir o resultado no HTML
            document.getElementById('classificationResult').textContent = `Classe predita: ${result.prediction}`;
        } else {
            document.getElementById('classificationResult').textContent = 'Erro ao classificar o texto.';
        }
    } catch (error) {
        document.getElementById('classificationResult').textContent = 'Erro ao processar a requisição.';
    } finally {
        // Ocultar o GIF de carregamento
        loadingElement.style.display = 'none';
    }
});
