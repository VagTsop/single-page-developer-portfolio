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

      animateOnScroll(); // Call animation logic after all projects are added
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

  // --- Experience Years Counter Animation ---
  const abilitiesSection = document.querySelector(".abilities");
  let hasAnimated = false; // Flag to ensure animation runs only once

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          const counters = document.querySelectorAll(".experience-counter");
          counters.forEach((counter) => {
            const target = +counter.dataset.target;
            let current = 0;
            const duration = 500; // Changed from 1500 to 500 milliseconds for faster animation
            const increment = target / (duration / 10); // Adjust 10 for smoother animation

            const updateCounter = () => {
              if (current < target) {
                current = Math.min(current + increment, target);
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target; // Ensure it ends exactly on the target
              }
            };
            requestAnimationFrame(updateCounter);
          });
          hasAnimated = true; // Set flag to true after animation starts
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the section is visible
    }
  );

  if (abilitiesSection) {
    counterObserver.observe(abilitiesSection);
  }
});
