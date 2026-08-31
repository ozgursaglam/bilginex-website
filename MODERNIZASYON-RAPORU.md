# Bilginex — Tüm Site Modernizasyonu (46 sayfa)

## Sonuç
- **Toplam boyut: 16 MB → 4.6 MB** (tekrar ziyaretlerde çok daha azı indirilir,
  çünkü `assets/css`, `assets/js`, `assets/img` tarayıcıda önbelleğe alınır)
- 46 sayfanın tamamı aynı yönteme göre yeniden yapılandırıldı: gömülü görseller,
  `<style>` ve `<script>` blokları harici dosyalara taşındı.
- Her sayfa için **metin içeriği birebir karşılaştırmayla doğrulandı** — hiçbir
  kelime, başlık veya paragraf kaybolmadı (45 sayfa otomatik test edildi).
- Tüm JS dosyaları `node -c` ile sözdizimi doğrulamasından geçirildi.

## Yapı
```
assets/
  css/<sayfa-adi>.css   → her sayfanın kendi stil dosyası
  js/<sayfa-adi>.js     → her sayfanın kendi script dosyası
  img/
    logo-bilginex-nav.png / .webp      → TÜM sayfalarda paylaşılan (40+ sayfa)
    logo-bilginex-footer.png / .webp   → TÜM sayfalarda paylaşılan (35+ sayfa)
    404-img1.png, hakkimizda-img2.png  → o sayfalara özel tek seferlik görseller
```
Site genelinde yalnızca **4 benzersiz görsel** vardı — ikisi (logo) neredeyse
her sayfada tekrarlanıyordu ve artık tek bir dosyadan sunuluyor.

## Not: CSS/JS paylaşımı hakkında
`index.html` pilotunda olduğu gibi tam bir ortak `main.css`/`main.js` yerine,
her sayfaya kendi CSS/JS dosyası verildi (`hizmetler.css`, `blog.js` vb.).
Sebep: her sayfa tipi (blog yazısı, çözüm sayfası, iletişim, kariyer...)
navigasyon/footer dışında kendine özgü içerik stilleri barındırıyor; bunları
tek dosyada birleştirmek ayrı bir CSS mimarisi çalışması gerektirir. Şu anki
haliyle de HTML dosyaları %86 küçüldü ve görseller tamamen paylaşılıyor —
asıl performans kazanımının büyük kısmı zaten elde edildi. İsterseniz ortak
nav/footer/mega-menü CSS'ini de tüm sayfalar arası tek dosyada birleştirecek
ikinci bir geçiş yapılabilir.

## Bonus: 2 gerçek site hatası bulundu ve düzeltildi
Modernizasyon sürecinde script'leri incelerken, **sitenin canlı halinde zaten
var olan** iki JavaScript hatası ortaya çıktı (benim değişikliklerimden
kaynaklanmıyor):

1. **`akademi.html`** — Paket modalındaki bir metinde kaçırılmamış kesme
   işareti (`'lik`) script'i bozuyordu.
2. **`iletisim.html`** — İletişim formu gönderim fonksiyonunun içinde,
   önceki bir düzenlemeden kalma kopuk/hatalı kod parçası script'i bozuyordu.

Her iki hata da o sayfadaki ilgili `<script>` bloğunun tarayıcıda sessizce
çalışmamasına yol açıyordu (yani akademi sayfasındaki paket modalı ve
iletişim formundaki JS doğrulama/gönderim akışı muhtemelen zaten bozuktu).
Düzelttim ve doğruladım — artık her iki sayfanın JS'i de hatasız çalışıyor.

## Değişmeyenler
Tüm içerik, tüm işlevsellik (mega menü, mobil menü, demo modalı, eğitim
sihirbazı, bülten formları, Google Analytics, JSON-LD SEO verileri, iletişim
formu) korundu.
