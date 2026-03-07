

document.addEventListener("DOMContentLoaded", () => {
 

  (function initMenu() {
    const body = document.body;
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".top-nav");

    if (!menuBtn || !nav) return;

 
    let overlay = document.querySelector(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);
    }

    let closeBtn = nav.querySelector(".menu-close");
    if (!closeBtn) {
      closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "menu-close";
      closeBtn.setAttribute("aria-label", "Close menu");
      closeBtn.textContent = "×";
      nav.prepend(closeBtn);
    }
 
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



  (function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

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

      observer.disconnect(); 
    };

    const observer = new IntersectionObserver(startCounting, options);
    observer.observe(counters[0]);
  })();

(function () {
  const section = document.querySelector(".services-section");
  if (!section) return;

  const windowEl = section.querySelector(".slider-window");
  const track = section.querySelector(".slider-track");
  const cards = section.querySelectorAll(".service-card");
  const prevBtn = section.querySelector(".slider-arrow.prev");
  const nextBtn = section.querySelector(".slider-arrow.next");

  if (!windowEl || !track || !cards.length || !prevBtn || !nextBtn) return;

 
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

(function partnersSlider() {

  const slider = document.getElementById("partnersSliderJS");
  const track  = document.getElementById("partnersTrackJS");

  if (!slider || !track) return; 

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
    if (!track.dataset.baseHtml) {
      track.dataset.baseHtml = track.innerHTML;
    } else {
      track.innerHTML = track.dataset.baseHtml;
    }

    const target = window.innerWidth * 2; 
    let safety = 0;

  
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
//////////////form user/////////////////////
emailjs.init("ry5Xypor7M3014GGT"); 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  let hideTimer;

  if (!form || !msg) return;

  function showMsg(text, type) {
    clearTimeout(hideTimer);
    msg.className = "form-msg"; // reset
    msg.textContent = text;
    msg.style.display = "block";

    if (type) msg.classList.add(type);

    hideTimer = setTimeout(() => {
      msg.style.opacity = "0";
      setTimeout(() => {
        msg.style.display = "none";
        msg.style.opacity = "1";
      }, 300);
    }, 4000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    showMsg("جاري إرسال الرسالة...", "");

    emailjs.sendForm(
      "service_lfzs7a5",
      "template_9knh7c3",
      form
    ).then(
      () => {
        showMsg("✅ تم إرسال الرسالة بنجاح", "success");
        form.reset();
      },
      (err) => {
        console.error("EmailJS Error:", err);
        showMsg("❌ حصل خطأ في الإرسال، جرّبي تاني", "error");
      }
    );
  });
});





////////////////video///////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const videoBtn = document.getElementById("videoNavBtn");
  const videoSection = document.getElementById("introVideo");
  const videoPlayer = document.getElementById("introVideoPlayer");

  if (!videoBtn || !videoSection || !videoPlayer) {
    console.warn("Video JS: تأكدي من IDs: videoNavBtn / introVideo / introVideoPlayer");
    return;
  }

 
  function pauseOtherVideos() {
    document.querySelectorAll("video").forEach((v) => {
      if (v !== videoPlayer) {
        v.pause();
      }
    });
  }

  videoBtn.addEventListener("click", (e) => {
    e.preventDefault();

    
    videoSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  
    pauseOtherVideos();

    const tryPlay = () => {
      const playPromise = videoPlayer.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
       
          videoPlayer.muted = false;
        });
      }
    };


    setTimeout(tryPlay, 500);
  });


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      videoPlayer.pause();
    }
  });
});



//////////////////////////who-animation///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#who-message");
  if (!section) return;

  const topBoxes = section.querySelectorAll(".who-top .one-box");
  const strategyBox = section.querySelector(".strategy-box");
  const items = section.querySelectorAll(".strategy-list li");


  let timers = [];

  const clearTimers = () => {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  };

  const reset = () => {
    clearTimers();
    topBoxes.forEach(b => b.classList.remove("is-visible"));
    if (strategyBox) strategyBox.classList.remove("is-visible");
    items.forEach(li => li.classList.remove("is-visible"));
  };

  const play = () => {
    clearTimers();


    topBoxes.forEach((box, i) => {
      timers.push(setTimeout(() => box.classList.add("is-visible"), i * 150));
    });

 
    if (strategyBox) {
      timers.push(setTimeout(() => strategyBox.classList.add("is-visible"), 250));
    }


    items.forEach((li, i) => {
      timers.push(setTimeout(() => li.classList.add("is-visible"), 450 + i * 160));
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        play();    
      } else {
        reset();    
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(section);
});

/////////////////////////////////animation-why-us////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".why-us");
  if (!section) return;

  const listItems = section.querySelectorAll(".why-list li");
  const btns = section.querySelectorAll(".btns a");

  let timers = [];

  const clearTimers = () => {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  };

  const reset = () => {
    clearTimers();
    listItems.forEach(li => li.classList.remove("is-visible"));
    btns.forEach(a => a.classList.remove("is-visible"));
  };

  const play = () => {
    clearTimers();


    listItems.forEach((li, i) => {
      timers.push(setTimeout(() => li.classList.add("is-visible"), i * 140));
    });

  
    btns.forEach((a, i) => {
      timers.push(setTimeout(() => a.classList.add("is-visible"), 140 * listItems.length + 120 + i * 120));
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) play();
      else reset();
    });
  }, { threshold: 0.25 });

  observer.observe(section);
});