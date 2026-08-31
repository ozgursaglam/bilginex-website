
(function() {
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  // Sadece mobilde göster
  function checkMobile() {
    if (window.innerWidth <= 768) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
      menu.classList.remove('open');
      btn.classList.remove('open');
    }
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  btn.addEventListener('click', function() {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });
  // Dışarı tıklayınca kapat
  document.addEventListener('click', function(e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
    }
  });
})();
