// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function () {
    // --- BANNER SCRIPT BAŞLANGICI ---
    let sira = 0;
    const banner = document.querySelector(".banner");
    const bannerYazi = document.getElementById("banner-yazi");
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

    function yazigecis() {
        if (!bannerYazi || !banner) return;

        bannerYazi.style.opacity = 0;

        setTimeout(() => {
            sira = (sira + 1) % resimler.length;
            banner.style.backgroundImage = `url("${resimler[sira]}")`;
            bannerYazi.textContent = cumleler[sira];
            bannerYazi.style.opacity = 1;
        }, 800);
    }

    // Banner başlatma
    if (banner && bannerYazi) {
        // İlk görsel ve yazıyı ayarla
        banner.style.backgroundImage = `url("${resimler[0]}")`;
        bannerYazi.textContent = cumleler[0];

        // İlk geçişi 4 saniye sonra başlat
        setTimeout(() => {
            setInterval(yazigecis, 4000);
        }, 3000);
    }
    // --- BANNER SCRIPT SONU ---

    // --- MENÜ SCRIPT BAŞLANGICI ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const servicesDropdown = document.getElementById('services-dropdown');
    const servicesLink = document.querySelector('.nav-item:nth-child(3) .nav-link');

    // Hamburger menü aç/kapa
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Mobilde Hizmetler alt menüsünü aç/kapa
    if (servicesLink && servicesDropdown) {
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
    }

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
        if (hamburger && navMenu) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                // Mobilde services dropdown'ı da kapat
                if (servicesDropdown && window.innerWidth <= 768) {
                    servicesDropdown.classList.remove('active');
                    // İkonu eski haline getir
                    if (servicesLink) {
                        const icon = servicesLink.querySelector('i');
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }
            }
        }
    });

    // Ekran boyutu değiştiğinde menüyü sıfırla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            if (servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }

            // İkonu eski haline getir
            if (servicesLink) {
                const icon = servicesLink.querySelector('i');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    });
    // --- MENÜ SCRIPT SONU ---


    // SLAYT GEÇİŞİ BAŞLANGIÇ--
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const cards = document.querySelectorAll('.karta');

    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Ekran boyutuna göre görüntülenecek kart sayısını belirle
    function getVisibleCards() {
        if (window.innerWidth <= 640) return 1; // Mobil
        if (window.innerWidth <= 768) return 2; // Küçük tablet
        if (window.innerWidth <= 1024) return 3; // Tablet
        return 4; // Web
    }

    // Toplam slayt sayısını hesapla
    function getTotalSlides() {
        const visibleCards = getVisibleCards();
        return Math.max(cards.length - visibleCards + 1, 1);
    }

    // Slider'ı güncelle
    function updateSlider() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const visibleCards = getVisibleCards();

        // Mobilde yumuşak kaydırma, web'de anlık geçiş
        if (window.innerWidth <= 640) {
            sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        } else {
            sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        // Buton durumlarını güncelle
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getTotalSlides() - 1;

        // Noktaları güncelle
        updateDots();
    }

    // Noktaları oluştur ve güncelle
    function updateDots() {
        sliderDots.innerHTML = '';
        const totalSlides = getTotalSlides();

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            sliderDots.appendChild(dot);
        }
    }

    // Dokunmatik olayları
    function touchStart(index) {
        return function (event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;

            animationID = requestAnimationFrame(animation);
            sliderTrack.classList.add('grabbing');
        };
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;
        const cardWidth = cards[0].getBoundingClientRect().width;

        // Eğer yeterince kaydırıldıysa, bir sonraki veya önceki slayta geç
        if (movedBy < -cardWidth * 0.2 && currentIndex < getTotalSlides() - 1) {
            currentIndex += 1;
        }

        if (movedBy > cardWidth * 0.2 && currentIndex > 0) {
            currentIndex -= 1;
        }

        setPositionByIndex();
        sliderTrack.classList.remove('grabbing');
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        updateDots();
    }

    // Her kart için dokunmatik olaylarını ekle
    cards.forEach((card, index) => {
        // Touch events
        card.addEventListener('touchstart', touchStart(index));
        card.addEventListener('touchmove', touchMove);
        card.addEventListener('touchend', touchEnd);

        // Mouse events
        card.addEventListener('mousedown', touchStart(index));
        card.addEventListener('mousemove', touchMove);
        card.addEventListener('mouseup', touchEnd);
        card.addEventListener('mouseleave', touchEnd);
    });

    // Buton olayları
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < getTotalSlides() - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Pencere boyutu değiştiğinde slider'ı güncelle
    window.addEventListener('resize', updateSlider);

    // Klavye kontrolleri
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // İlk yüklemede slider'ı başlat
    updateSlider();
    // --SLAYT GEÇİŞ SONU



});

// Sayfa tamamen yüklendiğinde çalışacak ekstra fonksiyonlar
window.addEventListener('load', function () {
    // İsteğe bağlı: Sayfa tam yüklendikten sonra çalışacak kodlar
    console.log('Sayfa tamamen yüklendi');
});