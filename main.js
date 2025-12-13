document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".top-nav");

  // لو مش موجودين، اخرج بهدوء
  if (!menuBtn || !nav) return;

  // أنشئ overlay لو مش موجود
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }

  // أنشئ زرار قفل داخل المينو لو مش موجود (اختياري)
  let closeBtn = nav.querySelector(".menu-close");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "menu-close";
    closeBtn.setAttribute("aria-label", "Close menu");
    closeBtn.textContent = "×";
    nav.prepend(closeBtn);
  }

  // Accessibility
  menuBtn.setAttribute("aria-expanded", "false");
  nav.setAttribute("aria-hidden", "true");

  const openMenu = () => {
    body.classList.add("menu-open");
    menuBtn.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");

    // منع سكرول الخلفية
    body.style.overflow = "hidden";

    // فوكس على أول لينك داخل المينو
    const firstLink = nav.querySelector("a, button");
    if (firstLink) firstLink.focus();
  };

  const closeMenu = () => {
    body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");

    body.style.overflow = "";

    // رجّع الفوكس لزرار المينو
    menuBtn.focus();
  };

  const toggleMenu = () => {
    body.classList.contains("menu-open") ? closeMenu() : openMenu();
  };

  // فتح/قفل بالزرار
  menuBtn.addEventListener("click", toggleMenu);

  // قفل بزرار X
  closeBtn.addEventListener("click", closeMenu);

  // قفل بالضغط على الخلفية (overlay)
  overlay.addEventListener("click", closeMenu);

  // قفل بزر ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  // لما اضغط على أي لينك جوه المينو اقفلها (مفيد في الموبايل)
  nav.addEventListener("click", (e) => {
    const clickedLink = e.target.closest("a");
    if (!clickedLink) return;
    closeMenu();
  });
});

 
 const counters = document.querySelectorAll('.counter');

// نعمل observer علشان يبدأ العد لما يظهر القسم في الشاشة
const options = {
  root: null,
  threshold: 0.4
};

function startCounting(entry) {
  if (entry[0].isIntersecting) {
    counters.forEach(counter => {
      let target = +counter.getAttribute('data-target');
      let current = 0;

      let increment = target / 100; // السرعة
      let speed = 20;               // الوقت بين كل خطوة

      let update = setInterval(() => {
        if (current < target) {
          current += increment;
          counter.innerText = Math.ceil(current);
        } else {
          counter.innerText = target;
          clearInterval(update);
        }
      }, speed);
    });
  }
}

const observer = new IntersectionObserver(startCounting, options);

// هنراقب أول كاونتر بس
observer.observe(counters[0]);

// نتأكد إن الـ DOM جاهز
window.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.slider-track');
  const cards = document.querySelectorAll('.service-card');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');

  let currentIndex = 0;
  let cardsPerView = 3;

  function updateCardsPerView() {
    const width = window.innerWidth;
    if (width < 600) {
      cardsPerView = 1;
    } else if (width < 900) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }

  function updateSlider() {
    if (!cards.length) return;
    updateCardsPerView();
    const cardWidth = cards[0].offsetWidth + 12; // عرض الكارت + الـ gap
    const offset = currentIndex * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);

  // أول تشغيل
  updateSlider();
});
 

  const videoBtn = document.getElementById("videoNavBtn");
  const videoBox = document.getElementById("homeVideoBox");

  videoBtn.addEventListener("click", () => {
    // إظهر الفيديو لو كان مستخبي
    videoBox.classList.add("show");

    // Scroll ناعم لحد الفيديو
    videoBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  videoBtn.addEventListener("click", () => {
  videoBox.classList.toggle("show");

  if (videoBox.classList.contains("show")) {
    videoBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
