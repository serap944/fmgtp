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