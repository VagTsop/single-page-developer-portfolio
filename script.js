document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectsContainer");

  fetch("./assets/data/projects.json")
    .then((res) => res.json())
    .then((projects) => {
      projects.forEach((project) => {
        const techTags = project.tech
          .map((tech) => `<span>${tech}</span>`)
          .join("");

        const projectHTML = `
          <div class="single-project hidden">
            <div class="img-div">
              <img src="${project.image}" alt="${project.title}" loading="lazy" />
              <div class="overlay-project">
                <a href="${project.liveUrl}" target="_blank">
                  <button type="button" class="custom-btn">View project</button>
                </a>
                <a href="${project.codeUrl}" target="_blank">
                  <button type="button" class="custom-btn">View code</button>
                </a>
              </div>
            </div>
            <h3 class="heading-M">${project.title}</h3>
            <div class="tech-used">${techTags}</div>
          </div>
        `;

        container.insertAdjacentHTML("beforeend", projectHTML);
      });

      animateOnScroll();
    })
    .catch((error) => {
      console.error("Error loading project data:", error);
      container.innerHTML = "<p>Failed to load projects.</p>";
    });

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
      {
        threshold: 0.1,
      }
    );

    document
      .querySelectorAll(".single-project")
      .forEach((el) => projectObserver.observe(el));
  }

  const abilitiesSection = document.querySelector(".abilities");
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          const counters = document.querySelectorAll(".experience-counter");
          counters.forEach((counter) => {
            const target = +counter.dataset.target;
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
    {
      threshold: 0.5,
    }
  );

  if (abilitiesSection) {
    counterObserver.observe(abilitiesSection);
  }
});
