
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Gönderiliyor...';
  btn.disabled = true;

  const formData = new FormData(this);

  try {
    const response = await fetch('https://formspree.io/f/mwvjbqbk', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      window.scrollTo(0, document.querySelector('.form-card').offsetTop - 100);
    } else {
      btn.textContent = 'Görüşme Talep Et →';
      btn.disabled = false;
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  } catch (err) {
    btn.textContent = 'Görüşme Talep Et →';
    btn.disabled = false;
    alert('Bağlantı hatası. Lütfen tekrar deneyin.');
  }
});
