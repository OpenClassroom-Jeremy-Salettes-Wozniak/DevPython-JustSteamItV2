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
        let Api = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score&page_size=20").getResults();
        let fixation = await document.querySelector("main");
        let container_carousel = await document.createElement("div");
        container_carousel.classList.add("container_carousel");
        fixation.appendChild(container_carousel);
        
        for (let i = 0; i < Api.length; i++) {
            let api_url_film = await Api[i].url;
            let Api_response_film = await new ModelApi(api_url_film).getResponse();
            let Film = await new ModelFilm(Api_response_film);
            let View = await new ViewFilm(Film);
            let fixation_caroussel = await document.querySelector(".carousel_container");
            View.displayCarousel(container_carousel);
            
            // Si click sur l'image du carousel, afficher le modal
            let image = await document.querySelectorAll(".carousel img");
            image[i].addEventListener("click", () => {
                if (document.querySelector(".modal") != null) {
                    document.querySelector(".modal").remove();
                }
                View.displayModal(fixation);
            }
            )
        }
    }
}