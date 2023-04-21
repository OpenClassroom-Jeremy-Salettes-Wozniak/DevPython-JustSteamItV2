import { ModelApi } from '../models/ModelApi.js';
import { ModelFilm } from '../models/ModelFilm.js';

import { ViewFilm } from '../views/ViewFilm.js';

export default class ControllerFilm {
    
    constructor() {
        this.displayBestFilm();
        // this.displayFilms();
    }

    async displayBestFilm() {
        let Api = await new ModelApi("http://127.0.0.1:8001/api/v1/titles/?sort_by=-imdb_score").getResults();
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

    // async displayFilms() {
    //     let Api = await new ModelApi("http://127.0.0.1:8001/api/v1/titles/?sort_by=-imdb_score").getResults();
    //     for (let i = 0; i < Api.length; i++) {
    //         let api_url_film = await Api[i].url;
    //         let Api_response_film = await new ModelApi(api_url_film).getResponse();
    //         let Film = await new ModelFilm(Api_response_film);
    //         let View = await new ViewFilm(Film);
    //         let fixation = await document.createElement("div");
    //         fixation.classList.add("carousel_container");
    //         View.displayCarousel(fixation);
    //     }


    

}