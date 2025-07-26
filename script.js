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

      animateOnScroll(); // 🔥 Call animation logic after all projects are added
    })
    .catch((error) => {
      console.error("Error loading project data:", error);
      container.innerHTML = "<p>Failed to load projects.</p>";
    });

  function animateOnScroll() {
    const observer = new IntersectionObserver(
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
      .forEach((el) => observer.observe(el));
  }
});
