document.addEventListener("DOMContentLoaded", () => {
  // 1. Audio Player Controller
  const audio = document.getElementById("wedding-audio");
  const musicToggle = document.getElementById("music-toggle");
  let isPlaying = false;

  function playAudio() {
    if (audio) {
      audio.play().then(() => {
        isPlaying = true;
        if (musicToggle) {
          musicToggle.classList.add("playing");
          musicToggle.classList.remove("paused");
        }
      }).catch(err => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }

  function pauseAudio() {
    if (audio) {
      audio.pause();
      isPlaying = false;
      if (musicToggle) {
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("paused");
      }
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // 2. Open Invitation Button Action
  const openBtn = document.getElementById("open-invitation-btn");
  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      playAudio();
      const target = document.getElementById("page-0");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 3. Recipient Name Detection from Query Parameter (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("to") || urlParams.get("u") || urlParams.get("name") || urlParams.get("tamu");
  if (guestName) {
    document.querySelectorAll('[data-component="recipient"]').forEach(el => {
      el.textContent = guestName;
    });
    // Auto-fill RSVP name input if present
    const rsvpNameInput = document.getElementById("rsvp-name");
    if (rsvpNameInput) {
      rsvpNameInput.value = guestName;
    }
  }

  // 4. Countdown Timer Engine
  const countdownEl = document.querySelector('[data-component="countdown"]');
  if (countdownEl) {
    const targetDateStr = countdownEl.getAttribute("data-datetime") || "2027-06-21T09:00";
    const targetDate = new Date(targetDateStr).getTime();

    const daysEl = countdownEl.querySelector(".days");
    const hoursEl = countdownEl.querySelector(".hours");
    const minutesEl = countdownEl.querySelector(".minutes");
    const secondsEl = countdownEl.querySelector(".seconds");

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minutesEl) minutesEl.textContent = "00";
        if (secondsEl) secondsEl.textContent = "00";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 5. Slideshow Engine
  document.querySelectorAll(".slideshow").forEach(slideContainer => {
    const images = slideContainer.querySelectorAll("img");
    if (images.length > 1) {
      let currentIndex = 0;
      images[0].classList.add("active");

      setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        images.forEach(img => img.classList.remove("previous"));
        images[currentIndex].classList.remove("active");
        images[currentIndex].classList.add("previous");
        images[nextIndex].classList.add("active");
        currentIndex = nextIndex;

        setTimeout(() => {
          images.forEach(img => {
            if (!img.classList.contains("active")) {
              img.classList.remove("previous");
            }
          });
        }, 800);
      }, 3500);
    }
  });

  // 6. GSAP Animations Engine
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof TextPlugin !== "undefined") {
      gsap.registerPlugin(TextPlugin);
    }

    // Directional Fade Animations
    const animConfig = [
      { type: "fadeIn", axis: "yPercent", value: 0 },
      { type: "fadeInUp", axis: "yPercent", value: 40 },
      { type: "fadeInDown", axis: "yPercent", value: -40 },
      { type: "fadeInLeft", axis: "xPercent", value: 40 },
      { type: "fadeInRight", axis: "xPercent", value: -40 }
    ];

    animConfig.forEach(({ type, axis, value }) => {
      document.querySelectorAll(`[data-animation="${type}"]`).forEach(el => {
        const delay = parseFloat(el.getAttribute("data-animation-delay") || "0") / 1000;
        const duration = parseFloat(el.getAttribute("data-animation-duration") || "1.2");

        gsap.from(el, {
          opacity: 0,
          [axis]: value,
          duration: duration,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });
    });

    // ZoomIn Animation
    document.querySelectorAll('[data-animation="zoomIn"]').forEach(el => {
      const delay = parseFloat(el.getAttribute("data-animation-delay") || "0") / 1000;
      gsap.fromTo(el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Typing Text Effect
    document.querySelectorAll('[data-animation="typing"]').forEach(el => {
      const originalText = el.textContent.trim();
      const customText = el.getAttribute("data-text") || originalText;
      el.textContent = "";

      gsap.to(el, {
        opacity: 1,
        text: customText,
        duration: parseFloat(el.getAttribute("data-animation-duration") || "4"),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    // Hide on Scroll (Cover greeting card)
    document.querySelectorAll('[data-animation="hideOnScroll"]').forEach(el => {
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > window.innerHeight * 0.3) {
          gsap.to(el, { opacity: 0, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(el, { opacity: 1, duration: 0.4, ease: "power2.out" });
        }
      });
    });
  }

  // 7. Toast Notification Utility
  window.showToast = function(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  };

  // 8. Copy to Clipboard Functionality
  window.copyText = function(text, label = "Nomor rekening") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} berhasil disalin!`);
      });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      showToast(`${label} berhasil disalin!`);
    }
  };

  // 9. RSVP Form Subsystem
  const rsvpForm = document.getElementById("wedding-rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("rsvp-name")?.value || "Tamu Undangan";
      const attendance = document.getElementById("rsvp-attendance")?.value || "Hadir";
      const pax = document.getElementById("rsvp-pax")?.value || "1";
      const notes = document.getElementById("rsvp-notes")?.value || "";

      // Store in localStorage
      const rsvpData = { name, attendance, pax, notes, date: new Date().toISOString() };
      localStorage.setItem("wedding_rsvp", JSON.stringify(rsvpData));

      // Also append to wishes if notes provided
      if (notes.trim()) {
        addWish(name, notes.trim());
      }

      showToast("Terima kasih, konfirmasi kehadiran Anda telah tersimpan!");
      
      // WhatsApp Confirmation option
      const waNumber = "628123456789"; // Ganti dengan nomor mempelai
      const waMessage = encodeURIComponent(
        `Halo Adam & Hawa,\n\nSaya *${name}* mengonfirmasi *${attendance}* pada pernikahan kalian (Jumlah: ${pax} orang).\n\nPesan:\n"${notes}"\n\nTerima kasih!`
      );
      
      const confirmWa = confirm("Konfirmasi berhasil disimpan! Apakah Anda ingin mengirimkan pesan konfirmasi ini langsung via WhatsApp ke mempelai?");
      if (confirmWa) {
        window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");
      }
    });
  }

  // 10. Wishes / Comments Board Subsystem
  const defaultWishes = [
    {
      name: "Andini Putri",
      message: "Selamat atas pernikahannya Adam & Hawa! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah dan selalu dilimpahi kebahagiaan.",
      time: "10 menit yang lalu"
    },
    {
      name: "Budi Santoso",
      message: "Barakallah! Senang sekali melihat kalian berdua bersatu. Semoga dilancarkan seluruh rangkaian acaranya sampai hari H ya!",
      time: "1 jam yang lalu"
    },
    {
      name: "Dimas & Citra",
      message: "Happy wedding! Best wishes for a fun-filled future together as you build your new life together. Congrats!",
      time: "3 jam yang lalu"
    }
  ];

  function getStoredWishes() {
    const raw = localStorage.getItem("wedding_wishes");
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { return defaultWishes; }
    }
    return defaultWishes;
  }

  function renderWishes() {
    const listEl = document.getElementById("wishes-list");
    if (!listEl) return;
    const wishes = getStoredWishes();
    listEl.innerHTML = "";

    wishes.forEach(w => {
      const initial = w.name ? w.name.charAt(0).toUpperCase() : "G";
      const item = document.createElement("div");
      item.className = "flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-stone-200/60 shadow-sm text-left transition hover:bg-white/90";
      item.innerHTML = `
        <div class="size-10 rounded-full bg-[#667B5A] text-white flex items-center justify-center font-bold text-sm shrink-0">
          ${initial}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <h5 class="font-bold text-[#3f4d38] text-sm truncate">${w.name}</h5>
            <span class="text-xs text-stone-500 shrink-0">${w.time || "Baru saja"}</span>
          </div>
          <p class="text-xs text-stone-700 leading-relaxed break-words">${w.message}</p>
        </div>
      `;
      listEl.appendChild(item);
    });
  }

  function addWish(name, message) {
    const wishes = getStoredWishes();
    wishes.unshift({
      name: name,
      message: message,
      time: "Baru saja"
    });
    localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
    renderWishes();
  }

  const wishForm = document.getElementById("wedding-wish-form");
  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("wish-name");
      const msgInput = document.getElementById("wish-message");

      if (nameInput && msgInput && msgInput.value.trim()) {
        addWish(nameInput.value.trim() || "Tamu Undangan", msgInput.value.trim());
        msgInput.value = "";
        showToast("Ucapan dan doa Anda berhasil dikirim!");
      }
    });
  }

  renderWishes();

  // 11. Navigation Menu Dropdown Toggle
  const menuToggle = document.getElementById("menu-toggle-btn");
  const menuDropdown = document.getElementById("menu-dropdown");

  if (menuToggle && menuDropdown) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!menuDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
        menuDropdown.classList.add("hidden");
      }
    });

    menuDropdown.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuDropdown.classList.add("hidden");
      });
    });
  }
});

// Auto-scroll to hash target if present in URL (e.g. #page-0)
window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
});
