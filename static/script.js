const form = document.getElementById('classificationForm');
const loadingEl = document.getElementById('loading');
const submitBtn = document.getElementById('submitBtn');
const resultEmpty = document.getElementById('resultEmpty');
const resultFake = document.getElementById('resultFake');
const resultReal = document.getElementById('resultReal');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const texto = document.getElementById('texto').value.trim();
  if (!texto) return;

  // Show loading
  loadingEl.classList.add('active');
  submitBtn.disabled = true;

  // Reset result
  resultEmpty.style.display = 'none';
  resultFake.classList.remove('visible');
  resultReal.classList.remove('visible');

  try {
    const response = await fetch('/classificar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto }),
    });

    if (response.ok) {
      const result = await response.json();
      const isFake = result.prediction === 'Fake';

      if (isFake) {
        resultFake.classList.add('visible');
      } else {
        resultReal.classList.add('visible');
      }
    } else {
      resultEmpty.style.display = 'flex';
      resultEmpty.innerHTML = '<span class="result-empty-icon">⚠️</span>Erro ao classificar o texto.';
    }
  } catch (error) {
    resultEmpty.style.display = 'flex';
    resultEmpty.innerHTML = '<span class="result-empty-icon">⚠️</span>Erro ao processar a requisição.';
  } finally {
    loadingEl.classList.remove('active');
    submitBtn.disabled = false;
  }
});
