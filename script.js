document.addEventListener("DOMContentLoaded", () => {
  // ---------- Reveal-on-scroll for sections ----------
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal-section").forEach((el) => {
    revealObserver.observe(el);
  });

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

  // Sanitize text to prevent XSS
  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  // Validate URL - only allow http/https
  function safeUrl(url) {
    if (!url) return "#";
    try {
      var u = new URL(url, location.href);
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "#";
    } catch (_) {
      return "#";
    }
  }

  function renderCard(project) {
    var title = esc(project.title) || "Untitled";
    var desc = esc(project.description);
    var thumb = safeUrl(project.thumb || project.image);
    var image = safeUrl(project.image);
    var liveUrl = safeUrl(project.liveUrl);
    var codeUrl = safeUrl(project.codeUrl);
    var sizes = "(max-width:736px) 90vw, 34rem";
    var featuredClass = project.featured ? " featured-project" : "";
    var featuredBadge = project.featured
      ? '<span class="featured-badge">Featured</span>'
      : "";
    var description = desc
      ? '<p class="project-description">' + desc + "</p>"
      : "";
    var techTags = (project.tech || [])
      .map(function (t) { return "<span>" + esc(t) + "</span>"; })
      .join("");

    container.insertAdjacentHTML(
      "beforeend",
      '<div class="single-project hidden' + featuredClass + '">' +
        '<div class="img-div">' +
          featuredBadge +
          '<img src="' + thumb + '"' +
            ' srcset="' + thumb + ' 600w, ' + image + ' 1200w"' +
            ' sizes="' + sizes + '"' +
            ' width="544" height="400"' +
            ' loading="lazy" decoding="async"' +
            ' alt="' + title + '" />' +
          '<div class="overlay-project">' +
            '<a href="' + liveUrl + '" target="_blank" rel="noopener noreferrer">' +
              '<button type="button" class="custom-btn">View project</button>' +
            '</a>' +
            '<a href="' + codeUrl + '" target="_blank" rel="noopener noreferrer">' +
              '<button type="button" class="custom-btn">View code</button>' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<h3 class="heading-M">' + title + '</h3>' +
        description +
        '<div class="tech-used">' + techTags + '</div>' +
      '</div>'
    );
  }

  function renderPager() {
    pager.innerHTML = "";
    const mkBtn = (label, onClick, disabled = false, isActive = false) => {
      const b = document.createElement("button");
      b.textContent = label;
      b.className = "custom-btn";
      if (isActive) b.classList.add("active-page");
      b.style.opacity = disabled ? "0.5" : "1";
      b.disabled = disabled;
      b.addEventListener("click", onClick);
      return b;
    };

    pager.append(
      mkBtn("«", () => renderPage(1), currentPage === 1),
      mkBtn("‹", () => renderPage(currentPage - 1), currentPage === 1)
    );

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

    pager.append(
      mkBtn("›", () => renderPage(currentPage + 1), currentPage === totalPages),
      mkBtn("»", () => renderPage(totalPages), currentPage === totalPages)
    );
  }

  function updatePagerState() {
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

  // ---------- Reveal-on-scroll for project cards ----------
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

  // ---------- Abilities counters ----------
  const abilitiesSection = document.querySelector(".abilities");
  let hasAnimatedAbilities = false;

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedAbilities) {
          const counters = document.querySelectorAll(".experience-counter");
          counters.forEach((counter) => animateCounter(counter));
          hasAnimatedAbilities = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (abilitiesSection) counterObserver.observe(abilitiesSection);

  // ---------- About section highlight counters ----------
  const aboutSection = document.querySelector(".about-section");
  let hasAnimatedAbout = false;

  const aboutObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedAbout) {
          const counters = document.querySelectorAll(".highlight-number");
          counters.forEach((counter) => animateCounter(counter));
          hasAnimatedAbout = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (aboutSection) aboutObserver.observe(aboutSection);

  // ---------- Shared counter animation ----------
  function animateCounter(counter) {
    const target = +counter.dataset.target || 0;
    let current = 0;
    const duration = 600;
    const increment = target / (duration / 16);
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
  }
});
