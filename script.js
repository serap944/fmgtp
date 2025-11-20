// script.js — TEMİZ VE DÜZELTİLMİŞ SÜRÜM

// Importlar (aynı ismi iki kez kullanamazsın)
import initMenu from './js/menu.js'; //"js klasörünün içinde menu.js diye bir dosya var ve içinden initMenu adlı fonksiyonu alıyorum."
import initBanner from './js/banner.js';

document.addEventListener('DOMContentLoaded', function () {

    /* ======================
       HEADER YÜKLE
    ====================== */
    fetch('header.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;

            // Menü elemanları header içinde olduğu için, yüklenince çalıştır
            initMenu();
        })
        .catch(err => console.error("Header yüklenemedi:", err));


    /* ======================
       FOOTER YÜKLE
    ====================== */
    fetch('footer.html')
        .then(r => r.text())
        .then(html => {
            // footer.html diye ID olmaz — doğrusu "footer"
            document.getElementById('footer').innerHTML = html;
        })
        .catch(err => console.error("Footer yüklenemedi:", err));


    /* ======================
       BANNER FONKSIYONU
    ====================== */
    initBanner(); // banner.js var ise çalışır


    /* ======================
       SLIDER BAŞLANGIÇ
    ====================== */
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

    function getVisibleCards() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    function getTotalSlides() {
        const visible = getVisibleCards();
        return Math.max(cards.length - visible + 1, 1);
    }

    function updateSlider() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getTotalSlides() - 1;

        updateDots();
    }

    function updateDots() {
        sliderDots.innerHTML = "";
        const total = getTotalSlides();
        for (let i = 0; i < total; i++) {
            const dot = document.createElement("div");
            dot.classList.add("slider-dot");
            if (i === currentIndex) dot.classList.add("active");

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateSlider();
            });

            sliderDots.appendChild(dot);
        }
    }

    function touchStart(i) {
        return e => {
            currentIndex = i;
            startPos = getPos(e);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            sliderTrack.classList.add("grabbing");
        };
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentPos = getPos(e);
        currentTranslate = prevTranslate + currentPos - startPos;
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;

        const moved = currentTranslate - prevTranslate;
        const cardWidth = cards[0].getBoundingClientRect().width;

        if (moved < -cardWidth * 0.2 && currentIndex < getTotalSlides() - 1) currentIndex++;
        if (moved > cardWidth * 0.2 && currentIndex > 0) currentIndex--;

        setPositionByIndex();
        sliderTrack.classList.remove("grabbing");
    }

    function getPos(e) {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

    function animation() {
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }

    function setPositionByIndex() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
        updateDots();
    }

    cards.forEach((card, index) => {
        card.addEventListener("touchstart", touchStart(index));
        card.addEventListener("touchmove", touchMove);
        card.addEventListener("touchend", touchEnd);

        card.addEventListener("mousedown", touchStart(index));
        card.addEventListener("mousemove", touchMove);
        card.addEventListener("mouseup", touchEnd);
        card.addEventListener("mouseleave", touchEnd);
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < getTotalSlides() - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener("resize", updateSlider);

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });

    updateSlider(); // İlk yükleme
});


/* ======================
   SAYFA TAMAMEN YÜKLENDİ
====================== */
window.addEventListener('load', () => {
    console.log("Sayfa tamamen yüklendi!");
});
