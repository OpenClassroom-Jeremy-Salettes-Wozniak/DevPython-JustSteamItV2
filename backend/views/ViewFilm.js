export class ViewFilm{

    constructor(film) {
        this.film = film
    }

    async displayBestFilm(fixation) {
        try {
            let container = document.createElement("div");
            container.classList.add("best_film_container");

            let image = document.createElement("img");
            image.src = this.film.image_url;
            image.alt = this.film.title;

            let h3 = document.createElement("h3");
            h3.innerHTML = this.film.title;

            let description = document.createElement("p");
            description.innerHTML = this.film.description;

            let btn = document.createElement("button");
            btn.classList.add("btn_best_film");
            btn.innerHTML = "Voir le film";


            container.appendChild(image);
            container.appendChild(h3);
            container.appendChild(description);
            container.appendChild(btn);
            fixation.appendChild(container);
            
        } catch (error) {
            console.log("ViewFilm.displayFilm() error: " + error);
        }
    }

    // async displayFilm(fixation) {
    //     try {
    //         let container = document.createElement("div");
    //         container.classList.add("container");
    
    //         let image = document.createElement("img");
    //         image.src = this.film.image_url;
    //         image.alt = this.film.title;
    
    //         let h3 = document.createElement("h3");
    //         h3.innerHTML = this.film.title;
    
    //         let description = document.createElement("p");
    //         description.innerHTML = this.film.description;
    
    //         // Fixe sur le  container sur le main
    //         container.appendChild(image);
    //         container.appendChild(h3);
    //         container.appendChild(description);
    //         fixation.appendChild(container);
    //     } catch (error) {
    //         console.log("ViewFilm.displayFilm() error: " + error);
    //     }
    // }

    async displayCarousel(fixation) {
        
        let carousel = document.createElement("div");
        carousel.classList.add("carousel");

        let image = document.createElement("img");
        image.src = this.film.image_url;
        image.alt = this.film.title;

        carousel.appendChild(image);
        fixation.appendChild(carousel);
    }

    async displayModal(fixation) {
        let modal = document.createElement("div");
        modal.classList.add("modal");
        
        let image = document.createElement("img");
        image.src = this.film.image_url;
        image.alt = this.film.title;

        let h2 = document.createElement("h2");
        h2.innerHTML = this.film.title;

        let genre = document.createElement("p");
        genre.innerHTML = this.film.genres;

        let date = document.createElement("p");
        date.innerHTML = this.film.date_published;

        let rated = document.createElement("p");
        rated.innerHTML = this.film.rated;

        let score = document.createElement("p");
        score.innerHTML = this.film.imdb_score;

        let director = document.createElement("p");
        director.innerHTML = this.film.directors;

        let actors = document.createElement("p");
        actors.innerHTML = this.film.actors;

        let duree = document.createElement("p");
        duree.innerHTML = this.film.duration;

        let pays = document.createElement("p");
        pays.innerHTML = this.film.countries;

        let box_office = document.createElement("p");
        box_office.innerHTML = this.film.worldwide_gross_income;

        let description = document.createElement("p");
        description.innerHTML = this.film.description;

        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerHTML = "Fermer";
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.remove();
        });

    
        fixation.appendChild(modal);
        modal.appendChild(image);
        modal.appendChild(h2);
        modal.appendChild(genre);
        modal.appendChild(date);
        modal.appendChild(rated);
        modal.appendChild(score);
        modal.appendChild(director);
        modal.appendChild(actors);
        modal.appendChild(duree);
        modal.appendChild(pays);
        modal.appendChild(box_office);
        modal.appendChild(description);
        modal.appendChild(btn);


    }

}
