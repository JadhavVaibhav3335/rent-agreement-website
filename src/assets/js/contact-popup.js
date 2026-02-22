(() => {
  const popupOverlay = document.getElementById("popupOverlay");
  const popupModal = document.getElementById("popupModal");
  const popupClose = document.getElementById("popupClose");
  const leadForm = popupModal ? popupModal.querySelector("form") : null;

  if (!popupOverlay || !popupModal || !popupClose) return;

  const STORAGE_KEY = "rentAgreementFormSubmitted";
  let popupVisible = false;
  let startY = 0;
  let intervalId = null;

  //  If already submitted → no popup ever
  if (localStorage.getItem(STORAGE_KEY)) return;

  //  Device based timing
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  // const POPUP_INTERVAL = isMobile ? 35000 : 20000; // ms
  const POPUP_INTERVAL = 45000; // ms

  function openPopup() {
    if (popupVisible) return;
    popupVisible = true;
    popupOverlay.classList.add("active");
    popupModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    popupVisible = false;
    popupOverlay.classList.remove("active");
    popupModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  popupOverlay.addEventListener("click", closePopup);
  popupClose.addEventListener("click", closePopup);

  /* ========================= Manual CTA Triggers ========================= */
  document.querySelectorAll(".open-popup-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  /* ========================= Timed Popup (Smart)========================= */
  intervalId = setInterval(() => {
    openPopup();
  }, POPUP_INTERVAL);

  /* ========================= Pricing Section Trigger ========================= */
  const pricingSection = document.getElementById("pricing");

  if (pricingSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) openPopup();
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(pricingSection);
  }

  /* ================= Exit Intent (Desktop) ========================= */
  if (!isMobile) {
    document.addEventListener("mouseout", (e) => {
      if (e.clientY < 10) openPopup();
    });
  }

  /* ========================= Swipe Down to Close ========================= */
  popupModal.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  popupModal.addEventListener("touchmove", (e) => {
    const delta = e.touches[0].clientY - startY;
    if (delta > 80) closePopup();
  });

  /* =========================Form Submit = STOP ALL========================= */
  if (leadForm) {
    leadForm.addEventListener("submit", () => {
      localStorage.setItem(STORAGE_KEY, "true");
      clearInterval(intervalId);
      closePopup();
    });
  }
})();
