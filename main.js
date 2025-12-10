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
/////////////slider-project////////////////
// كل مجموعات الصور
const slides = {
  1: {
    leftTop: "image/const4.png",
    leftBottom: "image/const3.png",
    center: "image/const-bg.png",
    rightBig: "image/const2.png",
    rightSmall: "image/const1.png",
    rightBottom: "image/const6.png"
  },
  2: {
    leftTop: "image/slide2-1.png",
    leftBottom: "image/slide2-2.png",
    center: "image/slide2-3.png",
    rightBig: "image/slide2-4.png",
    rightSmall: "image/slide2-5.png",
    rightBottom: "image/slide2-6.png"
  },
  3: {
    leftTop: "image/slide3-1.png",
    leftBottom: "image/slide3-2.png",
    center: "image/slide3-3.png",
    rightBig: "image/slide3-4.png",
    rightSmall: "image/slide3-5.png",
    rightBottom: "image/slide3-6.png"
  },
  4: {
    leftTop: "image/slide4-1.png",
    leftBottom: "image/slide4-2.png",
    center: "image/slide4-3.png",
    rightBig: "image/slide4-4.png",
    rightSmall: "image/slide4-5.png",
    rightBottom: "image/slide4-6.png"
  }
};

let currentSlide = 1;

function updateSlide(num) {
  currentSlide = num;

  document.querySelector(".img-left-top").src = slides[num].leftTop;
  document.querySelector(".img-left-bottom").src = slides[num].leftBottom;
  document.querySelector(".img-center").src = slides[num].center;
  document.querySelector(".img-right-big").src = slides[num].rightBig;
  document.querySelector(".img-right-small").src = slides[num].rightSmall;
  document.querySelector(".img-right-bottom").src = slides[num].rightBottom;

  document.querySelectorAll(".slider-dot").forEach(btn => {
    btn.classList.remove("active");
    if(btn.dataset.slide == num) btn.classList.add("active");
  });
}

// عند الضغط على الأرقام
document.querySelectorAll(".slider-dot").forEach(btn => {
  btn.addEventListener("click", () => {
    updateSlide(Number(btn.dataset.slide));
  });
});

// السهم اليمين
document.getElementById("next").addEventListener("click", () => {
  currentSlide = currentSlide === 4 ? 1 : currentSlide + 1;
  updateSlide(currentSlide);
});

// السهم الشمال
document.getElementById("prev").addEventListener("click", () => {
  currentSlide = currentSlide === 1 ? 4 : currentSlide - 1;
  updateSlide(currentSlide);
});

/////////slider2//////////////
