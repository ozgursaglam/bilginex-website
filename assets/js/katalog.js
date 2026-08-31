
function doPrint() {
  window.scrollTo(0, 0);
  setTimeout(function() { window.print(); }, 150);
}


/* ---- */


function brevoSubscribe_katalog() {
  var email = document.getElementById('brevo-email-katalog').value.trim();
  var btn = document.getElementById('brevo-btn-katalog');
  var successEl = document.getElementById('brevo-success-katalog');
  var errorEl = document.getElementById('brevo-error-katalog');
  var formArea = document.getElementById('brevo-form-katalog');
  if (!email || !email.includes('@')) { errorEl.textContent='Geçerli bir email adresi girin.'; errorEl.style.display='block'; return; }
  btn.disabled=true; btn.textContent='Gönderiliyor...'; btn.style.background='#93c5fd'; errorEl.style.display='none';
  var fd=new FormData(); fd.append('EMAIL',email); fd.append('locale','tr'); fd.append('email_address_check','');
  fetch('https://10a17e33.sibforms.com/serve/MUIFAO1fqBkvvx61zBLbCLR08g7aFYpVm3wBVMq3b_oxmmwLjpjWsNT6CNT7SP6GKdSc_7JyYJ_M-_vEoYp_ExETsm-Q-DLt_RhACrjnBUcVc6YPQ7yBzlTaFzg94qjU_qNJKFFrZ5XJ9eTkhCdYDLJOl_vgqLZCEtoZ1RDX-LeJDMgRdl8S6PWjBLnbVi47KWqhx0KfyBbGGVb7IQ==',
    {method:'POST',body:fd,mode:'no-cors'})
  .then(function(){formArea.style.display='none';successEl.style.display='block';})
  .catch(function(){errorEl.textContent='Bir hata oluştu.';errorEl.style.display='block';btn.disabled=false;btn.textContent='Abone Ol';btn.style.background='#2563eb';});
}
document.getElementById('brevo-email-katalog').addEventListener('keypress',function(e){if(e.key==='Enter')brevoSubscribe_katalog();});
