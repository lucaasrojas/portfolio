const toggleIcon = document.querySelector(".toggle-icon");

toggleIcon.addEventListener("click", () => {
  toggleIcon.classList.toggle("bx-moon");
  toggleIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
});

class ProjectCard extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: "open" })

    this.wrapper = document.createElement("div")
    shadow.innerHTML = `
    <style> 
    @import "./styles/ProjectCard.css";
    @import "./style.css";
    </style>
    `
    this.wrapper.setAttribute("class", "proyect-card")
    this.anchorImage = Object.assign(document.createElement("a"), { target: "_blank" })
    this.imgCard = Object.assign(document.createElement("div"), { className: "img-card" })
    this.img = Object.assign(document.createElement("img"), { alt: "" })
    this.imgCard.appendChild(this.img)
    this.anchorImage.appendChild(this.imgCard)

    this.cardContent = Object.assign(document.createElement("div"), { className: "card-content" })
    this.cardTitle = document.createElement("h3")

    this.cardDescription = document.createElement("p")

    this.cardLinks = Object.assign(document.createElement("div"), { style: "display:flex;gap:10px; " })

    this.repoBox = Object.assign(document.createElement("div"), { classList: "btn-box" })
    this.siteBox = Object.assign(document.createElement("div"), { classList: "btn-box" })

    this.anchorRepo = Object.assign(document.createElement("a"), { target: "_blank", classList: "btn secondary" })
    this.anchorRepo.innerText = "Repo"
    this.repoBox.appendChild(this.anchorRepo)

    this.anchorSite = Object.assign(document.createElement("a"), { target: "_blank", classList: "btn primary" })
    this.anchorSite.innerText = "Site"
    this.siteBox.appendChild(this.anchorSite)

    this.cardLinks.appendChild(this.repoBox)
    this.cardLinks.appendChild(this.siteBox)

    this.cardContent.appendChild(this.cardTitle)
    this.cardContent.appendChild(this.cardDescription)
    this.cardContent.appendChild(this.cardLinks)

    this.wrapper.appendChild(this.anchorImage)
    this.wrapper.appendChild(this.cardContent)
    shadow.appendChild(this.wrapper)

  }

  connectedCallback() {
    const title = this.getAttribute("data-title")
    const description = this.getAttribute("data-description")
    const linkRepo = this.getAttribute("data-linkRepo")
    const linkSite = this.getAttribute("data-linkSite")
    const img = this.getAttribute("data-img")

    this.imgCard.style = `--content: '${title}';`
    this.cardTitle.innerHTML = title
    this.cardDescription.innerText = description
    this.anchorRepo.href = linkRepo
    this.anchorImage.href = linkSite
    this.anchorSite.href = linkSite
    this.img.src = img
  }
}


function parseCSVtoJSON(csvData) {
  const lines = csvData.trim().split('\r\n');
  const headers = lines[0].split(',');

  const projects = lines.slice(1).map(line => {
    const values = line.split(',');
    let project = {};
    headers.forEach((header, index) => {
      project[header] = values[index];
    });
    return project;
  });

  return projects;
}
fetch("https://docs.google.com/spreadsheets/d/16Dautg48PL9T4jjyEWb-mUtozgVlDCBJkyObQA9psS8/export?format=csv")
  .then(res => res.text())
  .then(res => {
    const projectList = parseCSVtoJSON(res)
    const projectContainer = document.getElementById("portfolio-content")
    projectList.forEach(project => {
      const div = document.createElement("div", { classList: ["project-card"] })
      const child = new ProjectCard()

      child.setAttribute("data-title", project.title)
      child.setAttribute("data-description", project.description)
      child.setAttribute("data-linkRepo", project.repoLink)
      child.setAttribute("data-linkSite", project.siteLink)
      child.setAttribute("data-img", project.image)
      div.appendChild(child)
      projectContainer.appendChild(div)
    })
  })

customElements.define("project-card", ProjectCard)