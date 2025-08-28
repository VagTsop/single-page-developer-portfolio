document.addEventListener("DOMContentLoaded", () => {
  // ---------- Projects: explicit pagination + lazy images ----------
  const container = document.getElementById("projectsContainer");

  // create toolbar
  let pager = document.getElementById("projectsPager");
  if (!pager) {
    pager = document.createElement("nav");
    pager.id = "projectsPager";
    pager.setAttribute("aria-label", "Projects pagination");
    pager.style.display = "flex";
    pager.style.gap = "0.5rem";
    pager.style.justifyContent = "center";
    pager.style.alignItems = "center";
    pager.style.marginTop = "2rem";
    container.after(pager);
  }

  const PAGE_SIZE = 4;
  let currentPage = 1;
  let allProjects = [];
  let totalPages = 1;

  fetch("./assets/data/projects.json")
    .then((r) => r.json())
    .then((list) => {
      allProjects = Array.isArray(list) ? list : [];
      totalPages = Math.max(1, Math.ceil(allProjects.length / PAGE_SIZE));
      renderPage(1);
      renderPager();
    })
    .catch((e) => {
      console.error(e);
      container.innerHTML = "<p>Failed to load projects.</p>";
    });

  function renderPage(pageNum) {
    currentPage = Math.min(Math.max(1, pageNum), totalPages);
    container.innerHTML = "";
    const start = (currentPage - 1) * PAGE_SIZE;
    const slice = allProjects.slice(start, start + PAGE_SIZE);
    slice.forEach(renderCard);
    animateOnScroll();
    updatePagerState();
  }

  function renderCard(project) {
    const techTags = (project.tech || [])
      .map((t) => `<span>${t}</span>`)
      .join("");
    const thumb = project.thumb || project.image;
    const sizes = "(max-width:736px) 90vw, 34rem";

    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="single-project hidden">
        <div class="img-div">
          <img
            src="${thumb}"
            srcset="${thumb} 600w, ${project.image} 1200w"
            sizes="${sizes}"
            width="544" height="400"
            loading="lazy" decoding="async"
            alt="${project.title || "Project"}" />
          <div class="overlay-project">
            <a href="${project.liveUrl}" target="_blank" rel="noopener">
              <button type="button" class="custom-btn">View project</button>
            </a>
            <a href="${project.codeUrl}" target="_blank" rel="noopener">
              <button type="button" class="custom-btn">View code</button>
            </a>
          </div>
        </div>
        <h3 class="heading-M">${project.title || "Untitled"}</h3>
        <div class="tech-used">${techTags}</div>
      </div>
      `
    );
  }

  function renderPager() {
    pager.innerHTML = "";
    const mkBtn = (label, onClick, disabled = false, isActive = false) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.className = "custom-btn";
      if (isActive) b.classList.add("active-page"); // <-- add this
      b.style.opacity = disabled ? "0.5" : "1";
      b.disabled = disabled;
      b.addEventListener("click", onClick);
      return b;
    };

    // « First, ‹ Prev
    pager.append(
      mkBtn("«", () => renderPage(1), currentPage === 1),
      mkBtn("‹", () => renderPage(currentPage - 1), currentPage === 1)
    );

    // Numbered pages (compact)
    const nums = calcPageNumbers(currentPage, totalPages);
    nums.forEach((n) => {
      if (n === "...") {
        const span = document.createElement("span");
        span.textContent = "…";
        span.style.minWidth = "1rem";
        span.style.textAlign = "center";
        pager.append(span);
      } else {
        pager.append(
          mkBtn(String(n), () => renderPage(n), false, n === currentPage)
        );
      }
    });

    // Next ›, Last »
    pager.append(
      mkBtn("›", () => renderPage(currentPage + 1), currentPage === totalPages),
      mkBtn("»", () => renderPage(totalPages), currentPage === totalPages)
    );
  }

  function updatePagerState() {
    // Rebuild to update disabled/active states
    renderPager();
  }

  function calcPageNumbers(cur, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set(
      [1, 2, total - 1, total, cur, cur - 1, cur + 1].filter(
        (n) => n >= 1 && n <= total
      )
    );
    const sorted = [...pages].sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < sorted.length; i++) {
      out.push(sorted[i]);
      if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1)
        out.push("...");
    }
    return out;
  }

  // ---------- Reveal-on-scroll animation (unchanged) ----------
  function animateOnScroll() {
    const projectObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            entry.target.classList.remove("hidden");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".single-project.hidden")
      .forEach((el) => projectObserver.observe(el));
  }

  // ---------- Abilities counters (unchanged) ----------
  const abilitiesSection = document.querySelector(".abilities");
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          const counters = document.querySelectorAll(".experience-counter");
          counters.forEach((counter) => {
            const target = +counter.dataset.target || 0;
            let current = 0;
            const duration = 500;
            const increment = target / (duration / 10);
            const updateCounter = () => {
              if (current < target) {
                current = Math.min(current + increment, target);
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            requestAnimationFrame(updateCounter);
          });
          hasAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (abilitiesSection) counterObserver.observe(abilitiesSection);
});
