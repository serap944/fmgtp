// menu.js - Menü Modülü (SADELEŞTİRİLMİŞ)

export default function initMenu() {
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
}