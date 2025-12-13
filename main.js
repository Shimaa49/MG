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
