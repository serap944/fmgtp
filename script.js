
// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const servicesDropdown = document.getElementById('services-dropdown');
    const servicesLink = document.querySelector('.nav-item:nth-child(3) .nav-link');

    // Hamburger menü aç/kapa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Mobilde Hizmetler alt menüsünü aç/kapa
    servicesLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            servicesDropdown.classList.toggle('active');

            // Alt menü ikonunu değiştir
            const icon = servicesLink.querySelector('i');
            if (servicesDropdown.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Ekran boyutu değiştiğinde menüyü sıfırla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            servicesDropdown.classList.remove('active');

            // İkonu eski haline getir
            const icon = servicesLink.querySelector('i');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });


    // Banner değişkenleri
    const resimler = [
        "images/banner1.jpg",
        "images/banner2.jpg",
        "images/banner3.jpg",
        "images/banner4.jpg",
        "images/banner5.jpg"
    ];
    const cumleler = [
        "Dayanıklı ve Uzun Ömürlü Asfalt Çözümleri",
        "Modern Ekipmanlarla Kaliteli Uygulama",
        "Yollarınıza Değer Katıyoruz",
        "Her projede sağlamlık, estetik ve mühendislik kalitesini bir araya getiriyoruz.",
        "İş ortaklarımızın memnuniyeti en önemli sütunumuzdur"
    ];

    let sira = 0;
    let bannerInterval;

    const banner = document.querySelector(".banner");
    const bannerYazi = document.getElementById("banner-yazi");

    function yazigecis() {
        if (!bannerYazi) return;

        bannerYazi.style.opacity = 0;

        setTimeout(() => {
            sira = (sira + 1) % resimler.length;
            if (banner) {
                banner.style.backgroundImage = `url("${resimler[sira]}")`;
            }
            bannerYazi.textContent = cumleler[sira];
            bannerYazi.style.opacity = 1;
        }, 800);
    }

    // Banner elementleri kontrolü
    if (banner && bannerYazi) {
        // İlk geçişi 4 saniye sonra başlat
        setTimeout(() => {
            bannerInterval = setInterval(yazigecis, 4000);
        }, 4000);
    }

    // Sayfa görünürlüğü değiştiğinde interval'i kontrol et
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            clearInterval(bannerInterval);
        } else {
            // Sayfa görünür olduğunda interval'i tekrar başlat
            if (banner && bannerYazi) {
                clearInterval(bannerInterval);
                bannerInterval = setInterval(yazigecis, 4000);
            }
        }
    });
});