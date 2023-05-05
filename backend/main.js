// Controllers
import FilmController from "./controllers/ControllerFilm.js";

class Main {

    constructor() {
        this.filmController = new FilmController();
        this.init();
    }

    async init() {
        try {
            await this.filmController.displayBestFilm();
            await this.filmController.displayBestFilms();
            await this.filmController.displayBestFilmsByGenres();
        }
        catch (e) {
            console.log("Main.init() error : " + e);
        }
    }
    
    async film__by_imdb(){
        try {
            await this.filmController.displayBestFilm();
        }
        catch (e) {
            console.log("Main.film__by_imdb() error : " + e);
        }
    }


    async films_by_imdb(){
        try {
            await this.filmController.displayBestFilms();
        }
        catch (e) {
            console.log("Main.films_by_imdb() error : " + e);
        }
    }

    async film_by_genres(){
        try {
            await this.filmController.displayBestFilmByGenres();
            
        }
        catch (e) {
            console.log("Main.film_by_genres() error : " + e);
        }
    }



}

new Main();