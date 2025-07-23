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
          <div class="single-project">
            <div class="img-div">
              <img src="${project.image}" alt="${project.title}" />
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
    })
    .catch((error) => {
      console.error("Error loading project data:", error);
      container.innerHTML = "<p>Failed to load projects.</p>";
    });
});
