
function brevoSubscribe_blog_mikro_ogrenme() {
  var email = document.getElementById('brevo-email-blog_mikro_ogrenme').value.trim();
  var btn = document.getElementById('brevo-btn-blog_mikro_ogrenme');
  var successEl = document.getElementById('brevo-success-blog_mikro_ogrenme');
  var errorEl = document.getElementById('brevo-error-blog_mikro_ogrenme');
  var formArea = document.getElementById('brevo-form-blog_mikro_ogrenme');
  if (!email || !email.includes('@')) { errorEl.textContent='Geçerli bir email adresi girin.'; errorEl.style.display='block'; return; }
  btn.disabled=true; btn.textContent='Gönderiliyor...'; btn.style.background='#93c5fd'; errorEl.style.display='none';
  var fd=new FormData(); fd.append('EMAIL',email); fd.append('locale','tr'); fd.append('email_address_check','');
  fetch('https://10a17e33.sibforms.com/serve/MUIFAO1fqBkvvx61zBLbCLR08g7aFYpVm3wBVMq3b_oxmmwLjpjWsNT6CNT7SP6GKdSc_7JyYJ_M-_vEoYp_ExETsm-Q-DLt_RhACrjnBUcVc6YPQ7yBzlTaFzg94qjU_qNJKFFrZ5XJ9eTkhCdYDLJOl_vgqLZCEtoZ1RDX-LeJDMgRdl8S6PWjBLnbVi47KWqhx0KfyBbGGVb7IQ==',
    {method:'POST',body:fd,mode:'no-cors'})
  .then(function(){formArea.style.display='none';successEl.style.display='block';})
  .catch(function(){errorEl.textContent='Bir hata oluştu.';errorEl.style.display='block';btn.disabled=false;btn.textContent='Abone Ol';btn.style.background='#2563eb';});
}
document.getElementById('brevo-email-blog_mikro_ogrenme').addEventListener('keypress',function(e){if(e.key==='Enter')brevoSubscribe_blog_mikro_ogrenme();});
