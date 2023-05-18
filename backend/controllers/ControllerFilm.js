import { ModelApi } from '../models/ModelApi.js';
import { ModelFilm } from '../models/ModelFilm.js';
import { ViewFilm } from '../views/ViewFilm.js';    

let port = 8001;

export default class ControllerFilm {
    
    constructor() {
        this.fixation = document.querySelector("main");
    }

    // Cette fonction asynchrone permet d'afficher le meilleur film en récupérant les données à partir de l'API
    async displayBestFilm() {

        /*
        * On affiche le meilleur film en récupérant les données à partir de l'API

        */

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

        return true;
    }

    async displayBestFilms() {

        // Récupération de l'élément <main> pour y ajouter le carrousel
        let fixation = await document.querySelector("main");

        // Création des éléments HTML pour le carrousel
        let container_carousel = await document.createElement("div");
        let carousel_content = await document.createElement("div");
        carousel_content.classList.add("carousel_content");
        container_carousel.appendChild(carousel_content);
        container_carousel.classList.add("container_carousel");

        // Création des flèches pour le carrousel
        let fleche_gauche = await document.createElement("div");
        fleche_gauche.classList.add("fleche_gauche");
        fleche_gauche.innerHTML = "<";

        let fleche_droite = await document.createElement("div");
        fleche_droite.classList.add("fleche_droite");
        fleche_droite.innerHTML = ">";

    
        // Création du container pour le carrousel
        let carrousel = await document.createElement("div");
        carrousel.classList.add("carrousel");
 
        // Création du titre du "Meilleur films"
        let h2 = await document.createElement("h2");
        h2.innerHTML = "Meilleurs films";

        // Insertion des éléments HTML dans le DOM
        container_carousel.insertBefore(h2, carousel_content);
        fixation.appendChild(container_carousel);
        carousel_content.appendChild(fleche_gauche);
        carousel_content.appendChild(carrousel);
        carousel_content.appendChild(fleche_droite);
        
        // Récupération des données de l'API
        let Api = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score&page_size=20").getResults();

        // On définit le nombre de films à afficher dans le carrousel en fonction de la taille de l'écran
        window.addEventListener("resize", () => {
            window.location.reload();
        }); 

        let x = 0;
        let y = 7;

        // Ajustement du nombre de films affichés en fonction de la largeur de la fenêtre
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
        
        // Affichage des films dans le carrousel
        for (let i = x; i < y; i++) {
            let api_url_film = await Api[i].url;
            let Api_response_film = await new ModelApi(api_url_film).getResponse();
            let Film = await new ModelFilm(Api_response_film);
            let View = await new ViewFilm(Film);
            await View.displayCarousel(carrousel);

            // On définit l'image pour ouvrir une modal avec plus de détails sur le film
            let image_id = document.querySelector(".image_"+Api_response_film.id);
            // On ajoute un écouteur d'événement pour ouvrir la modal au clic sur l'image
            image_id.addEventListener("click", () => {
                if (document.querySelector(".modal")!= null) {
                    document.querySelector(".modal").remove();
                }
                View.displayModal(fixation);
            })
        }

        // On définit les écouteurs d'événement pour faire défiler le carrousel
        fleche_droite.addEventListener("click", async () => {
            // On supprime les films déjà affichés
            carrousel.innerHTML = "";
            // Si on est à la fin du carrousel, on affiche un message d'alerte
            if (y >= 20) {
                x = x;
                y = y;
                alert("Vous avez atteint la fin du carrousel");
            }else {
                // Sinon, on affiche les films suivants
                x += 1;
                y += 1;
            }
            // On affiche les nouveaux films avec les nouvelles données d'incrémentation
            for (let i = x; i < y; i++) {
                // Récupération des données de l'API
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
                    window.scrollTo(0, 0);

                })
            }
        })

        // On refait la même chose pour la flèche de gauche
        fleche_gauche.addEventListener("click", async () => {
            carrousel.innerHTML = "";
            if (x <= 0) {
                x = x;
                y = y;
            }else {
                x -= 1;
                y -= 1;
            }
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
                    window.scrollTo(0, 0);
                })
            }
        })

    }

    async displayBestFilmsByGenres() {
        // Afficher les genres de l'api
        let Api_Genre = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/genres").getResults();
        for (let i = 0; i < Api_Genre.length; i++) {
            // On sélectionne le main pour y ajouter les genres
            let fixation = await document.querySelector("main");
            // On recupère le nom du genre
            let genre_name = await Api_Genre[i].name;
            // On créer un élément h2 pour afficher le nom du genre
            let h2 = await document.createElement("h2");
            h2.innerHTML = genre_name;


            // On affiche les films du genre
            let api_url_film = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?genre="+genre_name+"&sort_by=-imdb_score&page_size=20").getResults();
            if (api_url_film.length < 7) {
                // On met un limite de 7 films par genre
                console.log("Pas assez de films dans ce genre");
            }
            else {
                // Puis on répéte la même chose que pour displayBestFilms()
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
                        alert("Vous avez atteint la fin du carrousel");
                    }else {
                        x += 1;
                        y += 1;
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
                    }
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

    // async eventModal(className, fixation, view) {
    //     /* 
    //     /   Cette fonction asynchrone permet d'ajouter un écouteur d'événement sur un bouton pour afficher une modal
    //     /   @param className : string
    //     /   @param fixation : HTMLElement
    //     /   @param view : ViewFilm
    //     */

    //     // On récupère le bouton sur lequel on veut ajouter l'écouteur d'événement
    //     let btn = await document.querySelector(className);

    //     // On ajoute l'écouteur d'événement
    //     btn.addEventListener("click", () => {
    //             if (document.querySelector(".modal")) {
    //                 document.querySelector(".modal").remove(); // Si modal existe on la supprime
    //             }
    //             view.displayModal(fixation); // On affiche la modal
    //     })
    // }  

    // async moveCarousel(fixation, x, y, callback)
    // {
    //     // On créer un container pour le carousel
    //     let container = document.createElement("div");
    //     container.classList.add("container_carousel");
    //     fixation.appendChild(container);

    //     // On créer le point d'accroche pour le contenu du carousel
    //     let content = document.createElement("div");
    //     content.classList.add("content_carousel");
        
    //     // On créer la flèche gauche
    //     let flecheGauche = document.createElement("button");
    //     flecheGauche.classList.add("fleche_gauche");
    //     flecheGauche.innerHTML = "<";

    //     // On créer la flèche droite
    //     let flecheDroite = document.createElement("button");
    //     flecheDroite.classList.add("fleche_droite");
    //     flecheDroite.innerHTML = ">";
        

    //     container.appendChild(flecheGauche); // On ajoute la flèche gauche au container
    //     container.appendChild(content); // On ajoute le point d'accroche au container
    //     container.appendChild(flecheDroite); // On ajoute la flèche droite au container
        
    //     // On ajoute un écouteur d'événement sur la flèche gauche
    //     flecheGauche.addEventListener("click", () => {
    //         console.log("click gauche");
   
            
    //         if (x <= 0) {
    //             x = x;
    //             y = y;
                
    //             console.log("click gauche A", x, y);
    //         }
    //         else {
    //             x--;
    //             y--;
                
    //             console.log( "click gauche B", x, y);
    //         }
    //     })

    //     // On ajoute un écouteur d'événement sur la flèche droite
    //     flecheDroite.addEventListener("click", () => {
    //         console.log("click droite");
    //         if (y >= 20) {
    //             x = x;
    //             y = y;

    //             console.log("click droite A", x, y);
    //         }
    //         else {
    //             x++;
    //             y++;

    //             console.log("click droite B", x, y);
    //         }
    //     })
    //     return {x, y};
    // }

    // async limitDisplay() {

    //     // Rafrachir la page quand la taille de l'écran change
    //     window.addEventListener("resize", () => {
    //         window.location.reload();
    //     });

    //     let width = window.innerWidth;
    //     let arrayLimit = ["425", "768", "1024", "1280", "1440", "1920", "2560"];
    //     let x = 0;
    //     let y = 1;

    //     for (let i = 0; i < arrayLimit.length; i++) {
    //         if (width >= arrayLimit[i]) {
    //             y++;
    //         }
    //     }            
    
    //     return {x, y}
    // }

    // async displayBestFilm() {
    //     /*
    //     *   Cette fonction asynchrone permet d'afficher le meilleur film en récupérant les données à partir de l'API
    //     */

    //     // Recupération des données de l'API
    //     const data = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score&page_size=1").getResults();
    //     let dataUrl = data[0].url;
    //     let dataFilm = await new ModelApi(dataUrl).getResponse();

    //     // Création du film et de la vue
    //     let film = await new ModelFilm(dataFilm);
    //     let view = await new ViewFilm(film);

    //     // Affichage du film
    //     view.displayBestFilm(this.fixation);

    //     // Affichage de la modal;
    //     this.eventModal(".btn_best_film", this.fixation, view);
    // }

    // async displayBestFilms() {
    //     // On charge les meilleurs films sous la forme d'un carrousel
    //     // Bouton de gauche a droite pour faire défiler les films et qui appel les nouvelles données

    //     // Recupération des données de l'API
    //     const data = await new ModelApi("http://127.0.0.1:"+port+"/api/v1/titles/?sort_by=-imdb_score&page_size=20").getResults();

    //     // Limite le nombre d'affichage en fonction de la taille de l'écran
    //     let limit = await this.limitDisplay();
    //     let x = limit.x;
    //     let y = limit.y;
        
    //     console.log(x, y);

    //     // Création du carrousel
    //     let moveCarousel =  await this.moveCarousel( this.fixation, x, y); 
    //     let content = await document.querySelector(".content_carousel"); // On récupère le point d'accroche du content carousel

    //     console.log(moveCarousel.x, moveCarousel.y);

        
    //     for (let i = x; i < y; i++) {
    //         // Recupération des données de l'API
    //         let dataUrl = data[i].url;
    //         let dataFilm = await new ModelApi( dataUrl ).getResponse();

    //         // Création du film et de la vue
    //         let film = await new ModelFilm( dataFilm );
    //         let view = await new ViewFilm( film );
            
    //         // Affichage du film dans le content carousel
    //         view.displayCarousel( content );

    //     //     // Affichage de la modal;
    //     //     let image_id = 'image_' + data[i].id;
    //     //     this.eventModal( image_id, this.fixation, view );
    //     // }
        
    //     }
    // }