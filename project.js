/////////////slider-project////////////////
document.addEventListener('DOMContentLoaded', function () {

  // ============ SLIDER 1 – صور الإنشاء ============
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

  const imgLeftTop     = document.querySelector(".img-left-top");
  const imgLeftBottom  = document.querySelector(".img-left-bottom");
  const imgCenter      = document.querySelector(".img-center");
  const imgRightBig    = document.querySelector(".img-right-big");
  const imgRightSmall  = document.querySelector(".img-right-small");
  const imgRightBottom = document.querySelector(".img-right-bottom");

  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  // لو مفيش العناصر دي (مثلاً صفحة تانية) نخرج
  if (!imgLeftTop || !dots.length) return;

  function updateSlide(num) {
    currentSlide = num;

    imgLeftTop.src     = slides[num].leftTop;
    imgLeftBottom.src  = slides[num].leftBottom;
    imgCenter.src      = slides[num].center;
    imgRightBig.src    = slides[num].rightBig;
    imgRightSmall.src  = slides[num].rightSmall;
    imgRightBottom.src = slides[num].rightBottom;

    dots.forEach(btn => {
      btn.classList.remove("active");
      if (Number(btn.dataset.slide) === num) {
        btn.classList.add("active");
      }
    });
  }

  // أرقام الـ slider
  dots.forEach(btn => {
    btn.addEventListener("click", () => {
      const num = Number(btn.dataset.slide);
      if (!isNaN(num)) updateSlide(num);
    });
  });

  // السهم اليمين
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = currentSlide === 4 ? 1 : currentSlide + 1;
      updateSlide(currentSlide);
    });
  }

  // السهم الشمال
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = currentSlide === 1 ? 4 : currentSlide - 1;
      updateSlide(currentSlide);
    });
  }

  // أول Slide
  updateSlide(1);



  // ============ SLIDER 2 – الصيانة والتشغيل ============
  // الكود بتاع ops-slider هيفضل زي ما هو،
  // بس اتأكدي إن عندك في الـ HTML:
  // .ops-slider > .ops-track > .ops-slide ... و .ops-dot / .ops-prev / .ops-next
  // ولو لسة ماعملتيش الهيكل ده، سيبي الكود ده دلوقتي أو امسحيه لحد ما نجهزه.

  // OPS slider
const opsTrack  = document.querySelector('.ops-track');
const opsSlides = document.querySelectorAll('.ops-slide');
const opsDots   = document.querySelectorAll('.ops-dot');
const opsPrev   = document.querySelector('.ops-prev');
const opsNext   = document.querySelector('.ops-next');

if (opsTrack && opsSlides.length && opsDots.length && opsPrev && opsNext) {

  let opsIndex = 0;

  function updateOpsSlider(index) {
    opsTrack.style.transform = `translateX(-${index * 100}%)`;

    opsDots.forEach(dot => dot.classList.remove('active'));
    opsDots[index].classList.add('active');
  }

  opsNext.addEventListener('click', () => {
    opsIndex = (opsIndex + 1) % opsSlides.length;
    updateOpsSlider(opsIndex);
  });

  opsPrev.addEventListener('click', () => {
    opsIndex = (opsIndex - 1 + opsSlides.length) % opsSlides.length;
    updateOpsSlider(opsIndex);
  });

  opsDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideTo = parseInt(dot.dataset.slide, 10); // حسب الـ data-slide اللي حاطاه
      opsIndex = slideTo;
      updateOpsSlider(opsIndex);
    });
  });

  // أول مرة
  updateOpsSlider(0);
}

});
