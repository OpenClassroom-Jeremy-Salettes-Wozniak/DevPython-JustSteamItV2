import { ModelApi } from '../models/ModelApi.js';
import { ModelFilm } from '../models/ModelFilm.js';

import { ViewFilm } from '../views/ViewFilm.js';

let port = 8001;

export default class ControllerFilm {
    
    constructor() {
    }

    async displayBestFilm() {
        let Api = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score").getResults();
        let api_url_film = await Api[0].url;
        let Api_response_film = await new ModelApi(api_url_film).getResponse();
        let Film = await new ModelFilm(Api_response_film);
        let View = await new ViewFilm(Film);
        let fixation = await document.querySelector("main");
        View.displayBestFilm(fixation);
        let btn = await document.querySelector(".btn_best_film");
        btn.addEventListener("click", () => {
            if (document.querySelector(".modal") != null) {
                document.querySelector(".modal").remove();
            }
            View.displayModal(fixation);
        })
        

    }   

    async displayBestFilms() {

        
        let fixation = await document.querySelector("main");
        let container_carousel = await document.createElement("div");
        container_carousel.classList.add("container_carousel");
        fixation.appendChild(container_carousel);

        let fleche_gauche = await document.createElement("div");
        fleche_gauche.classList.add("fleche_gauche");
        fleche_gauche.innerHTML = "<";

        let fleche_droite = await document.createElement("div");
        fleche_droite.classList.add("fleche_droite");
        fleche_droite.innerHTML = ">";

    
        let carrousel = await document.createElement("div");
        carrousel.classList.add("carrousel");
 
        let h2 = await document.createElement("h2");
        h2.innerHTML = "Meilleurs films";

        carrousel.appendChild(h2);
        container_carousel.appendChild(fleche_gauche);
        container_carousel.appendChild(carrousel);
        container_carousel.appendChild(fleche_droite);

        let Api = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score&page_size=20").getResults();

        window.addEventListener("resize", () => {
            window.location.reload();
        }); 

        let x = 0;
        let y = 7;

        if (window.innerWidth <= 1500) {
            y -= 1;
        }
        if (window.innerWidth <= 1300) {
            y -= 1;
        }
        if (window.innerWidth <= 1100) {
            y -= 1;
        }
        if (window.innerWidth <= 900) {
            y -= 1;
        }
        if (window.innerWidth <= 700) {
            y -= 1;
        }
        if (window.innerWidth <= 500) {
            y -= 1;
        }
        if (window.innerWidth <= 300) {
            y -= 1;
        }
        
        for (let i = x; i < y; i++) {
            let api_url_film = await Api[i].url;
            let Api_response_film = await new ModelApi(api_url_film).getResponse();
            let Film = await new ModelFilm(Api_response_film);
            let View = await new ViewFilm(Film);
            await View.displayCarousel(carrousel);

            let image_id = document.querySelector(".image_"+Api_response_film.id);
            image_id.addEventListener("click", () => {
                if (document.querySelector(".modal")!= null) {
                    document.querySelector(".modal").remove();
                }
                View.displayModal(fixation);
            })
        }

        fleche_droite.addEventListener("click", async () => {
            carrousel.innerHTML = "";
            if (y >= 20) {
                x = x;
                y = y;
                console.log(x);
                console.log(y);
                alert("Vous avez atteint la fin du carrousel");
            }else {
                x += 1;
                y += 1;
                console.log(x);
                console.log(y);
            }
            console.log(x);
            console.log(y);
            for (let i = x; i < y; i++) {
                let api_url_film = Api[i].url;
                let Api_response_film = await new ModelApi(api_url_film).getResponse();
                let Film = await new ModelFilm(Api_response_film);
                let View = await new ViewFilm(Film);
                await View.displayCarousel(carrousel);
                console.log(api_url_film);
            }
        })
        fleche_gauche.addEventListener("click", async () => {
            carrousel.innerHTML = "";
            if (x <= 0) {
                x = x;
                y = y;
            }else {
                x -= 1;
                y -= 1;
                console.log(x);
                console.log(y);
            }
            console.log(x);
            console.log(y);
            for (let i = x; i < y; i++) {
                let api_url_film = Api[i].url;
                let Api_response_film = await new ModelApi(api_url_film).getResponse();
                let Film = await new ModelFilm(Api_response_film);
                let View = await new ViewFilm(Film);
                await View.displayCarousel(carrousel);
                console.log(api_url_film);
            }
        })

    }

    async displayBestFilmsByGenres() {
        // Afficher les genres de l'api
        let Api_Genre =await new ModelApi("http://127.0.0.1:"+port+"/api/v1/genres").getResults();
        for (let i = 0; i < Api_Genre.length; i++) {
            let fixation = await document.querySelector("main");
            let genre_name = await Api_Genre[i].name;

            let h2 = await document.createElement("h2");
            h2.innerHTML = genre_name;
            fixation.appendChild(h2);

        }
    }
}