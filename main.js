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
   3) SERVICES SLIDER (Scroll-based) - NO BLANK SPACE
========================= */
(function () {
  const section = document.querySelector(".services-section");
  if (!section) return;

  const windowEl = section.querySelector(".slider-window");
  const track = section.querySelector(".slider-track");
  const cards = section.querySelectorAll(".service-card");
  const prevBtn = section.querySelector(".slider-arrow.prev");
  const nextBtn = section.querySelector(".slider-arrow.next");

  if (!windowEl || !track || !cards.length || !prevBtn || !nextBtn) return;

  // احسب step = عرض الكارت + gap الحقيقي
  function getStep() {
    const cardW = cards[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || "0") || 0;
    return cardW + gap;
  }

  nextBtn.addEventListener("click", () => {
    windowEl.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    windowEl.scrollBy({ left: -getStep(), behavior: "smooth" });
  });
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








document.addEventListener("DOMContentLoaded", () => {
  const tracks = document.querySelectorAll(".services-marquee-track");
  if (!tracks.length) return;

  function fillTrack(track) {
    // خدي النسخة الأصلية مرة واحدة بس
    if (!track.dataset.baseHtml) {
      track.dataset.baseHtml = track.innerHTML;
    } else {
      track.innerHTML = track.dataset.baseHtml;
    }

    const target = window.innerWidth * 2; // غطي 2x عرض الشاشة (مهم)
    let safety = 0;

    // كرري الصور الموجودة لحد ما العرض يكفي
    while (track.scrollWidth < target && safety < 10) {
      track.innerHTML += track.dataset.baseHtml;
      safety++;
    }
  }

  function init() {
    tracks.forEach(fillTrack);
  }

  init();
  window.addEventListener("resize", init);
});