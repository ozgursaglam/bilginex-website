
function brevoSubscribe_blog_super_zeka() {
  var email = document.getElementById('brevo-email-blog_super_zeka').value.trim();
  var btn = document.getElementById('brevo-btn-blog_super_zeka');
  var successEl = document.getElementById('brevo-success-blog_super_zeka');
  var errorEl = document.getElementById('brevo-error-blog_super_zeka');
  var formArea = document.getElementById('brevo-form-blog_super_zeka');
  if (!email || !email.includes('@')) { errorEl.textContent='Geçerli bir email adresi girin.'; errorEl.style.display='block'; return; }
  btn.disabled=true; btn.textContent='Gönderiliyor...'; btn.style.background='#93c5fd'; errorEl.style.display='none';
  var fd=new FormData(); fd.append('EMAIL',email); fd.append('locale','tr'); fd.append('email_address_check','');
  fetch('https://10a17e33.sibforms.com/serve/MUIFAO1fqBkvvx61zBLbCLR08g7aFYpVm3wBVMq3b_oxmmwLjpjWsNT6CNT7SP6GKdSc_7JyYJ_M-_vEoYp_ExETsm-Q-DLt_RhACrjnBUcVc6YPQ7yBzlTaFzg94qjU_qNJKFFrZ5XJ9eTkhCdYDLJOl_vgqLZCEtoZ1RDX-LeJDMgRdl8S6PWjBLnbVi47KWqhx0KfyBbGGVb7IQ==',
    {method:'POST',body:fd,mode:'no-cors'})
  .then(function(){formArea.style.display='none';successEl.style.display='block';})
  .catch(function(){errorEl.textContent='Bir hata oluştu.';errorEl.style.display='block';btn.disabled=false;btn.textContent='Abone Ol';btn.style.background='#2563eb';});
}
document.getElementById('brevo-email-blog_super_zeka').addEventListener('keypress',function(e){if(e.key==='Enter')brevoSubscribe_blog_super_zeka();});


/* ---- */


(function() {
  const items = document.querySelectorAll('.nav-links li.has-mega');
  let closeTimer, currentOpen = null;
  function positionMenu(item, menu) {
    const navEl = document.querySelector('nav');
    const navRect = navEl.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const menuWidth = menu.offsetWidth || 860;
    const viewportWidth = window.innerWidth;
    const pad = 16;
    const top = navRect.bottom + 4;
    let left = itemRect.left + itemRect.width / 2 - menuWidth / 2;
    if (left + menuWidth > viewportWidth - pad) left = viewportWidth - menuWidth - pad;
    if (left < pad) left = pad;
    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
    menu.style.transform = 'none';
    const arrow = menu.querySelector('.mega-arrow');
    if (arrow) {
      const itemCenter = itemRect.left + itemRect.width / 2;
      const arrowLeft = itemCenter - left;
      arrow.style.left = arrowLeft + 'px';
      arrow.style.transform = 'translateX(-50%) rotate(45deg)';
    }
  }
  function closeAll() { items.forEach(i => { const m = i.querySelector('.mega-menu'); if (m) { m.style.opacity='0'; m.style.visibility='hidden'; m.style.pointerEvents='none'; } }); currentOpen = null; }
  function openMenu(item) {
    clearTimeout(closeTimer);
    items.forEach(i => { if (i !== item) { const m = i.querySelector('.mega-menu'); if (m) { m.style.opacity='0'; m.style.visibility='hidden'; m.style.pointerEvents='none'; } } });
    const menu = item.querySelector('.mega-menu');
    if (menu) { menu.style.visibility='hidden'; menu.style.opacity='0'; positionMenu(item, menu); menu.style.visibility='visible'; menu.style.opacity='1'; menu.style.pointerEvents='all'; }
    currentOpen = item;
  }
  function scheduleClose() { closeTimer = setTimeout(closeAll, 200); }
  items.forEach(item => {
    item.addEventListener('mouseenter', () => openMenu(item));
    item.addEventListener('mouseleave', scheduleClose);
    const menu = item.querySelector('.mega-menu');
    if (menu) { menu.addEventListener('mouseenter', () => { clearTimeout(closeTimer); currentOpen = item; }); menu.addEventListener('mouseleave', scheduleClose); }
  });
  document.addEventListener('mouseleave', closeAll);
  window.addEventListener('resize', () => { if (currentOpen) openMenu(currentOpen); });
})();
