import { ModelApi } from '../models/ModelApi.js';
import { ModelFilm } from '../models/ModelFilm.js';

import { ViewFilm } from '../views/ViewFilm.js';

let port = 8001;

export default class ControllerFilm {
    
    constructor() {
    }

    // Cette fonction asynchrone permet d'afficher le meilleur film en récupérant les données à partir de l'API
    async displayBestFilm() {

        // On récupère les données de l'API des films en triant par ordre décroissant de score imdb
        let Api = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score").getResults();

        // On récupère l'URL du premier film qui a le score imdb le plus élevé
        let api_url_film = await Api[0].url;

        // On récupère les données du film à partir de l'URL obtenue précédemment
        let Api_response_film = await new ModelApi(api_url_film).getResponse();

        // On crée un objet Film à partir des données récupérées de l'API
        let Film = await new ModelFilm(Api_response_film);

        // On crée une vue pour afficher les détails du film
        let View = await new ViewFilm(Film);

        // On définit l'emplacement où afficher la vue
        let fixation = await document.querySelector("main");

        // On affiche les détails du film dans la vue
        View.displayBestFilm(fixation);

        // On définit un bouton pour ouvrir une modal avec plus de détails sur le film
        let btn = await document.querySelector(".btn_best_film");

        // On ajoute un écouteur d'événement pour ouvrir la modal au clic sur le bouton
        btn.addEventListener("click", () => {
            // Si une modal est déjà ouverte, on la supprime avant d'afficher la nouvelle modal
            if (document.querySelector(".modal") != null) {
                document.querySelector(".modal").remove();
            }
            // On affiche la modal avec plus de détails sur le film
            View.displayModal(fixation);
        })
    }

    async displayBestFilms() {

        
        let fixation = await document.querySelector("main");
        let container_carousel = await document.createElement("div");
        let carousel_content = await document.createElement("div");
        carousel_content.classList.add("carousel_content");
        container_carousel.appendChild(carousel_content);
        container_carousel.classList.add("container_carousel");

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

        container_carousel.insertBefore(h2, carousel_content);
        fixation.appendChild(container_carousel);
        carousel_content.appendChild(fleche_gauche);
        carousel_content.appendChild(carrousel);
        carousel_content.appendChild(fleche_droite);

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
                
                let image_id = document.querySelector(".image_"+Api_response_film.id);
                image_id.addEventListener("click", () => {
                    if (document.querySelector(".modal")!= null) {
                        document.querySelector(".modal").remove();
                    }
                    View.displayModal(fixation);
                })
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

                    
                let image_id = document.querySelector(".image_"+Api_response_film.id);
                image_id.addEventListener("click", () => {
                    if (document.querySelector(".modal")!= null) {
                        document.querySelector(".modal").remove();
                    }
                    View.displayModal(fixation);
                })
            }
        })

    }

    async displayBestFilmsByGenres() {
        // Afficher les genres de l'api
        let Api_Genre = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/genres").getResults();
        for (let i = 0; i < Api_Genre.length; i++) {
            let fixation = await document.querySelector("main");
            let genre_name = await Api_Genre[i].name;
            let h2 = await document.createElement("h2");
            h2.innerHTML = genre_name;


            let api_url_film = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?genre="+genre_name+"&sort_by=-imdb_score&page_size=20").getResults();
            if (api_url_film.length < 7) {
                console.log("Pas assez de films dans ce genre");
            }
            else {
                let container_carousel = await document.createElement("div");
                let carousel_content = await document.createElement("div");
                carousel_content.classList.add("carousel_content");
                container_carousel.appendChild(carousel_content);
                container_carousel.classList.add("container_carousel");

                let fleche_gauche = await document.createElement("div");
                fleche_gauche.classList.add("fleche_gauche");
                fleche_gauche.innerHTML = "<";

                let fleche_droite = await document.createElement("div");
                fleche_droite.classList.add("fleche_droite");
                fleche_droite.innerHTML = ">";

            
                let carrousel = await document.createElement("div");
                carrousel.classList.add("carrousel");

                container_carousel.insertBefore(h2, carousel_content);
                fixation.appendChild(container_carousel);
                carousel_content.appendChild(fleche_gauche);
                carousel_content.appendChild(carrousel);
                carousel_content.appendChild(fleche_droite);



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

                console.log(api_url_film.url);
                for (let i = x; i < y; i++) {
                    let other_url_film = await api_url_film[i].url;
                    let other_response_film = await new ModelApi(other_url_film).getResponse();
                    let Film = await new ModelFilm(other_response_film);
                    let View = await new ViewFilm(Film);
                    await View.displayCarousel(carrousel);
                    let image_id = document.querySelector(".image_"+other_response_film.id);
                    image_id.addEventListener("click", () => {
                        if (document.querySelector(".modal")!= null) {
                            document.querySelector(".modal").remove();
                        }
                        View.displayModal(fixation);
                        // faire remonté en haut de la page
                        window.scrollTo(0, 0);
                    })
                }

                fleche_droite.addEventListener("click", async () => {
                    carrousel.innerHTML = "";
                    if (y >= api_url_film.length) {
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
                        let other_url_film = await api_url_film[i].url;
                        let other_response_film = await new ModelApi(other_url_film).getResponse();
                        let Film = await new ModelFilm(other_response_film);
                        let View = await new ViewFilm(Film);
                        await View.displayCarousel(carrousel);

                        let image_id = document.querySelector(".image_"+other_response_film.id);
                        image_id.addEventListener("click", () => {

                            if (document.querySelector(".modal")!= null) {
                                document.querySelector(".modal").remove();
                            }
                            View.displayModal(fixation);
                            window.scrollTo(0, 0);
                        })
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
                        let other_url_film = await api_url_film[i].url;
                        let other_response_film = await new ModelApi(other_url_film).getResponse();
                        let Film = await new ModelFilm(other_response_film);
                        let View = await new ViewFilm(Film);
                        await View.displayCarousel(carrousel);

                        let image_id = document.querySelector(".image_"+other_response_film.id);
                        image_id.addEventListener("click", () => {
                            if (document.querySelector(".modal")!= null) {
                                document.querySelector(".modal").remove();
                            }
                            View.displayModal(fixation);
                            window.scrollTo(0, 0);
                        })
                    }
                })
                
            }

        }
    }
}