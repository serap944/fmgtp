// --- BANNER SCRIPT ---
// Bu dosya banner arkaplan resimlerini ve yazılarını otomatik olarak değiştirir
// ve sayfa açıldığında resimlerin geç yüklenme sorununu önlemek için preload kullanır.

let sira = 0;          // Şu anda gösterilen resmin/yazının sıra numarası
let intervalID;         // setInterval ID'si — gerekirse durdurmak için

// Bu fonksiyon script.js tarafından çağrılacak
export default function initBanner() {

    // Banner divini seçiyoruz (arkaplan resmi bu div üzerinden değişecek)
    const banner = document.querySelector(".banner");

    // Banner yazısı elementini seçiyoruz (slogan burada gösterilecek)
    const bannerYazi = document.getElementById("banner-yazi");

    // Eğer banner veya yazı elementleri yoksa fonksiyon çalışmayı durdurur
    if (!banner || !bannerYazi) return;

    // Banner'da kullanılacak resim dosyaları
    const resimler = [
        "images/banner1.jpg",
        "images/banner2.jpg",
        "images/banner3.jpg",
        "images/banner4.jpg",
        "images/banner5.jpg"
    ];

    // Resimlerle eş zamanlı değişecek sloganlar
    const cumleler = [
        "Dayanıklı ve Uzun Ömürlü Asfalt Çözümleri",
        "Modern Ekipmanlarla Kaliteli Uygulama",
        "Yollarınıza Değer Katıyoruz",
        "Her projede sağlamlık, estetik ve mühendislik kalitesini bir araya getiriyoruz.",
        "İş ortaklarımızın memnuniyeti en önemli sütunumuzdur"
    ];

    /* =====================================================
       📌 ÖN YÜKLEME (PRELOAD)
       Tarayıcıya resimleri önceden belleğe aldırıyoruz
       Böylece sayfa açıldığında resimler hemen görünür
    ===================================================== */
    resimler.forEach(src => {
        const img = new Image(); // yeni img objesi oluştur
        img.src = src;            // tarayıcı belleğe alır (ön yükleme)
    });

    /* =====================================================
       📌 SAYFA AÇILIR AÇILMAZ İLK GÖRÜNTÜYÜ GÖSTER
    ===================================================== */
    banner.style.backgroundImage = `url("${resimler[0]}")`;  // ilk resim
    bannerYazi.textContent = cumleler[0];                     // ilk slogan

    /* =====================================================
       📌 RESİM + YAZI GEÇİŞ FONKSİYONU
       Her geçişte:
       1. Yazı önce kaybolur (opacity = 0)
       2. 700ms sonra resim ve yazı değişir
       3. Yazı tekrar görünür (fade in)
    ===================================================== */
    function degistir() {

        bannerYazi.style.opacity = 0; // yazıyı görünmez yap

        setTimeout(() => {

            sira = (sira + 1) % resimler.length; // sırayı artır, sonrasında başa dön

            banner.style.backgroundImage = `url("${resimler[sira]}")`; // arkaplan resmi değiştir
            bannerYazi.textContent = cumleler[sira];                     // slogan değiştir
            bannerYazi.style.opacity = 1;                                // yazıyı görünür yap

        }, 700); // 700ms fade efekti
    }

    /* =====================================================
       📌 OTOMATİK GEÇİŞ
       4 saniyede bir degistir() fonksiyonu çalışır
    ===================================================== */
    intervalID = setInterval(degistir, 4000);
}
