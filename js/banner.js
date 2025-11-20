// --- BANNER SCRIPT ---
// Bu dosya banner görüntüsünün ve yazısının otomatik olarak değişmesini sağlar.

// Kaçıncı sıranın gösterildiğini tutar
let sira = 0;

// setInterval id'si — gerekirse durdurmak için
let intervalID;

// Bu dosyayı dışarı aktarıyoruz, script.js içinden çağırılacak
export default function initBanner() {

    // Banner divini seç (arkaplan resmini değiştiriyoruz)
    const banner = document.querySelector(".banner");

    // Banner yazısını seç (değişen slogan buraya yazılacak)
    const bannerYazi = document.getElementById("banner-yazi");

    // Eğer banner veya yazı bulunamazsa çalışmayı durdur (hata engelleme)
    if (!banner || !bannerYazi) return;

    // Değişecek banner resimleri
    const resimler = [
        "images/banner1.jpg",
        "images/banner2.jpg",
        "images/banner3.jpg",
        "images/banner4.jpg",
        "images/banner5.jpg"
    ];

    // Resimlerle eş zamanlı değişecek cümleler
    const cumleler = [
        "Dayanıklı ve Uzun Ömürlü Asfalt Çözümleri",
        "Modern Ekipmanlarla Kaliteli Uygulama",
        "Yollarınıza Değer Katıyoruz",
        "Her projede sağlamlık, estetik ve mühendislik kalitesini bir araya getiriyoruz.",
        "İş ortaklarımızın memnuniyeti en önemli sütunumuzdur"
    ];

    // SAYFA AÇILDIĞINDA İLK RESİM VE YAZIYI AYARLA
    banner.style.backgroundImage = `url("${resimler[0]}")`;
    bannerYazi.textContent = cumleler[0];

    // --- RESİM + YAZI GEÇİŞ FONKSİYONU ---
    function degistir() {

        // Yazıyı görünmez yap — yumuşak geçiş efekti
        bannerYazi.style.opacity = 0;

        // 700ms sonra resim ve yazıyı değiştir
        setTimeout(() => {

            // Bir sonraki sıraya geç, sonuncudan sonra başa dön
            sira = (sira + 1) % resimler.length;

            // Arkaplan resmini değiştir
            banner.style.backgroundImage = `url("${resimler[sira]}")`;

            // Yazıyı değiştir
            bannerYazi.textContent = cumleler[sira];

            // Yazıyı görünür yap — fade in
            bannerYazi.style.opacity = 1;

        }, 700);
    }

    // --- OTOMATİK DEĞİŞİM ---
    // degistir() her 4 saniyede bir çalışacak
    intervalID = setInterval(degistir, 4000);
}
