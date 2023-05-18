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
    
    async displayCarousel(fixation) {
        // CAROUSEL
        let carousel = document.createElement("div");
        carousel.classList.add("carousel");

        // IMAGE
        let image = document.createElement("img");
        image.src = this.film.image_url;
        image.alt = this.film.title;
        image.classList.add("image_carousel");
        image.classList.add("image_"+this.film.id);

        // ON AJOUTE L'IMAGE AU CAROUSEL
        carousel.appendChild(image);
        // ON AJOUTE LE CAROUSEL A LA FIXATION DEFINIE
        fixation.appendChild(carousel);
    }

    async displayBestFilmsByGenres(fixation, genre) {
        
        try {
            if (this.film.image_url == null) {
            } else {
                    
                // CAROUSEL
                let carousel = document.createElement("div");
                carousel.classList.add("carousel");
        
                // IMAGE
                let image = document.createElement("img");
                image.src = this.film.image_url;
                image.alt = this.film.title;
                image.classList.add("image_carousel");
                image.classList.add("image_"+this.film.id + "_" + genre);
                // ON AJOUTE L'IMAGE AU CAROUSEL
                carousel.appendChild(image);
                // ON AJOUTE LE CAROUSEL A LA FIXATION DEFINIE
                fixation.appendChild(carousel);
            }
        } catch (error) {
            console.log("ViewFilm.displayBestFilmsByGenres() error: " + error);
        }
    }

    async displayModal(fixation) {
        // MODAL
        let modal = document.createElement("div");
        modal.classList.add("modal");
        
        // IMAGE
        let image = document.createElement("img");
        image.src = this.film.image_url;
        image.alt = this.film.title;

        let labelImage = document.createElement("label");
        labelImage.innerHTML = "Image :";
        labelImage.classList.add("label_image", "label");
        
        // TITRE
        let h3 = document.createElement("h3");
        h3.innerHTML = this.film.title;

        // DESCRIPTION
        let labelTitle = document.createElement("label");
        labelTitle.innerHTML = "Titre  :";
        labelTitle.classList.add("label_title", "label");

        // GENRE
        let genre = document.createElement("p");
        genre.innerHTML = this.film.genres;

        let labelGenre = document.createElement("label");
        labelGenre.innerHTML = "Genre :";
        labelGenre.classList.add("label_genre", "label");
        
        // DATE
        let date = document.createElement("p");
        date.innerHTML = this.film.date_published;
        
        let labelDate = document.createElement("label");
        labelDate.innerHTML = "Date :";
        labelDate.classList.add("label_date", "label");
        
        // RATED
        let rated = document.createElement("p");
        rated.innerHTML = this.film.rated;
        
        let labelRated = document.createElement("label");
        labelRated.innerHTML = "Rated :";
        labelRated.classList.add("label_rated", "label");
        
        // SCORE
        let score = document.createElement("p");
        score.innerHTML = this.film.imdb_score;
        
        let labelScore = document.createElement("label");
        labelScore.innerHTML = "Score :";
        labelScore.classList.add("label_score", "label");
        
        // DIRECTOR
        let director = document.createElement("p");
        director.innerHTML = this.film.directors;
        
        let labelDirector = document.createElement("label");
        labelDirector.innerHTML = "Director :";
        labelDirector.classList.add("label_director", "label");
        
        // ACTORS
        let actors = document.createElement("p");
        actors.innerHTML = this.film.actors;

        let labelActors = document.createElement("label");
        labelActors.innerHTML = "Actors :";
        labelActors.classList.add("label_actors", "label");

        // DUREE
        let duree = document.createElement("p");
        duree.innerHTML = this.film.duration;
        
        let labelDuree = document.createElement("label");
        labelDuree.innerHTML = "Duree :";
        labelDuree.classList.add("label_duree", "label");
        
        // PAYS
        let pays = document.createElement("p");
        pays.innerHTML = this.film.countries;
        
        let labelPays = document.createElement("label");
        labelPays.innerHTML = "Pays :";
        labelPays.classList.add("label_pays", "label");
        
        // BOX OFFICE
        let box_office = document.createElement("p");
        box_office.innerHTML = this.film.worldwide_gross_income;
        
        let labelBox_office = document.createElement("label");
        labelBox_office.innerHTML = "Box Office :";
        labelBox_office.classList.add("label_box_office", "label");
        
        // DESCRIPTION
        let description = document.createElement("p");
        description.innerHTML = this.film.description;
        
        let labelDescription = document.createElement("label");
        labelDescription.innerHTML = "Description :";
        labelDescription.classList.add("label_description", "label");

        // BOUTON FERMER
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerHTML = "Fermer";
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.remove();
        });

    
        // On ajoute les éléments au DOM
        fixation.appendChild(modal);
        modal.appendChild(image);
        modal.appendChild(h3);
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

        // ajoute le labelTitle avant h3
        modal.insertBefore(labelTitle, h3);
        // ajoute le labelGenre avant genre
        modal.insertBefore(labelGenre, genre);
        // ajoute le labelDate avant date
        modal.insertBefore(labelDate, date);
        // ajoute le labelRated avant rated
        modal.insertBefore(labelRated, rated);
        // ajoute le labelScore avant score
        modal.insertBefore(labelScore, score);
        // ajoute le labelDirector avant director
        modal.insertBefore(labelDirector, director);
        // ajoute le labelActors avant actors
        modal.insertBefore(labelActors, actors);
        // ajoute le labelDuree avant duree
        modal.insertBefore(labelDuree, duree);
        // ajoute le labelPays avant pays
        modal.insertBefore(labelPays, pays);
        // ajoute le labelBoxOffice avant box_office
        modal.insertBefore(labelBox_office, box_office);
        // ajoute le labelDescription avant description
        modal.insertBefore(labelDescription, description);


    }

}
