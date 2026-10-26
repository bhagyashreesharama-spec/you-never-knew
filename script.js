
const openLetter = document.getElementById("openLetter");
const letterContent = document.getElementById("letterContent");

if (openLetter && letterContent) {
  openLetter.addEventListener("click", () => {
    const isHidden = letterContent.hidden;

    letterContent.hidden = !isHidden;
    openLetter.innerHTML = isHidden
      ? 'Close the letter <span>−</span>'
      : 'Open the letter <span>↗</span>';

    openLetter.setAttribute("aria-expanded", String(isHidden));

    if (isHidden) {
      letterContent.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  openLetter.setAttribute("aria-expanded", "false");
}

// Reveal chapter text gently as it enters the screen.
const sections = document.querySelectorAll(
  ".chapter, .memory, .question-section, .strength, .letter-section"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((section) => observer.observe(section));
}
