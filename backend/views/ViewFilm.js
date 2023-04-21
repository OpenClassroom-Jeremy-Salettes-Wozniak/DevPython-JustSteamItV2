export class ViewFilm{

    constructor(film) {
        this.film = film
        this.main = document.querySelector("main");
        this.displayFilm();
    }

    async displayFilm() {
        console.log(this.film);
        let container = document.createElement("div");
        container.classList.add("container");

        let image = document.createElement("img");
        image.src = this.film.image_url;
        image.alt = this.film.title;

        let h2 = document.createElement("h2");
        h2.innerHTML = this.film.title;

        let description = document.createElement("p");
        description.innerHTML = this.film.description;

        // Fixe sur le  container sur le main
        container.appendChild(image);
        container.appendChild(h2);
        container.appendChild(description);
        this.main.appendChild(container);
    }
}