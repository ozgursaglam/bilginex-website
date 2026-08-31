
var demoSlide = 0;
var demoTotal = 5;
var demoTimer = null;
var demoProgressTimer = null;
var demoProgress = 0;
var AUTO_DURATION = 5000;

function openDemoModal() {
  document.getElementById('demoOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  goSlide(0);
  startAutoPlay();
}
function closeDemoModal() {
  document.getElementById('demoOverlay').classList.remove('active');
  document.body.style.overflow = '';
  stopAutoPlay();
}
function goSlide(n) {
  var slides = document.querySelectorAll('.demo-slide');
  var dots = document.querySelectorAll('.demo-dot');
  slides.forEach(function(s){ s.classList.remove('active'); });
  dots.forEach(function(d){ d.classList.remove('active'); });
  demoSlide = n;
  slides[n].classList.add('active');
  dots[n].classList.add('active');
  document.getElementById('demoNextBtn').textContent = n === demoTotal-1 ? 'Görüşme Al →' : 'İleri →';
  resetProgress();
}
function nextSlide() {
  if(demoSlide === demoTotal-1) {
    closeDemoModal();
    window.location.href = 'iletisim.html';
    return;
  }
  goSlide(demoSlide + 1);
}
function prevSlide() {
  if(demoSlide > 0) goSlide(demoSlide - 1);
}
function resetProgress() {
  clearInterval(demoProgressTimer);
  demoProgress = 0;
  document.getElementById('demoProgress').style.width = '0%';
  demoProgressTimer = setInterval(function(){
    demoProgress += 100 / (AUTO_DURATION / 100);
    document.getElementById('demoProgress').style.width = Math.min(demoProgress, 100) + '%';
  }, 100);
}
function startAutoPlay() {
  stopAutoPlay();
  demoTimer = setInterval(function(){
    if(demoSlide < demoTotal - 1) goSlide(demoSlide + 1);
    else stopAutoPlay();
  }, AUTO_DURATION);
  resetProgress();
}
function stopAutoPlay() {
  clearInterval(demoTimer);
  clearInterval(demoProgressTimer);
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeDemoModal();
  if(e.key === 'ArrowRight') nextSlide();
  if(e.key === 'ArrowLeft') prevSlide();
});


/* ---- */


function brevoSubscribe_index() {
  var email = document.getElementById('brevo-email-index').value.trim();
  var btn = document.getElementById('brevo-btn-index');
  var successEl = document.getElementById('brevo-success-index');
  var errorEl = document.getElementById('brevo-error-index');
  var formArea = document.getElementById('brevo-form-index');
  if (!email || !email.includes('@')) { errorEl.textContent='Geçerli bir email adresi girin.'; errorEl.style.display='block'; return; }
  btn.disabled=true; btn.textContent='Gönderiliyor...'; btn.style.background='#93c5fd'; errorEl.style.display='none';
  var fd=new FormData(); fd.append('EMAIL',email); fd.append('locale','tr'); fd.append('email_address_check','');
  fetch('https://10a17e33.sibforms.com/serve/MUIFAO1fqBkvvx61zBLbCLR08g7aFYpVm3wBVMq3b_oxmmwLjpjWsNT6CNT7SP6GKdSc_7JyYJ_M-_vEoYp_ExETsm-Q-DLt_RhACrjnBUcVc6YPQ7yBzlTaFzg94qjU_qNJKFFrZ5XJ9eTkhCdYDLJOl_vgqLZCEtoZ1RDX-LeJDMgRdl8S6PWjBLnbVi47KWqhx0KfyBbGGVb7IQ==',
    {method:'POST',body:fd,mode:'no-cors'})
  .then(function(){formArea.style.display='none';successEl.style.display='block';})
  .catch(function(){errorEl.textContent='Bir hata oluştu.';errorEl.style.display='block';btn.disabled=false;btn.textContent='Abone Ol';btn.style.background='#2563eb';});
}
document.getElementById('brevo-email-index').addEventListener('keypress',function(e){if(e.key==='Enter')brevoSubscribe_index();});


/* ---- */


function countUp(el, target, prefix, suffix, duration) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(start) + suffix;
  }, 16);
}

function initCounters() {
  const counters = [
    { selector: '.stat-item:nth-child(1) .stat-number', target: 350, prefix: '', suffix: '+' },
    { selector: '.stat-item:nth-child(2) .stat-number', target: 100, prefix: '%', suffix: '' },
    { selector: '.stat-item:nth-child(3) .stat-number', target: 25,  prefix: '', suffix: '' },
    { selector: '.stat-item:nth-child(4) .stat-number', target: 12,  prefix: '', suffix: '' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(c => {
          const el = document.querySelector(c.selector);
          if (el) countUp(el, c.target, c.prefix, c.suffix, 1800);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsWrap = document.querySelector('.stats-wrap');
  if (statsWrap) observer.observe(statsWrap);
}

document.addEventListener('DOMContentLoaded', initCounters);


// WHY METRICS ANIMATION
(function(){
  var targets = [98, 94, 76, 43];
  var ids = ['wm1','wm2','wm3','wm4'];
  var barIds = ['wb1','wb2','wb3','wb4'];
  var triggered = false;

  function animateBars(){
    if(triggered) return;
    var el = document.getElementById('whyVisual');
    if(!el) return;
    var rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      triggered = true;
      targets.forEach(function(t, i){
        var barEl = document.getElementById(barIds[i]);
        var valEl = document.getElementById(ids[i]);
        if(!barEl || !valEl) return;
        setTimeout(function(){
          barEl.style.width = t + '%';
          var start = 0;
          var duration = 1400;
          var startTime = null;
          function step(ts){
            if(!startTime) startTime = ts;
            var prog = Math.min((ts - startTime) / duration, 1);
            valEl.textContent = Math.round(prog * t) + '%';
            if(prog < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }, i * 150);
      });
    }
  }

  window.addEventListener('scroll', animateBars, { passive: true });
  animateBars();
})();


// CTA STATS COUNT-UP
(function(){
  var triggered = false;
  var data = [
{ id: 'cs2', target: 350, prefix: '', suffix: '+' },
    { id: 'cs3', target: 98,  prefix: '%', suffix: '' },
    { id: 'cs4', target: 25,  prefix: '', suffix: '+' },
  ];
  function run(){
    if(triggered) return;
    var el = document.getElementById('ctaStats');
    if(!el) return;
    var rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80){
      triggered = true;
      data.forEach(function(d, i){
        var el = document.getElementById(d.id);
        if(!el) return;
        var start = null;
        var dur = 1600;
        setTimeout(function(){
          requestAnimationFrame(function step(ts){
            if(!start) start = ts;
            var prog = Math.min((ts - start) / dur, 1);
            var ease = 1 - Math.pow(1 - prog, 3);
            el.textContent = d.prefix + Math.round(ease * d.target) + d.suffix;
            if(prog < 1) requestAnimationFrame(step);
          });
        }, i * 120);
      });
    }
  }
  window.addEventListener('scroll', run, { passive: true });
  run();
})();


// HERO PARTICLE NETWORK
(function(){
  var canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];
  var PARTICLE_COUNT = 60;
  var MAX_DIST = 140;

  function resize(){
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle(){
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
  }

  Particle.prototype.update = function(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > W) this.vx *= -1;
    if(this.y < 0 || this.y > H) this.vy *= -1;
  };

  function init(){
    particles = [];
    for(var i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);

    for(var i = 0; i < particles.length; i++){
      var p = particles[i];
      p.update();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(147,197,253,0.5)';
      ctx.fill();

      for(var j = i + 1; j < particles.length; j++){
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < MAX_DIST){
          var alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(147,197,253,' + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('DOMContentLoaded', function(){
    resize();
    init();
    draw();
  });
  window.addEventListener('resize', function(){ resize(); init(); });
})();


// SCROLL REVEAL
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function(el){ observer.observe(el); });
})();



/* ---- */


(function() {
  const items = document.querySelectorAll('.nav-links li.has-mega');
  let closeTimer;
  let currentOpen = null;

  function positionMenu(item, menu) {
    const navEl = document.querySelector('nav');
    const navRect = navEl.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const menuWidth = menu.offsetWidth || 860;
    const viewportWidth = window.innerWidth;
    const pad = 16;

    // Nav altına yerleştir
    const top = navRect.bottom + 4;

    // Item merkezine göre ortala
    let left = itemRect.left + itemRect.width / 2 - menuWidth / 2;
    if (left + menuWidth > viewportWidth - pad) left = viewportWidth - menuWidth - pad;
    if (left < pad) left = pad;

    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
    menu.style.transform = 'none';

    // Ok'u item merkezine hizala
    const arrow = menu.querySelector('.mega-arrow');
    if (arrow) {
      const itemCenter = itemRect.left + itemRect.width / 2;
      const arrowLeft = itemCenter - left;
      arrow.style.left = arrowLeft + 'px';
      arrow.style.transform = 'translateX(-50%) rotate(45deg)';
    }
  }

  function closeAll() {
    items.forEach(i => {
      const m = i.querySelector('.mega-menu');
      if (m) { m.style.opacity='0'; m.style.visibility='hidden'; m.style.pointerEvents='none'; }
    });
    currentOpen = null;
  }

  function openMenu(item) {
    clearTimeout(closeTimer);
    items.forEach(i => {
      if (i !== item) {
        const m = i.querySelector('.mega-menu');
        if (m) { m.style.opacity='0'; m.style.visibility='hidden'; m.style.pointerEvents='none'; }
      }
    });
    const menu = item.querySelector('.mega-menu');
    if (menu) {
      menu.style.visibility = 'hidden';
      menu.style.opacity = '0';
      positionMenu(item, menu);
      menu.style.visibility = 'visible';
      menu.style.opacity = '1';
      menu.style.pointerEvents = 'all';
    }
    currentOpen = item;
  }

  function scheduleClose() {
    closeTimer = setTimeout(closeAll, 200);
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => openMenu(item));
    item.addEventListener('mouseleave', scheduleClose);
    const menu = item.querySelector('.mega-menu');
    if (menu) {
      menu.addEventListener('mouseenter', () => { clearTimeout(closeTimer); currentOpen = item; });
      menu.addEventListener('mouseleave', scheduleClose);
    }
  });

  document.addEventListener('mouseleave', closeAll);
  window.addEventListener('resize', () => { if (currentOpen) openMenu(currentOpen); });
})();


/* ---- */


document.getElementById('modalGorusme').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('open');
    document.body.style.overflow = '';
  }
});

function handleGorusmeSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var data = new FormData(form);
  fetch(window.location.pathname, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  }).then(function() {
    document.getElementById('gorusmeForm').style.display = 'none';
    document.getElementById('gorusmeSuccess').style.display = 'block';
  }).catch(function() {
    alert('Bir hata oluştu, lütfen tekrar deneyin.');
  });
}


/* ---- */


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


/* ---- */


document.addEventListener('DOMContentLoaded', function() {
  var btn = document.querySelector('a[href="#avantaj-paketleri"]');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById('avantaj-paketleri');
      if (target) {
        var top = target.getBoundingClientRect().top + window.pageYOffset - 140;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }
});


/* ---- */


var wizardStep=0,wizardAnswers={};
// Hizmet bazlı dinamik soru akışı
var wHizmetler = [
  {icon:'ti-school',label:'Teknoloji Eğitimi',sub:'Bireysel veya kurumsal eğitim programları'},
  {icon:'ti-robot',label:'AI Entegrasyonu',sub:'İş süreçlerine yapay zeka entegrasyonu'},
  {icon:'ti-refresh',label:'Dijital Dönüşüm',sub:'Cloud, ERP, RPA, BPM danışmanlığı'},
  {icon:'ti-users',label:'Uzman Kaynak Çözümleri',sub:'Proje bazlı teknoloji uzmanı'},
];

var wAkisler = {
  'Teknoloji Eğitimi': [
    {q:'Eğitim kimin için?',opts:[
      {icon:'ti-user',label:'Kendim için',sub:'Bireysel kariyer gelişimi'},
      {icon:'ti-building',label:'Ekibim için',sub:'Kurumsal grup eğitimi'},
      {icon:'ti-users',label:'Şirketim için',sub:'Tüm organizasyon'}
    ]},
    {q:'Hangi alanda gelişmek istiyorsunuz?',opts:[
      {icon:'ti-code',label:'Yazılım & Geliştirme',sub:'Python, Java, .NET, Web'},
      {icon:'ti-robot',label:'AI & Veri Bilimi',sub:'ML, ChatGPT, Analitik'},
      {icon:'ti-cloud',label:'Cloud & Altyapı',sub:'Azure, AWS, DevOps'},
      {icon:'ti-shield',label:'Siber Güvenlik',sub:'CEH, CISSP, SOC'},
      {icon:'ti-table',label:'Microsoft & Office',sub:'Excel, Teams, SharePoint'},
      {icon:'ti-chart-bar',label:'Veri & İş Analitiği',sub:'Power BI, SQL, Tableau'}
    ]},
    {q:'Deneyim seviyeniz nedir?',opts:[
      {icon:'ti-seedling',label:'Başlangıç',sub:'Bu alanda yeni başlıyorum'},
      {icon:'ti-trending-up',label:'Orta',sub:'Temel bilgim var, ilerlemek istiyorum'},
      {icon:'ti-award',label:'İleri',sub:'Uzmanlık sertifikası hedefliyorum'}
    ]}
  ],
  'AI Entegrasyonu': [
    {q:'Kuruluşunuzun büyüklüğü nedir?',opts:[
      {icon:'ti-user',label:'KOBİ (1-50 çalışan)',sub:'Küçük ve orta ölçekli işletme'},
      {icon:'ti-building',label:'Orta Ölçekli (51-500)',sub:'Büyüyen kurumsal yapı'},
      {icon:'ti-building-skyscraper',label:'Kurumsal (500+)',sub:'Büyük ölçekli organizasyon'}
    ]},
    {q:'Hangi süreçleri otomatikleştirmek istiyorsunuz?',opts:[
      {icon:'ti-message',label:'Müşteri İletişimi',sub:'Chatbot, destek otomasyonu'},
      {icon:'ti-file-text',label:'Doküman & Veri İşleme',sub:'OCR, analiz, raporlama'},
      {icon:'ti-chart-line',label:'Karar Destek Sistemleri',sub:'Tahminleme, analitik'},
      {icon:'ti-settings-automation',label:'İş Akışı Otomasyonu',sub:'Süreç otomasyonu, RPA'}
    ]},
    {q:'Ne zaman başlamayı planlıyorsunuz?',opts:[
      {icon:'ti-rocket',label:'Hemen (1 ay içinde)',sub:'Hızlı başlamak istiyoruz'},
      {icon:'ti-calendar',label:'Kısa vadede (3 ay)',sub:'Planlama aşamasındayız'},
      {icon:'ti-clock',label:'Uzun vadede (6+ ay)',sub:'Araştırma yapıyoruz'}
    ]}
  ],
  'Dijital Dönüşüm': [
    {q:'Hangi dönüşüm alanında yardıma ihtiyacınız var?',opts:[
      {icon:'ti-cloud-upload',label:'Cloud Geçişi',sub:'Azure, AWS, Google Cloud'},
      {icon:'ti-database',label:'ERP & CRM Modernizasyonu',sub:'SAP, Dynamics, Salesforce'},
      {icon:'ti-settings-automation',label:'Süreç Otomasyonu',sub:'RPA, BPM, iş akışları'},
      {icon:'ti-shield-check',label:'Siber Güvenlik & Uyum',sub:'ISO 27001, KVKK, GDPR'}
    ]},
    {q:'Mevcut teknoloji altyapınız nasıl?',opts:[
      {icon:'ti-alert-triangle',label:'Eski sistemler (Legacy)',sub:'10+ yıllık altyapı'},
      {icon:'ti-git-branch',label:'Karma (Hibrit)',sub:'Eski ve yeni sistemler birlikte'},
      {icon:'ti-cloud',label:'Modern altyapı',sub:'Cloud tabanlı, güncel sistemler'}
    ]},
    {q:'Projenin bütçe aralığı nedir?',opts:[
      {icon:'ti-coin',label:'Keşif Aşaması',sub:'Önce analiz ve planlama'},
      {icon:'ti-cash',label:'Orta ölçekli proje',sub:'Belirli süreçler için'},
      {icon:'ti-businessplan',label:'Kapsamlı dönüşüm',sub:'Tüm organizasyon'}
    ]}
  ],
  'Uzman Kaynak Çözümleri': [
    {q:'Hangi uzmanlık alanına ihtiyacınız var?',opts:[
      {icon:'ti-code',label:'Yazılım Geliştirici',sub:'Full-stack, backend, frontend'},
      {icon:'ti-database',label:'Veri Mühendisi / Bilimci',sub:'ML, analitik, BI'},
      {icon:'ti-cloud',label:'Cloud / DevOps Uzmanı',sub:'Azure, AWS, Kubernetes'},
      {icon:'ti-shield',label:'Siber Güvenlik Uzmanı',sub:'SOC, pentest, uyum'}
    ]},
    {q:'Ne kadar süreliğine ihtiyacınız var?',opts:[
      {icon:'ti-calendar-event',label:'Kısa dönem (1-3 ay)',sub:'Proje bazlı'},
      {icon:'ti-calendar',label:'Orta dönem (3-6 ay)',sub:'Belirli proje süresi'},
      {icon:'ti-infinity',label:'Uzun dönem (6+ ay)',sub:'Sürekli kaynak ihtiyacı'}
    ]},
    {q:'Çalışma modeli nasıl olsun?',opts:[
      {icon:'ti-home',label:'Uzaktan (Remote)',sub:'Tam uzaktan çalışma'},
      {icon:'ti-building',label:'Yerinde (Onsite)',sub:'Ofisimizde çalışma'},
      {icon:'ti-arrows-exchange',label:'Hibrit',sub:'Hem uzak hem yerinde'}
    ]}
  ]
};

var wQ = []; // aktif akış
var wEgitimler={
  'Yazılım & Geliştirme':[{t:'Python ile Veri Analizi',s:'3 Gün · Başlangıç',b:'pop'},{t:'Java SE 11 Developer',s:'5 Gün · Orta',b:'hot'},{t:'.NET Core ile Web Geliştirme',s:'4 Gün · Orta',b:''},{t:'React & Modern Frontend',s:'3 Gün · Orta',b:'new'}],
  'AI & Veri Bilimi':[{t:'Generative AI & ChatGPT Kurumsal',s:'2 Gün · Başlangıç',b:'hot'},{t:'Machine Learning ile Tahminleme',s:'4 Gün · Orta',b:'pop'},{t:'Azure AI Foundry',s:'3 Gün · Orta',b:'new'},{t:'Power BI ile Veri Görselleştirme',s:'2 Gün · Başlangıç',b:''}],
  'Cloud & Altyapı':[{t:'AZ-900: Azure Fundamentals',s:'2 Gün · Başlangıç',b:'pop'},{t:'AZ-104: Azure Administrator',s:'4 Gün · Orta',b:''},{t:'AWS Solutions Architect',s:'5 Gün · Orta',b:'hot'},{t:'DevOps & CI/CD Pipeline',s:'3 Gün · Orta',b:'new'}],
  'Siber Güvenlik':[{t:'Etik Hacking & Sızma Testi',s:'5 Gün · Orta',b:'hot'},{t:'ISO 27001 & KVKK Uyum',s:'2 Gün · Başlangıç',b:'pop'},{t:'SOC Analisti Eğitimi',s:'4 Gün · Orta',b:''},{t:'CISSP Sertifika Hazırlık',s:'5 Gün · İleri',b:'new'}],
  'Microsoft & Office':[{t:'Microsoft Excel İleri',s:'2 Gün · Orta',b:'pop'},{t:'SharePoint Online Yönetimi',s:'3 Gün · Orta',b:''},{t:'Microsoft Teams ile İşbirliği',s:'1 Gün · Başlangıç',b:'new'},{t:'Microsoft 365 Copilot',s:'1 Gün · Başlangıç',b:'hot'}],
  'Veri & İş Analitiği':[{t:'SQL ile Veri Sorgulama',s:'3 Gün · Başlangıç',b:'pop'},{t:'Power BI Desktop',s:'2 Gün · Başlangıç',b:'hot'},{t:'Tableau Veri Analizi',s:'3 Gün · Orta',b:''},{t:'Azure HDInsight & Big Data',s:'4 Gün · İleri',b:'new'}]
};

function openWizard(){wizardStep=0;wizardAnswers={};wQ=[];document.getElementById('wizardOverlay').classList.add('open');document.body.style.overflow='hidden';renderWizard();}
function closeWizard(){document.getElementById('wizardOverlay').classList.remove('open');document.body.style.overflow='';}

function renderSteps(){
  var s=document.getElementById('wizardSteps');s.innerHTML='';
  var total=wQ.length+2;
  for(var i=0;i<total;i++){var d=document.createElement('div');d.className='wstep'+(i<wizardStep?' done':'')+(i===wizardStep?' active':'');s.appendChild(d);}
}

function renderWizard(){
  var body=document.getElementById('wizardBody');
  var btnN=document.getElementById('wBtnNext');
  var btnB=document.getElementById('wBtnBack');
  renderSteps();
  btnB.style.visibility=wizardStep===0?'hidden':'visible';

  // Adım 0: Hizmet seçimi
  if(wizardStep===0){
    document.getElementById('wizardTitle').textContent='Nasıl yardımcı olabiliriz?';
    document.getElementById('wizardSubtitle').textContent='Size en uygun hizmeti bulmak için birkaç soru soracağız';
    btnN.textContent='Devam Et →';
    btnN.disabled=wizardAnswers[0]===undefined;
    var html='<div class="wq-num">1. Adım — Hizmet Seçimi</div><div class="wq-title">Hangi konuda destek almak istiyorsunuz?</div><div class="wopts">';
    wHizmetler.forEach(function(o,i){
      var sel=wizardAnswers[0]===i?' selected':'';
      var ic=sel?'#2563eb':'#9099b5';
      html+='<div class="wopt'+sel+'" onclick="selectHizmet('+i+')">';
      html+='<div class="wopt-ic"><i class="ti '+o.icon+'" style="font-size:17px;color:'+ic+';" aria-hidden="true"></i></div>';
      html+='<div><div class="wopt-label">'+o.label+'</div><div class="wopt-sub">'+o.sub+'</div></div></div>';
    });
    html+='</div>';
    body.innerHTML=html;
    return;
  }

  var qIdx = wizardStep - 1;
  var total = wQ.length;

  if(wizardStep<wQ.length+1){
    document.getElementById('wizardTitle').textContent='Size uygun çözümü bulalım';
    document.getElementById('wizardSubtitle').textContent=(wizardStep)+' / '+(total+1)+' — '+wQ[qIdx].q;
    var q=wQ[qIdx];
    btnN.textContent=wizardStep<wQ.length?'Devam Et →':'Sonuçları Gör →';
    btnN.disabled=wizardAnswers[wizardStep]===undefined;
    var html='<div class="wq-num">Soru '+wizardStep+' / '+wQ.length+'</div><div class="wq-title">'+q.q+'</div><div class="wopts">';
    q.opts.forEach(function(o,i){
      var sel=wizardAnswers[wizardStep]===i?' selected':'';
      var ic=sel?'#2563eb':'#9099b5';
      html+='<div class="wopt'+sel+'" onclick="selectOpt('+i+')">';
      html+='<div class="wopt-ic"><i class="ti '+o.icon+'" style="font-size:17px;color:'+ic+';" aria-hidden="true"></i></div>';
      html+='<div><div class="wopt-label">'+o.label+'</div><div class="wopt-sub">'+o.sub+'</div></div></div>';
    });
    html+='</div>';
    body.innerHTML=html;
  } else {
    var hizmet=wHizmetler[wizardAnswers[0]].label;
    document.getElementById('wizardTitle').textContent='Önerilen Çözümler';
    document.getElementById('wizardSubtitle').textContent='Seçimlerinize göre size özel öneriler';
    btnN.textContent='Uzmanla Görüş →'; btnN.disabled=false;

    var html='<div class="wresults">';

    if(hizmet==='Teknoloji Eğitimi'){
      var alan=wQ[1]&&wizardAnswers[2]!==undefined?wQ[1].opts[wizardAnswers[2]].label:'Yazılım & Geliştirme';
      var liste=wEgitimler[alan]||wEgitimler['Yazılım & Geliştirme'];
      liste.forEach(function(e){
        var bh='';
        if(e.b==='pop')bh='<span class="wresult-badge badge-pop">⭐ Popüler</span>';
        else if(e.b==='new')bh='<span class="wresult-badge badge-new">✦ Yeni</span>';
        else if(e.b==='hot')bh='<span class="wresult-badge badge-hot">🔥 Çok Tercih</span>';
        html+='<div class="wresult-card" onclick="closeWizard();window.location.href=\'egitim-detay.html?title=\'+encodeURIComponent(\''+e.t+'\');">';
        html+='<div class="wresult-ic"><i class="ti ti-certificate" style="font-size:18px;color:#2563eb;" aria-hidden="true"></i></div>';
        html+='<div style="flex:1"><div class="wresult-title">'+e.t+'</div><div class="wresult-sub">'+e.s+'</div></div>'+bh;
        html+='<i class="ti ti-chevron-right" style="font-size:14px;color:#9099b5;" aria-hidden="true"></i></div>';
      });
      html+='</div><div class="wcta"><p>Kurumsal grup indirimleri için:</p>';
      html+='<button class="wcta-btn" onclick="closeWizard();setTimeout(function(){document.getElementById(\'modalGorusme\').classList.add(\'open\');document.body.style.overflow=\'hidden\';},200);">Kurumsal Teklif Al →</button></div>';

    } else if(hizmet==='AI Entegrasyonu'){
      var sure=wQ[2]&&wizardAnswers[3]!==undefined?wQ[2].opts[wizardAnswers[3]].label:'';
      var cozumler=[
        {t:'Akıllı Chatbot & Müşteri Desteği Otomasyonu',s:'Kurumsal bilgi tabanına entegre AI asistan',ic:'ti-message',b:'hot',url:'ai-entegrasyon.html'},
        {t:'Doküman Analizi & RAG Sistemi',s:'Sözleşme, rapor ve belgeleri otomatik işleme',ic:'ti-file-text',b:'pop',url:'ai-entegrasyon.html'},
        {t:'Süreç Otomasyon & Karar Destek',s:'İş akışlarına entegre AI motorları',ic:'ti-settings-automation',b:'new',url:'ai-entegrasyon.html'},
        {t:'Keşif Görüşmesi & İhtiyaç Analizi',s:'Ücretsiz · 1 saat · Uzman ile birebir',ic:'ti-calendar',b:'',url:'#gorusme'}
      ];
      cozumler.forEach(function(e){
        var bh='';
        if(e.b==='pop')bh='<span class="wresult-badge badge-pop">⭐ Popüler</span>';
        else if(e.b==='new')bh='<span class="wresult-badge badge-new">✦ Yeni</span>';
        else if(e.b==='hot')bh='<span class="wresult-badge badge-hot">🔥 Çok Tercih</span>';
        var onclick=e.url==='#gorusme'?'closeWizard();setTimeout(function(){document.getElementById(\'modalGorusme\').classList.add(\'open\');document.body.style.overflow=\'hidden\';},200);':'closeWizard();window.location.href=\''+e.url+'\';';
        html+='<div class="wresult-card" onclick="'+onclick+'">';
        html+='<div class="wresult-ic" style="background:#f0f4ff"><i class="ti '+e.ic+'" style="font-size:18px;color:#2563eb;" aria-hidden="true"></i></div>';
        html+='<div style="flex:1"><div class="wresult-title">'+e.t+'</div><div class="wresult-sub">'+e.s+'</div></div>'+bh;
        html+='<i class="ti ti-chevron-right" style="font-size:14px;color:#9099b5;" aria-hidden="true"></i></div>';
      });
      html+='</div><div class="wcta"><p>AI stratejinizi birlikte belirleyelim:</p>';
      html+='<button class="wcta-btn" onclick="closeWizard();setTimeout(function(){document.getElementById(\'modalGorusme\').classList.add(\'open\');document.body.style.overflow=\'hidden\';},200);">Ücretsiz Keşif Görüşmesi →</button></div>';

    } else if(hizmet==='Dijital Dönüşüm'){
      var alan2=wQ[0]&&wizardAnswers[1]!==undefined?wQ[0].opts[wizardAnswers[1]].label:'';
      var cozumler2=[
        {t:'Durum Tespiti & GAP Analizi',s:'Mevcut altyapı ve süreçlerin kapsamlı değerlendirmesi',ic:'ti-clipboard-list',b:'pop'},
        {t:'Dijital Dönüşüm Yol Haritası',s:'12-36 aylık önceliklendirilmiş strateji planı',ic:'ti-map',b:'hot'},
        {t:'Cloud Geçiş & Altyapı Modernizasyonu',s:'Azure, AWS, Google Cloud geçiş danışmanlığı',ic:'ti-cloud-upload',b:''},
        {t:'ERP & Süreç Modernizasyonu',s:'SAP, Dynamics, RPA entegrasyon projeleri',ic:'ti-refresh',b:'new'}
      ];
      cozumler2.forEach(function(e){
        var bh='';
        if(e.b==='pop')bh='<span class="wresult-badge badge-pop">⭐ Popüler</span>';
        else if(e.b==='new')bh='<span class="wresult-badge badge-new">✦ Yeni</span>';
        else if(e.b==='hot')bh='<span class="wresult-badge badge-hot">🔥 Çok Tercih</span>';
        html+='<div class="wresult-card" onclick="closeWizard();window.location.href=\'dijital-donusum.html\';">';
        html+='<div class="wresult-ic" style="background:#f0fdf4"><i class="ti '+e.ic+'" style="font-size:18px;color:#16a34a;" aria-hidden="true"></i></div>';
        html+='<div style="flex:1"><div class="wresult-title">'+e.t+'</div><div class="wresult-sub">'+e.s+'</div></div>'+bh;
        html+='<i class="ti ti-chevron-right" style="font-size:14px;color:#9099b5;" aria-hidden="true"></i></div>';
      });
      html+='</div><div class="wcta"><p>Dönüşüm yolculuğunuzu birlikte başlatalım:</p>';
      html+='<button class="wcta-btn" onclick="closeWizard();setTimeout(function(){document.getElementById(\'modalGorusme\').classList.add(\'open\');document.body.style.overflow=\'hidden\';},200);">Strateji Görüşmesi Al →</button></div>';

    } else if(hizmet==='Uzman Kaynak Çözümleri'){
      var alan3=wQ[0]&&wizardAnswers[1]!==undefined?wQ[0].opts[wizardAnswers[1]].label:'';
      var sure2=wQ[1]&&wizardAnswers[2]!==undefined?wQ[1].opts[wizardAnswers[2]].label:'';
      var mod=wQ[2]&&wizardAnswers[3]!==undefined?wQ[2].opts[wizardAnswers[3]].label:'';
      var uzmanlar=[
        {t:'Yazılım Geliştirici (Full-Stack)',s:'React, Node.js, .NET · '+sure2,ic:'ti-code',b:'pop'},
        {t:'Cloud & DevOps Mühendisi',s:'Azure, AWS, Kubernetes · '+sure2,ic:'ti-cloud',b:'hot'},
        {t:'Veri Mühendisi / ML Uzmanı',s:'Python, Spark, ML · '+sure2,ic:'ti-database',b:''},
        {t:'Siber Güvenlik Uzmanı',s:'SOC, Pentest, ISO 27001 · '+sure2,ic:'ti-shield',b:'new'}
      ];
      uzmanlar.forEach(function(e){
        var bh='';
        if(e.b==='pop')bh='<span class="wresult-badge badge-pop">⭐ Popüler</span>';
        else if(e.b==='new')bh='<span class="wresult-badge badge-new">✦ Yeni</span>';
        else if(e.b==='hot')bh='<span class="wresult-badge badge-hot">🔥 Çok Tercih</span>';
        html+='<div class="wresult-card" onclick="closeWizard();window.location.href=\'uzman-kadro.html\';">';
        html+='<div class="wresult-ic" style="background:#faf5ff"><i class="ti '+e.ic+'" style="font-size:18px;color:#7c3aed;" aria-hidden="true"></i></div>';
        html+='<div style="flex:1"><div class="wresult-title">'+e.t+'</div><div class="wresult-sub">'+e.s+'</div></div>'+bh;
        html+='<i class="ti ti-chevron-right" style="font-size:14px;color:#9099b5;" aria-hidden="true"></i></div>';
      });
      html+='</div><div class="wcta"><p>İhtiyacınıza özel uzman profillerini görelim:</p>';
      html+='<button class="wcta-btn" onclick="closeWizard();setTimeout(function(){document.getElementById(\'modalGorusme\').classList.add(\'open\');document.body.style.overflow=\'hidden\';},200);">Uzman Talep Formu →</button></div>';
    }

    body.innerHTML=html;
  }
}

function selectHizmet(i){
  wizardAnswers[0]=i;
  var hizmet=wHizmetler[i].label;
  wQ=wAkisler[hizmet]||[];
  document.getElementById('wBtnNext').disabled=false;
  renderWizard();
}
function selectOpt(i){wizardAnswers[wizardStep]=i;document.getElementById('wBtnNext').disabled=false;renderWizard();}
function wizardNext(){
  if(wizardStep===wQ.length+1){closeWizard();setTimeout(function(){document.getElementById('modalGorusme').classList.add('open');document.body.style.overflow='hidden';},200);return;}
  if(wizardAnswers[wizardStep]===undefined)return;
  wizardStep++;renderWizard();
}
function wizardBack(){if(wizardStep>0){wizardStep--;renderWizard();}}
document.getElementById('wizardOverlay').addEventListener('click',function(e){if(e.target===this)closeWizard();});


/* ---- */


function setLang(lang) {
  localStorage.setItem('bnx_lang', lang);
  document.querySelectorAll('[data-tr]').forEach(function(el) {
    if(lang === 'en') {
      el.textContent = el.getAttribute('data-en') || el.textContent;
    } else {
      el.textContent = el.getAttribute('data-tr') || el.textContent;
    }
  });
  var btnTR = document.getElementById('btnTR');
  var btnEN = document.getElementById('btnEN');
  if(btnTR && btnEN) {
    btnTR.classList.toggle('active', lang === 'tr');
    btnEN.classList.toggle('active', lang === 'en');
  }
  // html lang attribute
  document.documentElement.lang = lang;
}

// Sayfa açılışında tercih uygula
(function(){
  var saved = localStorage.getItem('bnx_lang') || 'tr';
  if(saved === 'en') setLang('en');
})();
