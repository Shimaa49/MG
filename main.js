console.log("✅ main.js اتحمّل");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM جاهز");

  /* =========================
     1) MOBILE MENU (Drawer)
  ========================= */
  (function initMenu() {
    const body = document.body;
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".top-nav");

    if (!menuBtn || !nav) return;

    // Overlay
    let overlay = document.querySelector(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);
    }

    // Close button
    let closeBtn = nav.querySelector(".menu-close");
    if (!closeBtn) {
      closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "menu-close";
      closeBtn.setAttribute("aria-label", "Close menu");
      closeBtn.textContent = "×";
      nav.prepend(closeBtn);
    }

    // A11y
    menuBtn.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");

    const openMenu = () => {
      body.classList.add("menu-open");
      menuBtn.setAttribute("aria-expanded", "true");
      nav.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";

      const firstFocusable = nav.querySelector("a, button");
      firstFocusable?.focus();
    };

    const closeMenu = () => {
      body.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
      nav.setAttribute("aria-hidden", "true");
      body.style.overflow = "";
      menuBtn.focus();
    };

    const toggleMenu = () => {
      body.classList.contains("menu-open") ? closeMenu() : openMenu();
    };

    menuBtn.addEventListener("click", toggleMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && body.classList.contains("menu-open")) {
        closeMenu();
      }
    });

    nav.addEventListener("click", (e) => {
      const clickedLink = e.target.closest("a");
      if (clickedLink) closeMenu();
    });
  })();


  /* =========================
     2) COUNTERS
  ========================= */
  (function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return; // ✅ مهم جدًا

    const options = { root: null, threshold: 0.4 };

    const startCounting = (entries, observer) => {
      if (!entries[0].isIntersecting) return;

      counters.forEach((counter) => {
        const target = Number(counter.getAttribute("data-target")) || 0;
        let current = 0;

        const steps = 100;
        const increment = target / steps;
        const speed = 20;

        const timer = setInterval(() => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
          } else {
            counter.textContent = target;
            clearInterval(timer);
          }
        }, speed);
      });

      observer.disconnect(); // ✅ عشان مايعيدش العد كل شوية
    };

    const observer = new IntersectionObserver(startCounting, options);
    observer.observe(counters[0]);
  })();


  /* =========================
     3) SERVICES SLIDER (Prev/Next)
  ========================= */
  (function initServicesSlider() {
    const track = document.querySelector(".slider-track");
    const cards = document.querySelectorAll(".service-card");
    const prevBtn = document.querySelector(".slider-arrow.prev");
    const nextBtn = document.querySelector(".slider-arrow.next");

    // ✅ لو أي عنصر ناقص، متشتغلش
    if (!track || !cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let cardsPerView = 3;

    function updateCardsPerView() {
      const width = window.innerWidth;
      if (width < 600) cardsPerView = 1;
      else if (width < 900) cardsPerView = 2;
      else cardsPerView = 3;
    }

    function updateSlider() {
      updateCardsPerView();
      const gap = 12;
      const cardWidth = cards[0].offsetWidth + gap;
      const maxIndex = Math.max(0, cards.length - cardsPerView);

      if (currentIndex > maxIndex) currentIndex = maxIndex;

      const offset = currentIndex * cardWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener("click", () => {
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();
  })();


  /* =========================
     4) VIDEO BTN (Navbar)
  ========================= */
  (function initVideoBtn() {
    const videoBtn = document.getElementById("videoNavBtn");
    const videoBox = document.getElementById("homeVideoBox");

    if (!videoBtn || !videoBox) return; // ✅ مهم

    videoBtn.addEventListener("click", () => {
      videoBox.classList.toggle("show");

      if (videoBox.classList.contains("show")) {
        videoBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  })();


  /* =========================
     5) IMAGES GRID SHUFFLE (تبديل أماكن الصور)
  ========================= */
  (function initImagesShuffle() {
    const grid = document.querySelector(".images-grid");
    if (!grid) return;

    const INTERVAL = 2000;

    function shuffleOnce() {
      const items = Array.from(grid.children);

      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      grid.append(...items);
    }

    shuffleOnce();
    setInterval(shuffleOnce, INTERVAL);
  })();
});

///////too slider//////document.addEventListener("DOMContentLoaded", () => {
 document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".images-viewport");
  const track = document.querySelector(".images-track");

  if (!viewport || !track) return;

  let x = 0;
  const step = 2;       // سرعة الحركة (زوديها/قلليها)
  const interval = 20;  // سلاسة الحركة

  function tick() {
    const maxOffset = track.scrollWidth - viewport.clientWidth;

    // لو مفيش سكرول أصلاً
    if (maxOffset <= 0) return;

    x += step;

    // ✅ هنا الحل: لما نوصل للآخر… نرجع لأول
    if (x >= maxOffset) x = 0;

    // ✅ Clamping (احتياطي ضد الفراغ)
    if (x > maxOffset) x = maxOffset;

    track.style.transform = `translateX(-${x}px)`;
  }

  setInterval(tick, interval);
});

////////////////PARTERRRR///////////////////////

// ===============================
// Partners Infinite Slider (SAFE)
// ===============================
(function partnersSlider() {

  const slider = document.getElementById("partnersSliderJS");
  const track  = document.getElementById("partnersTrackJS");

  if (!slider || !track) return; // أمان لو الصفحة مفيهاش السكشن

  // duplicate cards
  track.innerHTML += track.innerHTML;

  let posX = 0;
  const speedPartners = 0.6;
  let isPaused = false;

  function getLimit() {
    return track.scrollWidth / 2;
  }

  function movePartners() {
    if (!isPaused) {
      posX -= speedPartners;

      if (Math.abs(posX) >= getLimit()) {
        posX = 0;
      }

      track.style.transform = `translateX(${posX}px)`;
    }
    requestAnimationFrame(movePartners);
  }

  slider.addEventListener("mouseenter", () => isPaused = true);
  slider.addEventListener("mouseleave", () => isPaused = false);

  window.addEventListener("resize", () => posX = 0);

  movePartners();

})();