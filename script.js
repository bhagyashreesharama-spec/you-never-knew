
document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("in-view"));
  }

  const letterButton = document.getElementById("letterButton");
  const hiddenLetter = document.getElementById("hiddenLetter");

  if (letterButton && hiddenLetter) {
    letterButton.addEventListener("click", () => {
      const isHidden = hiddenLetter.hidden;

      hiddenLetter.hidden = !isHidden;
      letterButton.setAttribute("aria-expanded", String(isHidden));
      letterButton.innerHTML = isHidden
        ? 'Close the letter <span>♡</span>'
        : 'Open the letter <span>♡</span>';

      if (isHidden) {
        setTimeout(() => {
          hiddenLetter.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 100);
      }
    });
  }

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  const glow = document.querySelector(".cursor-glow");

  if (glow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
    }, { passive: true });
  }
});

