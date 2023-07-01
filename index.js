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

    this.cardLinks = document.createElement("p")
    this.anchorRepo = Object.assign(document.createElement("a"), { target: "_blank" })
    this.anchorRepo.innerText = "Repo"
    this.anchorSite = Object.assign(document.createElement("a"), { target: "_blank" })
    this.anchorSite.innerText = "Site"

    this.cardLinks.appendChild(this.anchorRepo)
    this.cardLinks.appendChild(this.anchorSite)

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

customElements.define("project-card", ProjectCard)